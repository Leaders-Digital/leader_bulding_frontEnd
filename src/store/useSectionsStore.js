import { create } from "zustand";

const useSectionsStore = create((set) => ({
  sections: [],
  setSections: (sections) => set({ sections }),
  addSection: (section) =>
    set((state) => ({ sections: [...state.sections, section] })),
  removeSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id),
    })),
}));

export default useSectionsStore;
