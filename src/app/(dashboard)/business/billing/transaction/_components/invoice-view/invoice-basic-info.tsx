"use client";
import dayjs from "dayjs";
import React, { useState } from "react";

import Button from "@/components/global/buttons";
import { capitalize, parseAddressInvoice } from "@/lib/utils";
import {
  Address,
  CatalogResponse,
  CustomResponse,
  GiftDetails,
  OfferResponse,
  PromoResponse,
} from "@/types/api-response/transaction.response";
import { CreateInvoiceDetails } from "@/types/invoice/create-update-invoice/invoice.types";

import InvoicePromodetails from "./promo-details";
import ShowQrModal from "./show-qr-modal";

type InvoiceBasicInfoProps = {
  buyerFname: string;
  buyerLname: string;
  channel: string;
  gifteeDetails: GiftDetails | null;
  fulfiled?: string | null;
  status: string;
  endDate?: Date | string;
  startDate?: Date | string;
  invoiceDetails:
    | OfferResponse
    | CatalogResponse
    | PromoResponse
    | CustomResponse
    | CreateInvoiceDetails;
  userTimeZone: string | undefined;
  invoiceDt: string;
  brand: string;
  billingEmail: string;
  billingAddress: Address | null;
  purchaseLoc: Address | null;
  type?: string | null;
  disputeStatus: string | null;
  objid: number | null;
};

const InvoiceBasicInfo = ({
  disputeStatus,
  type,
  purchaseLoc,
  billingAddress,
  buyerFname,
  buyerLname,
  channel,
  gifteeDetails,
  fulfiled,
  invoiceDetails,
  status,
  userTimeZone,
  endDate,
  startDate,
  invoiceDt,
  brand,
  billingEmail,
  objid,
}: InvoiceBasicInfoProps) => {
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  return (
    <>
      <div>
        <div className="flex rounded-10 border border-secondary-20 px-3 pt-2">
          <div style={{ width: "100%" }}>
            <div className="mb-[8px] flex justify-between text-primary">
              <span className="text-base font-semibold">Invoiced to:</span>
              <span className="text-base font-semibold">
                {buyerFname} {buyerLname}
              </span>
            </div>

            {(channel === "offers" || channel === "offer_appointment") && (
              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                  Purchased as gift:
                </span>
                <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                  {gifteeDetails !== null ? "Yes" : "No"}
                </span>
              </div>
            )}
            {channel === "catalog" && (
              <>
                <div className="mb-[8px] flex justify-between">
                  <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                    Delivered:
                  </span>
                  <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                    {fulfiled ? capitalize(fulfiled) : "NA"}
                  </span>
                </div>
                <div className="mb-[8px] flex justify-between">
                  <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                    Delivery Time:
                  </span>
                  <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                    {capitalize(
                      (invoiceDetails as CatalogResponse)?.deliveryTime
                    )}
                  </span>
                </div>
              </>
            )}

            {startDate && endDate && (
              <InvoicePromodetails
                channel={channel}
                title={(invoiceDetails as PromoResponse)?.title}
                promoChannels={
                  (invoiceDetails as PromoResponse)?.promo_channels
                }
                duration={(invoiceDetails as PromoResponse)?.duration}
                startDate={startDate}
                endDate={endDate}
                userTimeZone={userTimeZone}
                invoiceDt={invoiceDt}
              />
            )}

            <div className="mb-[8px] flex items-center justify-between">
              <span className="w-1/3 text-[14px] font-semibold leading-[20px] text-black-70">
                Payment Status:
              </span>
              <span className="w-1/3 text-right text-[14px] font-semibold leading-[20px] text-black-80">
                {capitalize(status)}
              </span>
              {/* {status === "pending" && (
                        <Button
                          onClick={() => setModalVisible(true)}
                          className="w-1/3 text-right"
                        >
                          <Button
                            onClick={() => setModalVisible(true)}
                            className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
                          >
                            Mark as Paid
                          </Button>
                        </Button>
                      )} */}
            </div>

            {channel !== "cmpn_promo" && channel !== "promo" && (
              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                  Date Invoiced:
                </span>
                {userTimeZone && (
                  <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                    {dayjs(invoiceDt).tz(userTimeZone).format("MMM DD, YYYY")}
                  </span>
                )}
              </div>
            )}

            {channel === "custom" && (
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                    Invoice #:
                  </span>
                  <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                    {(invoiceDetails as CustomResponse).invoice_nbr}
                  </span>
                </div>

                {(invoiceDetails as CustomResponse).cust_message !== null && (
                  <div className="mb-2 flex justify-between">
                    <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                      Message:
                    </span>
                    <span className="text-[14px] font-normal leading-[20px] text-black-80">
                      {(invoiceDetails as CustomResponse).cust_message}
                    </span>
                  </div>
                )}

                <div className="mb-2 flex justify-between">
                  <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                    Associate Name:
                  </span>
                  <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                    {(invoiceDetails as CustomResponse).server_name}
                  </span>
                </div>
              </div>
            )}

            {status === "paid" && brand !== undefined && brand !== "" && (
              <div className="mb-2 flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                  Payment Method:
                </span>
                <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                  {capitalize(brand)}
                </span>
              </div>
            )}
            {billingEmail !== "" && (
              <div className="mb-2 flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                  Billing Email:
                </span>
                <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                  {billingEmail}
                </span>
              </div>
            )}
            {billingAddress && Object.keys(billingAddress).length > 0 && (
              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                  Billing Address:
                </span>
                <span className="text-right text-[14px] font-semibold leading-[20px] text-black-80">
                  {parseAddressInvoice(billingAddress)}
                </span>
              </div>
            )}
            {purchaseLoc && Object.keys(purchaseLoc).length > 0 && (
              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                  Location:
                </span>
                <span className="text-right text-[14px] font-semibold leading-[20px] text-black-80">
                  {parseAddressInvoice(purchaseLoc)}
                </span>
              </div>
            )}

            {type === "payable" && disputeStatus !== null && (
              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                  Dispute Status:
                </span>
                <span className="text-[14px] font-semibold leading-[20px] text-red-600">
                  {disputeStatus
                    ? disputeStatus.charAt(0).toUpperCase() +
                      disputeStatus.slice(1).toLowerCase()
                    : ""}
                </span>
              </div>
            )}
            {channel === "catalog" && (
              <Button
                className="mb-3 h-[46px] w-full rounded-10 border border-primary bg-primary-0.5 text-primary hover:border-primary hover:bg-primary-0.5 hover:text-primary hover:shadow-none"
                onClick={() => setShowQRCode(true)}
              >
                Show QR Code
              </Button>
            )}
          </div>
        </div>
      </div>

      <ShowQrModal
        open={showQRCode}
        onOpenChange={setShowQRCode}
        objid={objid}
        fulfiled={fulfiled}
      />
    </>
  );
};

export default InvoiceBasicInfo;
