"use server";

import type { Locale } from "@/i18n/routing";
import {
  type OnboardingData,
  ONBOARDING_MOCK_ES,
  ONBOARDING_MOCK_EN,
} from "@/lib/mocks/onboarding.mock";

export async function getOnboarding(locale: Locale): Promise<OnboardingData> {
  if (locale === "en") {
    return ONBOARDING_MOCK_EN;
  }
  return ONBOARDING_MOCK_ES;
}

