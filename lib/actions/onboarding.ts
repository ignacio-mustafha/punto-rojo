"use server";

import type { Locale } from "@/i18n/routing";
import {
  type OnboardingData,
  ONBOARDING_MOCK_ES,
  ONBOARDING_MOCK_EN,
} from "@/lib/mocks/onboarding.mock";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getOnboarding(locale: Locale): Promise<OnboardingData> {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/onboarding?locale=${locale}`, {
        next: { revalidate: 60 },
      });
      if (res.ok) {
        return (await res.json()) as OnboardingData;
      }
    } catch {
      // fall through to mock
    }
  }
  return locale === "en" ? ONBOARDING_MOCK_EN : ONBOARDING_MOCK_ES;
}

