"use server";

import { revalidatePath } from "next/cache";

import ROUTES from "@/constants/routes";
import { API_BASE_URL, API_GATEWAY_URL } from "@/environment";
import { _delete, _get, _post, _put } from "@/lib/handlers/fetch";
import {
  AddLocationParams,
  BusinessLogoParams,
  ContactUsParams,
  GetBackgroundImageProps,
  GetBusinessTypesProps,
  GetFindUsOptionsProps,
  QrLogoUploadParams,
} from "@/types/api-params/others.params";
import {
  BackgroundImageResponse,
  ContactUsResponse,
} from "@/types/api-response/others.response";

type DeleteLocationPayload = {
  objid: number;
  bizid: number;
};
export const onGetBackgroundImage: GetBackgroundImageProps = async (params) => {
  const endpoint = `${API_BASE_URL}/identity/background-image?lat=${params.lat}&lng=${params.lng}`;

  return _get<BackgroundImageResponse>(endpoint, {
    cache: "force-cache",
    timeout: 10000,
  });
};

export const onContactUs: ContactUsParams = async (payload) => {
  const endpoint = `${API_GATEWAY_URL}/contact-us/mail`;
  return _post<ContactUsResponse>(endpoint, payload);
};

export const onBusinessLogoUpload: BusinessLogoParams = async (payload) => {
  const endpoint = `${API_GATEWAY_URL}/upload-logo`;
  revalidatePath(ROUTES.BUSINESS_ACCOUNT_LOGO);
  return _put(endpoint, payload, {
    requireAuth: true,
  });
};
export const onQrLogoUpload: QrLogoUploadParams = async (payload) => {
  const endpoint = `${API_GATEWAY_URL}/upload-logo`;
  revalidatePath(ROUTES.BUSINESS_ACCOUNT_QR);
  return _put(endpoint, payload, {
    requireAuth: true,
  });
};

export const onAddLocation: AddLocationParams = async (payload) => {
  const endpoint = `${API_BASE_URL}/identity/location`;
  return _post(endpoint, payload, {
    requireAuth: true,
  });
};

export const onUpdateLocationn: AddLocationParams = async (payload) => {
  const endpoint = `${API_BASE_URL}/identity/location`;
  return _put(endpoint, payload, {
    requireAuth: true,
  });
};

export const onDeleteLocation = async (payload: DeleteLocationPayload) => {
  const endpoint = `${API_BASE_URL}/identity/location`;
  return _delete(endpoint, payload, {
    requireAuth: true,
  });
};
export const onGetFindUsOptions: GetFindUsOptionsProps = async () => {
  const endpoint = `${API_BASE_URL}/identity/find_us`;
  return _get(endpoint, {
    cache: "force-cache",
  });
};

export const onGetBusinessTypes: GetBusinessTypesProps = async () => {
  const endpoint = `${API_BASE_URL}/identity/businessTypes`;
  return _get(endpoint, {
    cache: "force-cache",
  });
};
