"use server";

import { API_BASE_URL } from "@/environment";
import { _get, _post, _put } from "@/lib/handlers/fetch";
import {
  GetBusinessDirectory,
  GetLocationOfferReviews,
  GetLocationOffers,
  GetStore,
  GetStoreCategories,
  GetStoreDetails,
  GetStoreLocations,
  LikeBusiness,
} from "@/types/store/store.action.types";

// Store actions ---------------------------------------------------

export const onGetStore: GetStore = async ({ params }) => {
  const { locationId } = params;
  const endpoint = `${API_BASE_URL}/catalogue/categories/fetch_by_location/${locationId}`;
  return _get(endpoint);
};

export const onGetStoreCategories: GetStoreCategories = async ({ params }) => {
  const { bizId, catalogueId } = params;
  const endpoint = `${API_BASE_URL}/catalogue/categories/fetch/${bizId}/${catalogueId}`;
  return _get(endpoint);
};

export const onGetStoreLocations: GetStoreLocations = async ({ params }) => {
  const { storeUrl } = params;
  const endpoint = `${API_BASE_URL}/catalogue/fetch_location/${storeUrl}`;
  return _get(endpoint);
};

export const onGetStoreDetails: GetStoreDetails = async ({ params }) => {
  const { bizId, categoryId, catalogueId } = params;
  const endpoint = `${API_BASE_URL}/catalogue/catalogue/fetch/${bizId}/${categoryId}/${catalogueId}`;
  return _get(endpoint);
};

// Offer listing page actions -----------------------------------------------------------------------------------------------------------------------

export const onGetBusinessDirectory: GetBusinessDirectory = async ({
  params,
  payload,
}) => {
  const { page, pageSize, search } = params;
  let endpoint = `${API_BASE_URL}/catalogue/v2/search?pgStart=${page}&pgSize=${pageSize}`;

  if (search) {
    endpoint = `${endpoint}&text=${search.replace("&", "%26")}`;
  }

  return _post(endpoint, payload, {
    cache: "force-cache",
    next: {
      revalidate: 100000,
    },
  });
};

export const onGetLocationOffers: GetLocationOffers = async ({ params }) => {
  const { locationIds } = params;
  const list = locationIds.join(",");
  const endpoint = `${API_BASE_URL}/campaign/public/offers/${list}`;

  return _get(endpoint, {
    cache: "force-cache",
    next: {
      revalidate: 100000,
    },
  });
};

export const onGetLocationOfferReviews: GetLocationOfferReviews = async ({
  payload,
}) => {
  const endpoint = `${API_BASE_URL}/campaign/public/indvreviews`;

  return _post(endpoint, payload, {
    cache: "force-cache",
    next: {
      revalidate: 100000,
    },
  });
};

export const onLikeBusiness: LikeBusiness = async ({ payload }) => {
  const endpoint = `${API_BASE_URL}/identity/biz/review`;
  return _put(endpoint, payload, {
    requireAuth: true,
  });
};

// -----------------------------------------------------------------------------------------------------------------------
