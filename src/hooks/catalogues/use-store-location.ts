import { useMutation } from "@tanstack/react-query";

import { onGetStoreLocations } from "@/actions/catalogue.actions";
import toast from "@/components/global/toast";
import { FetchLocationResponse } from "@/types/catalogue/catalogue.response";

export const useFetchStoreLocation = (
  onSuccessCallback?: (data: FetchLocationResponse) => void
) => {
  return useMutation({
    mutationFn: onGetStoreLocations,
    onSuccess: (res) => {
      if (res.success && res.data) {
        onSuccessCallback?.(res.data);
      } else {
        toast.error({
          message: "Unable to fetch locations ",
        });
      }
    },
    onError: () => {
      toast.error({

        message: "Something went wrong",
        description: "Could not fetch the store locations.",
       

      });
    },
  });
};
