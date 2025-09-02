import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { StoreCategory } from "@/types/catalogue/catalogue.types";

interface CategoryStore {
  categories: StoreCategory[];
  loading: boolean;
  error: string | null;

  setCategories: (categories: StoreCategory[]) => void;
  updateCategory: (updated: StoreCategory) => void;
  getCategoryById: (id: number) => StoreCategory | undefined;
}

export const useCategoryStore = create<CategoryStore>()(
  devtools(
    persist(
      (set, get) => ({
        categories: [],
        loading: false,
        error: null,

        setCategories: (categories) => set({ categories }),

        updateCategory: (updated) =>
          set((state) => ({
            categories: state.categories.map((cat) =>
              cat.objid === updated.objid ? updated : cat
            ),
          })),

        getCategoryById: (id) =>
          get().categories.find((cat) => cat.objid === id),
      }),
      { name: "category-store" }
    ),
    { name: "CategoryStore" }
  )
);
