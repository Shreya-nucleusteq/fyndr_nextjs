import React from "react";
import { UseFormReturn } from "react-hook-form";

import Input from "@/components/global/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { LocationFormData } from "../schema";
type Props = {
  form: UseFormReturn<LocationFormData>;
};

export const PersonalInfo = ({ form }: Props) => {
  return (
    <>
      <div className="mt-6 flex w-full flex-col gap-1">
        <div className="flex w-full flex-row items-center gap-2">
          <FormField
            control={form.control}
            name="ctryCode"
            render={({ field }) => (
              <FormItem className="w-24">
                <FormControl>
                  <Input {...field} readOnly label="Code" />
                </FormControl>
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} label="Phone Number" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={() => (
            <div className="text-xs">
              <FormMessage />
            </div>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem className="mt-6 flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input label="Country" readOnly {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="postalCode"
        render={({ field }) => (
          <FormItem className="mt-6 flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input label="Zip Code" showRequired {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="addressLine1"
        render={({ field }) => (
          <FormItem className="mt-6 flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input label="Address 1" showRequired {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="addressLine2"
        render={({ field }) => (
          <FormItem className="mt-6 flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input label="Address 2" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem className="mt-6 flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input label="City" showRequired {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem className="mt-6 flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input label="State" showRequired {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </>
  );
};

export default PersonalInfo;
