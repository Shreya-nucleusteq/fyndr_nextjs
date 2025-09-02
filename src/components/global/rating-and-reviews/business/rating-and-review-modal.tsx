"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

import { Modal } from "@/components/global/modal";
import { removeKeysFromUrlQuery } from "@/lib/utils/url";

type Props = {
  children: React.ReactNode;
};

const RatingAndReviewModal = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const open = searchParams.get("reviews") === "true";

  const handleModalChange = (open: boolean) => {
    if (!open) {
      const newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["reviews"],
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <Modal
      title={<div>Ratings & Reviews</div>}
      open={open}
      width="820px"
      bodyClassName="max-h-[80vh] overflow-y-scroll no-scrollbar !p-0 rounded-10"
      onOpenChange={handleModalChange}
    >
      {children}
    </Modal>
  );
};

export default RatingAndReviewModal;
