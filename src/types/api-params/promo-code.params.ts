import {
  VerifyPromocodeResponse,
  ActivePromoResponse,
  ExpiredList,
  RedeemPromocodeResponse,
} from "../api-response/promocode.response";
import { ActionResponse } from "../global";
import { PromocodeTypesProps } from "../wallet/wallet.types";

export type GetActivePromoProps = (params: {
  search: string;
}) => Promise<ActionResponse<ActivePromoResponse>>;
export type GetExpiredPromos = (params: {
  search: string;
  pgStart: number;
  pgSize: number;
}) => Promise<ActionResponse<ExpiredList>>;

export type VerifyPromocode = (params: {
  isBusiness: boolean;
  code: string;
  countryId: number;
  codeType: "REDEEM_PROMOCODE";
}) => Promise<ActionResponse<VerifyPromocodeResponse>>;

export type RedeemPromocode = (
  params: {
    indvId: number;
  },
  payload: {
    countryId: number;
    promoCode: string;
    promoCodeType: PromocodeTypesProps;
    targetUser: "BUSINESS" | "INDIVIDUAL";
  }
) => Promise<ActionResponse<RedeemPromocodeResponse>>;
