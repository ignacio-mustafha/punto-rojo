"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, ChevronDown } from "lucide-react";
import Image from "next/image";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import ContactFormDialog from "@/components/ContactFormDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCountry } from "@/lib/country-context";

const COUNTRIES = [
  { code: "CO", flag: "🇨🇴", name: "Colombia" },
  { code: "MX", flag: "🇲🇽", name: "México" },
  { code: "PE", flag: "🇵🇪", name: "Perú" },
  { code: "AR", flag: "🇦🇷", name: "Argentina" },
  { code: "CL", flag: "🇨🇱", name: "Chile" },
  { code: "EC", flag: "🇪🇨", name: "Ecuador" },
  { code: "GT", flag: "🇬🇹", name: "Guatemala" },
  { code: "PA", flag: "🇵🇦", name: "Panamá" },
] as const;

import { useState } from "react";

export default function Navbar() {
  const t = useTranslations("nav");
  const { country, setCountry } = useCountry();

  const NAV_ITEMS = [
    { label: t("home"), path: "/" },
    { label: t("products"), path: "/products" },
    { label: t("gettingStarted"), path: "/getting-started" },
    { label: t("changelog"), path: "/changelog" },
  ] as const;

  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname?.startsWith(path);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo.svg" alt="Puntored Developer" width={120} height={42} />
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            <span className="text-primary">Developers</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={[
                "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                isActive(item.path)
                  ? "bg-primary/10 text-primary font-semibold hover:bg-primary/10 hover:text-primary"
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
                <span>{COUNTRIES.find((c) => c.code === country)?.flag}</span>
                <span>{country}</span>
                <ChevronDown size={11} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {COUNTRIES.map((c) => {
                const isActiveCountry = country === c.code;
                return (
                  <DropdownMenuItem
                    key={c.code}
                    onClick={() => setCountry(c.code)}
                    className={`gap-2 text-xs ${
                      isActiveCountry ? "text-primary font-semibold" : ""
                    }`}
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
          <Button
            asChild
            size="sm"
            className="hidden h-8 bg-secondary text-secondary-foreground text-xs font-bold hover:bg-secondary-hover sm:flex"
          >
            <Link href="/getting-started">{t("gettingStarted")}</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-10">
              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "rounded-md px-3 py-2.5 text-sm transition-colors",
                      isActive(item.path)
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Separator className="my-4" />
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Globe size={14} />
                    <span>
                      {
                        COUNTRIES.find((c) => c.code === country)
                          ?.flag
                      }{" "}
                      {
                        COUNTRIES.find((c) => c.code === country)
                          ?.name
                      }
                    </span>
                  </div>
                  <ThemeToggle />
                </div>
                <ContactFormDialog
                  trigger={
                    <Button variant="outline" size="sm" className="h-8 text-xs font-bold">
                      {t("contactCta")}
                    </Button>
                  }
                />
                <Button
                  asChild
                  size="sm"
                  className="h-8 bg-secondary text-secondary-foreground text-xs font-bold hover:bg-secondary-hover"
                >
                  <Link href="/getting-started" onClick={() => setMobileOpen(false)}>
                    {t("gettingStarted")}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

