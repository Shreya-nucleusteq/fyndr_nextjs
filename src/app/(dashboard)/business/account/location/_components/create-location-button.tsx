"use client"
import { useRouter } from "next/navigation";
import React from "react";

import Button from "@/components/global/buttons";
import ROUTES from "@/constants/routes";



const CreateLocationButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.BUSINESS_ACCOUNT_LOCATION_CREATE);
  };
  return (
    <div>
      <Button variant="primary" onClick={handleClick}>
        Create Location
      </Button>
    </div>
  );
};

export default CreateLocationButton;
