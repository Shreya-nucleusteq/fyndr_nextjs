export type RaiseDisputePayload = {
  description: string;
  disputeReasonId: number;
  raisedDisputeImages: {
    index?: number;
    img?: null| string;
    thumbnail?: null | string;
  }[];
};

