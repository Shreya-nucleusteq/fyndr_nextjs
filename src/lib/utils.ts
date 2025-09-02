import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

import { POSTAL_PATTERNS } from "@/constants/form";
import {
  Address,
  Biz,
  fetchInvoice,
  InvoiceOfferDetail,
  Item,
  Offer,
} from "@/types/api-response/transaction.response";
import { CampaignLocation } from "@/types/campaign/campaign.types";
import { BusinessDirectory } from "@/types/store/store.types";

// !deprecated
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// !deprecated
export const truncateString = (string: string, charCount: number = 60) => {
  return string.slice(0, charCount) + "...";
};

// !deprecated
export const parseAddress = (
  addr: CampaignLocation | Biz | BusinessDirectory
) => {
  return addr
    ? `${addr?.addressLine1 !== null ? addr?.addressLine1 : ""}${
        addr?.addressLine2 !== null &&
        addr?.addressLine2 !== undefined &&
        addr?.addressLine2 !== ""
          ? ", " + addr?.addressLine2
          : ""
      }${addr?.city !== null ? ", " + addr?.city + ", " : ""} ${addr?.state} ${
        addr?.postalCode
      }`
    : "";
};

// !deprecated
export const getRemaining = (total: number, sold: number) => {
  return total - sold;
};

export const validatePostalAddress = async (value: string, country: string) => {
  const pattern = new RegExp("^" + POSTAL_PATTERNS[country] + "$");

  if (pattern.test(value)) return true;
  else return false;
};

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// !deprecated
export const parseAddressInvoice = (addr: Address) => {
  return addr
    ? `${addr?.addressLine1 !== null ? addr?.addressLine1 : ""}${
        addr?.addressLine2 !== null &&
        addr?.addressLine2 !== undefined &&
        addr?.addressLine2 !== ""
          ? ", " + addr?.addressLine2
          : ""
      }${addr?.city !== null ? ", " + addr?.city + ", " : ""} ${addr?.state} ${
        addr?.postalCode
      }`
    : "";
};

export type ChannelOffer =
  | "offers"
  | "offer_appointment"
  | "events"
  | "custom"
  | "catalog"
  | "catalog_appointment"
  | "cmpn_promo"
  | "promo";

export const getChannelName = (channel: ChannelOffer | string): string => {
  switch (channel) {
    case "offers":
    case "offer_appointment":
      return "Offer";
    case "events":
      return "Event";
    case "custom":
      return "Custom";
    case "catalog":
    case "catalog_appointment":
      return "Catalog";
    case "cmpn_promo":
    case "promo":
      return "Campaign";
    default:
      return "Unknown";
  }
};

export type Status = "unused" | "redeemed" | "partially-redeemed";

export const getStatusColor = (status: Status): string => {
  switch (status) {
    case "unused":
      return "#32871E";
    case "redeemed":
      return "#FFC700";
    case "partially-redeemed":
      return "#257CDB";
    default:
      return "Unknown";
  }
};

export const statusList = [
  { value: "redeemed", display: "Fully Redeemed" },
  { value: "partially-redeemed", display: "Partially Redeemed" },
];

export const getDisplayStatus = (status: Status): string => {

  try {
    if (status === "unused") return "Unused";
    return statusList.find((row) => row.value === status)?.display || "";
  } catch {
    return "";
  }
};

export const getFormattedDtNew = (tm: string, timeZone: string): string => {
  return dayjs.tz(tm, timeZone).utc().format("MMMM DD, YYYY");
};

export const getchannelBought = (channel: ChannelOffer | string): string => {
  switch (channel) {
    case "offers":
    case "offer_appointment":
      return "Offers";
    case "events":
      return "Events";
    case "custom":
      return "Custom";
    case "catalog":
    case "catalog_appointment":
      return "Items";
    case "cmpn_promo":
    case "promo":
      return "Campaign";
    default:
      return "Unknown";
  }
};

export const sumQuantities = (
  items: (Item | Offer)[] | undefined | null
): number => {
  if (!items || !Array.isArray(items)) {
    return 0;
  }

  let sum = 0;

  items.forEach((item) => {
    sum += (item as Item).details?.qty ?? (item as InvoiceOfferDetail).qty ?? 0;
  });

  return sum;
};

export const getTotal = (rec: fetchInvoice): string => {
  return (
    Number(rec.baseAmount) +
    Number(!isNaN(Number(rec.taxAmount)) ? rec.taxAmount : 0) +
    (rec.tipAmount ? Number(rec.tipAmount) : 0) -
    Number(rec.discountAmount || 0)
  ).toFixed(2);
};

export const getTruncatedTitle = (title: string, limit = 50) => {
  if (!title) return "";
  return title.length > limit ? `${title.slice(0, limit)}...` : title;
};
