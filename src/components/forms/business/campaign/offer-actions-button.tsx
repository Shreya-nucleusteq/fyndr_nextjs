import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

import Button from "@/components/global/buttons";
import Switch from "@/components/global/input/switch";
import ImageUploader from "@/components/global/uploader/image-uploader";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";

import { OfferFormValues } from "./offer-form";

type Props = {
  form: UseFormReturn<OfferFormValues>;
  handleFileUpload: (files: ProcessedFileProps[]) => void;
  handleModalClose: () => void;
  uploadedFiles: ProcessedFileProps[];
};

const OfferActionsButton = ({
  form,
  handleFileUpload,
  handleModalClose,
  uploadedFiles,
}: Props) => {
  return (
    <>
      <FormField
        control={form.control}
        name="validityPeriod"
        render={() => (
          <FormItem>
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <div className="flex flex-col gap-5">
                  <span className="text-black-60">
                    Valid till (After Purchase)
                  </span>
                  <div className="flex justify-start">
                    <Button className="h-11 w-[70%] bg-primary text-white hover:bg-primary">
                      Till Jun 30, 2026
                    </Button>
                  </div>
                  <div className="flex flex-row gap-3">
                    <Button className="h-[46px] flex-1 rounded-lg border border-black-20 bg-white px-[15px] text-black-40 hover:bg-white">
                      Day(s)
                    </Button>
                    <Button className="h-[46px] flex-1 rounded-lg border border-black-20 bg-white px-[15px] text-black-40 hover:bg-white">
                      Week(s)
                    </Button>
                    <Button className="h-[46px] flex-1 rounded-lg border border-black-20 bg-white px-[15px] text-black-40 hover:bg-white">
                      Month(s)
                    </Button>
                  </div>
                </div>
              </FormControl>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="repurchasePeriod"
        render={() => (
          <FormItem>
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <ImageUploader
                  maxFileSizeMB={5}
                  onImageUpload={handleFileUpload}
                  className="border-dotted"
                >
                  {uploadedFiles.length > 0 ? (
                    <div className="flex-center">
                      {uploadedFiles.map((file, index) => (
                        <Image
                          key={index}
                          src={file.base64Url}
                          alt={`uploaded-${index}`}
                          width={200}
                          height={200}
                          className="rounded-md object-cover shadow"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                      <Image
                        src="/icons/image-icon.svg"
                        alt="imageUpload"
                        width={50}
                        height={50}
                      />
                      <p className="mt-4 text-center font-roboto text-sm font-normal text-black-50">
                        Drag & Drop Or Click To Choose A File.
                      </p>
                    </div>
                  )}
                </ImageUploader>
              </FormControl>
            </div>
          </FormItem>
        )}
      />
      {form.getValues("isNew") === false && (
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <div className="flex w-full flex-col gap-1">
                <FormControl>
                  <div className="flex items-center">
                    <Switch
                      checkedTitle="Active"
                      uncheckedTitle="Inactive"
                      checked={field.value === "active"}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? "active" : "inactive")
                      }
                    />
                  </div>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="isBookingEnabled"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <div className="flex items-center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                  <Label className="ml-2 font-roboto text-black-50">
                    Business Appointment
                  </Label>
                </div>
              </FormControl>
            </div>
          </FormItem>
        )}
      />

      <div className="flex w-full flex-col gap-1">
        <Button stdHeight variant="primary" className="w-full">
          Save
        </Button>
      </div>
      <div className="flex w-full flex-col gap-1">
        <Button
          className="h-[42px] w-full rounded-10 border border-primary bg-white px-4 py-2 text-primary  hover:bg-white"
          onClick={handleModalClose}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default OfferActionsButton;
