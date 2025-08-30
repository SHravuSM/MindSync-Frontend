import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      yes: false,
      state: false,
      top: "Top",
      dark: false,

      setTop: (d) => set((state) => ({ top: d })),
      setYes: () => set((state) => ({ yes: !state.yes })),
      setState: () =>
        set((s) => {
          console.log(s.state);
          return { state: !s.state };
        }),
      setDark: () => set((state) => ({ dark: !state.dark })),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        dark: state.dark,
      }),
    }
  )
);

export default useThemeStore;
