/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import NextAuth, { AuthError, User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import {
  onGetAccount,
  onGoogleOAuth,
  onRefreshToken,
  onSignIn,
} from "@/actions/auth.actions";

import { SignInSchema } from "./components/forms/auth/sign-in/schema";
import { authConfig } from "./config/auth.config";
import ROUTES from "./constants/routes";
import handleError from "./lib/handlers/error";
import { EntityRole, EntityType } from "./types/auth/auth.types";
import { Coordinates } from "./types/global";

class InvalidLoginError extends AuthError {
  code = "custom";
  constructor(message?: any, errorOptions?: any) {
    super(message, errorOptions);
    this.message = message;
  }
}

interface UserSession {
  accessToken: string;
  refreshToken: string;

  id: string;
  name: string;
  email: string;
  entityType: EntityType;
  entityRole: EntityRole;
  accountStatus: string;
  bizid: number;

  phone?: string;
  image?: string;

  location: {
    lat: number;
    lng: number;
  };
}

declare module "next-auth" {
  interface Session {
    user: UserSession;
    accessToken?: string;
  }

  interface User {
    accessToken?: string | null | any;
    refreshToken?: string | null | any;
    entityRole?: EntityRole | null | any;
    entityType?: EntityType | null | any;
    accountStatus?: string | null | any;
    phone?: string | null | any;
    location?: Coordinates | null | any;
    bizid?: string | null | any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          try {
            const {
              headers: signInHeaders,
              success: signInSuccess,
              data: signInData,
              error,
            } = await onSignIn({
              payload: {
                email,
                password,
                mode: "classic",
              },
            });

            if (!signInSuccess || !signInHeaders || !signInData) {
              throw new InvalidLoginError(
                error?.details?.message || "Something went wrong"
              );
            }

            const accessToken = signInHeaders.get("x-auth-fyndr-code");
            const refreshToken = signInHeaders.get("x-auth-fyndr-refresh-code");

            if (!accessToken) return null;

            const { success, data: parsedAccountResponse } = await onGetAccount(
              {
                payload: {
                  email,
                  regMode: "classic",
                  accessToken,
                },
              }
            );

            if (!success || !parsedAccountResponse) return null;
            if (parsedAccountResponse.accountStatus === "DELETED") {
              return null;
            }

            const {
              indvid,
              firstName,
              lastName,
              email: userEmail,
              entityRole,
              entityType,
              address,
              accountStatus,
              bizid,
            } = parsedAccountResponse;

            const id = indvid.toString();
            const name = `${firstName} ${lastName}`;

            return {
              accessToken,
              refreshToken,
              id,
              name,
              email: userEmail,
              entityRole,
              entityType,
              accountStatus,
              location: {
                lat: address.lat,
                lng: address.lng,
              },
              phone: address.phone,
              bizid,
            } as User;
          } catch (error: any) {
            throw new InvalidLoginError(
              error?.message || "Something went wrong"
            );
          }
        }

        return null;
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, account, user, trigger, session }) => {
      // user is only available the first time a user signs in authorized
      // console.log(`In jwt callback - Token is ${JSON.stringify(token)}`);

      if (trigger === "update" && session?.user) {
        console.log("SESSION IN JWT CALLBACK -> ", {
          token,
          session,
          user,
        });
        // user.email = session.user.email;
        // if (token?.user?.email) {
        (token.user as User).email = session.user.email;
        // }
        return {
          ...token,
          ...user,
          email: session.user.email,
        };
      }

      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken);
        // console.log(decodedToken);
        token.accessTokenExpires = decodedToken?.exp
          ? decodedToken?.exp * 1000
          : undefined;
      }

      if (account && user) {
        // console.log(`In jwt callback - User is ${JSON.stringify(user)}`);
        // console.log(`In jwt callback - account is ${JSON.stringify(account)}`);

        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      // console.log(
      //   "**** Access token expires on *****",
      //   token.accessTokenExpires,
      //   new Date(token.accessTokenExpires)
      // );
      if (Date.now() < (token?.accessTokenExpires || 0)) {
        // console.log("**** returning previous token ******");
        return token;
      }

      // Access token has expired, try to update it
      // console.log("**** Update Refresh token ******");
      // return refreshAccessToken(token);
      return refreshToken(token);
    },

    session: async ({ session, token }) => {
      // console.log(`In session callback - Token is ${JSON.stringify(token)}`);
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user as AdapterUser & UserSession;
      }

      return session;
    },

    signIn: async ({ user, account, profile }) => {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;

      const provider = account.provider as "google";
      if (provider === "google") {
        try {
          const googleUser = await onGoogleOAuth({ profile, account });
          if (googleUser) {
            Object.assign(user, googleUser);
            return true;
          } else {
            return `${ROUTES.CALLBACK_AUTH}?status=user_not_found&email=${encodeURIComponent(user.email!)}&provider=${account.provider}`;
          }
        } catch (error) {
          handleError(error);
          return `${ROUTES.CALLBACK_AUTH}?status=error`;
        }
      }
      return true;
    },
  },
});

async function refreshToken(token: JWT) {
  console.log("Refreshing access token", token);
  const { refreshToken } = token;

  if (!refreshToken) {
    return token;
  }

  const { success, data } = await onRefreshToken({
    payload: {
      refreshToken,
    },
  });

  if (!success || !data) {
    return null;
  }

  return {
    ...token,
    accessToken: data.accessCode,
    refreshToken: data.refreshToken ?? token.refreshToken, // Fall back to old refresh token
  };
}
