import { CreateInvoiceDetails } from "../invoice/create-update-invoice/invoice.types";
import { Remarks } from "../offer-summary/offer-summary.types";

export type InvoiceSummary = {
  totalAmountByInvoiceStatuses: {
    paid: number;
    pending: number;
  };
  totalAmountByInvoiceChannels: {
    offers: number;
    events: number;
    catalog: number;
  };
  currencySymbol: string;
  userRegistrationDt: string;
};

export type Appointment = {
  [date: string]: {
    bookingDay?: string;
    endTime?: string;
    locId?: number;
    startTime?: string;
    objId?: number;
  };
};

export type Biz = {
  bizid: number;
  bizName: string;
  website: string | null;
  mainLogo: string;
  addonUrl: string | null;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  bizType: string;
  lat: number;
  lng: number;
  showBiz: boolean;
  country_code: string;
  expo_code: string | null;
};

export type CatalogueAppointmentType =
  | "APPOINTMENT_PER_ITEM"
  | "APPOINTMENT_PER_CART";

export interface workingHoursAndSlots {
  workingHours: Record<string, string[]>;
  slotDurationInMin: number;
  slotCapacity: number;
  catalogueAppointmentType: CatalogueAppointmentType;
  isCampaignBookingEnabled: boolean;
}

export type Offer = {
  offer_id: number;
  offer_price: number;
  qty: number;
  retail_price: number;
  title: string;
  usage_limit: number;
  discount_type: "%" | "flat";
  discount_amount: number;
  validity_period: "CMPN" | "OFFER";
  qty_total: string;
  row_tax: string;
  row_total: string;
  unit_tax: string;
  appointment?: Appointment[];
};

export type OfferResponse = {
  business_name: string;
  business_country: string;
  cmpn_id: number;
  cmpn_end_dt: string;
  cmpn_title: string;
  fine_print: string;
  tax_rate: number;
  loc_name: string;
  locId: number;
  offers: Offer[];
};

export type PromoResponse = {
  title: string;
  cmpn_id: number;
  business_name: string;
  business_country: string;
  criteria: {
    locList: {
      [key: string]: {
        id: number;
        addressName: string;
        lat: number;
        lng: number;
        radius: number;
        total: number;
      };
    };
  };
  schedule_time: string;
  promo_channels: string;
  featured_start_date: string;
  featured_end_date: string | null;
  duration: number | null;
};

export type ParentLocation = {
  objid: number;
  qrid: number;
  bizid: number;
  locName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  lat: number;
  lng: number;
  createdDt: string | null;
  updatedDt: string | null;
  ctryCode: string;
  status: string;
  locType: string | null;
  parentLocation: ParentLocation | null;
  deliveryWithin: string | null;
  deliveryOptions: string;
  timeZone: string;
  workingHours: string;
  distance: string | null;
  catalogueId: string | null;
  biz: Biz;
  workingHoursAndSlots: workingHoursAndSlots;
};

export type Mitem = {
  objid: number;
  name: string;
  stdTax: boolean;
  taxPercent: number | null;
  img_url: string;
  appointment?: Appointment[];
};

export type addonDetails = {
  modName: string;
  price: number;
  objid: number;
};

export type Item = {
  catalogue_item_id: string;
  details: {
    key: string;
    objid: number;
    price: number;
    unitPrice: number;
    qty: number;
    total: number;
    unit: string;
    whole: unknown | null;
    addon: unknown[];
    mitem: Mitem;
    currencySymbol: string;
    currency: string;
    instruction: string | null;
    wholeDetails: { modName?: string } | null;
    addonDetails: addonDetails[];
    taxRate: number;
    tax: string;
  };
};

export type CatalogResponse = {
  business_name: string;
  business_country: string;
  locName: string;
  locId: number;
  parentLocation: ParentLocation;
  catalogueId: number;
  catalogueName: string;
  title: string;
  invoice_nbr: string;
  cust_message: string | null;
  server_name: string;
  items: Item[];
  appointment_per_cart: Appointment;
  deliveryTime: string;
};

export type CustomResponse = {
  business_name: string;
  business_country: string;
  title: string;
  invoice_nbr: string;
  server_name: string;
  cust_message: string;
  item_or_service: string;
  img_url: string | null;
};

export type fetchInvoice = {
  objid: number;
  invoiceDt: string;
  invoiceDetails:
    | OfferResponse
    | CatalogResponse
    | PromoResponse
    | CreateInvoiceDetails;
  taxAmount: number;
  baseAmount: number;
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
  bizid: number;
  fyndrCash: number;
  isOfferGifted: boolean;
  isDisputed: boolean;
  isVoucher: boolean;
  dueDate: string | null;
  fulfiled: string;
};

export type FetchInvoiceResponse = {
  count: number;
  invoices: fetchInvoice[];
  last: boolean;
};

export type InvoiceOfferDetail = {
  offer_id: number;
  offer_price: number;
  qty: number;
  retail_price: number;
  title: string;
  usage_limit: number;
  discount_type: string; // e.g., '%' or '$'
  discount_amount: number;
  validity_period: string;
  qty_total: string;
  row_tax: string;
  row_total: string;
  unit_tax: string;
  appointment?: Appointment[];
};

export type InvoiceDetails = {
  business_name: string;
  business_country: string;
  cmpn_id: number;
  cmpn_end_dt: string; // ISO date string
  cmpn_title: string;
  fine_print: string;
  tax_rate: number;
  loc_name: string;
  locId: number;
  offers: InvoiceOfferDetail[];
};

export type Payment = {
  cardBrand: string;
  cardLast4: string;
};

export type InvoiceOffer = {
  objid: number;
  invoiceId: number;
  voucherCode: string;
  redeemptionStatus: string;
  remarks: Remarks[];
  paymentId: number;
  offerId: number;
  offerTitle: string;
  cmpnTitle: string;
  buyerName: string;
  buyerEmail: string;
  offerPrice: number;
  tax: number;
  validTill: string; // ISO date string
  retailPrice: number;
  currentValue: number;
  fyndrCash: number;
  isVoucher: boolean;
  customVoucherCode: string | null;
  appointments?: Appointment[] | null;
  index: number;
  qty: number;
  currencySymbol: string;
};

export type EnrichedInvoiceOffer = InvoiceOffer & {
  appointment?: Appointment[];
  qty?: number;
  index?: number;
  currencySymbol?: string;
};

export type Address = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

export type GiftDetails = {
  name: string;
  email: string;
  phoneNumber: string | null;
  countryCode: string;
  message: string;
};

export type invoiceDetailsResponse = {
  invoiceDt: string;
  invoiceDetails: InvoiceDetails | CatalogResponse;
  taxAmount: number;
  baseAmount: number;
  discountAmount: number;
  currency: string;
  currencySymbol: string;
  buyerId: number;
  merchantId: string;
  status: string;
  channel: string;
  buyerEmail: string;
  buyerFname: string;
  buyerLname: string;
  includesTax: boolean | null;
  tipAmount: number;
  disputeId: number | null;
  payments: Payment;
  offers: InvoiceOffer[];
  biz: Biz;
  disputeStatus: string | null;
  fyndrCash: number;
  billingAddress: Address;
  gifteeDetails: GiftDetails;
  invoiceId: number;
  fyndrLogo: string | null;
  businessLocationAddress: Address;
  dueDate: string | null;
  campaignName: string | null;
};
