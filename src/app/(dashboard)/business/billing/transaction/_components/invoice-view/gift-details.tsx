import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { GiftDetails } from "@/types/api-response/transaction.response";

type GifteeDetailsProps = {
  giftDetails: GiftDetails;
};

const GifteeDetails: React.FC<GifteeDetailsProps> = ({ giftDetails }) => {
  const [msgVisible, setMsgVisible] = useState(false);

  const getFullPhone = () => {
    return giftDetails.phoneNumber && giftDetails.phoneNumber !== ""
      ? `${giftDetails.countryCode}${giftDetails.phoneNumber}`
      : "N/A";
  };

  return (
    <div className="my-4 w-full rounded-lg border border-secondary-20 p-4">
      {!msgVisible ? (
        <>
          <div className="mb-2 text-lg font-semibold text-black-80">
            Receiver`s Details
          </div>

          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium text-black-70">
              Receiver`s Name:
            </span>
            <span className="text-right text-sm font-semibold text-black-80">
              {giftDetails.name}
            </span>
          </div>

          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium text-black-70">
              Receiver`s Email:
            </span>
            <span className="text-right text-sm font-semibold text-black-80">
              {giftDetails.email}
            </span>
          </div>

          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium text-black-70">
              Receiver`s Number:
            </span>
            <span className="text-right text-sm font-semibold text-black-80">
              {getFullPhone()}
            </span>
          </div>

          {giftDetails.message && (
            <div className="mt-4 flex justify-center">
              <Button
                className="h-[46px] rounded-10 border border-primary bg-primary-0.5 text-primary hover:bg-primary-0.5"
                onClick={() => setMsgVisible(true)}
              >
                View Message
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          <Button
            variant="link"
            className="mb-2 p-0 text-sm text-primary"
            onClick={() => setMsgVisible(false)}
          >
            <ArrowLeft className="size-4" />
            Message
          </Button>
          <div className="text-sm font-medium text-black-80">
            {giftDetails.message}
          </div>
        </>
      )}
    </div>
  );
};

export default GifteeDetails;
