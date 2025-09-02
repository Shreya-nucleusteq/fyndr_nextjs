import dayjs, { Dayjs } from "dayjs";

import { DateInput } from "./types";

export function toDate(date: DateInput): Date {
  if (date instanceof Date) return date;
  if (dayjs.isDayjs(date)) return date.toDate();
  return new Date(date);
}

export function toDayjs(date: DateInput): Dayjs {
  if (dayjs.isDayjs(date)) return date;
  return dayjs(date);
}
