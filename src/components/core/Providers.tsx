import { ThemeProvider } from "next-themes";
import { ThemeSync } from "./theme-sync";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute='class' defaultTheme="system" enableSystem={true}>
            <ThemeSync />
            {children}
        </ThemeProvider>
    )
}