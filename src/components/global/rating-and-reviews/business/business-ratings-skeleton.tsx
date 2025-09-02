import React from "react";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  compact?: boolean;
  className?: string;
};

const BusinessRatingSkeleton = ({ compact, className }: Props) => {
  if (compact) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        {/* Star rating skeleton - 5 stars */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="size-5 rounded-sm" />
          ))}
        </div>

        {/* Rating text skeleton */}
        <Skeleton className="h-4 w-16" />

        {/* Total reviews skeleton */}
        <Skeleton className="h-4 w-20" />
      </div>
    );
  }

  // Detailed view skeleton
  return (
    <div className="w-full">
      <div className={cn("grid grid-cols-5", className)}>
        {/* Overall rating column */}
        <div className="col-span-1 content-center justify-self-end text-black-80">
          <div className="text-center">
            <Skeleton className="mx-auto h-12 w-16 xs:h-14 xs:w-20 lg:h-16 lg:w-24" />
          </div>
          <div className="mt-2 text-center">
            <Skeleton className="mx-auto h-5 w-16" />
          </div>
        </div>

        {/* Separator column */}
        <div className="col-span-1 justify-self-center">
          <Separator
            orientation="vertical"
            className="h-32 w-px bg-secondary-20"
          />
        </div>

        {/* Rating bars column */}
        <div className="col-span-3 w-full space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-center flex w-full gap-2">
              {/* Star rating number */}
              <div className="flex-center gap-1">
                <Skeleton className="h-4 w-2" />
                <Skeleton className="size-4 rounded-sm" />
              </div>

              {/* Progress bar and count */}
              <div className="flex-center w-full gap-2">
                <Skeleton className="h-[5px] flex-1 rounded-full" />
                <Skeleton className="size-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessRatingSkeleton;
