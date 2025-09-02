/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

import { onQrLogoUpload } from "@/actions/others.action";
import ContainerWrapper from "@/components/global/container-wrapper";
import toast from "@/components/global/toast";
import ImageUploader from "@/components/global/uploader/image-uploader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";

const QrLogoPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);
  const [checked, setChecked] = useState(false);
  const [extension, setExtension] = useState("");
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const name = uploadedFiles[0].name;
      const ext = name.substring(name.lastIndexOf(".") + 1);
      setExtension(ext);
    }
    console.log("uploadedFiles", uploadedFiles, user?.qrLogo);
  }, [uploadedFiles]);

  if (isLoading) return <div>Loading...</div>;

  if (!user) return null;

  const handleFileUpload = (files: ProcessedFileProps[]) => {
    setUploadedFiles(files);
    console.log("files", files);
  };

  const handleBusinessLogo = async () => {
    if (uploadedFiles.length === 0) {
      toast.error({
        message: "Please upload a QR logo",
      });
      return;
    }

    if (!checked) {
      toast.error({
        message: "Please agree to the terms before proceeding.",
      });
    } else {
      const data = await onQrLogoUpload({
        bizName: user.bizName!,
        bizid: user.bizid!,
        extension,
        qrLogo: uploadedFiles[0].base64,
      });
      if (data.success) {
        toast.success({
          message: "QR Logo uploaded successfully",
        });
      }
    }
  };

  return (
    <ContainerWrapper title="Customize QR logo">
      <div className="rounded-md border border-gray-200 bg-white p-4 shadow ">
        <div className="mb-6 flex items-center rounded-md border-l-4 border-cyan-400 bg-blue-50 p-4">
          <p className="text-base text-gray-600">
            Please upload the logo here to be placed on the center of QR image
            of your interaction venues.
          </p>
        </div>

        <div className="mt-10 flex flex-row justify-center gap-5">
          <div className="relative size-[200px]">
            <QRCode
              style={{ maxWidth: "100%" }}
              size={160}
              logoWidth={40}
              logoImage={
                uploadedFiles[0]?.base64Url ||
                (user?.qrLogo ? `${user.qrLogo}?v=${Date.now()}` : undefined)
              }
            />
          </div>
          <div className="mb-6 flex justify-center">
            <ImageUploader
              maxFileSizeMB={5}
              onImageUpload={handleFileUpload}
              minZoom={0.1}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
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
          <Button
            className={cn(
              `rounded-lg px-6 py-2 capitalize shadow-none`,
              "hover:bg-blue-600 text-white bg-blue-500"
            )}
            onClick={() => handleBusinessLogo()}
          >
            Save
          </Button>
        </div>
      </div>
    </ContainerWrapper>
  );
};
export default QrLogoPage;
