import React from "react";

import { onUpdateLocation } from "@/actions/location.action";
import CreateLocationForm from "@/components/forms/business/location-form/location-form";
import ContainerWrapper from "@/components/global/container-wrapper";

interface EditLocationProps {
  params: Promise<{
    id: string;
  }>;
}

const EditLocation = async ({ params }: EditLocationProps) => {
  const { id } = await params;
  const response = await onUpdateLocation({ objid: Number(id) });
  if (!response.success) {
    return (
      <ContainerWrapper title="Edit Location">
        <div className="text-red-500">
          {response.error?.message || "Failed to load location"}
        </div>
      </ContainerWrapper>
    );
  }
  return (
    <ContainerWrapper title="Edit Location">
      <CreateLocationForm objid={id} edit={true} locationInfo={response.data} />
    </ContainerWrapper>
  );
};

export default EditLocation;
