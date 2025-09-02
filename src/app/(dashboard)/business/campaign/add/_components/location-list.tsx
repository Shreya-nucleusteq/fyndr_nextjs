"use client";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LocationData } from "@/types/location";
import { useCampaignStore } from "@/zustand/stores/campaign.store";
import { useUserStore } from "@/zustand/stores/user.store";

import LocationListItem from "./location-list-item";
import List from "../../../_components/list";

const LocationList = () => {
  const { userData } = useUserStore();
  const locations = userData?.locations;
  const { campaignPayload, updateCampaignPayload } = useCampaignStore();

  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>(
    campaignPayload.cmpnLocs || []
  );

  const [allLocations, setAllLocation] = useState<LocationData[]>([]);
  useEffect(() => {
    if (Array.isArray(locations)) {
      const tempData = locations.map((item, index) => ({
        ...item,
        key: index,
      }));
      setAllLocation(tempData);
    }
  }, [locations]);

  const handleCheckboxChange = (checked: boolean, item: LocationData) => {
    let updated = [];

    if (checked) {
      updated = [...selectedLocationIds, item.objid];
    } else {
      updated = selectedLocationIds.filter((id) => id !== item.objid);
    }

    setSelectedLocationIds(updated);
    updateCampaignPayload("cmpnLocs", updated);
    updateCampaignPayload("dc", "");
  };

  const handleSelectAll = (checked: boolean) => {
    const allIds = allLocations.map((loc) => loc.objid);
    const updated = checked ? allIds : [];

    setSelectedLocationIds(updated);
    updateCampaignPayload("cmpnLocs", updated);
    updateCampaignPayload("dc", "");
  };

  console.log("alll22", campaignPayload);

  return (
    <>
      <DefaultCard className="no-scrollbar m-4 h-[533px] w-full max-w-[900px] flex-col overflow-scroll border border-black-20 bg-white p-[23px]">
        <div className="flex flex-row justify-between">
          <div className="flex items-center">
            <Checkbox
              checked={selectedLocationIds.length === allLocations.length}
              onCheckedChange={handleSelectAll}
            />
            <Label className="ml-2 text-black">All Locations</Label>
          </div>
          <div>
            <Button className="bg-primary font-roboto text-sm text-white hover:bg-primary">
              Add Locations <Plus className="text-white" />
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <List
            dataSource={allLocations || locations}
            renderItem={(item, index) => {
              return (
                <LocationListItem
                  item={item}
                  index={index}
                  checked={selectedLocationIds.includes(item.objid)}
                  onChange={handleCheckboxChange}
                />
              );
            }}
          />
        </div>
      </DefaultCard>
    </>
  );
};

export default LocationList;
