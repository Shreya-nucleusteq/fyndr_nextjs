import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ActivePromoResponse } from "@/types/api-response/promocode.response";
type Props = {
  data: ActivePromoResponse | undefined;
};
const ActiveBar = ({ data }: Props) => {
  console.log("d", data);
  return (
    <div className="relative flex w-full space-x-4 overflow-x-scroll pb-4">
      {data?.map((item) => (
        <Card
          key={item.id}
          className={
            item.status === "INACTIVE"
              ? "w-[180px] shrink-0 bg-[#f0f0f0] grayscale"
              : "w-[180px] shrink-0"
          }
        >
          <Image
            src={item.imageUrl}
            height={200}
            width={200}
            alt="Card image"
            className="h-48 w-full rounded-10 object-cover"
          />
          <CardContent className="flex flex-col justify-evenly p-4">
            <p className="text-sm" style={{ color: "#257cdb" }}>
              {item.promoCode}
            </p>
            <p className="text-xs">Valid till {item.endDate} </p>
            <p className="text-xs">
              {item.promoCodeType === "REGISTRATION"
                ? "Registrations: "
                : "Redemptions: "}
              {item.userRegistered}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActiveBar;
