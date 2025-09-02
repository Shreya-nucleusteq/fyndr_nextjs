import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { formatDate } from "@/lib/utils/date";
import {
  OfferCartAppointmentSlot,
  OfferCartStore,
} from "@/types/zustand/offer-cart-store.types";

export const useOfferCartStore = create<OfferCartStore>()(
  devtools(
    immer((set, get) => ({
      items: [],
      campaignId: null,
      campaignName: null,
      locationId: null,
      bizId: null,
      bizName: null,
      paymentOptionsVisible: false,
      selectedOfferId: null,
      selectedOfferName: null,
      isLoading: false,
      error: null,

      locationModalState: {
        isOpen: false,
        pendingAction: null,
      },

      appointmentModalState: {
        isOpen: false,
        pendingAction: null,
        editMode: {
          isEditing: false,
          appointmentIndex: null,
          originalAppointment: null,
        },
      },

      addCartItem(item) {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (cartItem) => cartItem.offerId === item.offerId
          );

          if (existingItemIndex >= 0) {
            const existingItem = state.items[existingItemIndex];
            state.items[existingItemIndex] = {
              ...item,
              offer: item.offer,
              appointments: existingItem.appointments || [],
            };
            if (item.appointments && item.appointments.length > 0) {
              const newAppointment = item.appointments[0];
              const existingAppointments =
                state.items[existingItemIndex].appointments || [];
              state.items[existingItemIndex].appointments = [
                ...existingAppointments,
                newAppointment,
              ];
            }
          } else {
            state.items.push({
              ...item,
              offer: item.offer,
              appointments: item.appointments || [], // Ensure appointments is always an array
            });
          }

          state.error = null;
        });
      },

      removeCartItem(offerId) {
        set((state) => {
          state.items = state.items.filter((item) => item.offerId !== offerId);
          state.error = null;
        });
      },

      removeLastAppointment(offerId) {
        set((state) => {
          const itemIndex = state.items.findIndex(
            (item) => item.offerId === offerId
          );

          if (
            itemIndex >= 0 &&
            state.items[itemIndex].appointments.length > 0
          ) {
            state.items[itemIndex].appointments.pop();
          }
        });
      },

      updateAppointmentByIndex(offerId, appointmentIndex, updatedAppointment) {
        set((state) => {
          const itemIndex = state.items.findIndex(
            (item) => item.offerId === offerId
          );

          if (
            itemIndex >= 0 &&
            state.items[itemIndex].appointments[appointmentIndex]
          ) {
            state.items[itemIndex].appointments[appointmentIndex] =
              updatedAppointment;
          }
        });
      },

      clearCart() {
        set((state) => {
          state.items = [];
          state.isLoading = false;
          state.error = null;
        });
      },

      setLocationId(locationId) {
        set((state) => {
          state.locationId = locationId;
        });
      },
      setCampaignInfo({ cmpnId, cmpnName, bizName }) {
        set((state) => {
          state.campaignId = cmpnId;
          state.campaignName = cmpnName;
          state.bizName = bizName;
        });
      },
      setSelectedOfferInfo({ offerId, offerName }) {
        set((state) => {
          state.selectedOfferId = offerId;
          state.selectedOfferName = offerName;
        });
      },
      setPaymentOptionsVisible(visible) {
        set((state) => {
          state.paymentOptionsVisible = visible;
        });
      },

      getItemQuantity(offerId) {
        const item = get().items.find((item) => item.offerId === offerId);
        return item?.qty || 0;
      },
      getTotalItems() {
        return get().items.reduce((total, item) => total + item.qty, 0);
      },
      getTotalAmount() {
        return get().items.reduce((total, item) => total + item.total, 0);
      },
      getCartItem(offerId) {
        return get().items.find((item) => item.offerId === offerId) || null;
      },
      getLocationId() {
        return get().locationId;
      },

      clearCampaignId() {
        set((state) => {
          state.campaignId = null;
        });
      },

      clearLocationId() {
        set((state) => {
          state.locationId = null;
        });
      },

      setLoading: (loading) => {
        set((state) => {
          state.isLoading = loading;
        });
      },

      setError: (error) => {
        set((state) => {
          state.error = error;
        });
      },

      openLocationModal(pendingAction) {
        set((state) => {
          state.locationModalState = {
            isOpen: true,
            pendingAction,
          };
        });
      },
      closeLocationModal() {
        set((state) => {
          state.locationModalState.isOpen = false;
        });
      },

      openAppointmentModal(pendingAction) {
        set((state) => {
          state.appointmentModalState = {
            isOpen: true,
            pendingAction,
            editMode: {
              isEditing: false,
              appointmentIndex: null,
              originalAppointment: null,
            },
          };
        });
      },
      closeAppointmentModal() {
        set((state) => {
          state.appointmentModalState.isOpen = false;
        });
      },

      openAppointmentModalForEdit(offerId, appointmentIndex, pendingAction) {
        set((state) => {
          const cartItem = state.items.find((item) => item.offerId === offerId);
          const appointment = cartItem?.appointments[appointmentIndex];

          state.selectedOfferId = offerId;
          state.appointmentModalState = {
            isOpen: true,
            pendingAction,
            editMode: {
              isEditing: true,
              appointmentIndex,
              originalAppointment: appointment || null,
            },
          };
        });
      },

      executeLocationModalAction(locationId) {
        const campaignId = get().locationId;
        const pendingAction = get().locationModalState.pendingAction;

        if (campaignId && pendingAction) {
          get().setLocationId(locationId);
          pendingAction();
          get().closeLocationModal();
        }
      },

      executeAppointmentModalAction(offerId, mode, bookedSlots) {
        const campaignId = get().campaignId;
        const pendingAction = get().appointmentModalState.pendingAction;
        const editMode = get().appointmentModalState.editMode;

        if (!campaignId || !offerId || !pendingAction) return;

        if (mode === "schedule-later") {
          if (pendingAction) {
            // const date = new Date().toISOString().split("T")[0];
            const date = formatDate(new Date(), "yyyy-MM-dd");

            const scheduleForLaterObj: OfferCartAppointmentSlot = {
              [date]: {
                startTime: "",
                endTime: "",
                bookingDay: "",
                locId: NaN,
                objId: NaN,
              },
            };
            pendingAction(scheduleForLaterObj);
          }
        } else if (mode === "next") {
          // Handle edit mode
          if (
            editMode.isEditing &&
            editMode.appointmentIndex !== null &&
            bookedSlots &&
            bookedSlots.length > 0
          ) {
            // Update existing appointment
            get().updateAppointmentByIndex(
              offerId,
              editMode.appointmentIndex,
              bookedSlots[0]
            );
          }

          pendingAction(
            bookedSlots && bookedSlots.length > 0 ? bookedSlots[0] : undefined
          );
        }
      },

      resetAppointmentBooking() {
        set((state) => {
          state.items = state.items.map((item) => ({
            ...item,
            appointments: [],
          }));
        });
      },
    })),
    {
      name: "offer-cart-store",
    }
  )
);
