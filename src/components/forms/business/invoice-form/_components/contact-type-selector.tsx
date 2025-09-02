import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { InvoiceFormData } from "../schema";


type Props = {
  form: UseFormReturn<InvoiceFormData>;
  setType: (value: "email" | "mobile") => void;
};

const ContactType = ({form ,setType}:Props) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="">
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                setType(value as "email" | "mobile");
                if (value === "email") {
                  form.setValue("mobile", "");
                } else {
                  form.setValue("email", "");
                }
              }}
              value={field.value}
              className=" mt-5 h-28 w-20 flex-col "
            >
              <div className="flex justify-end">
                <RadioGroupItem
                  value="email"
                  id="email"
                  className="relative  size-5 rounded-full border border-primary before:absolute before:left-[12.5%] before:top-[12.5%] before:size-3/4 before:rounded-full before:bg-blue-500 before:content-[''] data-[state=unchecked]:before:bg-transparent"
                />
              </div>
              <div className="flex justify-end">
                <RadioGroupItem
                  value="mobile"
                  id="mobile"
                  className="relative mt-11 size-5 rounded-full border border-primary before:absolute before:left-[12.5%] before:top-[12.5%] before:size-3/4 before:rounded-full before:bg-blue-500 before:content-[''] data-[state=unchecked]:before:bg-transparent"
                />
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ContactType;
