import { ActionResponse } from "../global";
import {
  GetBusinessDirectoryParams,
  GetLocationOfferReviewsParams,
  GetLocationOffersParams,
  GetStoreCategoriesParams,
  GetStoreDetailsParams,
  GetStoreLocationsParams,
  GetStoreParams,
  LikeBusinessParams,
} from "./store.params";
import {
  GetBusinessDirectoryResponse,
  GetLocationOfferReviewsResponse,
  GetLocationOffersResponse,
  GetStoreCategoriesResponse,
  GetStoreDetailsResponse,
  GetStoreLocationsResponse,
  GetStoreResponse,
  LikeBusinessResponse,
} from "./store.response";

// ----------------------------------------------------------------------

export type GetStore = ({
  params,
}: GetStoreParams) => Promise<ActionResponse<GetStoreResponse>>;

export type GetStoreDetails = ({
  params,
}: GetStoreDetailsParams) => Promise<ActionResponse<GetStoreDetailsResponse>>;

export type GetStoreCategories = ({
  params,
}: GetStoreCategoriesParams) => Promise<
  ActionResponse<GetStoreCategoriesResponse>
>;

export type GetStoreLocations = ({
  params,
}: GetStoreLocationsParams) => Promise<
  ActionResponse<GetStoreLocationsResponse>
>;

// ----------------------------------------------------------------------

export type GetBusinessDirectory = ({
  params,
  payload,
}: GetBusinessDirectoryParams) => Promise<
  ActionResponse<GetBusinessDirectoryResponse>
>;

export type GetLocationOffers = ({
  params,
}: GetLocationOffersParams) => Promise<
  ActionResponse<GetLocationOffersResponse>
>;

export type GetLocationOfferReviews = ({
  payload,
}: GetLocationOfferReviewsParams) => Promise<
  ActionResponse<GetLocationOfferReviewsResponse>
>;

export type LikeBusiness = ({
  payload,
}: LikeBusinessParams) => Promise<ActionResponse<LikeBusinessResponse>>;
