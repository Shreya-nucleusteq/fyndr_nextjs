import { Copy } from "lucide-react";
import React, { Suspense } from "react";

import CopyUrl from "@/app/(store)/store/[slug]/_components/copy-url";
import PlaceholderImage from "@/components/global/placeholder-image";
import { cn } from "@/lib/utils";

import CategoryInfo from "./category-info";
import CategoryInfoSkeleton from "../../skeletons/category-info-skeleton";

type Props = {
  imgURL: string;
  alt: string;
  className?: string;
  storeUrl: string;
  locationId: number;
  categoryId: number;
  catalogueId: number;
  bizId: number;
  storeName: string;
};

const BannerSection = ({
  imgURL,
  alt,
  className,
  locationId,
  storeUrl,
  bizId,
  catalogueId,
  categoryId,
  storeName,
}: Props) => {
  return (
    <div className={cn(`relative`, className)}>
      <PlaceholderImage
        src={imgURL}
        alt={alt}
        height={500}
        width={500}
        className="aspect-[5/3] max-h-[36rem] w-full rounded-10 object-cover"
      />
      <div className="absolute inset-0 rounded-10 bg-black/50 opacity-80"></div>
      <div className="absolute right-4 top-4 z-10">
        <CopyUrl>
          <div className="rounded-full bg-black/30 p-2 text-white md:p-4 ">
            <Copy className="size-4 md:!size-7" />
          </div>
        </CopyUrl>
      </div>
      <div className="flex-center absolute inset-0 rounded-10 bg-transparent">
        <Suspense fallback={<CategoryInfoSkeleton />}>
          <CategoryInfo
            bizId={bizId}
            catalogueId={catalogueId}
            categoryId={categoryId}
            locationId={locationId}
            storeName={storeName}
            storeUrl={storeUrl}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default BannerSection;
