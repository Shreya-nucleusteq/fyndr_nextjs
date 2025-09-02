"use client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import DefaultCard from "@/components/global/cards/default-card";
import DatePicker from "@/components/global/date-picker";
import CustomEditor from "@/components/global/editor/custom-editor";
import Input from "@/components/global/input";
import InputWrapper from "@/components/global/input/input-wrapper";
import { useCampaignStore } from "@/zustand/stores/campaign.store";

const DescriptionForm = () => {
  const { campaignPayload, updateCampaignPayload } = useCampaignStore();
  console.log("pp", campaignPayload);

  const [startDate, setStartDate] = useState(() => dayjs());
  const [endDate, setEndDate] = useState(() => dayjs().add(2, "year"));
  useEffect(() => {
    const today = dayjs();
    const twoYearsLater = dayjs().add(2, "year");
    setStartDate(today);
    setEndDate(twoYearsLater);
    updateCampaignPayload("startDt", today.toISOString());
    updateCampaignPayload("endDt", twoYearsLater.toISOString());
    updateCampaignPayload("cmpnUrl", null);
  }, [updateCampaignPayload]);

  return (
    <>
      <DefaultCard className="m-4 w-full max-w-[772px] flex-col border border-black-20  bg-white p-[23px]">
        <div className="flex flex-col gap-6">
          <div className="flex">
            <Input
              label="Title"
              showRequired
              value={campaignPayload.title || ""}
              onChange={(e) => updateCampaignPayload("title", e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-6">
            <InputWrapper label="Start Date" showRequired>
              {
                <DatePicker
                  value={
                    campaignPayload.startDt
                      ? dayjs(campaignPayload.startDt).toDate()
                      : startDate.toDate()
                  }
                  onChange={(date) =>
                    updateCampaignPayload("startDt", date?.toISOString())
                  }
                  placeholder="Select Start Date"
                  className="w-full border-none bg-white shadow-none hover:bg-white"
                />
              }
            </InputWrapper>
            <InputWrapper label="End Date" showRequired>
              {
                <DatePicker
                  value={
                    campaignPayload.endDt
                      ? dayjs(campaignPayload.endDt).toDate()
                      : endDate.toDate()
                  }
                  onChange={(date) =>
                    updateCampaignPayload("endDt", date?.toISOString())
                  }
                  placeholder="Select End Date"
                  className="w-full border-none bg-white shadow-none hover:bg-white"
                />
              }
            </InputWrapper>
          </div>
          <div className="flex">
            <CustomEditor
              value={campaignPayload.descr || ""}
              onChange={(val) => updateCampaignPayload("descr", val)}
            />
          </div>
        </div>
      </DefaultCard>
    </>
  );
};

export default DescriptionForm;
