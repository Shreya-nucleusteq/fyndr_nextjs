import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";

import { formatDate } from "../date";

export const getScheduleForLaterObj = (): AppointmentSlotPayload => {
  const date = formatDate(new Date(), "yyyy-MM-dd");
  const scheduleForLaterObj: AppointmentSlotPayload = {
    [date]: {
      startTime: "",
      endTime: "",
      bookingDay: date,
      locId: NaN,
      objId: NaN,
    },
  };
  return scheduleForLaterObj;
};
