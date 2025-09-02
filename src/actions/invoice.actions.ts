"use server";

import { revalidatePath } from "next/cache";

import ROUTES from "@/constants/routes";
import { API_BASE_URL } from "@/environment";
import { _get, _post, _put } from "@/lib/handlers/fetch";
import {
  GetDisputeReasonsProps,
  UpdateDisputeStatusProps,
} from "@/types/dispute/dispute.action.types";
import { DisputeReasonResponse } from "@/types/dispute/dispute.response";
import { RaiseDisputeResponse } from "@/types/dispute/dispute.types";
import { ActionResponse } from "@/types/global";
import {
  CreateInvoiceUser,
  GetCreateInvoiceDetails,
  GetInvoiceTaxDetails,
} from "@/types/invoice/create-update-invoice/invoice.action.types";
import { InvoiceCreationParams } from "@/types/invoice/create-update-invoice/invoice.params";
import {
  CreateInvoiceResponse,
  GetInvoiceTaxResponse,
  InvoiceCreationResponse,
} from "@/types/invoice/create-update-invoice/invoice.response";

export const onGetDisputeReasons: GetDisputeReasonsProps = async () => {
  const endpoint = `${API_BASE_URL}/invoice/fetchDisputeReasons`;

  return _get<DisputeReasonResponse>(endpoint, {
    requireAuth: true,
    cache: "force-cache",
  });
};

export const onRaiseDispute: UpdateDisputeStatusProps = async (
  invoiceId,
  payload
) => {
  const endpoint = `${API_BASE_URL}/invoice/raiseDispute/${invoiceId}`;

  revalidatePath(ROUTES.BUSINESS_DASHBOARD);

  return _post<RaiseDisputeResponse>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onGetInvoiceUserDetails: GetCreateInvoiceDetails = async (
  payload
) => {
  const endpoint = `${API_BASE_URL}/identity/fetch/user-details`;

  return _post<CreateInvoiceResponse>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onGetTaxDetails: GetInvoiceTaxDetails = async (payload) => {
  const endpoint = `${API_BASE_URL}/invoice/getTax`;
  return _post<GetInvoiceTaxResponse>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onCreateInvoice: CreateInvoiceUser = async (payload) => {
  const pay = payload.payload;
  const endpoint = `${API_BASE_URL}/invoice/create`;
  return _post<InvoiceCreationResponse>(endpoint, pay, {
    requireAuth: true,
  });
};

export const onUpdateInvoice: CreateInvoiceUser = async (payload) => {
  const pay = payload.payload;
  const endpoint = `${API_BASE_URL}/invoice/update`;
  return _put<InvoiceCreationResponse>(endpoint, pay, {
    requireAuth: true,
  });
};

export async function handleInvoiceApiCall(
  payload: InvoiceCreationParams["payload"],
  edit?: boolean
): Promise<ActionResponse<InvoiceCreationResponse>> {
  const action = edit ? onUpdateInvoice : onCreateInvoice;
  return await action({ payload });
}
