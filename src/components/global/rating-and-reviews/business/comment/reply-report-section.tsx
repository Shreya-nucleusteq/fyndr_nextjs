"use client";

import { Flag, MessageCircleMore } from "lucide-react";

import Button from "@/components/global/buttons";
import { useUser } from "@/hooks/auth";
import { Comment } from "@/types/business/business.types";

import ReplyModal from "./reply-modal";
import ReportModal from "./report-modal";
import { ReviewBusinessProps } from "../business-ratings-and-reviews";

type Props = {
  business: ReviewBusinessProps;
  comment: Comment;
  qrCode: string;
};

const ReplyReportSection = ({ business, comment, qrCode }: Props) => {
  const { isLoading, user } = useUser();
  if (isLoading || !user || !business.bizid) return null;
  if (business.bizid !== user.bizid) return null;

  return (
    <div className="flex-center w-full">
      <div className="grid w-full max-w-xl grid-cols-2 gap-4 xl:gap-8">
        <ReplyModal
          trigger={
            <Button
              variant="primary-outlined"
              stdHeight
              className="flex w-full lg:gap-6"
            >
              Reply <MessageCircleMore size={20} className="size-5" />
            </Button>
          }
          comment={comment}
          bizId={business.bizid}
          bizLogo={business.mainLogo}
          bizName={business.bizName}
          qrCode={qrCode}
        />
        {comment.isReportingAllowed ? (
          <ReportModal
            trigger={
              <Button
                variant="primary-outlined"
                stdHeight
                className="flex !w-full lg:gap-6"
              >
                Report <Flag size={20} className="size-5" />
              </Button>
            }
            comment={comment}
            bizId={business.bizid}
            bizName={business.bizName}
            qrCode={qrCode}
          />
        ) : (
          <Button
            variant="primary-outlined"
            stdHeight
            disabled
            className="flex !w-full lg:gap-6"
          >
            Report <Flag size={20} className="size-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReplyReportSection;
