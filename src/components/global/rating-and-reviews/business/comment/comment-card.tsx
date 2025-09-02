import Image from "next/image";
import React from "react";

import StarRating from "@/components/global/ratings/star-rating";
import { Comment } from "@/types/business/business.types";

import Metric from "./metric";
import ReplyCard from "./reply-card";
import ReplyReportSection from "./reply-report-section";
import { ReviewBusinessProps } from "../business-ratings-and-reviews";

type Props = {
  comment: Comment;
  business: ReviewBusinessProps;
  qrCode: string;
};

const CommentCard = ({ comment, business, qrCode }: Props) => {
  const data = new Date(comment.createdDt);
  const formattedDate = data.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative flex flex-col gap-6 rounded-10 bg-primary-0.5 p-4">
      <div className="flex w-fit flex-col">
        <Metric
          name={`${comment.user.firstName} ${comment.user.lastName}`}
          alt={`${comment.commentId}`}
          value={`${comment.user.firstName} ${comment.user.lastName}`}
          // title={`• ${getTimeStamp(new Date(comment.createdDt))}`}
          title={`• ${formattedDate}`}
          textStyles="body-medium"
        />
        <StarRating
          allowHalf
          outOf={5}
          rating={comment.rating}
          size={20}
          className="ml-9"
        />
      </div>
      {comment.images && comment.images.length > 0 && (
        <div className="no-scrollbar flex gap-4 overflow-x-scroll">
          {comment.images.map((imgURL, i) => (
            <Image
              key={`${comment.commentId}-${i}`}
              src={imgURL}
              alt={comment?.firstName || "user-review"}
              height={50}
              width={100}
              className="h-24 w-36 rounded-10"
            />
          ))}
        </div>
      )}
      <div className="body-1 flex flex-col gap-4 rounded-10 bg-primary-10 p-4 text-black-70">
        <div>{comment.review}</div>
        {comment.commentThread && comment.commentThread.length > 0 && (
          <div className="no-scrollbar flex max-h-56 flex-col gap-4 overflow-y-scroll">
            {comment.commentThread.map((item) => (
              <ReplyCard
                key={item.createdDt}
                name={business.bizName}
                imgUrl={business.mainLogo}
                reply={item.reply}
                createdAt={item.createdDt}
              />
            ))}
          </div>
        )}
      </div>
      <ReplyReportSection
        business={business}
        comment={comment}
        qrCode={qrCode}
      />
    </div>
  );
};

export default CommentCard;
