"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { CountryProvider } from "@/lib/country-context";

type Props = {
  children: ReactNode;
  forcedTheme?: "light" | "dark";
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children, forcedTheme }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider forcedTheme={forcedTheme}>
        <AuthProvider>
          <CountryProvider>{children}</CountryProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

