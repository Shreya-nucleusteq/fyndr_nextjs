import {
  CatalogResponse,
  OfferResponse,
  PromoResponse,
} from "@/types/api-response/transaction.response";

import { CreateInvoiceDetails } from "./invoice.types";

export type CreateInvoiceParams = {

    countryCode?: string;
    phoneNumber?: string;
    email?: string;

};

export type GetInvoiceTaxParams = {

    country: string | undefined;
    postalCode: string | undefined;
  
};

export type InvoiceCreationParams = {
  payload: {
    objid: number;
    bizid: number | null;
    merchantId: unknown;
    baseAmount: string;
    taxAmount: number | null;
    currency: string;
    currencySymbol: string;
    buyerEmail: string;
    invoiceDetails: CreateInvoiceDetails;
    includesTax: boolean;
    channel: string;
    dueDate: string | Date | null;
    buyerQRId?: number;
  };
};

export type CancelInvoiceParams = {
  payload: {
    objid: number;
    invoiceDt: string;
    invoiceDetails:
      | OfferResponse
      | CatalogResponse
      | PromoResponse
      | CreateInvoiceDetails;
    taxAmount: number;
    baseAmount: number;
    totalAmount:number | null;
    tipAmount: number;
    discountAmount: number;
    currency: string;
    currencySymbol: string;
    buyerId: number;
    merchantId: string;
    status: string;
    channel: string;
    buyerCountry: string;
    buyerState: string;
    buyerPostalCode: string;
    buyerEmail: string;
    buyerPhone: string;
    buyerFname: string;
    buyerLname: string;
    includesTax: boolean | null;
    bizid: number ;
    fyndrCash: number;
    isOfferGifted: boolean;
    isDisputed: boolean;
    isVoucher: boolean;
    dueDate: string | null;
  };
};
