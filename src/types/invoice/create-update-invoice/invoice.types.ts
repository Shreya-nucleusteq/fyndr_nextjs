import { Biz } from "@/types/api-response/transaction.response";

export type CreateInvoice = {
  firstName: string;
  lastName: string;
  buyerQrID: number;
  email: string;
  countryCode: string;
  phoneNumber: string;
};

export type GetInvoiceTax = {
  country: string;
  taxRate: number;
  postalCode: string;
};

export type CreateInvoiceDetails = {
  business_name: string;
  business_country: string;
  title: string;
  img?: string;
  img_url?: string;
  invoiceFileExtn?: string;
  invoice_nbr: string;
  server_name: string | null;
  cust_message: string | null;
  item_or_service: string;
  tip_allowed: boolean;
};

export type InvoiceCreation = {
  objid: number;
  biz: Biz;
  invoiceDt: string;
  invoiceDetails: CreateInvoiceDetails;
  taxAmount: number;
  baseAmount: number;
  promoCode: string | null;
  discountAmount: number;
  currency: string;
  currencySymbol: string;
  merchantId: string;
  status: string;
  channel: string;
  buyerCountry: string;
  buyerState: string;
  buyerPostalCode: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerFname: string;
  buyerLname: string;
  includesTax: boolean;
  tipAmount: number;
  fulfiled: string | null;
  deliveryStatus: string;
  fyndrCash: number;
  buyerAddressLine1: string;
  buyerAddressLine2: string;
  buyerCity: string;
  isBuyerGooglePermissionGranted: boolean;
  isOfferGifted: boolean;
  dueDate: string | null;
  buyerQRId?: number;
};
