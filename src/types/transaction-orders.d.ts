type OrdersResponse = {
  invoicedTo: string;
  paymentStatus: string; 
  orderTime: string;
  deliveryType: string | null;
  orderDeliveryTime: string;
  location: string;
  invoiceId: number;
  buyerId: number;
  deliveryStatus: string; 
  disputeId: number | null;
  disputeStatus: string | null;
};
