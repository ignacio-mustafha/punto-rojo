"use client";

import { createContext, useContext } from "react";

export type MobileMenuContextValue = {
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

export const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);

export function useMobileMenu() {
  const ctx = useContext(MobileMenuContext);
  if (!ctx) {
    throw new Error("useMobileMenu must be used within MobileMenuProvider");
  }
  return ctx;
}
