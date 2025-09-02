"use server";

import { API_BASE_URL } from "@/environment";
import { _put } from "@/lib/handlers/fetch";
import {
  UpdateOrderDeilveryStatus,
  UpdateOrderPaymentStatus,
} from "@/types/orders/orders.action.types";
import {
  UpdateOrderPaymentResponse,
  UpdateOrdersDeliveryResponse,
} from "@/types/orders/orders.response";

export const onUpdateOrdersDeliveryStatus: UpdateOrderDeilveryStatus = async ({
  params,
  payload,
}) => {
  const { invoiceId } = params;
  const endpoint = `${API_BASE_URL}/order/deliveryStatus/${invoiceId}`;

  return _put<UpdateOrdersDeliveryResponse>(endpoint, payload, {
    requireAuth: true,
  });
};

export const onUpdateOrdersPaymentStatus: UpdateOrderPaymentStatus = async ({
  params,
  payload,
}) => {
  const { invoiceId } = params;
  const endpoint = `${API_BASE_URL}/order/paymentStatus/${invoiceId}`;

  return _put<UpdateOrderPaymentResponse>(endpoint, payload, {
    requireAuth: true,
  });
};
