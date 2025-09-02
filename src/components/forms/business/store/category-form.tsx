/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { onAddCategories, onEditCategories } from "@/actions/catalogue.actions";
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
import ROUTES from "@/constants/routes";
import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";
import { StoreCategory } from "@/types/catalogue/catalogue.types";
import { useCategoryStore } from "@/zustand/stores/store-category.store";

import { categorySchema } from "./schema";

type CategoryFormValues = z.infer<typeof categorySchema>;
const defaultValues: CategoryFormValues = {
  name: "",
  description: "",
  image: [],
};

type UploadedImageData = {
  img: string;
  index: number;
  extn: string;
  imgUri: string;
};

type Props = {
  bizid?: number;
  categoryId?: number;
};

const CategoryAddForm = ({ bizid, categoryId }: Props) => {
  const getCategoryById = useCategoryStore((state) => state.getCategoryById);
  const [category, setCategory] = useState<StoreCategory | null>(null);
  const router = useRouter();
  if (typeof bizid !== "number") {
    throw new Error("bizid is required and must be a number");
  }

  useEffect(() => {
    if (categoryId !== undefined) {
      const data = getCategoryById(categoryId);
      setCategory(data || null);
    }
  }, [categoryId, getCategoryById]);
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });
  useEffect(() => {
    if (categoryId && category) {
      form.reset({
        name: category.name,
        description: category.description ?? "",
        image:
          category.images?.map((img, index) => ({
            imgUri: img.img_url,
            index: img.index ?? index,
          })) ?? [],
      });
      const processedFiles =
        category.images?.map((img, index) => ({
          name: `image-${index}`,
          type: "image/*",
          base64: "",
          base64Url: img.img_url,
          orgFile: null,
        })) ?? [];
      setUploadedFiles(processedFiles);
    }
  }, [categoryId, category, form]);

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
      name: data?.name,
      description: data?.description,
      images: data?.image,
      bizid,
      ...(categoryId && { objid: categoryId }),
    };
    const { success } = categoryId
      ? await onEditCategories(payload)
      : await onAddCategories([payload]);

    if (success) {
      toast.success({
        message: categoryId
          ? "Category Updated Successfully"
          : "Category Added Successfully",
      });
      router.push(ROUTES.BUSINESS_STORE_CATEGORY);
    } else {
      toast.error({
        message: "Something went wrong",
      });
    }
  };
  const onCancel = () => {
    router.push(ROUTES.BUSINESS_STORE_CATEGORY);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-full space-y-4 p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                Name:
              </FormLabel>
              <div className="flex w-full flex-col gap-1">
                <FormControl>
                  <Input {...field} placeholder="Enter category name" />
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
            type="button"
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

export default CategoryAddForm;
