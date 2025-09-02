import { OfferSummaryRedemption } from "./offer-summary.types";

export type GetOfferSummaryParams = {
  params: {
    bizid: number | unknown;
    pgStart: number | string;
    pgSize: number | string;
    orderBy?: string;
    sortBy?: string;
    text?: string;
    redemptionStatusList?: string[];
  };
};

export type UpdateOfferRedemptionParams = {
  payload: OfferSummaryRedemption;
};
