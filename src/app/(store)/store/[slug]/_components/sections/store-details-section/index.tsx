import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Phone, Globe, Timer, MapPin } from "lucide-react";
import React, { Suspense } from "react";

import BusinessLocationMapModal from "@/app/(listing)/offer-listing/_components/business-location-map-modal";
import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import PlaceholderImage from "@/components/global/placeholder-image";
import BusinessRatings from "@/components/global/rating-and-reviews/business/business-rating";
import BusinessRatingSkeleton from "@/components/global/rating-and-reviews/business/business-ratings-skeleton";
import WebsiteTo from "@/components/global/website-to";
import { Skeleton } from "@/components/ui/skeleton";
import { parseAddress } from "@/lib/utils/address";
import { GetStoreResponse } from "@/types/store/store.response";

import ActiveOffersAndMap from "./active-offers-and-map";

// Enable custom parse format plugin for dayjs
dayjs.extend(customParseFormat);

type WorkingHoursResult = {
  status: "open" | "closed";
  message: string;
} | null;

export const getClosingTime = (
  workingHours?: string | null
): WorkingHoursResult => {
  if (
    !workingHours ||
    typeof workingHours !== "string" ||
    workingHours.trim().length === 0
  ) {
    return null;
  }

  try {
    const now = dayjs();
    const currentDay = now.day(); // 0 = Sunday, 1 = Monday, etc.

    const dayIndexMap: Record<number, string> = {
      1: "Mo",
      2: "Tu",
      3: "We",
      4: "Th",
      5: "Fr",
      6: "Sa",
      0: "Su",
    };

    const todayAbbr = dayIndexMap[currentDay];
    if (!todayAbbr) {
      return null;
    }

    // Split working hours by semicolon and find today's hours
    const hoursSegments = workingHours
      .split(";")
      .map((segment) => segment.trim());

    const todaySegment = hoursSegments.find((segment) =>
      segment.toLowerCase().startsWith(todayAbbr.toLowerCase())
    );

    if (!todaySegment) {
      return {
        status: "closed",
        message: "Closed today",
      };
    }

    const timeRange = todaySegment.substring(2).trim();

    // Handle special cases like "closed" or no time range
    if (!timeRange || timeRange.toLowerCase().includes("closed")) {
      return {
        status: "closed",
        message: "Closed today",
      };
    }

    // Parse time range (format: "06:30-12:00")
    const timeRangeParts = timeRange.split("-");
    if (timeRangeParts.length !== 2) {
      return null;
    }

    const [openTimeStr, closeTimeStr] = timeRangeParts.map((time) =>
      time.trim()
    );

    // Validate time format (HH:mm)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(openTimeStr) || !timeRegex.test(closeTimeStr)) {
      return null;
    }

    // Create dayjs objects for today's opening and closing times
    const openTime = dayjs(
      `${now.format("YYYY-MM-DD")} ${openTimeStr}`,
      "YYYY-MM-DD HH:mm"
    );
    const closeTime = dayjs(
      `${now.format("YYYY-MM-DD")} ${closeTimeStr}`,
      "YYYY-MM-DD HH:mm"
    );

    // Handle edge case where closing time is before opening time (next day closing)
    const adjustedCloseTime = closeTime.isBefore(openTime)
      ? closeTime.add(1, "day")
      : closeTime;

    // Determine current status
    const isCurrentlyOpen =
      now.isAfter(openTime) && now.isBefore(adjustedCloseTime);

    if (isCurrentlyOpen) {
      const formattedCloseTime = adjustedCloseTime.format("h:mm A");
      return {
        status: "open",
        message: `Open until ${formattedCloseTime}`,
      };
    } else {
      return {
        status: "closed",
        message: "Closed",
      };
    }
  } catch (error) {
    // Log error in development/debugging
    if (process.env.NODE_ENV === "development") {
      console.warn("Error parsing working hours:", error);
    }
    return null;
  }
};

type Props = {
  parentLocation: GetStoreResponse["parentLocation"];
  businessLogo: string;
  businessName: string;
  bizId: number;
  website: string;
  locationId: number | null;
};

const StoreDetailsSection = ({
  bizId,
  businessLogo,
  businessName,
  parentLocation,
  website,
  locationId,
}: Props) => {
  const closingHourResult =
    parentLocation &&
    parentLocation?.workingHours !== null &&
    parentLocation?.workingHours?.length > 5
      ? getClosingTime(parentLocation?.workingHours || null)
      : null;

  return (
    <DefaultCard className="flex size-full flex-col p-0 sm:max-w-72 lg:min-w-96 lg:max-w-96">
      <div className="flex flex-col gap-4 border-b border-secondary-20 p-4">
        <PlaceholderImage
          src={businessLogo}
          alt={businessName}
          height={300}
          width={300}
          className="size-32 rounded-full"
        />
        <h2 className="heading-5 text-secondary">{businessName}</h2>
        <Suspense fallback={<BusinessRatingSkeleton compact />}>
          <BusinessRatings bizId={bizId} compact className="flex-wrap" />
        </Suspense>
      </div>
      <div className="relative flex size-full flex-col">
        <div className="body-2 flex flex-col gap-4 border-b border-secondary-20 p-4 py-8 text-black-50">
          {
            parseAddress(parentLocation, {
              compactMode: true,
            }).formatted
          }
        </div>
        {parentLocation?.phone && (
          <div className="flex flex-col gap-2 border-b border-secondary-20 p-4 py-8">
            <div className="flex items-center gap-2 text-black-60">
              <Phone size={20} /> Contact Number
            </div>
            <div className="text-black-50">{parentLocation.phone}</div>
          </div>
        )}
        {closingHourResult && (
          <div className="flex flex-col gap-2 border-b border-secondary-20 p-4 py-8">
            <div className="flex items-center gap-2 text-black-60">
              <Timer size={20} />
              Store Hours
            </div>
            <div className="text-black-50">{closingHourResult.message}</div>
          </div>
        )}
        {website && (
          <div className="flex flex-col gap-2 border-b border-secondary-20 p-4 py-8">
            <div className="flex items-center gap-2 text-black-60">
              <Globe size={20} /> Website
            </div>
            <WebsiteTo url={website}>
              <div className="text-left text-black-50 underline">{website}</div>
            </WebsiteTo>
          </div>
        )}

        <div className="flex flex-col gap-2 p-4 py-8">
          {locationId && parentLocation.lat && parentLocation.lng && (
            <BusinessLocationMapModal
              trigger={
                <Button variant="primary" stdHeight className="w-full">
                  <MapPin size={20} /> Get Directions
                </Button>
              }
              address=""
              id={locationId.toString()}
              location={{
                lat: parentLocation.lat,
                lng: parentLocation.lng,
              }}
            />
          )}
          <Suspense fallback={<Skeleton className="h-11 w-full !rounded-10" />}>
            <ActiveOffersAndMap
              locationId={locationId}
              locQrId={parentLocation.qrid}
            />
          </Suspense>
        </div>
      </div>
    </DefaultCard>
  );
};

export default StoreDetailsSection;
