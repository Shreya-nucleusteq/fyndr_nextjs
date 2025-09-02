import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { StoreModifier } from "@/types/catalogue/catalogue.types";

interface ModifierStore {
  modifiers: StoreModifier[];
  loading: boolean;
  error: string | null;

  setModifiers: (modifiers: StoreModifier[]) => void;
  updateModifier: (updated: StoreModifier) => void;
  getModifierById: (id: number) => StoreModifier | undefined;
}

export const useModifierStore = create<ModifierStore>()(
  devtools(
    persist(
      (set, get) => ({
        modifiers: [],
        loading: false,
        error: null,

        setModifiers: (modifiers) => set({ modifiers }),

        updateModifier: (updated) =>
          set((state) => ({
            modifiers: state.modifiers.map((cat) =>
              cat.objid === updated.objid ? updated : cat
            ),
          })),

        getModifierById: (id) =>
          get().modifiers.find((cat) => cat.objid === id),
      }),
      { name: "modifier-store" }
    ),
    { name: "ModifierStore" }
  )
);
