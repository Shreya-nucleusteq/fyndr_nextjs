/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { onAddModifiers, onEditModifiers } from "@/actions/catalogue.actions";
import Button from "@/components/global/buttons";
import CustomEditor from "@/components/global/editor/custom-editor";
import Input from "@/components/global/input";
import toast from "@/components/global/toast";
import ImageUploader from "@/components/global/uploader/image-uploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ROUTES from "@/constants/routes";
import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";
import {
  StoreModifier,
  UploadedImageData,
} from "@/types/catalogue/catalogue.types";
import { useModifierStore } from "@/zustand/stores/store-modifier.store";

import { modifierSchema } from "./schema";

type ModifierFormValues = z.infer<typeof modifierSchema>;
const defaultValues: ModifierFormValues = {
  modName: "",
  description: "",
  image: [],
  modType: "whole",
};

type Props = {
  bizid: number;
  modifierId?: number;
};

const ModifierAddForm = ({ modifierId, bizid }: Props) => {
  const getModifierById = useModifierStore((state) => state.getModifierById);
  const [modifier, setModifier] = useState<StoreModifier | null>(null);
  const router = useRouter();
  if (typeof bizid !== "number") {
    throw new Error("bizid is required and must be a number");
  }

  useEffect(() => {
    if (modifierId !== undefined) {
      const data = getModifierById(modifierId);
      setModifier(data || null);
    }
  }, [modifierId, getModifierById, setModifier]);
  const form = useForm<ModifierFormValues>({
    resolver: zodResolver(modifierSchema),
    defaultValues,
  });
  useEffect(() => {
    if (modifierId && modifier) {
      form.reset({
        modName: modifier.modName,
        description: modifier.description ?? "",
        image:
          modifier.images?.map((img, index) => ({
            imgUri: img.img_url,
            index: img.index ?? index,
          })) ?? [],
        modType: modifier.modType,
      });
      const processedFiles =
        modifier.images?.map((img, index) => ({
          name: `image-${index}`,
          type: "image/*",
          base64: "",
          base64Url: img.img_url,
          orgFile: null,
        })) ?? [];
      setUploadedFiles(processedFiles);
    }
  }, [modifierId, modifier, form]);

  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);

  const handleFileUpload = (files: ProcessedFileProps[]) => {
    const newUploadedFiles = [...files];
    setUploadedFiles(newUploadedFiles);

    const transformedForForm: UploadedImageData[] = files.map((file, index) => {
      const fileType = file.type?.split("/")[1] || "";
      return {
        img: file.base64 || "",
        index,
        extn: fileType || "",
        imgUri: file.base64Url || "",
      };
    });

    form.setValue("image", transformedForForm, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data: any) => {
    const payload = {
      modName: data.modName,
      description: data.description ?? "",
      images: data.image,
      modType: data.modType,
      bizid,
      ...(modifierId && { objid: modifierId }),
    };
    const resp = modifierId
      ? await onEditModifiers(payload)
      : await onAddModifiers([payload]);
    if (resp?.success) {
      toast.success({
        message: modifierId
          ? "Modifier Updated Successfully"
          : "Modifier Added Successfully",
      });
      router.push(ROUTES.BUSINESS_STORE_MODIFIER);
    } else {
      toast.error({
        message: "Something went wrong",
      });
    }
  };
  const onCancel = () => {
    router.push(ROUTES.BUSINESS_STORE_MODIFIER);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-full space-y-4 p-8"
      >
        <FormField
          control={form.control}
          name="modType"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                Type:
              </FormLabel>
              <div className="flex w-full flex-col gap-1">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue="whole"
                    value={field.value}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="whole" id="whole" />
                      <label htmlFor="whole" className="text-sm">
                        whole
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="addon" id="addon" />
                      <label htmlFor="addon" className="text-sm">
                        add on
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-500" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="modName"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                Name:
              </FormLabel>
              <div className="flex w-full flex-col gap-1">
                <FormControl>
                  <Input {...field} placeholder="Enter modifier name" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4">
              <FormLabel className="paragraph-medium mt-2 w-40 min-w-40 text-base text-black-70">
                Description:
              </FormLabel>
              <div className="flex w-full flex-col">
                <FormControl>
                  <CustomEditor value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="flex-center">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70"></FormLabel>
              <div className="flex-between gap-5">
                {uploadedFiles.map((item) => (
                  <Image
                    key={item.name}
                    height={200}
                    width={200}
                    src={item.base64Url}
                    alt="bjdbw"
                  />
                ))}
                <div className="flex flex-col gap-1">
                  <FormControl>
                    <ImageUploader
                      maxFileSizeMB={5}
                      onImageUpload={handleFileUpload}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            onClick={onCancel}
            className="rounded bg-gray-300 px-4 py-2 text-black"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ModifierAddForm;
