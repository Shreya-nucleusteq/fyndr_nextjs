"use client";

import Link from "next/link";
import React from "react";

import { Modal } from "@/components/global/modal";
import { parseAddress } from "@/lib/utils/address";
import { GetStoreLocationsResponse } from "@/types/store/store.response";
import { StoreLocation } from "@/types/store/store.types";

type Props = {
  locations: GetStoreLocationsResponse["locations"];
};

type StoreLocationCardProps = {
  location: StoreLocation;
};

const StoreLocationCard = ({ location }: StoreLocationCardProps) => {
  const parsedAddress = parseAddress(location).formatted;
  return <div className="body-1 flex text-primary">{parsedAddress}</div>;
};

const StoreLocationsModal = ({ locations }: Props) => {
  return (
    <div>
      <Modal
        title={<div>Select Location</div>}
        closeOnOutsideClick={false}
        showCloseButton={false}
        open={true}
        contentClassName="no-focus"
      >
        <div className="flex flex-col gap-4">
          {locations.map((location) => (
            <Link key={location.objid} href={`?location=${location.objid}`}>
              <StoreLocationCard location={location} />
            </Link>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default StoreLocationsModal;
