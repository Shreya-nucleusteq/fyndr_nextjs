import {
  WeekdayName,
  MonthName,
  ShortWeekdayName,
  ShortMonthName,
} from "./types";

export const WEEKDAYS: readonly WeekdayName[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const MONTHS: readonly MonthName[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const SHORT_WEEKDAYS: readonly ShortWeekdayName[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

export const SHORT_MONTHS: readonly ShortMonthName[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;
