import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import Switch from "@/components/global/input/switch";
import InfoTooltip from "@/components/global/tooltip/info-tooltip";
import ImageUploader, {
  ImageUploaderOutput,
} from "@/components/global/uploader/image-uploader";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import { InvoiceFormData } from "../schema";

type OptionsFildsProps = {
  form: UseFormReturn<InvoiceFormData>;
  handleChangeAmount: (value?: string) => Promise<void>;
  taxAmount: number | null;
  total: number | null;
  uploadedFiles: ImageUploaderOutput[];
  editImage: string;
  edit?: boolean;
  setUploadedFiles: React.Dispatch<React.SetStateAction<ImageUploaderOutput[]>>;
  setEditImage: React.Dispatch<React.SetStateAction<string>>;
};
const OptionsFields = ({
  form,
  handleChangeAmount,
  editImage,
  taxAmount,
  total,
  uploadedFiles,
  setUploadedFiles,
  setEditImage,
  edit,
}: OptionsFildsProps) => {
  const handleFileUpload = (files: ImageUploaderOutput[]) => {
    setUploadedFiles(files);
  };

  return (
    <>
      <FormField
        control={form.control}
        name="tipAllowed"
        render={({ field }) => (
          <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Tip
            </FormLabel>

            <div className="flex items-center gap-[14px]">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  ref={field.ref}
                />
              </FormControl>
              <InfoTooltip>
                Enabling this option allows customers to include a tip with
                their payment.
              </InfoTooltip>
            </div>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="isTaxIncluded"
        render={({ field }) => (
          <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Invoice includes taxes
            </FormLabel>
            <div className="flex items-center gap-[14px]">
              <FormControl>
                <Checkbox
                  checked={field.value ?? false}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    handleChangeAmount();
                  }}
                />
              </FormControl>
              <div />

              <div className="flex w-60 justify-center gap-14 ">
                <div className="flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-500">
                    Tax:
                  </span>
                  <span className="ml-1 text-sm">
                    {taxAmount && Number(taxAmount) > 0 ? `$${taxAmount}` : ""}
                  </span>
                </div>

                <div className="flex items-center justify-center ">
                  <span className="text-sm font-medium text-gray-500">
                    Total:
                  </span>
                  <span className="ml-1 text-sm">
                    {" "}
                    {total ? `$${total}` : ""}
                  </span>
                </div>
              </div>
            </div>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="isImageIncluded"
        render={({ field }) => {
          return (
            <FormItem className="my-4 mt-[14px]  flex flex-col gap-[14px] sm:flex-row sm:items-center">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                Upload Image
              </FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  {uploadedFiles.length === 0 && !editImage && (
                    <ImageUploader
                      className="w-60"
                      maxFileSizeMB={5}
                      onImageUpload={(file) => {
                        handleFileUpload(file);
                        field.onChange(file[0]);
                      }}
                    />
                  )}
                </FormControl>
                {uploadedFiles.length > 0 && !editImage && (
                  <div className="relative inline-block">
                    <Image
                      key={uploadedFiles[0]?.name}
                      height={120}
                      width={120}
                      src={uploadedFiles[0]?.base64Url}
                      alt="Create Invoice"
                      className="h-40 w-56 rounded-lg"
                    />
                    <X
                      onClick={() => setUploadedFiles([])}
                      className="absolute right-1 top-1 size-4 cursor-pointer rounded-full bg-white p-1 text-gray-600 shadow-md hover:bg-gray-100"
                    />
                  </div>
                )}
                {edit && editImage && (
                  <div className="relative inline-block">
                    <Image
                      height={120}
                      width={120}
                      src={editImage}
                      alt="Invoice Image"
                      className="h-40 w-56 rounded-lg"
                    />
                    <X
                      onClick={() => setEditImage("")}
                      className="absolute right-1 top-1 size-4 cursor-pointer rounded-full bg-white p-1 text-gray-600 shadow-md hover:bg-gray-100"
                    />
                  </div>
                )}
              </div>
            </FormItem>
          );
        }}
      />
    </>
  );
};

export default OptionsFields;
