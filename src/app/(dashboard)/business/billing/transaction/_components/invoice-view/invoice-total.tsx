import React from "react";

import {
  capitalize,
  ChannelOffer,
  getchannelBought,
  sumQuantities,
} from "@/lib/utils";
import {
  CatalogResponse,
  Item,
  Offer,
  OfferResponse,
  PromoResponse,
} from "@/types/api-response/transaction.response";
import { CreateInvoiceDetails } from "@/types/invoice/create-update-invoice/invoice.types";

type InvoiceTotalProps = {
  channel: ChannelOffer | string;
  invoiceDetails:
    | OfferResponse
    | CatalogResponse
    | PromoResponse
    | CreateInvoiceDetails;
  currencySymbol: string;
  baseAmount: number;
  taxAmount: number;
  fyndrCash: number;
  tipAmount: number;
  totalAmount: number;
  isBusiness: boolean;
  type: string | null;
  itemsDetails: Offer[] | Item[];
  endDate?: Date | string;
};

const Invoicetotal: React.FC<InvoiceTotalProps> = ({
  channel,
  invoiceDetails,
  currencySymbol,
  baseAmount,
  taxAmount,
  fyndrCash,
  tipAmount,
  totalAmount,
  itemsDetails,
  endDate,
}) => {
  return (
    <>
      {!endDate && sumQuantities(itemsDetails) !== 0 && (
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-semibold leading-5 text-black-70">
            Total {capitalize(getchannelBought(channel))} Bought:
          </span>

          <span className="text-sm font-normal leading-5 text-black-80">
            {sumQuantities(
              invoiceDetails && "offers" in invoiceDetails
                ? invoiceDetails.offers
                : ((invoiceDetails as CatalogResponse)?.items ?? [])
            )}
          </span>
        </div>
      )}

      <div className="mb-2 flex justify-between">
        <span className="text-sm font-semibold leading-5 text-black-70">
          Total Amount:
        </span>

        <span className="text-sm font-normal leading-5 text-black-80">
          {currencySymbol}
          {baseAmount.toFixed(2)}
        </span>
      </div>

      <div className="mb-2 flex justify-between">
        <span className="text-sm font-semibold leading-5 text-black-70">
          Total Tax:
        </span>

        <span className="text-sm font-normal leading-5 text-black-80">
          {!isNaN(taxAmount) && taxAmount
            ? `${currencySymbol}${taxAmount?.toFixed(2)}`
            : "Included in Amount"}
        </span>
      </div>

      {fyndrCash > 0 && (
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-semibold leading-5 text-black-70">
            Fyndr Cash:
          </span>

          <span className="text-sm font-normal leading-5 text-black-80">
            {fyndrCash ? `-${currencySymbol}${fyndrCash}` : "N/A"}
          </span>
        </div>
      )}

      {tipAmount > 0 && (
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-semibold leading-5 text-black-70">
            Tip:
          </span>

          <span className="text-sm font-normal leading-5 text-black-80">
            {currencySymbol}
            {tipAmount}
          </span>
        </div>
      )}

      <div className="flex justify-between">
        <span className="text-sm font-semibold leading-5 text-black-70">
          Total Payable Amount:
        </span>

        <span className="text-sm font-normal leading-5 text-black-80">
          {currencySymbol}
          {(totalAmount - fyndrCash).toFixed(2)}
        </span>
      </div>

      {/* {channel === "catalog" && isBusiness && type === "receivable" && (
        <div className="mt-1 flex justify-between">
          <span className="body-2">Delivery:</span>
          <div>
            <RadioGroup
              //   value={fulfiled}
              //   onValueChange={fulfilInvoice}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="fulfilled" />
                <Label
                  htmlFor="fulfilled"
                  className="cursor-pointer font-medium"
                >
                  Fulfilled
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="partial" />
                <Label htmlFor="partial" className="cursor-pointer font-medium">
                  Partially Fulfilled
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Invoicetotal;
