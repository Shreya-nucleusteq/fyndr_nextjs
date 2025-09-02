import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { onGetInvoiceUserDetails } from "@/actions/invoice.actions";
import Input from "@/components/global/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { CreateInvoiceParams } from "@/types/invoice/create-update-invoice/invoice.params";

import { InvoiceFormData } from "../schema";

type ContactFildsProps = {
  form: UseFormReturn<InvoiceFormData>;
  type: "email" | "mobile";
   setBuyerQRId: (value: number | null | undefined) => void;
};

const ContactFields = ({ form, type ,setBuyerQRId}: ContactFildsProps) => {
  const [ctryCode, setCtryCode] = useState("+1");

  const selectBefore = (
    <select
      value={ctryCode}
      onChange={(e) => setCtryCode(e.target.value)}
      style={{ border: "none", background: "transparent" }}
    >
      <option value="+91">+91</option>
      <option value="+1">+1</option>
    </select>
  );

  const handleVerify = async (payload: CreateInvoiceParams) => {
    const pay = payload;

    const res = await onGetInvoiceUserDetails(pay);
    form.setValue("mobile", res.data?.phoneNumber);
    form.setValue("email", res.data?.email);
    form.setValue("firstName", res.data?.firstName);
    form.setValue("lastName", res.data?.lastName);
    setBuyerQRId(res.data?.buyerQrID);
  };
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Email
            </FormLabel>

            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  className=""
                  {...field}
                  type="text"
                  placeholder="Email Address"
                  disabled={type !== "email"}
                  onBlur={(e) => {
                    field.onBlur();
                    if (
                      type === "email" &&
                      e.target.value &&
                      !form.formState.errors.email
                    ) {
                      handleVerify({
                       
                          email: e.target.value,
                      
                      });
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="mobile"
        render={({ field }) => (
          <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Mobile
            </FormLabel>

            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <div className="flex">
                  {type === "mobile" && (
                    <div className="flex items-center rounded-l-md border border-r-0 bg-gray-50 px-3">
                      {selectBefore}
                    </div>
                  )}
                  <Input
                    {...field}
                    type="text"
                    placeholder="Mobile number"
                    disabled={type !== "mobile"}
                    className={type === "mobile" ? "rounded-l-none" : ""}
                    onBlur={(e) => {
                      field.onBlur();
                      if (
                        type === "mobile" &&
                        e.target.value.length === 10 &&
                        !form.formState.errors.mobile
                      ) {
                        handleVerify({
                      
                            countryCode: ctryCode,
                            phoneNumber: e.target.value,
                          
                        });
                      }
                    }}
                  />
                </div>
              </FormControl>

              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </>
  );
};

export default ContactFields;
