import { ActionResponse } from "../global";
import {
  GetOfferSummaryParams,
  UpdateOfferRedemptionParams,
} from "./offer-summary.params";
import { OfferSummaryResponse } from "./offer-summary.response";
import { OfferPurchaseProps } from "./offer-summary.types";

export type GetOfferSummary = ({
  params,
}: GetOfferSummaryParams) => Promise<ActionResponse<OfferSummaryResponse>>;

export type UpdateOfferRedeemption = ({
  payload,
}: UpdateOfferRedemptionParams) => Promise<ActionResponse<OfferPurchaseProps>>;
