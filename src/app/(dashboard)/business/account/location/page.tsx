"use client";

import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { onDeleteLocation } from "@/actions/others.action";
import ContainerWrapper from "@/components/global/container-wrapper";
import ROUTES from "@/constants/routes";
import { useUser } from "@/hooks/auth";
import { Location } from "@/types/auth/auth.types";

import CreateLocationButton from "./_components/create-location-button";

const LocationManager = () => {
  const { isLoading, user, error } = useUser();
  const router = useRouter();

  const [locations, setLocations] = useState<Location[]>(user?.locations ?? []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEdit = async (objid: number) => {
    router.push(ROUTES.BUSINESS_ACCOUNT_LOCATION_EDIT(objid));
  };

  const handleDelete = async (location: Location) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      const bizid = user?.bizid ?? 0;
      const data = await onDeleteLocation({
        objid: location?.objid,
        bizid,
      });

      console.log("data", data);
      setLocations(locations?.filter((loc) => loc?.objid !== location?.objid));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-blue-500">
              Manage Locations
            </h1>
            <button className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white">
              Create Location
            </button>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
            <div className="text-center text-gray-500">
              Loading locations...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-blue-500">
              Manage Locations
            </h1>
            <button className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white">
              Create Location
            </button>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
            <div className="text-center text-red-500">{error.message}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ContainerWrapper
        title="Manage Locations"
        headerOption={<CreateLocationButton />}
      >
        {/* Locations List */}
        <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
          {locations?.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No locations found. Create your first location to get started.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {locations?.map((location: Location) => (
                <div
                  key={location?.objid}
                  className="flex items-center justify-between p-6 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {location?.locName}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Edit
                      className="cursor-pointer text-primary"
                      onClick={() => handleEdit(location.objid)}
                      size={20}
                    />

                    <button
                      onClick={() => handleDelete(location)}
                      className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                      title="Delete location"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ContainerWrapper>
    </>
  );
};

export default LocationManager;
