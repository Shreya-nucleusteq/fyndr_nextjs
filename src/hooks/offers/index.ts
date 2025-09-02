import { useMutation } from "@tanstack/react-query";

import { onUpdateOfferRedeemption } from "@/actions/offer-summary.actions";
import toast from "@/components/global/toast";
import { InvoiceOffer } from "@/types/api-response/transaction.response";
import {
  OfferSummaryRedemption,
  OfferPurchaseProps,
} from "@/types/offer-summary/offer-summary.types";

export const useOfferRedeemption = () => {
  return useMutation({
    mutationKey: ["OfferRedeemption"],
    mutationFn: (payload: OfferSummaryRedemption) =>
      onUpdateOfferRedeemption(payload),
  });
};

interface VoucherUpdateParams {
  status: string;
  redeemedAmt: string | number;
  redeemedAmtError?: string;
  row: OfferPurchaseProps | InvoiceOffer | null;
  indvid?: number;
  type?: string;
  curVal: string;
  remark: string;
  merchantId?: string;
  fname?: string;
  lname?: string;
  refetch?: () => void;
  setRemark: (value: string) => void;
  setRedeemedAmt: (value: string) => void;
  onOpenChange: () => void;
}

export const useVoucherUpdate = () => {
  const { mutate: updateOfferRedeem, isPending } = useOfferRedeemption();

  const voucherUpdate = (params: VoucherUpdateParams) => {
    const {
      status,
      redeemedAmt,
      redeemedAmtError,
      row,
      indvid,
      type,
      curVal,
      remark,
      merchantId,
      fname,
      lname,
      refetch,
      setRemark,
      setRedeemedAmt,
      onOpenChange,
    } = params;

    // Validation checks
    if (status === "partially-redeemed" && type === "receivable") {
      if (!redeemedAmt || Number(redeemedAmt) <= 0) {
        return toast.error({
          message: "Redeemed Amount must be greater than 0",
        });
      }
    }

    if (redeemedAmtError) {
      return false;
    }

    if (!(row?.objid && row?.invoiceId && indvid)) return;

    // Prepare payload based on type
    let payload;
    if (type === "receivable") {
      payload = {
        voucherId: row?.objid,
        merchantId,
        status: Number(curVal) <= 0 ? "redeemed" : status,
        customRemarks: remark.length > 0 ? remark : null,
        invoiceId: row?.invoiceId,
        updatedBy: `${fname} ${lname}`,
        lat: null,
        lng: null,
        buyerId: indvid,
        redeemedValue: status === "redeemed" ? curVal : redeemedAmt,
        currentValue: status === "redeemed" ? 0 : curVal,
      };
    } else {
      payload = {
        voucherId: row?.objid,
        status: "redeemed",
        invoiceId: row?.invoiceId,
        updatedBy: `${fname} ${lname}`,
        lat: null,
        lng: null,
        buyerId: indvid,
        redeemedValue: curVal,
        currentValue: 0,
      };
    }

    updateOfferRedeem(payload, {
      onSuccess: (res) => {
        if (res.success) {
          toast.success({ message: "Voucher Updated Successfully" });
          refetch?.();
          setRemark("");
          setRedeemedAmt("");
          onOpenChange();
        } else {
          toast.error({ message: "Something went wrong" });
        }
      },
      onError: (error: Error) => {
        toast.error({
          message: error?.message || "Failed to update voucher",
        });
      },
    });
  };

  return {
    voucherUpdate,
    isPending,
  };
};
