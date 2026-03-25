"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContactFormDialog from "@/components/ContactFormDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { COUNTRIES, LOCALES, useNavbar } from "@/hooks/useNavbar";

export default function NavbarDesktop() {
  const t = useTranslations("nav");
  const { country, locale, buildPath, isActive, handleCountryChange, handleLocaleChange } =
    useNavbar();

  const navItems = [
    { label: t("home"), path: "/" },
    { label: t("products"), path: "/products" },
    { label: t("gettingStarted"), path: "/getting-started" },
    { label: t("changelog"), path: "/changelog" },
  ] as const;

  return (
    <div className="hidden h-16 items-center justify-between md:flex">
      <Link href={buildPath("/")} className="flex shrink-0 items-center gap-2.5">
        <Image
          src="/logo.svg"
          alt="Puntored Developer"
          width={120}
          height={42}
          className="block dark:hidden"
        />
        <Image
          src="/logo-dark.svg"
          alt="Puntored Developer"
          width={120}
          height={42}
          className="hidden dark:block"
        />
        <span className="hidden text-sm font-semibold tracking-tight sm:block">
          <span className="text-muted-foreground">Developers</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-0.5 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={buildPath(item.path)}
            className={[
              "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              isActive(item.path)
                ? "bg-primary/10 font-semibold text-primary hover:bg-primary/10 hover:text-primary"
                : "",
            ].join(" ")}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="hidden h-8 gap-1.5 border-border bg-muted px-2.5 text-xs text-muted-foreground hover:bg-accent sm:flex"
            >
              <span className="uppercase">{locale}</span>
              <ChevronDown size={11} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-24">
            {LOCALES.map((l) => {
              const active = l.code === locale;
              return (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => handleLocaleChange(l.code)}
                  className={`gap-2 text-xs ${active ? "font-semibold text-primary" : ""}`}
                >
                  <span>{l.label}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 border-border bg-muted px-2.5 text-xs text-muted-foreground hover:bg-accent"
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

        <ContactFormDialog
          trigger={
            <Button variant="outline" size="sm" className="hidden h-8 text-xs font-bold sm:flex">
              {t("contactCta")}
            </Button>
          }
        />
      </div>
    </div>
  );
}
