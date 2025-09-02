"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/global/buttons";
import ROUTES from "@/constants/routes";


const InvoiceCreateButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.BUSINESS_ACCOUNT_CREATE_INVOICE);
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Create Invoice
    </Button>
  );
};

export default InvoiceCreateButton;
