import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  enablePagination?: boolean;
  commentsCount?: number;
};

const CommentsSkeleton = ({
  enablePagination = false,
  commentsCount = 3,
}: Props) => {
  return (
    <div className="relative flex w-full flex-col gap-4">
      <div
        className={cn(
          "flex w-full flex-col gap-4",
          enablePagination ? "pb-16" : ""
        )}
      >
        {Array.from({ length: commentsCount }).map((_, index) => (
          <CommentCardSkeleton key={index} />
        ))}
      </div>

      {enablePagination && (
        <div className="absolute inset-x-0 bottom-0 rounded-b-10 bg-white p-4 shadow-pagination">
          {/* Pagination skeleton */}
          <div className="flex-center gap-2">
            {/* Previous button */}
            <Skeleton className="size-10 rounded-lg" />

            {/* Page buttons */}
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="size-10 rounded-lg" />
            ))}

            {/* Next button */}
            <Skeleton className="size-10 rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

const CommentCardSkeleton = () => {
  return (
    <div className="relative flex flex-col gap-6 rounded-10 bg-primary-0.5 p-4">
      {/* User info and rating section */}
      <div className="flex w-fit flex-col">
        {/* User avatar, name and date */}
        <div className="flex-center gap-1">
          <Skeleton className="size-8 rounded-full" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-24" /> {/* User name */}
            <Skeleton className="h-4 w-16" /> {/* Date */}
          </div>
        </div>

        {/* Star rating */}
        <div className="ml-9 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="size-5 rounded-sm" />
          ))}
        </div>
      </div>

      {/* Images section (optional - show sometimes) */}
      {Math.random() > 0.5 && (
        <div className="no-scrollbar flex gap-4 overflow-x-scroll">
          {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(
            (_, i) => (
              <Skeleton key={i} className="h-24 w-36 rounded-10" />
            )
          )}
        </div>
      )}

      {/* Review text section */}
      <div className="flex flex-col gap-4 rounded-10 bg-primary-10 p-4">
        {/* Review text */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Reply section (optional - show sometimes) */}
        {Math.random() > 0.6 && (
          <div className="space-y-4">
            <ReplyCardSkeleton />
            {Math.random() > 0.7 && <ReplyCardSkeleton />}
          </div>
        )}
      </div>

      {/* Reply/Report buttons section */}
      {/* <div className="flex-center w-full">
        <div className="grid w-full max-w-xl grid-cols-2 gap-4 xl:gap-8">
          <Skeleton className="h-11 w-full rounded-10" />
          <Skeleton className="h-11 w-full rounded-10" />
        </div>
      </div> */}
    </div>
  );
};

const ReplyCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 rounded-10 bg-white p-4">
      {/* Business info */}
      <div className="flex gap-1">
        <Skeleton className="size-6 rounded-full" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-20" /> {/* Business name */}
          <Skeleton className="h-4 w-16" /> {/* Date */}
        </div>
      </div>

      {/* Reply text */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
};

export default CommentsSkeleton;
