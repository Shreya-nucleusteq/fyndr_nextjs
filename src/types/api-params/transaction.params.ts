
import {
  FetchInvoiceResponse,
  invoiceDetailsResponse,
  InvoiceSummary,
} from "../api-response/transaction.response";
import { ActionResponse } from "../global";
import { TransactionOrdersResponse } from "../orders/orders.response";

export type GetInvoiceSummaryProps = (payload: {
  bizid: number;
  days: string;
}) => Promise<ActionResponse<InvoiceSummary>>;

export type GetReceivableProps = (payload: {
  criteria: "merchant";
  text: string | null;
  bizid: number;
  days: number;
  channel?: string;
  status?: string;
}) => Promise<ActionResponse<FetchInvoiceResponse>>;

export type GetPayableProps = (payload: {
  criteria: "individual";
  buyerId: number;
  days: number;
  text?: string;
}) => Promise<ActionResponse<FetchInvoiceResponse>>;

export type GetInvoiceDetailProps = (payload: {
  bizid?: number;
  invoiceId: number;
  buyerId?: number;
}) => Promise<ActionResponse<invoiceDetailsResponse>>;

export type GetOrdersDetailsProps = (
  params: {
    page: number;
    pageSize: number;
    businessId?: number;
  },

  payload: {
    paymentStatus: string[];
    deliveryStatus: string[];
    invoicedTo: string;
    orderStartDt: string;
    orderEndDt: string;
  }
) => Promise<ActionResponse<TransactionOrdersResponse>>;
