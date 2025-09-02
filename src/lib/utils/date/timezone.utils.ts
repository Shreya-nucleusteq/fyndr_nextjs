import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { toDayjs } from "./conversion.utils";
import { DateInput, TimezoneInfo } from "./types";

dayjs.extend(utc);
dayjs.extend(timezone);

export function toTimezone(date: DateInput, timezone: string): Date {
  return toDayjs(date).tz(timezone).toDate();
}

export function getCurrentTimezone(): TimezoneInfo {
  const now = dayjs();
  return {
    name: Intl.DateTimeFormat().resolvedOptions().timeZone,
    offset: now.format("Z"),
    abbreviation: now.format("z"),
  };
}

export function utcToLocal(date: DateInput): Date {
  return toDayjs(date).utc().local().toDate();
}

export function localToUtc(date: DateInput): Date {
  return toDayjs(date).utc().toDate();
}
