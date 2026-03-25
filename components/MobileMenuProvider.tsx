"use client";

import { useMemo, useState, type ReactNode } from "react";

import { MobileMenuContext } from "@/lib/mobile-menu-context";
import { NavbarMobileDrawer } from "@/components/NavbarMobile";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
};

export function MobileMenuProvider({ children }: Props) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      open,
      openMenu: () => setOpen(true),
      closeMenu: () => setOpen(false),
    }),
    [open],
  );

  return (
    <MobileMenuContext.Provider value={value}>
      <>
        <div
          className={cn(
            "flex min-h-screen flex-col bg-background",
            open && "h-[100svh] max-h-[100svh] overflow-hidden overscroll-none",
          )}
        >
          {children}
        </div>
        <NavbarMobileDrawer />
      </>
    </MobileMenuContext.Provider>
  );
}
