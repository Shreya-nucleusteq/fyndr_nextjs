import { format, formatDistanceToNow } from "date-fns";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import { toDate, toDayjs } from "./conversion.utils";
import { DateInput, DateFormatType } from "./types";

dayjs.extend(duration);

export function formatDate(
  date: DateInput,
  formatType: DateFormatType | string = "medium"
): string {
  const dateObj = toDate(date);

  switch (formatType) {
    case "short":
      return format(dateObj, "MM/dd/yyyy");
    case "medium":
      return format(dateObj, "MMM d, yyyy");
    case "long":
      return format(dateObj, "MMMM d, yyyy");
    case "full":
      return format(dateObj, "EEEE, MMMM d, yyyy");
    case "iso":
      return dateObj.toISOString();
    case "time":
      return format(dateObj, "h:mm a");
    case "datetime":
      return format(dateObj, "MMM d, yyyy h:mm a");
    case "relative":
      return formatDistanceToNow(dateObj, { addSuffix: true });
    default:
      return format(dateObj, formatType);
  }
}

export function formatDateLocale(
  date: DateInput,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {}
): string {
  return toDate(date).toLocaleDateString(locale, options);
}

export function formatDuration(
  startDate: DateInput,
  endDate: DateInput = new Date()
): string {
  const start = toDayjs(startDate);
  const end = toDayjs(endDate);
  const duration = dayjs.duration(end.diff(start));

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
