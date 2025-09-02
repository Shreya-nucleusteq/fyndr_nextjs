import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { WHOLE_UNITS } from "@/constants";
import { StoreItem } from "@/types/store/store.types";
import { StoreCartStore } from "@/types/zustand/store-cart-store.types";

import { storeCartDefaultState } from "./store-cart-default-states";

export const useStoreCartStore = create<StoreCartStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...storeCartDefaultState,
        addCartItem(item) {
          set((state) => {
            const sameIds = (
              arrA: StoreItem["catalogueModifiers"],
              arrB: StoreItem["catalogueModifiers"]
            ) => {
              if (arrA.length !== arrB.length) return false;
              const idsA = arrA.map((m) => m.modifier.objid).sort();
              const idsB = arrB.map((m) => m.modifier.objid).sort();
              return idsA.every((id, idx) => id === idsB[idx]);
            };

            const existingItemIndex = state.items.findIndex(
              (cartItem) =>
                cartItem.itemId === item.itemId &&
                sameIds(cartItem.modifiers.addon, item.modifiers.addon) &&
                sameIds(cartItem.modifiers.whole, item.modifiers.whole)
            );

            if (existingItemIndex >= 0) {
              state.items[existingItemIndex].qty += item.qty ?? 1;
              const existingAppointments =
                state.items[existingItemIndex].itemLevelAppointments;
              state.items[existingItemIndex].itemLevelAppointments = [
                ...existingAppointments,
                ...item.itemLevelAppointments,
              ];
            } else {
              state.items.push({
                ...item,
                itemLevelAppointments: item.itemLevelAppointments || [],
              });
            }
          });
        },
        removeCartItem(itemId, index) {
          set((state) => {
            state.items = state.items.filter(
              (item, i) => !(item.itemId === itemId && i === index)
            );
          });

          if (get().items.length === 0) {
            get().clearCart();
          }
        },
        clearCart() {
          set((state) => {
            state.items = [];
            state.tipConfig = null;
            state.cartLevelAppointments = [];
            state.appointmentModalState = {
              isOpen: false,
              editMode: {
                isEditing: false,
                originalAppointment: null,
              },
              pendingIncrement: {
                isActive: false,
                itemIndex: null,
              },
            };
            state.showCartItemsDeleteButton = false;
          });
        },

        getQuantityStep(index) {
          const item = get().items[index];
          if (!item) return 1;

          const wholeUnits = ["each", "set", "box", "pair"];
          const unit = item.storeItem.item.unit.toLowerCase();

          return wholeUnits.includes(unit) ? 1 : 0.1;
        },

        // QUANTITY UPDATE METHODS
        updateItemQuantity(index, newQty) {
          set((state) => {
            if (state.items[index] && newQty >= 1) {
              state.items[index].qty = newQty;
            }
          });
        },
        incrementItemQuantity(index) {
          set((state) => {
            if (state.items[index]) {
              const isWholeUnit: boolean = WHOLE_UNITS.includes(
                state.items[index].storeItem.item.unit.toLowerCase()
              );
              if (isWholeUnit) {
                state.items[index].qty += 1;
              } else {
                state.items[index].qty =
                  Math.round((state.items[index].qty + 0.1) * 100) / 100;
              }
            }
          });
        },
        decrementItemQuantity(index) {
          set((state) => {
            if (state.items[index] && state.items[index].qty > 1) {
              const isWholeUnit: boolean = WHOLE_UNITS.includes(
                state.items[index].storeItem.item.unit.toLowerCase()
              );

              // First remove the appointment if it's appointment per item
              if (state.appointmentType === "APPOINTMENT_PER_ITEM") {
                if (state.items[index].itemLevelAppointments.length > 0) {
                  state.items[index].itemLevelAppointments.pop();
                }
              }

              // Then decrement the quantity
              if (isWholeUnit) {
                state.items[index].qty -= 1;
              } else {
                state.items[index].qty =
                  Math.round((state.items[index].qty - 0.1) * 100) / 100;
              }
            }
          });
        },

        startPendingIncrement(index) {
          set((state) => {
            state.appointmentModalState.pendingIncrement = {
              isActive: true,
              itemIndex: index,
            };
            state.appointmentModalState.isOpen = true;
          });
        },

        completePendingIncrement(appointment) {
          set((state) => {
            const { itemIndex } = state.appointmentModalState.pendingIncrement;

            if (itemIndex !== null && state.items[itemIndex]) {
              // Increment the quantity
              const isWholeUnit: boolean = WHOLE_UNITS.includes(
                state.items[itemIndex].storeItem.item.unit.toLowerCase()
              );

              if (isWholeUnit) {
                state.items[itemIndex].qty += 1;
              } else {
                state.items[itemIndex].qty =
                  Math.round((state.items[itemIndex].qty + 0.1) * 100) / 100;
              }

              state.items[itemIndex].itemLevelAppointments.push(appointment);
            }

            state.appointmentModalState.pendingIncrement = {
              isActive: false,
              itemIndex: null,
            };
            state.appointmentModalState.isOpen = false;
          });
        },

        cancelPendingIncrement() {
          set((state) => {
            state.appointmentModalState.pendingIncrement = {
              isActive: false,
              itemIndex: null,
            };
            state.appointmentModalState.isOpen = false;
          });
        },

        getItemQty(itemId) {
          const item = get().items.find((item) => item.itemId === itemId);
          return item?.qty || 0;
        },
        getCartItem(itemId) {
          return get().items.find((item) => item.itemId === itemId) || null;
        },
        getLocationId() {
          return get().locationId;
        },
        setCartData({
          bizId,
          bizName,
          locationId,
          storeId,
          storeName,
          storeUrl,
          appointmentType,
          country,
          postalCode,
        }) {
          set((state) => {
            state.bizId = bizId;
            state.bizName = bizName;
            state.locationId = locationId;
            state.storeId = storeId;
            state.storeName = storeName;
            state.storeUrl = storeUrl;
            state.appointmentType = appointmentType;
            state.country = country;
            state.postalCode = postalCode;
          });
        },

        setCartLevelAppointments(appointment) {
          set((state) => {
            state.cartLevelAppointments = [appointment];
          });
        },

        setTipConfig(value, type) {
          set((state) => {
            state.tipConfig = { value, type };
          });
        },

        setShowCartItemsDeleteButton(value) {
          set((state) => {
            state.showCartItemsDeleteButton = value;
          });
        },

        clearTip() {
          set((state) => {
            state.tipConfig = null;
          });
        },

        getTipAmount(totalPrice) {
          const { tipConfig } = get();
          if (!tipConfig) return 0;

          if (tipConfig.type === "flat") {
            return tipConfig.value;
          } else {
            return (totalPrice * tipConfig.value) / 100;
          }
        },

        closeAppointmentModal() {
          set((state) => {
            state.appointmentModalState.isOpen = false;
            // Also cancel any pending increment
            state.appointmentModalState.pendingIncrement = {
              isActive: false,
              itemIndex: null,
            };
          });
        },
        openAppointmentModal() {
          set((state) => {
            state.appointmentModalState.isOpen = true;
          });
        },

        removeLastItemLevelAppointment(index) {
          set((state) => {
            if (
              index >= 0 &&
              state.items[index].itemLevelAppointments.length > 0
            ) {
              state.items[index].itemLevelAppointments.pop();
            }
          });
        },

        startEditingAppointment(
          itemIndex,
          appointmentIndex,
          originalAppointment
        ) {
          set((state) => {
            state.appointmentModalState = {
              isOpen: true,
              editMode: {
                isEditing: true,
                originalAppointment,
                itemIndex,
                appointmentIndex,
              },
              pendingIncrement: {
                isActive: false,
                itemIndex: null,
              },
            };
          });
        },

        completeAppointmentEdit(newAppointment) {
          set((state) => {
            const { editMode } = state.appointmentModalState;

            if (
              editMode.isEditing &&
              editMode.itemIndex !== undefined &&
              editMode.appointmentIndex !== undefined
            ) {
              const itemIndex = editMode.itemIndex;
              const appointmentIndex = editMode.appointmentIndex;

              // Replace the appointment at the specific index
              if (
                state.items[itemIndex] &&
                state.items[itemIndex].itemLevelAppointments[appointmentIndex]
              ) {
                state.items[itemIndex].itemLevelAppointments[appointmentIndex] =
                  newAppointment;
              }
            }

            // Reset appointment modal state
            state.appointmentModalState = {
              isOpen: false,
              editMode: {
                isEditing: false,
                originalAppointment: null,
                itemIndex: undefined,
                appointmentIndex: undefined,
              },
              pendingIncrement: {
                isActive: false,
                itemIndex: null,
              },
            };
          });
        },

        cancelAppointmentEdit() {
          set((state) => {
            state.appointmentModalState = {
              isOpen: false,
              editMode: {
                isEditing: false,
                originalAppointment: null,
                itemIndex: undefined,
                appointmentIndex: undefined,
              },
              pendingIncrement: {
                isActive: false,
                itemIndex: null,
              },
            };
          });
        },

        setInstructions(value) {
          set((state) => {
            state.instructions = value;
          });
        },
      })),
      {
        name: "store-cart",
      }
    ),
    {
      name: "store-cart",
    }
  )
);
