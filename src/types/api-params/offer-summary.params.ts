import { OfferSummaryResponse } from "../api-response/offer-summary.response";
import { ActionResponse } from "../global";
import {
  OfferPurchaseProps,
  OfferSummaryRedemption,
} from "../offer-summary/offer-summary.types";

export type GetOfferSummaryParams = (params: {
  bizid: number | unknown;
  pgStart: number | string;
  pgSize: number | string;
  orderBy?: string;
  sortBy?: string;
  text?: string;
  redemptionStatusList?: string[];
}) => Promise<ActionResponse<OfferSummaryResponse>>;

export type UpdateOfferRedeemption = (
  payload: OfferSummaryRedemption
) => Promise<ActionResponse<OfferPurchaseProps>>;
