"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "puntored_country";

export type CountryCode = "CO" | "MX" | "PE" | "AR" | "CL" | "EC" | "GT" | "PA";

type CountryContextValue = {
  country: CountryCode;
  setCountry: (country: CountryCode) => void;
};

const CountryContext = createContext<CountryContextValue | undefined>(
  undefined,
);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<CountryCode>("CO");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const fromUrl = params.get("country")?.toUpperCase() as CountryCode | null;

    const allCodes: CountryCode[] = ["CO", "MX", "PE", "AR", "CL", "EC", "GT", "PA"];
    const isValidFromUrl = fromUrl && allCodes.includes(fromUrl);

    if (isValidFromUrl) {
      setCountryState(fromUrl as CountryCode);
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CountryCode;
        if (allCodes.includes(parsed)) {
          setCountryState(parsed);
        }
      } catch {
        // ignore invalid stored value
      }
    }
  }, []);

  const setCountry = useCallback((next: CountryCode) => {
    setCountryState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  }, []);

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return ctx;
}

