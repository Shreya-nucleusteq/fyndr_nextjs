
import { ActionResponse } from "../global";
import { UpdateOrderPaymentStatusParams, UpdateOrdersDeliveryStatusParams } from "./orders.params";
import { UpdateOrderPaymentResponse, UpdateOrdersDeliveryResponse } from "./orders.response";


export type UpdateOrderDeilveryStatus = ({
    params,
    payload
}: UpdateOrdersDeliveryStatusParams) => Promise<ActionResponse<UpdateOrdersDeliveryResponse>>;


export type UpdateOrderPaymentStatus = ({
    params,
    payload
}: UpdateOrderPaymentStatusParams) => Promise<ActionResponse<UpdateOrderPaymentResponse>>;