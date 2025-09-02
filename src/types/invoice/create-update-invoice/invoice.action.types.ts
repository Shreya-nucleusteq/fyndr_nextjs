import { ActionResponse } from "@/types/global";

import { CancelInvoiceParams, CreateInvoiceParams, GetInvoiceTaxParams, InvoiceCreationParams } from "./invoice.params";
import {
  CreateInvoiceResponse,
  GetInvoiceTaxResponse,
  InvoiceCreationResponse,
} from "./invoice.response";

export type GetCreateInvoiceDetails = (
  payload: CreateInvoiceParams
) => Promise<ActionResponse<CreateInvoiceResponse>>;

export type GetInvoiceTaxDetails = (
  payload: GetInvoiceTaxParams
) => Promise<ActionResponse<GetInvoiceTaxResponse>>;


export type CreateInvoiceUser = ({
    payload,
}: InvoiceCreationParams | CancelInvoiceParams) => Promise<ActionResponse<InvoiceCreationResponse>>;