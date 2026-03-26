"use client";

import type { CountryCode } from "@/lib/country-context";

export const AUTH_STORAGE_KEY = "puntored_auth_session";
export const AUTH_COOKIE_KEY = "puntored_auth";

export type AuthUser = {
  email: string;
  name: string;
  allowedCountries: CountryCode[];
};

export type AuthSession = {
  accessToken: string;
  user: AuthUser;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export interface AuthService {
  login(payload: LoginPayload): Promise<AuthSession>;
  logout(): Promise<void>;
  getSession(): Promise<AuthSession | null>;
}

const MOCK_EMAIL = "test.user@yopmail.com";
const MOCK_PASSWORD = "123password";

const mockSession: AuthSession = {
  accessToken: "mock-access-token-test-user",
  user: {
    email: MOCK_EMAIL,
    name: "Test User",
    allowedCountries: ["CO", "MX", "PE"],
  },
};

function persistSession(session: AuthSession) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  window.localStorage.setItem("access_token", session.accessToken);
  document.cookie = `${AUTH_COOKIE_KEY}=${encodeURIComponent(session.user.email)}; path=/; SameSite=Lax`;
}

function clearSession() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.localStorage.removeItem("access_token");
  document.cookie = `${AUTH_COOKIE_KEY}=; Max-Age=0; path=/; SameSite=Lax`;
}

export const authService: AuthService = {
  async login(payload) {
    const email = payload.email.trim().toLowerCase();
    if (email !== MOCK_EMAIL || payload.password !== MOCK_PASSWORD) {
      throw new Error("Credenciales invalidas.");
    }

    persistSession(mockSession);
    return mockSession;
  },

  async logout() {
    clearSession();
  },

  async getSession() {
    if (typeof window === "undefined") return null;

    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as AuthSession;
      if (!parsed?.accessToken || !parsed?.user?.email) {
        clearSession();
        return null;
      }

      return parsed;
    } catch {
      clearSession();
      return null;
    }
  },
};
