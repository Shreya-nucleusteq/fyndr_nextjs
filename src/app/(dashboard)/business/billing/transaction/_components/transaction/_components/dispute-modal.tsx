// DisputeModal.jsx

"use client";
import Image from "next/image";
import React, { useEffect, useState} from "react";

import Button from "@/components/global/buttons";
import Select from "@/components/global/input/select";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import ImageUploader from "@/components/global/uploader/image-uploader";
import { Textarea } from "@/components/ui/textarea";
import { useDisputeReasons, useUpdateDisputeStatus } from "@/hooks/invoice";
import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";
import { RaiseDisputePayload } from "@/types/dispute-response";

import DisputeSuccessModal from "./dispute-success-modal";


type DisputeModalProps = {
  disputeOpen: boolean;
  objid: number;
  setDisputeOpen: (open: boolean) => void;
  refetch?: () => void;
};

type DisputeReasonOption = {
  value: string;
  label: string;
};

const DisputeModal = ({
  disputeOpen,
  setDisputeOpen,
  objid,
  refetch,
}: DisputeModalProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const [text, setText] = useState<string>("");
  const [imgUri, setImgUri] = useState<string>("");
  // const [showImage, setShowImage] = useState<string>("");
  const [options, setOptions] = useState<DisputeReasonOption[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const handleFileUpload = (files: ProcessedFileProps[]) => {
    setUploadedFiles(files);

    setImgUri(files[0]?.base64);

   
  };

  const { data } = useDisputeReasons();
  useEffect(() => {
    if (data?.disputeReasons) {
      const transformedOptions = Object.entries(data.disputeReasons).map(
        ([key, value]) => ({
          value: key,
          label: value,
        })
      );
      setOptions(transformedOptions);
    }
  }, [data]);
  console.log(uploadedFiles);

  const { mutate: raiseDispute , isPending} = useUpdateDisputeStatus();

  const handleSubmit = () => {
    if (selectedValue === "") {
      return toast.error({ message: "Please select a reason" });
    }
    if (text === "") {
      return toast.error({ message: "Description can't be empty" });
    }

    const payload: RaiseDisputePayload = {
      disputeReasonId: parseInt(selectedValue),
      description: text,
      raisedDisputeImages: [
        {
          index: 0,
          img: imgUri || null,
          thumbnail: imgUri || null,
        },
      ],
    };

    raiseDispute(
      { invoiceId: objid, payload },
      {
        onSuccess: (response) => {
          if (response.success) {
            refetch?.();
            setSuccessModal(true);
            setDisputeOpen(false);
          } else {
            toast.error({
              message: response.error?.message || "Failed to raise dispute",
            });
          }
        },
        onError: (err) => {
          toast.error({ message: err.message || "Something went wrong" });
        },
      }
    );
  };

  return (
    <>
      <Modal
        open={disputeOpen}
        onOpenChange={() => setDisputeOpen(false)}
        title="Please Let Us Know More"
       
      >
        <div className="flex flex-col">
          <div className="flex flex-col">
            <Select
              placeholder="Select a reason"
              options={options}
              onValueChange={setSelectedValue}
            />
            <Textarea
              placeholder="Please provide a detailed description of your dispute"
              value={text}
              className="no-scrollbar no-focus mt-4 h-32 resize-none !border-black-20 leading-6 outline-none placeholder:text-black-40"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div
            className="mt-3 flex items-center  gap-4 rounded-10  border border-secondary-20 p-[10px] "
          >
            <ImageUploader
              maxFileSizeMB={5}
              onImageUpload={handleFileUpload}
              minZoom={0.1}
              className="flex aspect-[3/2] w-[48%] cursor-pointer flex-col items-center justify-evenly rounded-10 border border-dashed  border-secondary-20 text-center"
            >
              <Image
                alt="Upload"
                src="/images/invoice/uploadImage.png"
                width={200}
                height={200}
                className="w-2/5"
              />
              <span>Click to upload image</span>
            </ImageUploader>


            {uploadedFiles.length === 0 ? (
              <div className="flex aspect-[4/3] w-[48%] flex-col items-center justify-evenly  rounded-10 border border-secondary-20"></div>
            ) : (
              uploadedFiles.map((item) => (
                <Image
                  key={item.name}
                  height={120}
                  width={120}
                  src={item.base64Url}
                  alt="Business Logo"
                  className="h-40 w-56 rounded-lg"
                />
              ))
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="primary" onClick={handleSubmit} className="w-36">
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </Modal>

      <DisputeSuccessModal
        onOpenChange={() => setSuccessModal(false)}
        open={successModal}
      />
    </>
  );
};

export default DisputeModal;
