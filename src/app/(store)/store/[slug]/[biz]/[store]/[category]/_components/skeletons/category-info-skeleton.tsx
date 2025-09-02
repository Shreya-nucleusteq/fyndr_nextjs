import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const CategoryInfoSkeleton = () => {
  return (
    <div className="flex-center flex-col gap-4 rounded-10 bg-transparent">
      {/* Category name skeleton */}
      <Skeleton className="h-6 w-32 bg-white/20 md:h-8 md:w-40" />

      {/* Store link skeleton */}
      <div className="flex-center gap-2 rounded-10 bg-white px-6 py-4">
        <span className="flex-center gap-2 md:gap-4">
          {/* Store icon skeleton */}
          <Skeleton className="!size-4 md:!size-6" />

          {/* Store name skeleton */}
          <Skeleton className="h-4 w-20 md:h-6 md:w-24" />
        </span>

        {/* Separator and category name skeleton */}
        <span className="flex-center gap-2">
          <Skeleton className="h-4 w-2" /> {/* "/" separator */}
          <Skeleton className="h-4 w-16 md:w-20" />
        </span>
      </div>
    </div>
  );
};

export default CategoryInfoSkeleton;
