import Image from "next/image";
import React from "react";

import { ExpiredPromo } from "@/types/api-response/promocode.response";
type Props = {
  data: ExpiredPromo[] | undefined;
};
const Expiredpromos = ({ data }: Props) => {
  console.log("expired", data);
  return (
    <div>
      {data?.map((promo, key) => (
        <div
          key={key}
          className="mt-5 flex w-full rounded-10 border border-secondary-20"
        >
          <div>
            <Image
              height={80}
              alt="expired promocode"
              width={80}
              src={promo.imageUrl}
              className="size-[77.3134px] rounded-10"
            />
          </div>
          <div className="flex w-full flex-col justify-evenly px-4 pt-1">
            <div>
              <p className="text-sm" style={{ color: "#257cdb" }}>
                {promo.promoCode}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-sm">Expired on: {promo.endDate}</p>
              <p className="text-sm">Registrations: {promo.userRegistered}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Expiredpromos;
