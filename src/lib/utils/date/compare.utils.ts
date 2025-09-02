/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import { toDayjs } from "./conversion.utils";
import { BetweenInclusivity, DateInput, TimeUnit } from "./types";

dayjs.extend(isBetween);

export function isAfterDate(date: DateInput, compareDate: DateInput): boolean {
  return toDayjs(date).isAfter(toDayjs(compareDate));
}

export function isBeforeDate(date: DateInput, compareDate: DateInput): boolean {
  return toDayjs(date).isBefore(toDayjs(compareDate));
}

export function isSameDate(
  date1: DateInput,
  date2: DateInput,
  unit: TimeUnit = "day"
): boolean {
  const normalizedUnit = unit.toLowerCase().replace(/s$/, "") as any;
  return toDayjs(date1).isSame(toDayjs(date2), normalizedUnit);
}

export function isBetweenDates(
  date: DateInput,
  startDate: DateInput,
  endDate: DateInput,
  unit: TimeUnit = "day",
  inclusivity: BetweenInclusivity = "[]"
): boolean {
  const normalizedUnit = unit.toLowerCase().replace(/s$/, "") as any;
  return toDayjs(date).isBetween(
    toDayjs(startDate),
    toDayjs(endDate),
    normalizedUnit,
    inclusivity
  );
}
