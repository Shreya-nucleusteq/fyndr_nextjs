import React, { useState } from "react";

import { onUpdateOrdersPaymentStatus } from "@/actions/orders.action";
import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectPaymentTableProps = {
  paymentStat: string;
  invoiceId?: number;
  disabled?: boolean;
};

const SelectPaymentTable = ({
  paymentStat,
  invoiceId,
  disabled,
}: SelectPaymentTableProps) => {
  const paymentStatus = [
    { value: "canceled", label: "Cancel" },
    { value: "paid", label: "Mark As Paid" },
  ];
  const getTextColor = (paymentStat: string) => {
    switch (paymentStat) {
      case "paid" :
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-white text-black";
    }
  };
  const [selectedValue, setSelectedValue] = useState<string>(paymentStat);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  //  const handleChange = async (value: string) => {
  //     const payload = {
  //       deliveryStatus: value,
  //     };

  //     const params = {
  //       invoiceId,
  //     };

  //     console.log(payload, "payload");
  //     console.log(params, "params");
  //     const { success, data, error } = await onUpdateOrdersPaymentStatus({
  //       params,
  //       payload,
  //     });

  //     if (!success || !data) {
  //       toast.error({
  //         message: error?.message || "Error",
  //       });
  //       return;
  //     }

  //     toast.success({
  //       message: data.message || "Status updated successfully",
  //     });
  //   };

  const UpdatePaymentStatus = async (
    value: string,
    invoiceId: number,
    paymentMode?: string
  ) => {
    const payload = {
      status: value,
      paymentMode,
    };

    const params = {
      invoiceId,
    };
    const { success, data} = await onUpdateOrdersPaymentStatus({
      params,
      payload,
    });

    if (!success || !data) {
      toast.error({
        message: data?.message || "Error",
      });
      return;
    }
    setSelectedValue(value);
    toast.success({
      message: data?.message || "Payment status updated successfully ",
    });
  };

  const handleChange = (value: string, invoiceId: number) => {
    if (value === "canceled") {
      UpdatePaymentStatus(value, invoiceId);
    } else {
      setPaymentModal(true);
    }
  };
  return (
    <>
      {!disabled && invoiceId ? (
        <Select
          value={selectedValue === "Pending" ? "" : selectedValue}
          onValueChange={(value) => {
            handleChange(value, invoiceId);
          }}
        >
          <SelectTrigger
            className={`w-36 rounded-full border border-transparent ring-0 focus:outline-none focus:ring-0  ${getTextColor(selectedValue.toLowerCase())}`}
          >
            <SelectValue placeholder={paymentStat} />
          </SelectTrigger>
          <SelectContent>
            {paymentStatus.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          value={paymentStat}
          readOnly
          className={`!h-10 w-36 cursor-not-allowed rounded-full   ${getTextColor(selectedValue.toLowerCase())}`}
        />
      )}

      <Modal
        open={paymentModal}
        onOpenChange={setPaymentModal}
        title={"Payment Method"}
        bodyClassName="mb-6"
        headerClassName="bg-primary rounded-[10px] flex items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex">InvoiceId: {invoiceId}</div>
          {invoiceId && (
            <div className="flex w-4/5 justify-between">
              <Button
                variant="primary"
                className="w-32"
                onClick={() => {
                  UpdatePaymentStatus("paid", invoiceId, "cash");
                }}
              >
                Cash
              </Button>
              <Button
                variant="primary"
                className="w-32"
                onClick={() => {
                  UpdatePaymentStatus("paid", invoiceId, "other POS");
                }}
              >
                Other POS
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SelectPaymentTable;
