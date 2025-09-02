import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Info } from "lucide-react";
import Image from "next/image";
import React from "react";

import WebsiteTo from "./website-to";
import { Button } from "../ui/button";

type BizInfoProps = {
  label?: string; 
  link?: string; 
  icon: React.ReactNode; 
  phone?: number;
  showInfo?: boolean;
  showStore?: boolean;
};

const BizInfo: React.FC<BizInfoProps> = ({
  link,
  label,
  icon,
  phone,
  showInfo,
  showStore,
}) => {
  return (
    <div className="max-w-[96%]">
      <div className="flex justify-between">
        <div className="mt-2 flex gap-1">
          <span>{icon}</span>
          {link && (
            <WebsiteTo url={`https://${link}`}>
              <span className="inline-block max-w-full cursor-pointer break-words text-start text-blue-500 underline">
                {link}
              </span>
            </WebsiteTo>
          )}
          {/* {phone !== undefined && isMobile() ? (
              <text onClick={() => callback(true)}>{phone}</text>
            ) : (
              <text onClick={() => callback(true)}>{phone}</text>
            )} */}
          {label !== undefined && (
            <span className="cursor-pointer text-sm font-normal leading-5 text-black-80">
              {label}
            </span>
          )}
          {showInfo && (
            <Popover>
              <PopoverTrigger asChild>
                <span className="ml-2 cursor-pointer text-primary">
                  <Info className="size-4" />
                </span>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-96 text-sm font-normal">
                This is the sharable URL of the campaign
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div>
          {!phone && showStore && (
            <Button
              onClick={() => {
                alert("this is store");
              }}
              variant="default"
              className="mt-3 rounded-5 pl-2.5"
            >
              <Image
                src={"/images/invoice/Store.svg"}
                alt="store"
                width={20}
                height={20}
                className="inline-block"
              />
              View Store
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BizInfo;
