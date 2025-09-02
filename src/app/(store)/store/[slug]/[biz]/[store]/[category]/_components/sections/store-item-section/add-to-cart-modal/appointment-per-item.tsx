/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";

import { onGetGooglePermission } from "@/actions/auth.actions";
import AppointmentConsentModal from "@/components/global/appointment/appointment-consent-modal";
import Button from "@/components/global/buttons";
import Indicator from "@/components/global/indicator";
import toast from "@/components/global/toast";
import ROUTES from "@/constants/routes";
import { formatDate } from "@/lib/utils/date";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";
import { useCalendarConsentStore } from "@/zustand/stores/calendar-consent.store";

// import AddedToCartAnimation from "./added-to-cart-animation";

type Props = {
  onAddToCart: (
    mode: "APPOINTMENT_PER_ITEM",
    appointments: AppointmentSlotPayload[]
  ) => void;
  itemId: number;
  setCurrentView: Dispatch<
    SetStateAction<"APPOINTMENT_VIEW" | "ITEM_INFO_VIEW">
  >;
  currentView: "APPOINTMENT_VIEW" | "ITEM_INFO_VIEW";
  selectedAppointment?: AppointmentSlotPayload;
  qty: number;
  selectedAppointments: AppointmentSlotPayload[];
  setSelectedAppointments: Dispatch<SetStateAction<AppointmentSlotPayload[]>>;
};

const AppointmentPerItem = ({
  onAddToCart,
  // itemId,
  currentView,
  setCurrentView,
  selectedAppointment,
  qty,
  selectedAppointments,
  setSelectedAppointments,
}: Props) => {
  // const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [transition, startTransition] = useTransition();
  const [scheduledForLater, setScheduledForLater] = useState<boolean>(false);
  const [appointmentConsentModalOpen, setAppointmentConsentModalOpen] =
    useState<boolean>(false);
  const [pendingAppointment, setPendingAppointment] =
    useState<AppointmentSlotPayload | null>(null);
  const [currentSessionAddedToCart, setCurrentSessionAddedToCart] =
    useState<boolean>(false);

  const { checkTokenValidity } = useCalendarConsentStore();

  useEffect(() => {
    if (scheduledForLater && selectedAppointments.length !== qty) {
      setScheduledForLater(false);
      setSelectedAppointments([]);
      setCurrentSessionAddedToCart(false);
    }
  }, [qty]);

  useEffect(() => {
    if (currentView === "ITEM_INFO_VIEW") {
      setCurrentSessionAddedToCart(false);
      setScheduledForLater(false);
    }
  }, [currentView]);

  const handleAddToCart = () => {
    startTransition(async () => {
      onAddToCart("APPOINTMENT_PER_ITEM", selectedAppointments);
    });
    setCurrentSessionAddedToCart(true);
    // setShowSuccessAnimation(true);
  };

  const handleScheduleLater = () => {
    const scheduleForLaterAppointments: AppointmentSlotPayload[] = [];
    for (let i = 0; i < qty; i++) {
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
      scheduleForLaterAppointments.push(scheduleForLaterObj);
    }

    setSelectedAppointments(scheduleForLaterAppointments);
    setScheduledForLater(true);
    setCurrentSessionAddedToCart(false);
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

    if (pendingAppointment) {
      setSelectedAppointments((prev) => [...prev, pendingAppointment]);
      setPendingAppointment(null);
    }
    setAppointmentConsentModalOpen(false);
  };

  const handleCalendarCancel = () => {
    if (pendingAppointment) {
      setSelectedAppointments((prev) => [...prev, pendingAppointment]);
      setPendingAppointment(null);
    }
    setAppointmentConsentModalOpen(false);
  };

  const handleNext = () => {
    if (!selectedAppointment) {
      toast.error({
        message: "Please select an appointment slot",
      });
      return;
    }

    const appointmentDate = Object.keys(selectedAppointment)[0];
    const appointmentData = selectedAppointment[appointmentDate];

    if (!appointmentData.startTime || !appointmentData.endTime) {
      toast.error({
        message: "Please select a valid appointment slot",
      });
      return;
    }

    const isTokenValid = checkTokenValidity();

    if (!isTokenValid) {
      setPendingAppointment(selectedAppointment);
      setAppointmentConsentModalOpen(true);
    } else {
      setSelectedAppointments((prev) => [...prev, selectedAppointment]);
    }
  };

  const hasSelectedAllAppointments = () => {
    return selectedAppointments.length >= qty;
  };

  if (currentView === "APPOINTMENT_VIEW") {
    const isTokenValid = checkTokenValidity();
    return (
      <>
        {/* <AddedToCartAnimation
          show={showSuccessAnimation}
          onAnimationComplete={() => setShowSuccessAnimation(false)}
        /> */}
        <div className="flex-between relative z-20 flex-col gap-4 rounded-b-10 border-t border-secondary-20 bg-white p-4 xs:flex-row">
          <div className="body-3 flex items-center gap-2 text-black-60">
            <div className="flex items-center gap-2">
              <Indicator className="bg-custom-green-2nd" />
              <div>Selected</div>
            </div>
            <div className="flex items-center gap-2">
              <Indicator className="bg-primary" />
              <div>Available</div>
            </div>
            <div className="flex items-center gap-2">
              <Indicator className="bg-secondary-20" />
              <div>Booked</div>
            </div>
          </div>
          {hasSelectedAllAppointments() ? (
            currentSessionAddedToCart ? (
              <div className="flex items-center gap-2">
                <Button variant="primary" stdHeight asChild>
                  <Link href={ROUTES.STORE_CART}>Checkout</Link>
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                stdHeight
                stdWidth
                onClick={handleAddToCart}
                disabled={transition}
              >
                <ShoppingCart size={20} className="!size-5" />
                {transition ? "Adding to cart..." : "Add to cart"}
              </Button>
            )
          ) : (
            <Button variant="primary" stdHeight stdWidth onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
        {isTokenValid && (
          <div className="body-5 rounded-b-[9px] border-t border-secondary-20 bg-yellow-300 p-4 py-2">
            The Google Calendar permission to create events has been enabled.
            Now, all selected appointment slots will be automatically added to
            calendar.
          </div>
        )}
        <AppointmentConsentModal
          isOpen={appointmentConsentModalOpen}
          onConfirm={handleCalendarConfirm}
          onCancel={handleCalendarCancel}
          onClose={() => setAppointmentConsentModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex-between gap-4 border-t border-secondary-20 p-4">
          {scheduledForLater ? (
            currentSessionAddedToCart ? (
              <>
                <div></div>
                <div className="flex items-center gap-2">
                  <Button variant="primary" stdHeight asChild>
                    <Link href={ROUTES.STORE_CART}>Checkout</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div></div>
                <Button
                  variant="primary"
                  stdHeight
                  stdWidth
                  onClick={handleAddToCart}
                  disabled={transition}
                >
                  <ShoppingCart size={20} className="!size-5" />
                  {transition ? "Adding to cart..." : "Add to cart"}
                </Button>
              </>
            )
          ) : (
            <>
              <Button
                variant="primary-outlined"
                stdHeight
                stdWidth
                onClick={handleScheduleLater}
              >
                Schedule for later
              </Button>
              <Button
                variant="primary"
                stdHeight
                stdWidth
                onClick={() => setCurrentView("APPOINTMENT_VIEW")}
              >
                <ShoppingCart size={20} className="!size-5" />
                Book an appointment
              </Button>
            </>
          )}
        </div>
      </div>
      <AppointmentConsentModal
        isOpen={appointmentConsentModalOpen}
        onConfirm={handleCalendarConfirm}
        onCancel={handleCalendarCancel}
        onClose={() => setAppointmentConsentModalOpen(false)}
      />
    </>
  );
};

export default AppointmentPerItem;
