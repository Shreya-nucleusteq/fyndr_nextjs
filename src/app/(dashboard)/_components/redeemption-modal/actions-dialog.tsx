"use client";

import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

import Button from "@/components/global/buttons";
import Input from "@/components/global/input";
import Invoicefooter from "@/components/global/invoice/invoice-footer";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useVoucherUpdate } from "@/hooks/offers";
import { statusList } from "@/lib/utils";
import { InvoiceOffer } from "@/types/api-response/transaction.response";
import { OfferPurchaseProps } from "@/types/offer-summary/offer-summary.types";

import RedeemRemarks from "./remarks";

interface ActionsDialogProps {
  row: OfferPurchaseProps | InvoiceOffer | null;

  onOpenChange: () => void;
  open: boolean;
  type?: string;
  merchantId?: string;
  fname?: string;
  lname?: string;
  indvid?: number;
  title: string;
  currencySymbol?: string;
  refetch?: () => void;
}

const ActionsDialog = ({
  row,
  onOpenChange,
  open,
  type,
  merchantId,
  fname,
  lname,
  indvid,
  title,
  currencySymbol,
  refetch,
}: ActionsDialogProps) => {
  const [status, setStatus] = useState<string>("");
  const [curVal, setCurVal] = useState<string>("");
  const [remark, setRemark] = useState<string>("");
  const [redeemedAmtError, setRedeemedAmtError] = useState<string>("");
  const [redeemedAmt, setRedeemedAmt] = useState<string>("");

  const INVOICE_TEXT = "leading-5 text-[#4D4D4D] text-sm font-semibold";
  // const INVOICE_VALUE = "text-[14px] leading-[20px] font-normal text-[#333333]";

  useEffect(() => {
    if (row?.currentValue != null) {
      setCurVal(String(row.currentValue));
    }
    if (row?.redeemptionStatus) {
      setStatus(row.redeemptionStatus);
    }
  }, [row?.currentValue, row?.redeemptionStatus]);

  const handleChgAmt = (val: string) => {
    setRedeemedAmt(val);
    setRedeemedAmtError("");

    const numericVal = parseFloat(val);
    if (isNaN(numericVal)) return;

    const balance = parseFloat(
      (Number(row?.currentValue) - numericVal).toFixed(2)
    );
    setCurVal(String(balance));

    if (balance < 0) {
      setRedeemedAmtError("Unused value can't be negative");
    }
  };

  const { voucherUpdate, isPending } = useVoucherUpdate();

  const handleVoucherUpdate = () => {
    voucherUpdate({
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
    });
  };

  return (
    <>
      <Modal
        onOpenChange={onOpenChange}
        open={open}
        title={title}
        footerClassName="p-0"
        footerContent={<Invoicefooter />}
        bodyClassName="max-h-[80vh] overflow-y-scroll no-scrollbar"
      >
        <div className="rounded-10 border border-secondary-20 p-[12px_12px_0_12px]">
          <div className="flex justify-center align-middle">
            <QRCode
              value={`${row?.voucherCode}`}
              size={300}
              logoWidth={80}
              ecLevel="H"
              quietZone={10}
              fgColor={status === "redeemed" ? "#ccc" : "#000"}
              logoImage={"/images/blueFyndr.png"}
            />
          </div>

          <div className="my-2 flex  flex-col items-center justify-center">
            <span className="text-base font-semibold text-black-60">{`Fyndr Generated Voucher ID: ${row?.voucherCode}`}</span>
            {row?.isVoucher && (
              <span className="text-base font-semibold  text-black-60">{`Business Generated Voucher ID: ${row?.customVoucherCode}`}</span>
            )}
          </div>
        </div>

        {row?.currentValue != null &&
          row.currentValue > 0 &&
          row?.redeemptionStatus !== "redeemed" && (
            <div className="mt-4 flex justify-between rounded-10 border border-secondary-20 p-[12px]">
              <span className="text-sm font-semibold leading-5 text-black-70">
                Unused Value
              </span>

              <span>{`${currencySymbol ?? (row as OfferPurchaseProps)?.currencySymbol}${curVal}`}</span>
            </div>
          )}

        <RedeemRemarks
          remarks={row?.remarks}
          currencySymbol={
            currencySymbol ?? (row as OfferPurchaseProps)?.currencySymbol
          }
          redemptionTime={(row as OfferPurchaseProps)?.redemptionTime}
        />

        {type === "receivable" && row?.redeemptionStatus !== "redeemed" && (
          <>
            <div className="mt-4 rounded-10 border border-secondary-20 p-[12px]">
              <RadioGroup
                value={status}
                onValueChange={(val) => setStatus(val)}
              >
                {statusList.map((item) => (
                  <div key={item.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      id={`status-${item.value}`}
                      value={item.value}
                      className="size-4"
                    />
                    <Label
                      htmlFor={`status-${item.value}`}
                      className={INVOICE_TEXT}
                    >
                      {item.display}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {status === "partially-redeemed" && (
                <>
                  <div className="mt-4 flex flex-col ">
                    <div>
                      <Input
                        placeholder="Amount redeemed"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*\.?\d{0,2}$/.test(value)) {
                            handleChgAmt(value);
                          }
                        }}
                        value={redeemedAmt}
                      />
                      <span className="size-[15px]  pl-1 leading-6 text-[red]">
                        {redeemedAmtError}
                      </span>
                    </div>
                    <div>
                      <Input
                        placeholder="Remarks"
                        onChange={(e) => {
                          setRemark(e.target.value);
                        }}
                        value={remark}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 flex w-full ">
              <Button
                type="button"
                className="h-[45px] w-[30%] rounded-10 bg-primary text-white hover:bg-primary "
                onClick={() => {
                  if (status === "unused") {
                    return toast.error({
                      message: "Please select a status before saving.",
                    });
                  }
                  handleVoucherUpdate();
                }}
              >
                Save
              </Button>
            </div>
          </>
        )}
        {type !== "receivable" && row?.redeemptionStatus !== "redeemed" && (
          <div className="mt-3 w-full justify-center align-middle">
            <Button
              type="button"
              className="h-[45] w-2/5 rounded-10 bg-primary text-white hover:bg-primary "
              onClick={() => handleVoucherUpdate()}
            >
              {isPending ? "Redeeming..." : "Mark as redeemed"}
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ActionsDialog;
