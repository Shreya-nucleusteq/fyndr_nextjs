import { StoreCartState } from "@/types/zustand/store-cart-store.types";

export const storeCartDefaultState: StoreCartState = {
  items: [],
  bizId: null,
  bizName: null,
  locationId: null,
  storeId: null,
  storeName: null,
  storeUrl: null,

  appointmentType: null,
  cartLevelAppointments: [],

  country: null,
  postalCode: null,

  tipConfig: null,

  appointmentModalState: {
    isOpen: false,
    editMode: {
      isEditing: false,
      originalAppointment: null,
    },
    // Add pending increment state
    pendingIncrement: {
      isActive: false,
      itemIndex: null,
    },
  },

  instructions: "",
  showCartItemsDeleteButton: false,
};
