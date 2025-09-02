/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { onAddItems, onEditItems } from "@/actions/catalogue.actions";
import toast from "@/components/global/toast";
import { Form } from "@/components/ui/form";
import ROUTES from "@/constants/routes";
import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";
import {
  StoreItem,
  UploadedImageData,
} from "@/types/catalogue/catalogue.types";
import { useItemStore } from "@/zustand/stores/store-item.store";

import ItemFormContent from "./item-form-content";
import { itemSchema } from "./schema";

export type ItemFormValues = z.infer<typeof itemSchema>;
const defaultValues: ItemFormValues = {
  name: "",
  description: "",
  image: [],
  sku: "",
  unit: "",
  stdTax: false,
  taxPercent: "",
};

type Props = {
  bizid: number;
  itemId?: number;
};

const ItemAddForm = ({ bizid, itemId }: Props) => {
  const getItemById = useItemStore((state) => state.getItemById);
  const [item, setItem] = useState<StoreItem | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (itemId !== undefined) {
      const data = getItemById(itemId);
      setItem(data || null);
    }
  }, [getItemById, itemId, setItem]);
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues,
  });
  useEffect(() => {
    if (itemId && item) {
      form.reset({
        name: item.name || "",
        description: item.description || "",
        image:
          item.images?.map((img, index) => ({
            imgUri: img.img_url,
            index: img.index ?? index,
          })) ?? [],
        sku: item.sku || "",
        unit: item.unit || "",
        stdTax: item.stdTax || false,
        taxPercent: item.taxPercent ? String(item.taxPercent) : "",
      });
      const processedFiles =
        item.images?.map((img, index) => ({
          name: `image-${index}`,
          type: "image/*",
          base64: "",
          base64Url: img.img_url,
          orgFile: null,
        })) ?? [];
      setUploadedFiles(processedFiles);
    }
  }, [itemId, item, form]);

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

  const onCancel = () => {
    router.push(ROUTES.BUSINESS_STORE_ITEM);
  };
  const onSubmit = async (data: any) => {
    const payload = {
      name: data?.name,
      description: data?.description,
      images: data?.image,
      sku: data?.sku,
      stdTax: data?.stdTax,
      taxPercent: data?.taxPercent,
      unit: data?.unit,
      bizid,
      ...(itemId && { objid: itemId }),
    };
    const { success } = itemId
      ? await onEditItems(payload)
      : await onAddItems([payload]);
    if (success) {
      toast.success({
        message: itemId
          ? "Item Updated Successfully"
          : "Item Added Successfully",
      });
      router.push(ROUTES.BUSINESS_STORE_ITEM);
    } else {
      toast.error({
        message: "Something went wrong",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-full space-y-4 p-8"
      >
        <ItemFormContent
          form={form}
          uploadedFiles={uploadedFiles}
          handleFileUpload={handleFileUpload}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
};

export default ItemAddForm;
