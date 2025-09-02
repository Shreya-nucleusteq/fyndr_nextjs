import { Dayjs } from "dayjs";

// Core date input types
export type DateInput = Date | string | number | Dayjs;

// Time units for date manipulation
export type TimeUnit =
  | "days"
  | "day"
  | "weeks"
  | "week"
  | "months"
  | "month"
  | "years"
  | "year"
  | "hours"
  | "hour"
  | "minutes"
  | "minute"
  | "seconds"
  | "second"
  | "milliseconds"
  | "millisecond";

// Date formatting types
export type DateFormatType =
  | "short" // MM/DD/YYYY
  | "medium" // Jan 1, 2024
  | "long" // January 1, 2024
  | "full" // Monday, January 1, 2024
  | "iso" // 2024-01-01T00:00:00.000Z
  | "time" // 12:00 PM
  | "datetime" // Jan 1, 2024 12:00 PM
  | "relative"; // 2 hours ago

// Custom date range interface (to avoid conflict with react-day-picker)
export interface CustomDateRange {
  start: Date;
  end: Date;
}

// Timezone information
export interface TimezoneInfo {
  name: string;
  offset: string;
  abbreviation: string;
}

// Common date range keys
export type CommonDateRangeKey =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "lastWeek"
  | "thisMonth"
  | "lastMonth"
  | "thisYear"
  | "lastYear"
  | "last7Days"
  | "last30Days"
  | "last90Days";

// Date range collection type
export type CommonDateRanges = Record<CommonDateRangeKey, CustomDateRange>;

// Weekday constants type
export type WeekdayName =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type ShortWeekdayName =
  | "Sun"
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat";

// Month constants type
export type MonthName =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type ShortMonthName =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

// Utility types for date operations
export type DateComponentType =
  | "year"
  | "month"
  | "date"
  | "hour"
  | "minute"
  | "second";
export type WeekdayDirection = "next" | "previous";
export type BetweenInclusivity = "()" | "[)" | "(]" | "[]";

// Parse formats array type
export type DateParseFormats = string[];
