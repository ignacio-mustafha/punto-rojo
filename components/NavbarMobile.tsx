"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import ContactFormDialog from "@/components/ContactFormDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { COUNTRIES, LOCALES, useNavbar } from "@/hooks/useNavbar";
import { useMobileMenu } from "@/lib/mobile-menu-context";

export default function NavbarMobile() {
  const t = useTranslations("nav");
  const { country, buildPath, handleCountryChange } = useNavbar();
  const { openMenu } = useMobileMenu();

  return (
    <div className="flex h-16 items-center justify-between md:hidden">
      <Link href={buildPath("/")} className="flex shrink-0 items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Puntored Developer"
          width={108}
          height={38}
          className="block dark:hidden"
        />
        <Image
          src="/logo-dark.svg"
          alt="Puntored Developer"
          width={108}
          height={38}
          className="hidden dark:block"
        />
      </Link>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 border-border bg-muted px-2 text-[11px] text-muted-foreground hover:bg-accent"
            >
              <span>{COUNTRIES.find((c) => c.code === country)?.flag}</span>
              <span>{country}</span>
              <ChevronDown size={11} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {COUNTRIES.map((c) => {
              const active = country === c.code;
              return (
                <DropdownMenuItem
                  key={c.code}
                  onClick={() => handleCountryChange(c.code)}
                  className={`gap-2 text-xs ${active ? "font-semibold text-primary" : ""}`}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={openMenu}>
          <Menu size={20} />
        </Button>
      </div>
    </div>
  );
}

export function NavbarMobileDrawer() {
  const t = useTranslations("nav");
  const { open, closeMenu } = useMobileMenu();
  const { locale, buildPath, isActive, handleLocaleChange } = useNavbar();

  const navItems = [
    { label: t("home"), path: "/" },
    { label: t("products"), path: "/products" },
    { label: t("gettingStarted"), path: "/getting-started" },
    { label: t("changelog"), path: "/changelog" },
  ] as const;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-[100] h-[100svh] min-h-[100svh] w-full overflow-hidden md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Cerrar menu"
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.aside
            className="absolute inset-y-0 right-0 z-10 flex w-[min(18rem,100vw)] max-w-[100vw] flex-col overflow-y-auto overscroll-y-contain border-l bg-background px-6 pb-6 pt-[max(2.5rem,env(safe-area-inset-top,0px))] shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top,0px))] h-8 w-8"
              onClick={closeMenu}
              aria-label="Cerrar menu"
            >
              <X size={18} />
            </Button>

            <nav className="mt-8 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={buildPath(item.path)}
                  onClick={closeMenu}
                  className={[
                    "rounded-md px-3 py-2.5 text-sm transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Separator className="my-4" />

            <div className="space-y-3 px-1">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Idioma
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {LOCALES.map((l) => {
                    const active = l.code === locale;
                    return (
                      <Button
                        key={l.code}
                        variant="outline"
                        size="sm"
                        onClick={() => handleLocaleChange(l.code)}
                        className={[
                          "h-8 text-xs font-semibold",
                          active
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {l.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <ContactFormDialog
                trigger={
                  <Button variant="outline" size="sm" className="h-8 w-full text-xs font-bold">
                    {t("contactCta")}
                  </Button>
                }
              />
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
