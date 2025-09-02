"use client";
import React, { useEffect } from "react";

import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import { capitalize } from "@/lib/utils";
import { useCampaignStore } from "@/zustand/stores/campaign.store";
import { useUserStore } from "@/zustand/stores/user.store";

import CouponBtnIcon from "../../../../../../components/icons/coupon-btn-Icon";
import EventBtnIcon from "../../../../../../components/icons/event-btn-Icon";
import OfferBtnIcon from "../../../../../../components/icons/offer-btn-Icon";

const TypeComponent = () => {
  const cmpnTypes = ["offers", "events", "coupons"];
  const { campaignPayload, updateCampaignPayload } = useCampaignStore();
  const { userData } = useUserStore();

  useEffect(() => {
    updateCampaignPayload("bizid", userData?.bizid);
    updateCampaignPayload("country", userData?.address?.country);
    updateCampaignPayload("lastUpdatedBy", userData?.indvid);
  }, [updateCampaignPayload, userData]);

  return (
    <DefaultCard className="flex-center m-4 min-h-[134px] w-full max-w-[497px] flex-col  border border-black-20 bg-white p-2">
      <div className="flex flex-row gap-6">
        {cmpnTypes.map((item, index) => (
          <Button
            key={index}
            stdHeight
            className="w-[131px] border border-[#d3d6e1] bg-white p-[10px] text-gray-400 hover:bg-white"
            onClick={() => updateCampaignPayload("cmpnType", item)}
          >
            {capitalize(item) === "Offers" ? (
              <OfferBtnIcon
                color={
                  campaignPayload.cmpnType === item ? "#257CDB" : undefined
                }
              />
            ) : capitalize(item) === "Events" ? (
              <EventBtnIcon
                color={
                  campaignPayload.cmpnType === item ? "#257CDB" : undefined
                }
              />
            ) : capitalize(item) === "Coupons" ? (
              <CouponBtnIcon
                color={
                  campaignPayload.cmpnType === item ? "#257CDB" : undefined
                }
              />
            ) : (
              ""
            )}{" "}
            {capitalize(item)}
          </Button>
        ))}
      </div>
    </DefaultCard>
  );
};

export default TypeComponent;
