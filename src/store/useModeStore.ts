import type { Mode } from "@/types/mode.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMode = create<Mode>()(
    persist(
        (set) => ({
            theme: "light",

            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === "light" ? "dark" : "light",
                })),

            setTheme: (theme) => set({ theme }),
        }),
        {
            name: "theme-storage",
        }
    )
);

