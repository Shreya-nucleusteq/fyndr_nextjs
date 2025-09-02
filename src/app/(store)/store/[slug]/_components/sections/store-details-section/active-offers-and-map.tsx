import { StoreIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { onGetLocationOffers } from "@/actions/store.action";
import Button from "@/components/global/buttons";
import ROUTES from "@/constants/routes";
import { LocationOffer } from "@/types/store/store.types";

type Props = {
  locationId: number | null;
  locQrId: number;
};

const ActiveOffersAndMap = async ({ locationId, locQrId }: Props) => {
  if (!locationId) return null;

  const { success, data } = await onGetLocationOffers({
    params: {
      locationIds: [locationId],
    },
  });

  if (!success || !data) return null;

  const getActiveOfferDetails = (): LocationOffer | null => {
    if (data.length < 1) return null;
    return data[0];
  };

  const offerDetails = getActiveOfferDetails();

  return (
    <div className="">
      {offerDetails && offerDetails.count > 1 && (
        <Button variant="primary-dark" stdHeight className="w-full" asChild>
          <Link href={`${ROUTES.OFFERS_AND_EVENTS}/?locQrId=${locQrId}`}>
            <StoreIcon size={20} /> {offerDetails.count} Active Offers
          </Link>
        </Button>
      )}
    </div>
  );
};

export default ActiveOffersAndMap;
