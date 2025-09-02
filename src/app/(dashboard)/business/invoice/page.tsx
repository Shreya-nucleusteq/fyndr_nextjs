import React from "react";

import GoBackButton from "@/components/global/buttons/go-back-button";
import ContainerWrapper from "@/components/global/container-wrapper";

import InvoiceForm from "../../../../components/forms/business/invoice-form/invoice-form";

const CreateInvoice = () => {
  return (
    <ContainerWrapper title="Create Invoice" headerOption={<GoBackButton />}>
      <InvoiceForm edit={false} />
    </ContainerWrapper>
  );
};

export default CreateInvoice;
