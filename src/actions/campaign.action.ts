"use server";

import { revalidatePath } from "next/cache";

import ROUTES from "@/constants/routes";
import { API_BASE_URL } from "@/environment";
import { _get, _post, _put } from "@/lib/handlers/fetch";
import { CreateCampaign } from "@/types/api-params/campaign.params";
import {
  GetBusinessCampaigns,
  GetCampaignByQr,
  GetCampaigns,
  GetLikedCampaigns,
  LikeCampaign,
  VerifyOffer,
} from "@/types/campaign/campaign.action.types";

export const onGetCampaignByQr: GetCampaignByQr = async ({
  params,
  payload,
}) => {
  const { qrCode, orderBy = "ASC", sortedBy = "PRICE" } = params;

  const endpoint = `${API_BASE_URL}/campaign/v2/public/fetchByQR/${qrCode}?orderBy=${orderBy}&sortedBy=${sortedBy}`;

  return _post(endpoint, payload, {
    // cache: "force-cache",
  });
};

export const onGetCampaigns: GetCampaigns = async ({ params, payload }) => {
  const baseUrl = `${API_BASE_URL}/campaign/v2/public/search`;
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.append("pgStart", params.page.toString());
  }
  if (params.pageSize) {
    searchParams.append("pgSize", params.pageSize.toString());
  }
  if (params.search) {
    searchParams.append("text", params.search);
  }
  if (params.orderBy) {
    searchParams.append("orderBy", params.orderBy);
  }

  const endpoint = searchParams.toString()
    ? `${baseUrl}?${searchParams.toString()}`
    : baseUrl;

  return _post(endpoint, payload, {
    timeout: 20000,
  });
};

// ? -----------------------------------------------------------------------------------------------------------------------
// ? Why we have hardcoaded this pgStart=0&pgSize=100&status=ALL

export const onGetBusinessCampaigns: GetBusinessCampaigns = async ({
  params,
}) => {
  const endpoint = `${API_BASE_URL}/campaign/fetch/business/${params.bizid}?pgStart=0&pgSize=100&status=ALL`;

  return _get(endpoint, {
    requireAuth: true,
    cache: "force-cache",
  });
};
// ? -----------------------------------------------------------------------------------------------------------------------

export const onLikeCampaign: LikeCampaign = async ({ payload }) => {
  const endpoint = `${API_BASE_URL}/campaign/indvcmpn`;

  if (payload.objid) {
    return _put(endpoint, payload, {
      requireAuth: true,
    });
  }

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};

export const onGetLikedCampaigns: GetLikedCampaigns = async ({
  params,
  payload,
}) => {
  const { search, orderBy, page, pageSize } = params;
  let endpoint = `${API_BASE_URL}/campaign/liked/${payload.userId}?pgStart=${page}&pgSize=${pageSize}`;

  if (search) {
    endpoint = `${endpoint}&text=${search}`;
  }

  if (orderBy) {
    endpoint = `${endpoint}&orderBy=${orderBy}`;
  }

  return _post(endpoint, payload, {
    requireAuth: true,
  });
};

export const onSaveCampaign: CreateCampaign = async (payload) => {
  const endpoint = `${API_BASE_URL}/campaign/cmpn`;
  revalidatePath(ROUTES.BUSINESS_CAMPAIGNS);
  if (payload.objid) {
    return _put(endpoint, payload, {
      requireAuth: true,
    });
  }
  return _post(endpoint, payload, {
    requireAuth: true,
  });
};

export const onVerifyOffer: VerifyOffer = async ({ payload }) => {
  const endpoint = `${API_BASE_URL}/invoice/verifyOffers`;
  return _post(endpoint, payload, {
    requireAuth: true,
  });
};
