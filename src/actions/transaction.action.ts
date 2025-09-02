"use server";

import { API_BASE_URL } from "@/environment";
import { _post } from "@/lib/handlers/fetch";
import {
  GetInvoiceDetailProps,
  GetInvoiceSummaryProps,
  GetOrdersDetailsProps,
  GetPayableProps,
  GetReceivableProps,
} from "@/types/api-params/transaction.params";
import {
  FetchInvoiceResponse,
  invoiceDetailsResponse,
  InvoiceSummary,
} from "@/types/api-response/transaction.response";

export const getInvoiceSummary: GetInvoiceSummaryProps = async (payload) => {
  const endpoint = `${API_BASE_URL}/invoice/v2/summary`;

  return _post<InvoiceSummary>(endpoint, payload, {
    requireAuth: true,
  });
};

export const fetchReceivables: GetReceivableProps = async (payload) => {
  const endpoint = `${API_BASE_URL}/invoice/v2/fetch?pgStart=0&pgSize=500`;

  return _post<FetchInvoiceResponse>(endpoint, payload, {
    requireAuth: true,
  });
};

export const fetchPayables: GetPayableProps = async (payload) => {
  const endpoint = `${API_BASE_URL}/invoice/v2/fetch?pgStart=0&pgSize=500`;

  return _post<FetchInvoiceResponse>(endpoint, payload, {
    requireAuth: true,
  });
};


export const onGetInvoiceDetails :  GetInvoiceDetailProps =  async (payload) => {

   
    const endpoint = `${API_BASE_URL}/invoice/v2/details`;

    return _post<invoiceDetailsResponse>(endpoint, payload, {
      requireAuth : true,
      
    })
   
}

export const onGetOrdersDetails : GetOrdersDetailsProps = async(params , payload) => {

  const {page,pageSize ,businessId} = params;
  
  const endpoint = `${API_BASE_URL}/order/details/${businessId}?pgStart=${page}&pgSize=${pageSize}`;

  return _post(endpoint, payload, {
    requireAuth: true,
   
  });

  
   
}