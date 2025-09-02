"use client";
import React, { useState } from "react";

import { ReviewOverviews } from "@/types/review/review.response";

import Stars from "../ratings/stars";

type OverallReviewResponse = {
  disable: boolean;
  reviewsOverview: ReviewOverviews;
  rating: number;
  text: string;
  totalRatings: string;
  onClick?: () => void;
  onStarsClick?: () => void;
};

const Overallreview: React.FC<OverallReviewResponse> = ({
  reviewsOverview,
  rating,
  text,
  totalRatings,
}) => {
  const [, setReviewModal] = useState<boolean>(false);
  const handleViewReviews = () => {
    setReviewModal(true);
  };
  return (
    <>
      <div>
        {reviewsOverview && (
          <div className="flex flex-col ">
            <div>
              <Stars ratings={Number(rating)} />
            </div>
            <div className="flex gap-1 ">
              <div className="pt-2 text-base font-normal leading-5 text-black-70 md:text-sm">
                {rating}
                {text}
              </div>
              <div
                onClick={handleViewReviews}
                className="cursor-pointer pt-2 text-base font-normal leading-5  text-primary md:text-sm"
              >
                {totalRatings}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <ReviewModal open={reviewModal} onOpenChange={setReviewModal} /> */}
    </>
  );
};

export default Overallreview;
