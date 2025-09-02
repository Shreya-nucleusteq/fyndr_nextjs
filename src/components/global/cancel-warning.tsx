"use client";

import { CircleAlert } from "lucide-react";
import React, { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import Button from "./buttons";

type Props = {
  warningText: string;
  onCancel?: () => void;
  children: React.ReactNode;
};

const CancelWarning = ({ warningText, onCancel, children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleYes = () => {
    if (onCancel) {
      onCancel();
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4">
        <p className="body-3 flex gap-2 text-black-60">
          <span className="mt-[3px] text-yellow-500">
            <CircleAlert size={15} />
          </span>{" "}
          <span>{warningText}</span>
        </p>
        <div className="flex w-full justify-end gap-1">
          <Button 
            variant="primary" 
            className="body-3 h-7 !rounded-5 px-2 py-1"
            onClick={handleYes}
          >
            Yes
          </Button>

          <Button
            variant="primary-outlined"
            className="body-3 h-7 !rounded-5 px-2 py-1"
            onClick={() => setOpen(false)}
          >
            No
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CancelWarning;