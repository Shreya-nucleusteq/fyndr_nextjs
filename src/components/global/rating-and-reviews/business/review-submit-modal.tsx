"use client";

import { Plus, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState, useTransition } from "react";

import { onSubmitReview } from "@/actions/business.action";
import { Textarea } from "@/components/ui/textarea";

import Button from "../../buttons";
import { Modal } from "../../modal";
import toast from "../../toast";
import ImageUploader, {
  ImageUploaderOutput,
} from "../../uploader/image-uploader";
import StarRating from "../star-rating";

type Props = {
  trigger?: React.ReactNode;
  title?: string;
  bizId: number;
  bizName: string;
  qrCode: string;
};

const MAX_IMAGES = 6;

const ReviewSubmitModal = ({ title, trigger, bizId }: Props) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, startSubmitting] = useTransition();
  const [rating, setRating] = useState<number>(0);
  const [experience, setExperience] = useState<string>("");
  const [images, setImages] = useState<(ImageUploaderOutput | undefined)[]>(
    new Array(MAX_IMAGES).fill(undefined)
  );

  const handleImageUpload = (image: ImageUploaderOutput[], index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = image[0];
      return newImages;
    });
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = undefined;
      return newImages;
    });
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    startSubmitting(async () => {
      if (!session || !session.user) {
        toast.error({
          message: "Please sign-in first",
        });
        return;
      }
      if (rating < 1) {
        toast.error({
          message: "Minimum rating should be 1",
        });
        return;
      }
      if (!experience.trim()) {
        toast.error({
          message: "Please add the comment to proceed",
        });
        return;
      }

      const reviewImages = images
        .filter((img): img is ImageUploaderOutput => img !== undefined)
        .map((img) => ({
          image: img.base64,
          imageType: img.type,
        }));

      const { success, data, error } = await onSubmitReview({
        payload: {
          businessId: bizId,
          userId: Number(session.user.id),
          invoiceId: null,
          images: reviewImages,
          rating,
          text: experience,
        },
        options: {
          validatePath: pathname,
        },
      });

      if (!success) {
        toast.error({
          message: error?.details?.message || "Failed to submit review",
        });
        return;
      }

      if (data) {
        toast.success({
          message: data.message,
        });

        // Reset form after successful submission
        setRating(0);
        setExperience("");
        setImages(new Array(MAX_IMAGES).fill(undefined));
        setModalOpen(false);
      }
    });
  };

  const renderImageUploader = (index: number) => {
    const image = images[index];

    return (
      <div key={index} className="h-40 w-full">
        {image ? (
          <div className="relative h-40 w-full">
            <div
              className="absolute right-1 top-1 z-10 cursor-pointer rounded-full border-2 border-white bg-black-80 p-1 text-white"
              onClick={() => handleImageRemove(index)}
            >
              <X size={12} />
            </div>
            <Image
              src={image.base64Url}
              alt={image.name}
              height={200}
              width={400}
              className="size-full rounded-10 object-cover"
            />
          </div>
        ) : (
          <ImageUploader
            maxFileSizeMB={5}
            onImageUpload={(uploadedImages) =>
              handleImageUpload(uploadedImages, index)
            }
            className="flex-center h-full flex-col gap-2 !border !border-dashed !border-secondary-20 text-black-60"
          >
            <div className="rounded-full border border-secondary-20 p-2">
              <Plus size={20} />
            </div>
            <p className="body-3">Add Image</p>
          </ImageUploader>
        )}
      </div>
    );
  };

  return (
    <div>
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        trigger={trigger}
        title={title || "Ratings & Reviews"}
        bodyClassName="flex flex-col gap-6 overflow-y-scroll no-scrollbar max-h-[80vh]"
        width="820px"
        closeOnOutsideClick={false}
      >
        <div className="flex flex-col gap-4">
          <div className="title-6-medium text-secondary">Rate This Product</div>
          <StarRating
            outOf={5}
            rating={rating}
            interactive
            allowHalf={true}
            onRatingChange={handleRatingChange}
            size={20}
            className="flex items-center"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="title-6-medium text-secondary">
            Share Your Experience
          </div>
          <Textarea
            rows={5}
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="no-focus placeholder max-h-32 !border !border-secondary-20 text-black-70 shadow-none"
            placeholder="Tell us about your experience with this product..."
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="title-6-medium text-secondary">
            Add Up To {MAX_IMAGES} Images
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-10 border border-secondary-20 p-4 sm:grid-cols-3">
            {Array.from({ length: MAX_IMAGES }, (_, index) =>
              renderImageUploader(index)
            )}
          </div>
        </div>

        <div className="flex-center my-4 w-full">
          <Button
            variant="primary"
            stdHeight
            stdWidth
            onClick={handleSubmit}
            disabled={rating < 1 || !experience.trim() || submitting}
          >
            {submitting ? "Submitting Review" : "Submit Review"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewSubmitModal;
