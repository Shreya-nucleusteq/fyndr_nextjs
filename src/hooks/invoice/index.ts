import { useMutation, useQuery } from "@tanstack/react-query";

import { onGetDisputeReasons, onRaiseDispute } from "@/actions/invoice.actions";
import { fetchReviewsOverview } from "@/actions/review.actions";
import { onGetInvoiceDetails } from "@/actions/transaction.action";
import { GetInvoiceDetailProps } from "@/types/api-params/transaction.params";
import { RaiseDisputePayload } from "@/types/dispute-response";

type InvoicePayload = Parameters<GetInvoiceDetailProps>[0];

export const useInvoiceDetails = (
  objid: number,
  bizid: number | null,
  indvid: number | null,
  type?: string | null
) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["invoiceDetails", objid, type, bizid],
    enabled: !!objid,
    refetchOnMount: "always",
    staleTime: 0,
    notifyOnChangeProps: ["data", "error", "isLoading"],
    queryFn: async () => {
      const payload: InvoicePayload = { invoiceId: objid! };

      if (type && type === "receivable") {
        payload.bizid = bizid!;
      } else {
        payload.buyerId = indvid!;
      }

      const { success, data } = await onGetInvoiceDetails(payload);

      if (!success) throw new Error("Failed to fetch invoice details");
      return data;
    },
  });

  return { data, isLoading, isError, refetch };
};

export const useUserReviewOverViews = (bizId?: number) => {
  return useQuery({
    queryKey: ["reviewOverviews", bizId],
    queryFn: async () => {
      if (!bizId) throw new Error("No bizId provided");
      const response = await fetchReviewsOverview({ bizId });
      return response.data;
    },
    enabled: !!bizId,
  });
};

export const useDisputeReasons = () => {
  return useQuery({
    queryKey: ["disputeReasons"],
    queryFn: async () => {
      const response = await onGetDisputeReasons();
      return response.data;
    },
  });
};

export const useUpdateDisputeStatus = () => {
  return useMutation({
    mutationKey: ["updateDisputeStatus"],
    mutationFn: async ({
      invoiceId,
      payload,
    }: {
      invoiceId: number;
      payload: RaiseDisputePayload;
    }) => onRaiseDispute(invoiceId, payload),
  });
};
