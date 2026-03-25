"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCountry, type CountryCode } from "@/lib/country-context";

export const COUNTRIES = [
  { code: "CO", flag: "\uD83C\uDDE8\uD83C\uDDF4", name: "Colombia" },
  { code: "MX", flag: "\uD83C\uDDF2\uD83C\uDDFD", name: "M\u00E9xico" },
  { code: "PE", flag: "\uD83C\uDDF5\uD83C\uDDEA", name: "Per\u00FA" },
  { code: "AR", flag: "\uD83C\uDDE6\uD83C\uDDF7", name: "Argentina" },
  { code: "CL", flag: "\uD83C\uDDE8\uD83C\uDDF1", name: "Chile" },
  { code: "EC", flag: "\uD83C\uDDEA\uD83C\uDDE8", name: "Ecuador" },
  { code: "GT", flag: "\uD83C\uDDEC\uD83C\uDDF9", name: "Guatemala" },
  { code: "PA", flag: "\uD83C\uDDF5\uD83C\uDDE6", name: "Panam\u00E1" },
] as const;

export const LOCALES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
] as const;

export function useNavbar() {
  const { country, setCountry } = useCountry();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const segments = pathname?.split("/").filter(Boolean) ?? [];
  const locale = (segments[0] as string | undefined) || "es";

  const buildPath = (path: string) => {
    const base = path === "/" ? "" : path;
    let url = `/${locale}${base}`;

    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (country) params.set("country", country);

    const query = params.toString();
    if (query) url += `?${query}`;

    return url;
  };

  const isActive = (path: string) => {
    const base = path === "/" ? "" : path;
    const fullBase = `/${locale}${base}`;
    return path === "/" ? pathname === fullBase : pathname?.startsWith(fullBase);
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

  return {
    country,
    locale,
    buildPath,
    isActive,
    handleCountryChange,
    handleLocaleChange,
  };
}
