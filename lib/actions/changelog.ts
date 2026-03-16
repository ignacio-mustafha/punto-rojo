"use server";

import type { Locale } from "@/i18n/routing";
import {
  type ChangelogData,
  CHANGELOG_MOCK_ES,
  CHANGELOG_MOCK_EN,
} from "@/lib/mocks/changelog.mock";

export async function getChangelog(locale: Locale): Promise<ChangelogData> {
  return locale === "en" ? CHANGELOG_MOCK_EN : CHANGELOG_MOCK_ES;
}

