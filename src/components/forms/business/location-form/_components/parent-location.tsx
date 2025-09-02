import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import Input from "@/components/global/input";
import Select from "@/components/global/input/select/index";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "@/hooks/auth";
import { Location } from "@/types/auth/auth.types";

import { LocationFormData } from "../schema";

type Props = {
  form: UseFormReturn<LocationFormData>;
};

export const ParentLocation = ({ form }: Props) => {
  const { user } = useUser();;
 const [locations] = useState<Location[]>(user?.locations || []);

  const parents = locations?.filter(
    (row) => row.parentLocation == null && row.objid !== undefined
  );

  const parentOptions = parents.map((item) => ({
    label: item.locName,
    value: String(item.objid),
  }));
  return (
    <>
      <FormField
        control={form.control}
        name="parentLocation"
        render={({ field }) => (
          <FormItem className="mt-6 flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Select
                  placeholder=""
                  label="Parent Location"
                  options={parentOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  name={field.name}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="locName"
        render={({ field }) => (
          <FormItem className="mt-6 flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  label="Venue Name"
                  {...field}
                  showRequired
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </>
  );
};

export default ParentLocation;
