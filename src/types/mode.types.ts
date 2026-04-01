
export type ModeType = "light" | "dark";

export interface Mode{
    theme:ModeType,
    toggleTheme:()=>void
    setTheme:(mode:ModeType)=>void
}