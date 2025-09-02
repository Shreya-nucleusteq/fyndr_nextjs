import { RaiseDisputePayload } from "../dispute-response";
import { ActionResponse } from "../global";
import { DisputeReasonResponse } from "./dispute.response";
import { RaiseDisputeResponse } from "./dispute.types";

export type GetDisputeReasonsProps = () => Promise<
  ActionResponse<DisputeReasonResponse>
>;

export type UpdateDisputeStatusProps = (
  invoiceId: number,
  payload: RaiseDisputePayload
) => Promise<ActionResponse<RaiseDisputeResponse>>;
