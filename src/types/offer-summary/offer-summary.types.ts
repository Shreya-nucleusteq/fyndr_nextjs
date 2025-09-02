import { CurrencySymbol } from "../global";

export type Remarks = {
   
    currentValue: number;
    lat: null | number;
    lng: null | number;
    message: string;
    redeemedValue: number;
    status: string;
    time: string;
    updatedBy: string;
  };


export type OfferPurchaseProps = {
  buyerName: string;
  buyerPhone: string;
  currencySymbol: CurrencySymbol;
  currentValue: number;
  fyndrCash: number;
  invoiceDt: string; 
  invoiceId: number;
  objid: number;
  offerId: number;
  offerPrice: number;
  offerTitle: string;
  redeemptionStatus: "unused" | "redeemed" | "partially-redeemed" | string; // adjust if fixed set known
  redemptionDt: string | null;
  redemptionTime: string | null;
  retailPrice: number;
  validTill: string; 
  voucherCode: string;
  appointment: {
    bookingDate: null | string | unknown;
    slotStartTime: null | string | unknown;
    slotEndTime: null | string | unknown;
    bookingDay: null | string | unknown;
  };
  bookingDate: null;
  bookingDay: null;
  isVoucher?: boolean; 
  customVoucherCode?: string;
  slotEndTime: null;
  slotStartTime: null;
  remarks: Remarks[];
};


// type OfferSummaryRedemption = {
//   buyerId: number;
//   currentValue: string;
//   customRemarks: string | null;
//   invoiceId: number;
//   lat: number | null;
//   lng: number | null;
//   merchantId: string;
//   redeemedValue: string;
//   status: "partially-redeemed" | string;
//   updatedBy: string;
//   voucherId: number;
// };

export type OfferSummaryRedemption = {
  buyerId: number;
  currentValue:  string | number;
  customRemarks?: string | null;
  invoiceId: number
  lat: number | null;
  lng: number | null;
  merchantId?: string;
  redeemedValue: string | number;
  status:    string;
  updatedBy: string;
  voucherId: number ;
};