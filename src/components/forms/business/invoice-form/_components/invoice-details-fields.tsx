import React from "react";
import { UseFormReturn } from "react-hook-form";

import DatePicker from "@/components/global/date-picker";
import Input from "@/components/global/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import { InvoiceFormData } from "../schema";

type ContactFildsProps = {
  form: UseFormReturn<InvoiceFormData>;
  edit?: boolean;
  handleChangeAmount: (value?: string) => Promise<void>;
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};
const InvoiceDetailsFields = ({
  form,
  edit,
  handleChangeAmount,
  selectedDate,
  setSelectedDate,
}: ContactFildsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Title
            </FormLabel>

            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      {!edit && (
        <>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="mt-[14px] flex  flex-col gap-[14px] sm:flex-row sm:items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                  First Name
                </FormLabel>

                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Input {...field} placeholder="First Name" disabled />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                  Last Name
                </FormLabel>

                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Input {...field} placeholder="Last Name" disabled />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </>
      )}

      {!edit && (
        <FormField
          control={form.control}
          name="serviceName"
          render={({ field }) => (
            <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                Item/Service
              </FormLabel>

              <div className="flex w-full flex-col gap-1">
                <FormControl>
                  <Input placeholder="Item/Service" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="invoiceId"
        render={({ field }) => (
          <FormItem className="mt-[14px] flex  flex-col gap-[14px] sm:flex-row sm:items-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Invoice #
            </FormLabel>

            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input placeholder="Invoice #" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="serverName"
        render={({ field }) => (
          <FormItem className="mt-[14px] flex  flex-col gap-[14px] sm:flex-row sm:items-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Associate Name
            </FormLabel>

            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input placeholder="Associate Name" {...field} />
              </FormControl>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="msg"
        render={({ field }) => (
          <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Message
            </FormLabel>

            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input placeholder="Message to customer" {...field} />
              </FormControl>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="baseAmount"
        render={({ field }) => (
          <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Amount
            </FormLabel>

            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Amount"
                  onBlur={(e) => {
                    field.onBlur();
                    handleChangeAmount(e.target.value);
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
        name="duedate"
        render={({ field }) => (
          <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Due Date
            </FormLabel>

            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <DatePicker
                  className="flex w-full p-6"
                  {...field}
                  value={selectedDate}
                  onChange={setSelectedDate}
                  placeholder="Due Date"
                />
              </FormControl>
            </div>
          </FormItem>
        )}
      />
    </>
  );
};

export default InvoiceDetailsFields;
