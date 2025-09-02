import Image from "next/image";
import React, { Suspense } from "react";

import DefaultCard from "@/components/global/cards/default-card";
import BusinessRatings from "@/components/global/rating-and-reviews/business/business-rating";
import BusinessRatingSkeleton from "@/components/global/rating-and-reviews/business/business-ratings-skeleton";
import { Separator } from "@/components/ui/separator";
import { Campaign } from "@/types/campaign/campaign.types";

import CampaignCarousel from "./campaign-carousel";
import NearestLocations from "./nearest-locations";
import SocialIcons from "./social-icons";

type Props = {
  campaign: Campaign;
};

const CampaignInfoSection = ({ campaign }: Props) => {
  const {
    images = [],
    isFeatured,
    biz: { bizName },
    cmpnLocs,
  } = campaign;

  const campaignImages =
    images?.map((item) => {
      return item?.img_url;
    }) || [];

  return (
    <DefaultCard className="flex size-full flex-col p-0 sm:max-w-72 lg:min-w-96 lg:max-w-96">
      <CampaignCarousel images={campaignImages} />
      <div className="flex flex-col gap-4 p-4">
        <h1 className="heading-5 text-secondary">{bizName}</h1>
        <Suspense fallback={<BusinessRatingSkeleton compact />}>
          <BusinessRatings bizId={campaign.biz.bizid} compact />
        </Suspense>
        {isFeatured && (
          <Image
            src={"/images/featured.png"}
            alt="featured"
            width={120}
            height={50}
            className="m-0 w-28"
          />
        )}
        <SocialIcons campaign={campaign} />
      </div>
      <Separator className="hidden sm:block" />
      <NearestLocations locations={cmpnLocs} className={`hidden sm:flex`} />
    </DefaultCard>
  );
};

export default CampaignInfoSection;
