import Link from "next/link";
import React from "react";

import Button from "@/components/global/buttons";
import ROUTES from "@/constants/routes";
import { Campaign } from "@/types/campaign/campaign.types";

import FeaturedFyndsCard from "./cards/featured-fynds-card";

type Props = {
  campaigns?: Campaign[];
};

const FeaturedCampaigns = async ({ campaigns: featuredCampaigns }: Props) => {
  if (!featuredCampaigns || featuredCampaigns.length < 1) return null;

  return (
    <section className="mt-10 flex flex-col rounded-10 bg-primary-10 p-4">
      <h2 className="heading-6-medium text-black-80">Featured Fynds</h2>
      {featuredCampaigns?.length > 0 && (
        <div className="my-6 grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] place-items-center gap-4">
          {featuredCampaigns.map((campaign) => (
            <Link
              key={campaign.objid}
              href={ROUTES.OFFER_DETAILS(campaign.biz.bizName, campaign.qrCode)}
            >
              <FeaturedFyndsCard campaign={campaign} />
            </Link>
          ))}
        </div>
      )}
      {featuredCampaigns.length >= 12 && (
        <Button variant={"primary-outlined"} stdHeight stdWidth asChild>
          <Link href={ROUTES.OFFERS_AND_EVENTS}>See all</Link>
        </Button>
      )}
    </section>
  );
};

export default FeaturedCampaigns;
