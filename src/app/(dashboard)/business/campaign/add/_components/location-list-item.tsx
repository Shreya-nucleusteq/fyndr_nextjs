import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { LocationData } from "@/types/location";

type LocationCardProps = {
  item: LocationData;
  index: number;
  checked?: boolean;
  onChange?: (checked: boolean, item: LocationData) => void;
};

const LocationListItem: React.FC<LocationCardProps> = ({
  item,
  index,
  checked = false,
  onChange,
}) => {
  return (
    <div
      className="flex items-center gap-3 rounded-lg border border-gray-300 p-4"
      key={index}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={(state) => {
          const isChecked = state === true;
          onChange?.(isChecked, item);
        }}
      />
      <span className="font-roboto text-sm font-normal text-black">
        {item.locName}
      </span>
    </div>
  );
};

export default LocationListItem;
