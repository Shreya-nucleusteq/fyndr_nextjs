import React, { useState } from "react";

import { onUpdateOrdersDeliveryStatus } from "@/actions/orders.action";
import toast from "@/components/global/toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type SelectDeliveryTableProps = {
  data: string;
  invoiceId: number;
};

const SelectDeliveryTable = ({ data, invoiceId }: SelectDeliveryTableProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(data);

  const getDeliveryColor = (deliveryStat: string) => {
    switch (deliveryStat) {
      case "READY_TO_PICK":
      case "FULFILLED":
        return "bg-green-100 text-green-800";
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800";
      case "NA":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-white text-black";
    }
  };
  const deliveryType = [
    { value: "PROCESSING", label: "Processing" },
    { value: "READY_TO_PICK", label: "Ready To Pick" },
    { value: "FULFILLED", label: "Fulfilled" },
  ];

  const handleChange = async (value: string) => {
  
    const payload = {
      deliveryStatus: value,
    };

    const params = {
      invoiceId,
    };
    const { success, data} = await onUpdateOrdersDeliveryStatus({
      params,
      payload,
    });
  
    if (!success || !data?.success || !data) {
      toast.error({
        message: data?.message || "Error",
      });
      return;
    }
    setSelectedValue(value);
    toast.success({
      message: data.message || "Status updated successfully",
    });
  };
  return (
    <>
      
      <Select
        value={selectedValue === "NA" ? "" : selectedValue}
        onValueChange={(value) => {
          handleChange(value);
        }}
      >
        <SelectTrigger
          className={`w-40 rounded-full border border-transparent ring-0 focus:outline-none focus:ring-0 ${getDeliveryColor(
            selectedValue
          )}`}
        >
          <SelectValue placeholder={data} />
        </SelectTrigger>
        <SelectContent>
          {deliveryType.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectDeliveryTable;
