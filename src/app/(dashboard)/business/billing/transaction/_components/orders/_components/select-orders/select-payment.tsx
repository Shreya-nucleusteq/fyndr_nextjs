"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";

import Select from "@/components/global/input/select/index";

const SelectPayment = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const statusOptions = [
    { label: "Paid", value: "paid" },
    { label: "Pending", value: "pending" },
    { label: "Canceled", value: "canceled" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const STATUS_KEY = "paymentstatus";

  const handleChange = (newValues: string[]) => {
    setSelectedValues(newValues);

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (newValues.length > 0) {
      newSearchParams.set(STATUS_KEY, newValues.join(","));
    } else {
      newSearchParams.delete(STATUS_KEY);
    }

    router.push(`${pathname}?${newSearchParams.toString()}`,{
      scroll :false,
    });
  };

  return (
    <Select
      multi={true}
      placeholder="Payment Status"
      options={statusOptions}
      value={selectedValues}
      onValueChange={handleChange}
      className="mr-6 w-60"
      
    />
  );
};

export default SelectPayment;
