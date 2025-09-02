import { isValid as isValidDate } from "date-fns";
import dayjs from "dayjs";

import { DateInput } from "./types";

export function isValidDateInput(date: unknown): date is DateInput {
  if (!date) return false;

  if (date instanceof Date) return isValidDate(date);
  if (typeof date === "string" || typeof date === "number") {
    return isValidDate(new Date(date));
  }
  if (dayjs.isDayjs(date)) return date.isValid();

  return false;
}
