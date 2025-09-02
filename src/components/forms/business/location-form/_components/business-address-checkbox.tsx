import { UseFormReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

import { LocationFormData } from "../schema";

type Props = {
  form: UseFormReturn<LocationFormData>;
};

export const UseBusinessAddressCheckbox = ({ form }: Props) => (
  <FormField
    control={form.control}
    name="useBusinessAddress"
    render={({ field }) => (
      <FormItem className="mt-3.5 flex flex-col items-center gap-[14px] sm:flex-row sm:items-center">
        <FormControl>
          <Checkbox
            id="use-business-address"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
        <FormLabel
          htmlFor="use-business-address"
          className="!mt-0 text-sm font-normal"
        >
          Use Business Address
        </FormLabel>
      </FormItem>
    )}
  />
);
