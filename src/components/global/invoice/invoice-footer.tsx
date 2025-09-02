import Image from "next/image";
import React from "react";

import { email, phoneNumber } from "@/common/config";

const Invoicefooter = () => {
  return (
    <div className="flex w-full justify-between rounded-b-10 bg-black-100 px-4 py-2 text-white ">
      <div className="flex items-center space-x-2">
        <Image
          alt="mtlIcon"
          className="size-[20px]"
          src={"/images/invoice/globe.svg"}
          width={20}
          height={20}
        />
        <a
          className="mr-[10px] text-center text-base font-normal not-italic leading-[27px] text-white"
          href="https://www.fyndr.us"
          target="_blank"
        >
          www.fyndr.us
        </a>
      </div>
      <div className="flex items-center space-x-2">
        <Image
          className="size-[20px]"
          alt="phoneIcon"
          src={"/images/invoice/phone2.svg"}
          width={20}
          height={20}
        />
        <a
          className="mr-[10px] text-base font-normal not-italic  text-white"
          href={`tel:${phoneNumber}`}
        >
          {phoneNumber}
        </a>
      </div>
      <div className="flex items-center space-x-2">
        <Image
          width={20}
          height={20}
          className="size-[20px]"
          alt="mailIcon"
          src={"/images/invoice/mail.svg"}
        />
        <a
          className="mr-[10px] text-base font-normal not-italic  text-white"
          href={`mailto:${email}`}
        >
          {email}
        </a>
      </div>
    </div>
  );
};

export default Invoicefooter;
