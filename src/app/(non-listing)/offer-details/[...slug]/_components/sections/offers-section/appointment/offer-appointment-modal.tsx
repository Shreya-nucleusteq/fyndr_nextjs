"use client";

import React, { useState, useMemo } from "react";

import { onGetGooglePermission } from "@/actions/auth.actions";
import SlotBooking from "@/components/global/appointment/slot-booking";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import { formatDate } from "@/lib/utils/date";
import { AppointmentSlot } from "@/types/appointment/appointment.types";
import { Campaign } from "@/types/campaign/campaign.types";
import { OfferCartAppointmentSlot } from "@/types/zustand/offer-cart-store.types";
import { useCalendarConsentStore } from "@/zustand/stores/calendar-consent.store";
import { useOfferCartStore } from "@/zustand/stores/offer-details/offer-cart.store";

import AppointmentIncorporateModal from "./appointment-incorporate-modal";
import AppointmentSummaryModal from "./appointment-summary-modal";
import LocationChangeWarningModal from "./location-change-warning-modal";

type Props = {
  campaignId: number;
  campaignLocations: Campaign["cmpnLocs"];
};

const OfferAppointmentModal = ({ campaignId, campaignLocations }: Props) => {
  const {
    appointmentModalState,
    closeAppointmentModal,
    items,
    executeAppointmentModalAction,
    clearCart,
    setLocationId: setLocationIdStore,
    getCartItem,
    campaignId: selectedCampaignId,
    locationId: selectedLocationId,
    selectedOfferId,
    selectedOfferName,
    bizName,
  } = useOfferCartStore();

  const { checkTokenValidity } = useCalendarConsentStore();
  const isTokenValid = checkTokenValidity();

  const [locationWarningModalOpen, setLocationWarningModalOpen] =
    useState<boolean>(false);
  const [appointmentSummaryModalOpen, setAppointmentSummaryModalOpen] =
    useState<boolean>(false);
  const [appointmentIncorporateModalOpen, setAppointmentIncorporateModalOpen] =
    useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<OfferCartAppointmentSlot>();

  const [pendingLocationChange, setPendingLocationChange] = useState<{
    locationId: string;
    setLocationId: (newLocationId: string) => void;
  } | null>(null);

  const { editMode } = appointmentModalState;

  const adjustSlotAvailability = useMemo(() => {
    return (
      slots: AppointmentSlot[],
      selectedDate: Date
    ): AppointmentSlot[] => {
      if (!selectedOfferId || !selectedLocationId) return slots;

      const cartItem = getCartItem(selectedOfferId);
      if (!cartItem?.appointments) return slots;

      const dateStr = formatDate(selectedDate, "yyyy-MM-dd");
      let relevantAppointments = cartItem.appointments.filter((apt) => {
        // Check if this appointment has the specific date key
        const appointmentDetails = apt[dateStr];
        return (
          appointmentDetails && appointmentDetails.locId === selectedLocationId
        );
      });

      // If we're in edit mode, exclude the appointment being edited from the count
      if (editMode.isEditing && editMode.appointmentIndex !== null) {
        relevantAppointments = relevantAppointments.filter(
          (_, index) => index !== editMode.appointmentIndex
        );
      }

      // Create a map of booked slots count
      const bookedSlotsCount = relevantAppointments.reduce(
        (acc, apt) => {
          // Get the appointment details from the date key
          const appointmentDetails = apt[dateStr];
          if (appointmentDetails) {
            const key = `${appointmentDetails.startTime}-${appointmentDetails.endTime}`;
            acc[key] = (acc[key] || 0) + 1;
          }
          return acc;
        },
        {} as Record<string, number>
      );

      // Adjust available appointments
      return slots.map((slot) => {
        const key = `${slot.startTime}-${slot.endTime}`;
        const bookedCount = bookedSlotsCount[key] || 0;
        const adjustedAvailable = Math.max(
          0,
          slot.availableAppointments - bookedCount
        );

        return {
          ...slot,
          availableAppointments: adjustedAvailable,
        };
      });
    };
  }, [selectedOfferId, selectedLocationId, getCartItem, editMode]);

  if (!selectedLocationId || !selectedOfferId) {
    return;
  }

  const selectedOffer = items.find((item) => item.offerId === selectedOfferId);
  const isOpen =
    appointmentModalState.isOpen && selectedCampaignId === campaignId;

  const bookingEnabledLocations = campaignLocations.filter(
    (item) => item.campaignBookingEnabled === true
  );
  const formattedBookingEnabledLocations = bookingEnabledLocations.map(
    (item) => ({
      value: `${item.locationId}`,
      label: item.locName,
    })
  );

  const handleNext = (appointment: OfferCartAppointmentSlot) => {
    if (appointment) {
      const isTokenValid = checkTokenValidity();
      setSelectedAppointment(appointment);
      if (!isTokenValid) {
        setAppointmentIncorporateModalOpen(true);
        return;
      }
      setAppointmentSummaryModalOpen(true);
      closeAppointmentModal();
      executeAppointmentModalAction(selectedOfferId, "next", [appointment]);
    }
  };

  const handleScheduleLater = () => {
    executeAppointmentModalAction(selectedOfferId, "schedule-later", undefined);
    setAppointmentSummaryModalOpen(true);
    closeAppointmentModal();
  };

  const handleCancel = () => {
    closeAppointmentModal();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeAppointmentModal();
    }
  };

  const handleLocationChange = (params: {
    locationId: string;
    setLocationId: (newLocationId: string) => void;
  }): void => {
    const { locationId, setLocationId } = params;
    if (selectedLocationId !== Number(locationId)) {
      setPendingLocationChange({ locationId, setLocationId });
      setLocationWarningModalOpen(true);
      return;
    }
    setLocationId(locationId);
  };

  const handleConfirmLocationChange = () => {
    if (pendingLocationChange) {
      clearCart();
      pendingLocationChange.setLocationId(pendingLocationChange.locationId);
      setLocationIdStore(Number(pendingLocationChange.locationId));
      setPendingLocationChange(null);
    }
    setLocationWarningModalOpen(false);
  };

  const handleAppointmentSummaryModalClose = () => {
    setAppointmentSummaryModalOpen(false);
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
      setAppointmentSummaryModalOpen(true);
      closeAppointmentModal();
      executeAppointmentModalAction(selectedOfferId, "next", [
        selectedAppointment,
      ]);
    }
    setAppointmentIncorporateModalOpen(false);
    setSelectedAppointment(undefined);
  };

  const handleCalendarCancel = () => {
    if (selectedAppointment) {
      setAppointmentSummaryModalOpen(true);
      closeAppointmentModal();
      executeAppointmentModalAction(selectedOfferId, "next", [
        selectedAppointment,
      ]);
    }
    setAppointmentIncorporateModalOpen(false);
    setSelectedAppointment(undefined);
  };

  const title = bizName || "Appointment Booking";
  const offerName = selectedOfferName || "offer";

  return (
    <>
      <Modal
        open={isOpen}
        onOpenChange={handleOpenChange}
        title={title}
        closeOnOutsideClick={false}
        onCloseIconClick={handleCancel}
        contentClassName="!max-w-screen-xl"
        bodyClassName="!p-0"
      >
        <div className="no-scrollbar relative ">
          <SlotBooking
            title={`Appointment booking for: ${offerName}`}
            objId={selectedOfferId}
            onNext={handleNext}
            onLocationChange={handleLocationChange}
            onScheduleLater={handleScheduleLater}
            locations={formattedBookingEnabledLocations}
            defaultLocationId={selectedLocationId.toString()}
            slotAvailabilityAdjuster={adjustSlotAvailability}
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

      <LocationChangeWarningModal
        open={locationWarningModalOpen}
        onOpenChange={(open) => setLocationWarningModalOpen(open)}
        onConfirm={handleConfirmLocationChange}
        onCancel={() => setLocationWarningModalOpen(false)}
      />
      <AppointmentSummaryModal
        isOpen={appointmentSummaryModalOpen}
        onClose={handleAppointmentSummaryModalClose}
        offerId={selectedOfferId}
        title="Appointment Summary"
        offerName={selectedOffer?.offer.title || "Offer Name"}
      />
      <AppointmentIncorporateModal
        isOpen={appointmentIncorporateModalOpen}
        onConfirm={handleCalendarConfirm}
        onCancel={handleCalendarCancel}
        onClose={() => setAppointmentIncorporateModalOpen(false)}
      />
    </>
  );
};

export default OfferAppointmentModal;
