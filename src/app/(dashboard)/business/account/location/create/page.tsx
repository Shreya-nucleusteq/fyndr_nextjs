import React from "react";

import CreateLocationForm from "@/components/forms/business/location-form/location-form";
import ContainerWrapper from "@/components/global/container-wrapper";

const CreateLocation = () => {
  return (
    <ContainerWrapper title="Create Location">
      <CreateLocationForm />
    </ContainerWrapper>
  );
};

export default CreateLocation;
