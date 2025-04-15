import { create } from "zustand";

export const useCreationStore = create((set) => ({
  isCreating: false,
  setIsCreating: (isCreating) => set({ isCreating }),
}));
