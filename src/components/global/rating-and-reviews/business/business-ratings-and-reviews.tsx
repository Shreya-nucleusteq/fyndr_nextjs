import { PencilLine } from "lucide-react";
import React, { Suspense } from "react";

import { auth } from "@/auth";
import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import BusinessRatings from "@/components/global/rating-and-reviews/business/business-rating";
import Comments from "@/components/global/rating-and-reviews/business/comment/comments";
import RatingSorter from "@/components/global/rating-and-reviews/business/rating-sorter";
import { cn } from "@/lib/utils";

import AllReviewsModal from "./all-reviews-modal";
import CommentsSkeleton from "./comment/comments-skeleton";
import ReviewSubmitModal from "./review-submit-modal";

export type ReviewBusinessProps = {
  bizid: number;
  bizName: string;
  mainLogo: string;
};

export type RatingsAndReviewsProps = {
  business: ReviewBusinessProps;
  qrCode: string;
  sortBy: "RATING" | "CREATED_DT";
  orderBy: "ASC" | "DESC";
  page?: number;
  className?: string;
  showSeeAllComments?: boolean;
  showHeading?: boolean;
  enableCommentPagination?: boolean;
};

const BusinessRatingsAndReviews = async ({
  business,
  qrCode,
  orderBy,
  sortBy,
  page = 1,
  className,
  showSeeAllComments = true,
  showHeading = true,
  enableCommentPagination = false,
}: RatingsAndReviewsProps) => {
  const session = await auth();

  return (
    <DefaultCard
      className={cn("flex w-full flex-col gap-6 !p-4 xs:p-6", className)}
    >
      {showHeading && (
        <h2 className="heading-7-medium mb-2 text-secondary">
          Ratings & Reviews
        </h2>
      )}
      <Suspense fallback={"Loading..."}>
        <BusinessRatings bizId={business.bizid} />
      </Suspense>
      <div className="xs:flex-between flex flex-col gap-4 xs:flex-row">
        {session && business.bizid !== session?.user.bizid ? (
          <ReviewSubmitModal
            trigger={
              <Button
                variant="primary-dark"
                stdHeight
                className="w-full xs:w-fit"
              >
                <PencilLine /> Write A Review
              </Button>
            }
            bizId={business.bizid}
            bizName={business.bizName}
            qrCode={qrCode}
          />
        ) : (
          <></>
        )}

        <div
          className={`flex w-full items-center ${session && business.bizid !== session?.user.bizid ? "justify-end" : "flex-between"}  gap-4`}
        >
          <div className="w-full max-w-96">
            <RatingSorter />
          </div>
          {showSeeAllComments && (
            <AllReviewsModal
              trigger={
                <div className="body-1-medium cursor-pointer text-nowrap text-primary">
                  See All
                </div>
              }
              business={business}
              page={page}
              qrCode={qrCode}
            />
          )}
        </div>
      </div>
      <Suspense
        fallback={
          <CommentsSkeleton enablePagination={enableCommentPagination} />
        }
      >
        <Comments
          business={business}
          orderBy={orderBy}
          sortBy={sortBy}
          enablePagination={enableCommentPagination}
          page={page}
          qrCode={qrCode}
        />
      </Suspense>
    </DefaultCard>
  );
};

export default BusinessRatingsAndReviews;
