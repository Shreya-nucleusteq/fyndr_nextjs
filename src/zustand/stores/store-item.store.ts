import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { StoreItem } from "@/types/catalogue/catalogue.types";

interface ItemStore {
  items: StoreItem[];
  loading: boolean;
  error: string | null;

  setItems: (items: StoreItem[]) => void;
  updateItem: (updated: StoreItem) => void;
  getItemById: (id: number) => StoreItem | undefined;
}

export const useItemStore = create<ItemStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        loading: false,
        error: null,

        setItems: (items) => set({ items }),

        updateItem: (updated) =>
          set((state) => ({
            items: state.items.map((cat) =>
              cat.objid === updated.objid ? updated : cat
            ),
          })),

        getItemById: (id) => get().items.find((cat) => cat.objid === id),
      }),
      { name: "item-store" }
    ),
    { name: "ItemStore" }
  )
);
