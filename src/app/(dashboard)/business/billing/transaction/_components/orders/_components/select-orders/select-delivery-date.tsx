"use client";

import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";

import { DateRangePicker } from "@/components/global/date-range-picker/date-range-picker";

const SelectDeliveryDate = () => {
  const [range, setRange] = useState<DateRange | undefined>();
  const router = useRouter();
  const searchParams = useSearchParams();


  useEffect(() => {
    const startDate = searchParams.get("orderStartDt");
    const endDate = searchParams.get("orderEndDt");
    
    if (startDate && endDate) {
      setRange({
        from: dayjs(startDate).toDate(),
        to: dayjs(endDate).toDate(),
      });
    }
  }, [searchParams]);

  const handleDateChange = (newRange: DateRange | undefined) => {
    setRange(newRange);

    const params = new URLSearchParams(searchParams.toString());

    if (!newRange?.from || !newRange?.to) {

      params.delete("orderStartDt");
      params.delete("orderEndDt");
    } else {
    
      params.set("orderStartDt", dayjs(newRange.from).format("YYYY-MM-DD"));
      params.set("orderEndDt", dayjs(newRange.to).format("YYYY-MM-DD"));
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <DateRangePicker
        value={range}
        onChange={handleDateChange}
        className="flex min-h-[46px] max-w-80 grow items-center gap-1 rounded-10 border border-secondary-20 bg-white px-4"
      />
    </div>
  );
};

export default SelectDeliveryDate;