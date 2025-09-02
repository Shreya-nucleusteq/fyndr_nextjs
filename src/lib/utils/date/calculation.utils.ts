/* eslint-disable @typescript-eslint/no-explicit-any */
import { addBusinessDays, differenceInDays, isWeekend } from "date-fns";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import weekOfYear from "dayjs/plugin/weekOfYear";

import { toDate, toDayjs } from "./conversion.utils";
import {
  CommonDateRanges,
  CustomDateRange,
  DateInput,
  TimeUnit,
  WeekdayDirection,
} from "./types";

dayjs.extend(isSameOrBefore);
dayjs.extend(isLeapYear);
dayjs.extend(weekOfYear);

export const getTimeStamp = (createdAt: DateInput): string => {
  const date = toDate(createdAt);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

export function getDateDifference(
  date1: DateInput,
  date2: DateInput,
  unit: TimeUnit = "days"
): number {
  const normalizedUnit = unit.toLowerCase().replace(/s$/, "") as any;
  return toDayjs(date1).diff(toDayjs(date2), normalizedUnit);
}

export function calculateAge(
  birthDate: DateInput,
  referenceDate: DateInput = new Date()
): number {
  return toDayjs(referenceDate).diff(toDayjs(birthDate), "year");
}

export function getDaysUntil(
  targetDate: DateInput,
  fromDate: DateInput = new Date()
): number {
  return toDayjs(targetDate).diff(toDayjs(fromDate), "day");
}

export function getBusinessDaysBetween(
  startDate: DateInput,
  endDate: DateInput
): number {
  const start = toDate(startDate);
  const end = toDate(endDate);
  return (
    differenceInDays(addBusinessDays(start, 0), start) +
    Math.floor((differenceInDays(end, start) * 5) / 7)
  );
}

// ===== DATE RANGE UTILITIES =====

export function createDateRange(
  start: DateInput,
  end: DateInput
): CustomDateRange {
  return {
    start: toDate(start),
    end: toDate(end),
  };
}

export function isInDateRange(
  date: DateInput,
  range: CustomDateRange
): boolean {
  const checkDate = toDate(date);
  return checkDate >= range.start && checkDate <= range.end;
}

export function getDatesInRange(
  start: DateInput,
  end: DateInput,
  step: number = 1,
  unit: TimeUnit = "days"
): Date[] {
  const dates: Date[] = [];
  let current = toDayjs(start);
  const endDate = toDayjs(end);
  const normalizedUnit = unit.toLowerCase().replace(/s$/, "") as any;

  while (current.isSameOrBefore(endDate)) {
    dates.push(current.toDate());
    current = current.add(step, normalizedUnit);
  }

  return dates;
}

// ===== SPECIAL DATE UTILITIES =====

export function isLeapYearDate(date: DateInput): boolean {
  return toDayjs(date).isLeapYear();
}

export function getWeekOfYear(date: DateInput): number {
  return toDayjs(date).week();
}

export function getQuarter(date: DateInput): number {
  return Math.ceil((toDayjs(date).month() + 1) / 3);
}

export function isWeekendDate(date: DateInput): boolean {
  return isWeekend(toDate(date));
}

export function getNextWeekday(
  date: DateInput,
  weekday: number,
  direction: WeekdayDirection = "next"
): Date {
  let current = toDayjs(date);
  const targetDay = weekday;

  if (direction === "next") {
    while (current.day() !== targetDay) {
      current = current.add(1, "day");
    }
  } else {
    while (current.day() !== targetDay) {
      current = current.subtract(1, "day");
    }
  }

  return current.toDate();
}

// ===== COMMON DATE PATTERNS =====

export const getCommonDateRanges = (
  referenceDate: DateInput = new Date()
): CommonDateRanges => {
  const ref = toDayjs(referenceDate);

  return {
    today: {
      start: ref.startOf("day").toDate(),
      end: ref.endOf("day").toDate(),
    },
    yesterday: {
      start: ref.subtract(1, "day").startOf("day").toDate(),
      end: ref.subtract(1, "day").endOf("day").toDate(),
    },
    thisWeek: {
      start: ref.startOf("week").toDate(),
      end: ref.endOf("week").toDate(),
    },
    lastWeek: {
      start: ref.subtract(1, "week").startOf("week").toDate(),
      end: ref.subtract(1, "week").endOf("week").toDate(),
    },
    thisMonth: {
      start: ref.startOf("month").toDate(),
      end: ref.endOf("month").toDate(),
    },
    lastMonth: {
      start: ref.subtract(1, "month").startOf("month").toDate(),
      end: ref.subtract(1, "month").endOf("month").toDate(),
    },
    thisYear: {
      start: ref.startOf("year").toDate(),
      end: ref.endOf("year").toDate(),
    },
    lastYear: {
      start: ref.subtract(1, "year").startOf("year").toDate(),
      end: ref.subtract(1, "year").endOf("year").toDate(),
    },
    last7Days: {
      start: ref.subtract(7, "day").startOf("day").toDate(),
      end: ref.endOf("day").toDate(),
    },
    last30Days: {
      start: ref.subtract(30, "day").startOf("day").toDate(),
      end: ref.endOf("day").toDate(),
    },
    last90Days: {
      start: ref.subtract(90, "day").startOf("day").toDate(),
      end: ref.endOf("day").toDate(),
    },
  };
};
