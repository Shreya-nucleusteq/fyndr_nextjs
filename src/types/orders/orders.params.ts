export type UpdateOrdersDeliveryStatusParams = {
  params: {
    invoiceId: number;
  };
  payload: {
    deliveryStatus: string;
  };
};

export type UpdateOrderPaymentStatusParams = {
  params: {
    invoiceId: number;
  };

  payload: {
    status: string;
    paymentMethod?: string;
  };
};
