"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { onBusinessLogoUpload } from "@/actions/others.action";
import ContainerWrapper from "@/components/global/container-wrapper";
import toast from "@/components/global/toast";
import ImageUploader from "@/components/global/uploader/image-uploader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";

const BusinessLogo = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);
  const [checked, setChecked] = useState(false);
  const [extension, setExtension] = useState("");

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const name = uploadedFiles[0].name;
      const ext = name.substring(name.lastIndexOf(".") + 1);
      setExtension(ext);
    }
  }, [uploadedFiles]);
  const { user } = useUser();
  if (!user) return null;
  const handleFileUpload = (files: ProcessedFileProps[]) => {
    setUploadedFiles(files);
  };

  const handleBusinessLogo = async () => {
    if (uploadedFiles.length === 0) {
      toast.error({
        message: "Please upload a logo",
      });
      return;
    }

    if (!checked) {
      toast.error({
        message: "Please agree to the terms before proceeding.",
      });
    } else {
      const data = await onBusinessLogoUpload({
        bizName: user.bizName!,
        bizid: user.bizid!,
        extension,
        mainLogo: uploadedFiles[0].base64,
      });
      if (data.success) {
        toast.success({
          message: "Logo uploaded successfully",
        });
      }
    }
  };
  const mainLogo = user?.mainLogo
    ? `${user?.mainLogo}?v=${Date.now()}`
    : undefined;

  return (
    <ContainerWrapper title="Business Logo Upload">
      <div className=" flex ">
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <div className="flex rounded-md border-l-4 border-cyan-400 bg-blue-50 p-4">
            <p className="text-[1rem] text-gray-500">
              Please upload your business logo here, it will be displayed on the
              pages like offer listings, business terms of service etc.
            </p>
          </div>

          <div className="mt-10 flex flex-row justify-center gap-5">
            <div className="h-40 rounded-xl">
              {uploadedFiles.map((item) => (
                <Image
                  key={item.name}
                  height={320}
                  width={320}
                  src={item.base64Url}
                  alt="Business Logo"
                  className="rounded-lg"
                />
              ))}

              {!uploadedFiles.length && typeof mainLogo === "string" && (
                <Image
                  // key={item.name}
                  height={320}
                  width={320}
                  src={mainLogo}
                  alt="Business Logo"
                  className="h-[160] w-[300] rounded-lg object-cover"
                />
              )}
            </div>
            <div className="flex justify-end">
              <ImageUploader
                maxFileSizeMB={5}
                onImageUpload={handleFileUpload}
                minZoom={0.1}
              />
            </div>
          </div>
          <div className="mt-10 flex flex-row justify-between">
            <div className="w-[90%]">
              <label className="flex items-start text-sm text-gray-700">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => setChecked(!checked)}
                  className="mr-2 mt-1"
                />
                <span>
                  I represent and warrant that I have full ownership and/or
                  licensing rights to the image and authorize Fyndr to use this
                  image as per:
                  <Link href="/legal/agreement" className="ml-1 text-blue-600">
                    Fyndr Business Agreement
                  </Link>
                </span>
              </label>
            </div>
            <div>
              <Button
                className={cn(
                  `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
                  "hover:bg-blue-500 text-white bg-blue-500"
                )}
                onClick={() => handleBusinessLogo()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default BusinessLogo;
