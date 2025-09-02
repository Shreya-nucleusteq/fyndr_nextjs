// src/hooks/useUser.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback, useMemo, useEffect } from "react";

import { onGetAccount } from "@/actions/auth.actions";
import { GetAccountResponse } from "@/types/auth/auth.response";
import { useUserStore } from "@/zustand/stores/user.store";

export const USER_QUERY_KEY = "userData";

interface UseUserOptions {
  email?: string | null;
  enabled?: boolean;
  syncWithStore?: boolean; // New option to control store sync
}

export function useUser(options: UseUserOptions = {}) {
  const {
    email: overrideEmail,
    enabled = true,
    syncWithStore = true,
  } = options;
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { setUserData, clearUserData } = useUserStore();

  // Determine which email to use - override email takes precedence
  const queryEmail = useMemo(() => {
    return overrideEmail || session?.user?.email || null;
  }, [overrideEmail, session?.user?.email]);

  // Create a stable query key that includes email when it's overridden
  const queryKey = useMemo(() => {
    return overrideEmail ? [USER_QUERY_KEY, overrideEmail] : [USER_QUERY_KEY];
  }, [overrideEmail]);

  const {
    data: userData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey,
    queryFn: async (): Promise<GetAccountResponse | null> => {
      if (!queryEmail || !session?.accessToken) {
        return null;
      }

      const { success, data, error } = await onGetAccount({
        payload: {
          email: queryEmail,
          regMode: "classic",
          accessToken: session.accessToken,
        },
      });

      if (!success || !data) {
        throw new Error(error?.details?.message || "Failed to fetch user data");
      }

      return data;
    },
    enabled: enabled && !!queryEmail && !!session?.accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Sync React Query data with Zustand store
  // Only sync if it's the primary user data (not overridden email)
  useEffect(() => {
    if (syncWithStore && !overrideEmail && userData) {
      setUserData(userData);
    }
  }, [userData, setUserData, syncWithStore, overrideEmail]);

  // Clear store when session is lost
  useEffect(() => {
    if (syncWithStore && !session && !overrideEmail) {
      clearUserData();
    }
  }, [session, clearUserData, syncWithStore, overrideEmail]);

  // Function to invalidate and refetch user data
  const invalidateUser = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [USER_QUERY_KEY],
      exact: false,
    });
  }, [queryClient]);

  // Function to update user data with new email
  const updateUserWithEmail = useCallback(
    async (newEmail: string) => {
      try {
        // Remove old cached data
        queryClient.removeQueries({ queryKey: [USER_QUERY_KEY] });

        // Fetch new data with the new email
        const result = await queryClient.fetchQuery({
          queryKey: [USER_QUERY_KEY, newEmail],
          queryFn: async (): Promise<GetAccountResponse | null> => {
            if (!session?.accessToken) return null;

            const { success, data, error } = await onGetAccount({
              payload: {
                email: newEmail,
                regMode: "classic",
                accessToken: session.accessToken,
              },
            });

            if (!success || !data) {
              throw new Error(
                error?.details?.message || "Failed to fetch user data"
              );
            }

            return data;
          },
        });

        // Update the main user data cache with new email as primary
        queryClient.setQueryData([USER_QUERY_KEY], result);

        // Update store if syncing is enabled
        if (syncWithStore) {
          setUserData(result);
        }

        return result;
      } catch (error) {
        console.error("Failed to update user with new email:", error);
        throw error;
      }
    },
    [queryClient, session?.accessToken, setUserData, syncWithStore]
  );

  // Function to clear user data (for logout)
  const clearUserDataAndCache = useCallback(() => {
    queryClient.removeQueries({ queryKey: [USER_QUERY_KEY] });
    if (syncWithStore) {
      clearUserData();
    }
  }, [queryClient, clearUserData, syncWithStore]);

  return {
    user: userData,
    isLoading,
    isFetching,
    error,
    refetch,
    invalidateUser,
    updateUserWithEmail,
    clearUserData: clearUserDataAndCache,
  };
}

// Hook to get user data from store (for components that don't need React Query features)
export function useUserFromStore() {
  return useUserStore((state) => ({
    user: state.userData,
    isLoading: state.isLoading,
    error: state.error,
  }));
}