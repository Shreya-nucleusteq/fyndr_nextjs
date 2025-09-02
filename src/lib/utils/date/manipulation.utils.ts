/* eslint-disable @typescript-eslint/no-explicit-any */
import { toDayjs } from "./conversion.utils";
import { DateComponentType, DateInput, TimeUnit } from "./types";

export function addDays(date: DateInput, days: number): Date {
  return toDayjs(date).add(days, "day").toDate();
}

export function addToDate(
  date: DateInput,
  amount: number,
  unit: TimeUnit = "days"
): Date {
  const normalizedUnit = unit.toLowerCase().replace(/s$/, "") as any;
  return toDayjs(date).add(amount, normalizedUnit).toDate();
}

export function subtractFromDate(
  date: DateInput,
  amount: number,
  unit: TimeUnit = "days"
): Date {
  return addToDate(date, -amount, unit);
}

export function startOf(date: DateInput, unit: TimeUnit): Date {
  const normalizedUnit = unit.toLowerCase().replace(/s$/, "") as any;
  return toDayjs(date).startOf(normalizedUnit).toDate();
}

export function endOf(date: DateInput, unit: TimeUnit): Date {
  const normalizedUnit = unit.toLowerCase().replace(/s$/, "") as any;
  return toDayjs(date).endOf(normalizedUnit).toDate();
}

export function setDateComponent(
  date: DateInput,
  component: DateComponentType,
  value: number
): Date {
  return toDayjs(date).set(component, value).toDate();
}
