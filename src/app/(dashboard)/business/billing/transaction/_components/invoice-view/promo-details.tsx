import dayjs from "dayjs";
import React from "react";

import { capitalize, getTruncatedTitle } from "@/lib/utils";

type InvoicePromodetailsProps = {
  channel: string;
  title: string;
  promoChannels: string;
  duration: number | null;
  startDate: string |Date;
  userTimeZone: string | undefined;
  endDate: string |Date;
  invoiceDt: string;
};

const InvoicePromodetails = ({
  channel,
  title,
  promoChannels,
  duration,
  userTimeZone,
  startDate,
  endDate,
  invoiceDt,
}: InvoicePromodetailsProps) => {
  return (
    <div>
      {(channel === "cmpn_promo" || channel === "promo") && (
        <>
          <div className="mb-[8px] flex justify-between">
            <span className="text-[14px] font-semibold leading-[20px] text-black-70">
              Campaign Name:
            </span>
            <span className="ml-4 flex-1 text-right text-[14px] font-semibold leading-[20px] text-black-80">
              {title.includes(":")
                ? getTruncatedTitle(title.split(":")[1].trim())
                : getTruncatedTitle(title)}
            </span>
          </div>

          {promoChannels.includes("featured") && (
            <>
              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                  Featured:
                </span>
                <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                  Yes
                </span>
              </div>

              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                  Featured Duration:
                </span>
                <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                  {`${duration} ${duration === 1 ? "Month" : "Months"}`}
                </span>
              </div>

              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                  Featured Start Date:
                </span>
                <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                  {dayjs.tz(startDate, userTimeZone).format("MMM DD, YYYY")}
                </span>
              </div>

              <div className="mb-[8px] flex justify-between">
                <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                  Featured End Date:
                </span>
                <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                  {dayjs.tz(endDate, userTimeZone).format("MMM DD, YYYY")}
                </span>
              </div>
            </>
          )}

          {(promoChannels.includes("mobile_push") ||
            promoChannels.includes("email")) && (
            <div className="mb-[8px] flex justify-between">
              <span className="text-[14px] font-semibold leading-[20px] text-black-70">
                Promotion type:
              </span>
              <span className="text-[14px] font-semibold leading-[20px] text-black-80">
                {promoChannels
                  .split(",")
                  .filter((ch: string) => ch !== "in_app" && ch !== "featured")
                  .map((ch: string) =>
                    ch === "mobile_push" ? "Phone" : capitalize(ch)
                  )
                  .join(", ")}
              </span>
            </div>
          )}

          <div className="mb-[8px] flex justify-between">
            <span className="text-[14px] font-semibold leading-[20px] text-black-70">
              Promotion Date:
            </span>
            <span className="text-[14px] font-semibold leading-[20px] text-black-80">
              {dayjs.tz(invoiceDt, userTimeZone).format("MMM DD, YYYY")}
            </span>
          </div>

          <div className="mb-[8px] flex justify-between">
            <span className="text-[14px] font-semibold leading-[20px] text-black-70">
              Promotion Time:
            </span>
            <span className="text-[14px] font-semibold leading-[20px] text-black-80">
              {dayjs.tz(invoiceDt, userTimeZone).format("hh:mm A")}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoicePromodetails;
