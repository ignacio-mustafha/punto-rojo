"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { useCountry, type CountryCode } from "@/lib/country-context";

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

const LOCALES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
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
  const searchParams = useSearchParams();
  const router = useRouter();

  const segments = pathname?.split("/").filter(Boolean) ?? [];
  const locale = (segments[0] as string | undefined) || "es";

  const buildPath = (path: string) => {
    const base = path === "/" ? "" : path;
    let url = `/${locale}${base}`;

    // Propagamos siempre el país seleccionado en la query
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (country) {
      params.set("country", country);
    }
    const query = params.toString();
    if (query) {
      url += `?${query}`;
    }

    return url;
  };

  const isActive = (path: string) => {
    const base = path === "/" ? "" : path;
    const fullBase = `/${locale}${base}`;
    return path === "/"
      ? pathname === fullBase
      : pathname?.startsWith(fullBase);
  };

  const handleCountryChange = (code: CountryCode) => {
    setCountry(code);

    if (!pathname) return;

    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("country", code);

    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;

    router.push(nextUrl, { scroll: false });
  };

  const handleLocaleChange = (nextLocale: string) => {
    if (!pathname) return;

    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) {
      // Ruta raíz sin locale explícito
      const query = searchParams?.toString() ?? "";
      const nextPath = `/${nextLocale}`;
      const nextUrl = query ? `${nextPath}?${query}` : nextPath;
      router.push(nextUrl, { scroll: false });
      return;
    }

    parts[0] = nextLocale;
    const basePath = `/${parts.join("/")}`;
    const query = searchParams?.toString() ?? "";
    const nextUrl = query ? `${basePath}?${query}` : basePath;
    router.push(nextUrl, { scroll: false });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={buildPath("/")} className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo.svg" alt="Puntored Developer" width={120} height={42} />
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            <span className="text-primary">Developers</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              href={buildPath(item.path)}
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
          {/* Selector de idioma */}
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
                const isActiveLocale = l.code === locale;
                return (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => handleLocaleChange(l.code)}
                    className={`gap-2 text-xs ${
                      isActiveLocale ? "text-primary font-semibold" : ""
                    }`}
                  >
                    <span>{l.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Selector de país */}
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
                    onClick={() => handleCountryChange(c.code)}
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
                    href={buildPath(item.path)}
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

