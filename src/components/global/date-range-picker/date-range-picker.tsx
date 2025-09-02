"use client";

import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DateRangePickerProps = {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  numberOfMonths?: number;
  placeholder?: string;
  className?: string;
};

export const DateRangePicker = React.forwardRef<
  HTMLButtonElement,
  DateRangePickerProps
>(
  (
    {
      value,
      onChange,
      numberOfMonths = 2,
      placeholder = "Select date range",
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value?.from && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} -{" "}
                  {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
            {value?.from && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto size-4 p-0 hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.(undefined);
                }}
              >
                <X className="size-3" />
              </Button>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={(range) => {
              onChange?.(range);
              if (range?.from && range?.to) {
                setOpen(false);
              }
            }}
            numberOfMonths={numberOfMonths}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";
