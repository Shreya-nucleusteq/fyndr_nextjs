"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  minDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
}) => {

   const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const fixedDate = new Date(date);
      fixedDate.setHours(12, 0, 0, 0); 
      onChange(fixedDate);
    } else {
      onChange(undefined);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
