import React from "react";

import Button from "@/components/global/buttons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface ButtonsProps {
  btn1: string;
  btn2?: string | boolean;
  onClick1?: () => void;
  onClick2?: () => void;
  showPopover?: boolean;
}

export default function Buttons({
  btn1,
  btn2,
  onClick1,
  onClick2,
  showPopover,
}: ButtonsProps) {
  return (
    <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row">
      <Button
        onClick={onClick1}
        className="h-[46px] w-full rounded-10 border border-primary bg-primary-0.5 text-primary hover:border-primary hover:bg-primary-0.5 hover:text-primary hover:shadow-none md:w-1/2"
      >
        {btn1}
      </Button>

      <div className="w-full md:w-1/2">
        {showPopover ? (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <div>
              <p>
                In case of any issues
                <br />
                regarding disputes please contact
                <br />
                <a
                  href="mailto:admin@fyndr.us"
                  className="text-primary underline"
                >
                  admin@fyndr.us
                </a>
              </p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <i className="  mt-1 cursor-pointer text-primary" />
              </PopoverTrigger>
              <PopoverContent className="w-56 text-sm">
                Dispute can only be raised within 30 days of purchase.
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          btn2 && (
            <Button
              onClick={onClick2}
              className="h-[46px] w-full rounded-10 border border-[#ED0C10] bg-white px-4 py-2 text-[16px] text-[#ED0C10] hover:border-[#ED0C10] hover:bg-white hover:text-[#ED0C10]"
            >
              {btn2}
            </Button>
          )
        )}
      </div>
    </div>
  );
}
