import { UseFormReturn } from "react-hook-form";

import Input from "@/components/global/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { OfferFormValues } from "./offer-form";

type Props = {
  form: UseFormReturn<OfferFormValues>;
};

const OfferBasicDetails = ({ form }: Props) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-4">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input {...field} label="Title" showRequired />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="isVoucher"
        render={() => (
          <FormItem className="flex flex-row items-center gap-4">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input label="Custom Voucher Code(optional)" info />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />
    </>
  );
};

export default OfferBasicDetails;
