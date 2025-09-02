import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import isLeapYear from "dayjs/plugin/isLeapYear";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(isLeapYear);
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

export {
  calculateAge,
  createDateRange,
  getBusinessDaysBetween,
  getDateDifference,
  getDatesInRange,
  getNextWeekday,
  getQuarter,
  getDaysUntil,
  getWeekOfYear,
  isInDateRange,
  isLeapYearDate,
  isWeekendDate,
  getCommonDateRanges,
  getTimeStamp,
} from "./calculation.utils";
export {
  isAfterDate,
  isBeforeDate,
  isBetweenDates,
  isSameDate,
} from "./compare.utils";
export { toDate, toDayjs } from "./conversion.utils";
export { formatDate, formatDateLocale, formatDuration } from "./format.utils";
export {
  addDays,
  addToDate,
  endOf,
  setDateComponent,
  startOf,
  subtractFromDate,
} from "./manipulation.utils";
export { parseDate, parseISO8601 } from "./parser.utils";
export {
  getCurrentTimezone,
  localToUtc,
  toTimezone,
  utcToLocal,
} from "./timezone.utils";
export { isValidDateInput } from "./validation.utils";
