import Link from "next/link";
import React from "react";

import { onGetCampaigns } from "@/actions/campaign.action";
import { auth } from "@/auth";
import Button from "@/components/global/buttons";
import { DEFAULT_LOCATION } from "@/constants";
import ROUTES from "@/constants/routes";
import {
  getFeaturedCampaigns,
  getNearbyActivities,
  getNearbyBeautyFinds,
  getNearbyDiningExperiences,
  getNearbyEvents,
  getNearbyOffers,
} from "@/lib/utils/campaign";

import FeaturedCampaigns from "../featured-campaigns2";
import NearbyCampaigns from "../nearby-campaigns";

type Props = {
  location: {
    lat: string;
    lng: string;
  };
};

const CampaignsSection = async ({ location: { lat, lng } }: Props) => {
  const locationPayload = DEFAULT_LOCATION;

  const session = await auth();
  const user = session?.user;

  if (user && user.location) {
    locationPayload.lat = user?.location.lat;
    locationPayload.lng = user?.location.lng;
  }

  if (lat && lng) {
    locationPayload.lat = Number(lat);
    locationPayload.lng = Number(lng);
  }

  const { success, data } = await onGetCampaigns({
    params: {
      page: 0,
      pageSize: 500,
    },
    payload: {
      indvId: user?.id ? parseInt(user?.id) : null,
      distance: 50,
      location: locationPayload,
      categories: [],
      fetchById: "none",
      fetchByGoal: "INSTORE",
    },
  });

  if (!success || !data) return null;

  const featuredCampaigns = getFeaturedCampaigns(data.campaigns);
  const nearbyOffers = getNearbyOffers(data.campaigns);
  const nearbyEvents = getNearbyEvents(data.campaigns);

  const nearbyActivities = getNearbyActivities(data.campaigns);
  const nearbyDiningExperiences = getNearbyDiningExperiences(data.campaigns);
  const nearbyBeautyFinds = getNearbyBeautyFinds(data.campaigns);

  return (
    <>
      <FeaturedCampaigns campaigns={featuredCampaigns} />
      <NearbyCampaigns
        campaigns={nearbyActivities}
        title="Explore Exciting Activities Nearby"
      />

      <NearbyCampaigns
        campaigns={nearbyDiningExperiences}
        title="Discover Dining Experiences Near You"
      />

      <NearbyCampaigns
        campaigns={nearbyBeautyFinds}
        title="Nearby Beauty Finds"
      />

      <NearbyCampaigns campaigns={nearbyOffers} title="Offers Near You" />

      {nearbyOffers.length >= 32 && (
        <Link
          href={`${ROUTES.OFFERS_AND_EVENTS}?types=OFFERS`}
          className="flex w-full justify-center"
        >
          <Button variant="primary-outlined" stdHeight stdWidth>
            See all offers
          </Button>
        </Link>
      )}

      <NearbyCampaigns campaigns={nearbyEvents} title="Events Near You" />

      {nearbyEvents.length >= 32 && (
        <Link
          href={`${ROUTES.OFFERS_AND_EVENTS}?types=EVENTS`}
          className="flex w-full justify-center"
        >
          <Button variant="primary-outlined" stdHeight stdWidth>
            See all events
          </Button>
        </Link>
      )}
    </>
  );
};

export default CampaignsSection;
