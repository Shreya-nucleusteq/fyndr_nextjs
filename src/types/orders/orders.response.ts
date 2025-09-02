export type UpdateOrdersDeliveryResponse = {
  success: boolean;
  deliveryStatus: string;
  message: string;
};

export type UpdateOrderPaymentResponse = {
  message: string;
};

export type TransactionOrdersResponse = {
  count: number;
  last: boolean;
  orderDetails: OrdersResponse[];
};
