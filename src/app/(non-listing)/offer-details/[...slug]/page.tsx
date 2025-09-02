import { notFound } from "next/navigation";
import React from "react";

import { onGetCampaignByQr } from "@/actions/campaign.action";
import { auth } from "@/auth";
import DefaultCard from "@/components/global/cards/default-card";
import BusinessRatingsAndReviews from "@/components/global/rating-and-reviews/business/business-ratings-and-reviews";
import RatingAndReviewModal from "@/components/global/rating-and-reviews/business/rating-and-review-modal";
import { DEFAULT_LOCATION } from "@/constants";
import { RouteParams } from "@/types/global";

import CampaignInfoSection from "./_components/sections/campaign-info-section";
import NearestLocations from "./_components/sections/campaign-info-section/nearest-locations";
import DescriptionSection from "./_components/sections/description-section";
import OfferDetailsMap from "./_components/sections/offer-details-map";
import OffersSection from "./_components/sections/offers-section";
import TermsAndConditionsSection from "./_components/sections/terms-and-conditions-section";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const Offer = async ({ params, searchParams }: RouteParams & Props) => {
  const { slug } = await params;
  const {
    lat,
    lng,
    sortBy = "RATING",
    orderBy = "DESC",
    page = 1,
  } = await searchParams;

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

  if (slug.length !== 2) {
    return notFound();
  }

  const [, qrCode] = slug;

  const { success, data: campaign } = await onGetCampaignByQr({
    params: {
      qrCode,
    },
    payload: locationPayload,
  });

  if (!success || !campaign) return null;

  const {
    images = [],
    cmpnOffers,
    description,
    finePrint: terms,
    cmpnLocs,
  } = campaign;

  const campaignImages =
    images?.map((item) => {
      return item?.img_url;
    }) || [];

  return (
    <>
      <main className="my-10 flex flex-col items-center justify-center p-4">
        <div className="flex w-full max-w-[1550px] flex-col gap-4 sm:flex-row xl:w-11/12">
          {/* Left section */}
          <CampaignInfoSection campaign={campaign} />

          {/* Right section */}
          <div className="flex w-full flex-col gap-4">
            <OffersSection
              campaignId={campaign.objid}
              campaignName={campaign.title}
              bizName={campaign.biz.bizName}
              offers={cmpnOffers}
              campaignImages={campaignImages}
              campaignLocations={cmpnLocs}
              merchantId={campaign.biz.merchantId}
              campaignType={campaign.cmpnType}
            />
            <TermsAndConditionsSection terms={terms} />
            <DescriptionSection desc={description} />
            <OfferDetailsMap campaignLocations={campaign.cmpnLocs} />

            <BusinessRatingsAndReviews
              business={campaign.biz}
              orderBy={orderBy as "ASC" | "DESC"}
              sortBy={sortBy as "RATING" | "CREATED_DT"}
              page={page !== undefined ? Number(page) : page}
              qrCode={campaign.qrCode}
            />

            <DefaultCard className="flex size-full p-4 sm:hidden">
              <NearestLocations
                locations={cmpnLocs}
                className={`flex sm:hidden`}
              />
            </DefaultCard>
          </div>
        </div>
      </main>
      <RatingAndReviewModal>
        <BusinessRatingsAndReviews
          business={campaign.biz}
          qrCode={campaign.qrCode}
          orderBy={orderBy as "ASC" | "DESC"}
          sortBy={sortBy as "RATING" | "CREATED_DT"}
          page={page !== undefined ? Number(page) : page}
          showSeeAllComments={false}
          className="p-0"
          enableCommentPagination={true}
          showHeading={false}
        />
      </RatingAndReviewModal>
    </>
  );
};

export default Offer;
