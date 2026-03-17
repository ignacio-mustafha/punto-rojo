"use client";

import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Theme = "light" | "dark" | "system";

type Props = {
  children: ReactNode;
  forcedTheme?: Exclude<Theme, "system">;
};

export function ThemeProvider({ children, forcedTheme }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      forcedTheme={forcedTheme}
      // O simplemente elimina esta prop
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
