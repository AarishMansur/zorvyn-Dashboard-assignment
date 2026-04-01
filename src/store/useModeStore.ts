import type { Mode } from "@/types/mode.types";
import { create } from "zustand";


export const useMode = create<Mode>((set)=>({
    theme:'light',
    toggleTheme:()=>set((state)=>({
        theme:state.theme==="light"?"dark":"light"
    })),
    setTheme:(theme)=>set({theme})
}))