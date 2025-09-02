"use client";

import React, { useState } from "react";

import { onGetGooglePermission } from "@/actions/auth.actions";
import AppointmentConsentModal from "@/components/global/appointment/appointment-consent-modal";
import SlotBooking from "@/components/global/appointment/slot-booking";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import { getScheduleForLaterObj } from "@/lib/utils/appointment";
import { formatDate } from "@/lib/utils/date";
import { AppointmentSlot } from "@/types/appointment/appointment.types";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";
import { useCalendarConsentStore } from "@/zustand/stores/calendar-consent.store";

const StoreCartAppointmentModal = () => {
  const {
    bizName,
    locationId,
    appointmentModalState,
    closeAppointmentModal,
    completePendingIncrement,
    cancelPendingIncrement,
    completeAppointmentEdit,
    cancelAppointmentEdit,
    items,
    appointmentType,
    storeName,
  } = useStoreCartStore();

  const { checkTokenValidity } = useCalendarConsentStore();
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentSlotPayload>();
  const [appointmentConsentModalOpen, setAppointmentConsentModalOpen] =
    useState<boolean>(false);
  const isTokenValid = checkTokenValidity();
  const selectedItemId = 1;

  const handleAppointmentModalChange = (open: boolean) => {
    if (!open) {
      if (appointmentModalState.editMode.isEditing) {
        cancelAppointmentEdit();
      } else if (appointmentModalState.pendingIncrement.isActive) {
        cancelPendingIncrement();
      } else {
        closeAppointmentModal();
      }
    }
  };

  const handleNext = (appointment: AppointmentSlotPayload) => {
    if (appointment) {
      const isTokenValid = checkTokenValidity();
      setSelectedAppointment(appointment);
      if (!isTokenValid) {
        setAppointmentConsentModalOpen(true);
        return;
      }
      handleCalendarCancel();

      if (appointmentModalState.editMode.isEditing) {
        completeAppointmentEdit(appointment);
      } else if (appointmentModalState.pendingIncrement.isActive) {
        completePendingIncrement(appointment);
      } else {
        closeAppointmentModal();
      }
    }
  };

  const handleScheduleLater = () => {
    if (appointmentModalState.editMode.isEditing) {
      completeAppointmentEdit(getScheduleForLaterObj());
    } else {
      completePendingIncrement(getScheduleForLaterObj());
    }
  };

  const handleCalendarCancel = () => {
    if (selectedAppointment) {
      if (appointmentModalState.editMode.isEditing) {
        completeAppointmentEdit(selectedAppointment);
      } else if (appointmentModalState.pendingIncrement.isActive) {
        completePendingIncrement(selectedAppointment);
      } else {
        closeAppointmentModal();
      }
    }
    setAppointmentConsentModalOpen(false);
    setSelectedAppointment(undefined);
  };

  const handleCalendarConfirm = async (googleAccessToken: string) => {
    if (!googleAccessToken) {
      toast.error({
        message: "Token is required",
      });
      return;
    }

    const { success, data, error } = await onGetGooglePermission({
      payload: {
        googleAccessToken,
      },
    });

    if (!success || error) {
      toast.error({
        message: error?.details?.errorMessages?.[0] || "Something went wrong",
      });
      return;
    }

    if (data) {
      toast.success({
        message: data.message,
      });
    }

    if (selectedAppointment) {
      if (appointmentModalState.pendingIncrement.isActive) {
        completePendingIncrement(selectedAppointment);
      } else {
        closeAppointmentModal();
      }
    }

    setAppointmentConsentModalOpen(false);
    setSelectedAppointment(undefined);
  };

  const adjustSlotAvailability = (
    slots: AppointmentSlot[],
    selectedDate: Date
  ): AppointmentSlot[] => {
    const currentItemIndex = appointmentModalState.pendingIncrement.itemIndex;
    let itemLevelAppointments: AppointmentSlotPayload[] = [];

    if (currentItemIndex !== null && items[currentItemIndex]) {
      itemLevelAppointments = items[currentItemIndex].itemLevelAppointments;
    } else {
      itemLevelAppointments = items.flatMap(
        (item) => item.itemLevelAppointments
      );
    }

    const selectedDateString = formatDate(selectedDate, "yyyy-MM-dd");

    const appointmentsForSelectedDate = itemLevelAppointments.filter(
      (appointment) => {
        return Object.keys(appointment).includes(selectedDateString);
      }
    );

    const bookedSlots = appointmentsForSelectedDate.map((appointment) => {
      const slot = appointment[selectedDateString];
      return {
        startTime: slot.startTime,
        endTime: slot.endTime,
      };
    });

    const { editMode } = appointmentModalState;

    if (editMode.isEditing && editMode.originalAppointment) {
      const originalAppointment = editMode.originalAppointment;
      const originalDateKey = Object.keys(originalAppointment)[0];
      const originalSlot = originalAppointment[originalDateKey];

      const indexToRemove = bookedSlots.findIndex(
        (slot) =>
          slot.startTime === originalSlot.startTime &&
          slot.endTime === originalSlot.endTime
      );

      if (indexToRemove !== -1) {
        bookedSlots.splice(indexToRemove, 1);
      }
    }

    return slots.map((slot) => {
      const bookingCount = bookedSlots.filter(
        (booked) =>
          booked.startTime === slot.startTime && booked.endTime === slot.endTime
      ).length;

      const adjustedAvailableAppointments = Math.max(
        0,
        slot.availableAppointments - bookingCount
      );

      return {
        ...slot,
        availableAppointments: adjustedAvailableAppointments,
      };
    });
  };

  return (
    <>
      <Modal
        title={bizName}
        open={
          appointmentModalState.isOpen &&
          appointmentType === "APPOINTMENT_PER_ITEM"
        }
        onOpenChange={handleAppointmentModalChange}
        closeOnOutsideClick={false}
        contentClassName="!max-w-screen-xl"
        bodyClassName="!p-0"
      >
        <div className="no-scrollbar relative">
          <SlotBooking
            title={`Appointment booking for: ${storeName}`}
            objId={selectedItemId}
            onNext={handleNext}
            onScheduleLater={handleScheduleLater}
            defaultLocationId={`${locationId}`}
            slotAvailabilityAdjuster={adjustSlotAvailability}
            showLocationSelector={false}
            footer={
              isTokenValid ? (
                <div className="body-3 rounded-b-[9px] border-t border-secondary-20 bg-yellow-300 p-4 py-2">
                  The Google Calendar permission to create events has been
                  enabled. Now, all selected appointment slots will be
                  automatically added to calendar.
                </div>
              ) : (
                <></>
              )
            }
            className="border-none"
          />
        </div>
      </Modal>
      <AppointmentConsentModal
        isOpen={appointmentConsentModalOpen}
        onConfirm={handleCalendarConfirm}
        onCancel={handleCalendarCancel}
        onClose={() => setAppointmentConsentModalOpen(false)}
      />
    </>
  );
};

export default StoreCartAppointmentModal;
