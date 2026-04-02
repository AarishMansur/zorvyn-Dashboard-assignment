import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useMode } from "@/store/useModeStore";

export function ThemeSync(){
 const {setTheme} =  useTheme();
 const theme = useMode((s)=>s.theme)

 useEffect(()=>{
     setTheme(theme)
 },[theme])
 return null;
}