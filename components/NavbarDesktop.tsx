"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContactFormDialog from "@/components/ContactFormDialog";
import LoginDialog from "@/components/LoginDialog";
import { LOCALES, useNavbar } from "@/hooks/useNavbar";
import { useAuth } from "@/lib/auth-context";

export default function NavbarDesktop() {
  const t = useTranslations("nav");
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const {
    country,
    countries,
    locale,
    buildPath,
    isActive,
    handleCountryChange,
    handleLocaleChange,
  } = useNavbar();

  const navItems = [
    { label: t("home"), path: "/" },
    { label: t("products"), path: "/products" },
    { label: t("gettingStarted"), path: "/getting-started" },
    { label: t("changelog"), path: "/changelog" },
  ] as const;
  const initials = (user?.name ?? user?.email ?? "U")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  const isDark = theme === "dark";

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
        {!isAuthenticated ? (
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
        ) : null}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 border-border bg-muted px-2.5 text-xs text-muted-foreground hover:bg-accent"
            >
              <span>{countries.find((c) => c.code === country)?.flag}</span>
              <span>{country}</span>
              <ChevronDown size={11} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {countries.map((c) => {
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

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 rounded-full border-border bg-muted p-0 text-xs font-bold text-muted-foreground hover:bg-accent"
                aria-label="Abrir menu de cuenta"
              >
                {initials || "U"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">{user?.name ?? "Usuario"}</p>
                <p className="text-[11px] font-normal text-muted-foreground">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="text-xs font-semibold">
                <Link href={buildPath("/profile")}>Mi perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuLabel className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Idioma
              </DropdownMenuLabel>
              {LOCALES.map((l) => {
                const active = l.code === locale;
                return (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => handleLocaleChange(l.code)}
                    className={`text-xs ${active ? "font-semibold text-primary" : ""}`}
                  >
                    {l.label}
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuItem
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="text-xs"
              >
                {isDark ? "Modo claro" : "Modo oscuro"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-xs font-semibold text-primary">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginDialog
            trigger={
              <Button variant="outline" size="sm" className="h-8 text-xs font-bold">
                Login
              </Button>
            }
          />
        )}

        {!isAuthenticated ? (
          <ContactFormDialog
            trigger={
              <Button variant="outline" size="sm" className="hidden h-8 text-xs font-bold sm:flex">
                {t("contactCta")}
              </Button>
            }
          />
        ) : null}
      </div>
    </div>
  );
}
