"use client";

import Image from "next/image";
import React, { useState } from "react";

import { fetchInvoice } from "@/types/api-response/transaction.response";

import InvoiceModal from "./invoice-modal";

type StatusImages = {
  [channel: string]: {
    [status: string]: string;
  };
};

type ListProps = {
  rcptlist: fetchInvoice[];
  type: "payable" | "receivable";
};

const InvoiceList = ({ rcptlist, type }: ListProps) => {
  const [selectedInvoice, setSelectedInvoice] = useState<fetchInvoice[] | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const showInvoice = (
    invoice: fetchInvoice[],
    status: string,
    type: string
  ) => {
    if (invoice && status && type) {
      setSelectedInvoice(invoice);
      setSelectedStatus(status);
      setSelectedType(type);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedInvoice(null);
    setSelectedStatus(null);
    setSelectedType(null);
  };

  return (
    <div className="space-y-3 py-4">
      {rcptlist.map((item) => {
        const {
          invoiceDetails: { business_name: businessName },
          invoiceDt,
          currencySymbol,
          baseAmount,
          taxAmount,
          tipAmount,
          fyndrCash,
          status,
          invoiceDetails,
          channel,
          buyerFname,
          buyerLname,
          isVoucher,
          isDisputed,
          isOfferGifted,
        } = item;
        let rowTitle, body;
        if (type === "payable") {
          rowTitle = businessName;
          if ("cmpn_title" in invoiceDetails) {
            body = invoiceDetails.cmpn_title;
          } else if ("title" in invoiceDetails) {
            body = invoiceDetails.title;
          } else {
            body = "Campaign Promotion";
          }
        } else if (type === "receivable") {
          rowTitle = `${buyerFname} ${buyerLname}`;
          if (channel === "offers" && "cmpn_title" in invoiceDetails) {
            body = invoiceDetails.cmpn_title;
          } else if ("title" in invoiceDetails) {
            body = invoiceDetails.title;
          }
        }
        const totalAmount = baseAmount + taxAmount + tipAmount - fyndrCash;
        const formattedDate = new Date(invoiceDt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        const statusImages: StatusImages = {
          offers: {
            pending: "/icons/offer_yellow.svg",
            "in-process": "/icons/offer_yellow.svg",
            refunded: "/icons/offerIcon.svg",
            paid: "/icons/offerIcon.svg",
            failed: "/icons/offer_red.svg",
            canceled: "/icons/offer_red.svg",
             cancelled: "/icons/offer_red.svg"
          },
          offer_appointment: {
            pending: "/icons/offer_appointmentYellow.svg",
            "in-process": "/icons/offer_appointmentYellow.svg",
            refunded: "/icons/offer_appointmentGreen.svg",
            paid: "/icons/offer_appointmentGreen.svg",
            failed: "/icons/offer_appointmentRed.svg",
            canceled: "/icons/offer_appointmentRed.svg",
            cancelled: "/icons/offer_appointmentRed.svg",
          },
          cmpn_promo: {
            pending: "/icons/promo_yellow.svg",
            "in-process": "/icons/promo_yellow.svg",
            refunded: "/icons/promo_green.svg",
            paid: "/icons/promo_green.svg",
            failed: "/icons/promo_red.svg",
            canceled: "/icons/promo_red.svg",
            cancelled: "/icons/promo_red.svg",
          },
          catalog: {
            pending: "/icons/Store_yellow.svg",
            "in-process": "/icons/Store_yellow.svg",
            refunded: "/icons/storeIcon.svg",
            paid: "/icons/storeIcon.svg",
            failed: "/icons/Store_red.svg",
            canceled: "/icons/Store_red.svg",
            cancelled: "/icons/Store_red.svg",
          },
          catalog_appointment: {
            pending: "/icons/store_appointmentYellow.svg",
            "in-process": "/icons/store_appointmentYellow.svg",
            refunded: "/icons/store_appointmentGreen.svg",
            paid: "/icons/store_appointmentGreen.svg",
            failed: "/icons/store_appointmentRed.svg",
            canceled: "/icons/store_appointmentRed.svg",
            cancelled: "/icons/store_appointmentRed.svg",
          },
          events: {
            pending: "/icons/event_yellow.svg",
            "in-process": "/icons/event_yellow.svg",
            refunded: "/icons/event_green.svg",
            paid: "/icons/event_green.svg",
            failed: "/icons/event_red.svg",
            canceled: "/icons/event_red.svg",
             cancelled: "/icons/event_red.svg",
          },
          custom: {
            pending: "/icons/offer_yellow.svg",
            "in-process": "/icons/offer_yellow.svg",
            refunded: "/icons/offerIcon.svg",
            paid: "/icons/offerIcon.svg",
            failed: "/icons/offer_red.svg",
            canceled: "/icons/offer_red.svg",
            cancelled: "/icons/offer_red.svg",
          },
        };
        const getImageForStatus = (channel: string, status: string): string => {
          return statusImages[channel] && statusImages[channel][status];
        };
        const statusIcon = getImageForStatus(channel, status);
        return (
          <div
            key={item.objid}
            onClick={() => {
              showInvoice([item], status, type);
            }}
            className="cursor-pointer rounded-lg border border-gray-200 p-4 shadow transition hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex w-72 min-w-12 items-center justify-between gap-2">
                <div className="flex gap-2">
                  <Image src={statusIcon} alt="offer" height={48} width={48} />
                  <div className="flex flex-col justify-center ">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {rowTitle}
                    </p>
                    <p className="truncate text-xs text-gray-500">{body}</p>
                  </div>
                </div>
                <div>
                  {isVoucher && (
                    <Image
                      src="/icons/invoice/voucherIcon2.png"
                      alt="voucher"
                      height={200}
                      width={200}
                      className="size-[45]"
                    />
                  )}
                </div>
              </div>
              <div className="w-40 shrink-0 whitespace-nowrap text-center text-sm text-gray-800">
                {formattedDate}
              </div>
              <div className="w-24 shrink-0 whitespace-nowrap text-right">
                <p className="text-sm font-medium text-gray-800">
                  {currencySymbol}
                  {totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="flex w-8 flex-col ">
                {isOfferGifted && (
                  <Image
                    src="/icons/invoice/giftIcon.png"
                    alt="gifted"
                    height={24}
                    width={24}
                  />
                )}
                {isDisputed && (
                  <Image
                    src="/icons/invoice/disputeIcon.png"
                    alt="disputed"
                    height={24}
                    width={24}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
      <InvoiceModal
        visible={modalVisible}
        invoice={selectedInvoice}
        status={selectedStatus}
        type={selectedType}
        onClose={closeModal}
      />
    </div>
  );
};

export default InvoiceList;
