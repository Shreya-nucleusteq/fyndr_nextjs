import { RaiseDisputePayload } from "../dispute-response";

export type UpdateDisputeStatusPropsParams = {
  invoiceId: number;
  payload: RaiseDisputePayload;
};
