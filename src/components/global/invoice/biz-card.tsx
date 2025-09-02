import { Globe } from "lucide-react";
import Image from "next/image";
import React from "react";

import { ChannelOffer } from "@/lib/utils";
import {
  GiftDetails,
  InvoiceOffer,
} from "@/types/api-response/transaction.response";

import BizInfo from "../biz-info";

type BizCardProps = {
  businessLogo: string;
  businessName: string;
  businessWebsite: string;
  businessAddonUrl: string;
  businessAddress: string;
  businessPhone: string;
  channel: ChannelOffer | string;
  vouchers: InvoiceOffer[] | null;
  giftDetails: GiftDetails | null;
  invoiceId: number | null;
  reviewRatings?: React.ReactNode;
};
const Bizcard: React.FC<BizCardProps> = ({
  businessLogo,
  channel,
  businessName,
  businessWebsite,
  businessAddonUrl,
  businessAddress,
  invoiceId,
  giftDetails,
  vouchers,
  reviewRatings,
}) => {
  const isVoucherImage = vouchers?.some((item) => item.isVoucher);
  return (
    <div className="flex justify-between">
      <div className="flex flex-col ">
        <div className="flex gap-4">
          {businessLogo && (
            <div>
              <Image
                src={businessLogo}
                alt="businessLogo"
                loading="lazy"
                height={75}
                width={150}
                className="aspect-[2/1] h-[75px] rounded-10 object-cover"
              />
            </div>
          )}

          <div
            className={`${businessLogo ? "w-[55%]" : "w-full"} flex flex-col justify-between`}
          >
            <p className="text-base font-medium text-black">{businessName}</p>

            {channel !== "cmpn_promo" && (
              <div className="flex ">{reviewRatings}</div>
            )}
          </div>
        </div>

        {channel !== "cmpn_promo" && channel !== "promo" && (
          <div className="my-2">
            {businessWebsite && (
              <BizInfo
                link={businessWebsite}
                icon={
                  <Image
                    src={"/images/invoice/invoiceheader/offer-globe.svg"}
                    className="size-5"
                    alt="Globe"
                    width={101}
                    height={90}
                  />
                }
              />
            )}

            {businessAddonUrl && (
              <BizInfo
                link={businessAddonUrl}
                icon={<Globe className="size-5 text-[#ffa33a]" />}
              />
            )}

            {businessAddress && (
              <BizInfo
                label={businessAddress}
                icon={
                  <Image
                    src={"/images/invoice/invoiceheader/invoiceloc.svg"}
                    className="size-5"
                    alt="Loc"
                    width={101}
                    height={90}
                  />
                }
              />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col self-start text-right">
        <div className="flex justify-end">
          <span className="text-sm font-semibold leading-5 text-black-60 ">
            Invoice ID: {invoiceId}
          </span>
        </div>
        <div className="flex flex-col justify-end">
          {(channel === "offers" || channel === "offer_appointment") &&
            giftDetails !== null && (
              <Image
                src={"/images/invoice/invoiceheader/giftBox.svg"}
                width={101}
                height={90}
                style={{ objectFit: "contain" }}
                alt="Gift"
                priority={false} // equivalent to preview={false} for Next.js Image
              />
            )}

          {(channel === "offers" || channel === "offer_appointment") &&
            isVoucherImage && (
              <Image
                src={"/images/invoice/invoiceheader/voucherIcon.png"}
                width={101}
                height={90}
                style={{ objectFit: "contain" }}
                alt="Voucher Icon"
                priority={false}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default Bizcard;
