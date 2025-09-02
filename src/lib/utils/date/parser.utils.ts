import { parseISO, isValid as isValidDate } from "date-fns";
import dayjs from "dayjs";

import { DateParseFormats } from "./types";
import { isValidDateInput } from "./validation.utils";

export function parseDate(
  dateString: string,
  formats?: DateParseFormats
): Date | null {
  const defaultFormats = [
    "YYYY-MM-DD",
    "MM/DD/YYYY",
    "DD/MM/YYYY",
    "YYYY/MM/DD",
    "MMM DD, YYYY",
    "MMMM DD, YYYY",
    "DD MMM YYYY",
    "DD MMMM YYYY",
  ];

  const formatsToTry = formats || defaultFormats;

  for (const formatStr of formatsToTry) {
    const parsed = dayjs(dateString, formatStr, true);
    if (parsed.isValid()) {
      return parsed.toDate();
    }
  }

  const nativeParsed = new Date(dateString);
  return isValidDateInput(nativeParsed) ? nativeParsed : null;
}

export function parseISO8601(dateString: string): Date | null {
  try {
    const parsed = parseISO(dateString);
    return isValidDate(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
