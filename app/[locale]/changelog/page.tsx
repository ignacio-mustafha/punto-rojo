import type { Locale } from "@/i18n/routing";
import ChangelogPage from "@/components/ChangelogPage";
import { getChangelog } from "@/lib/actions/changelog";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    country?: string;
  }>;
};

export default async function ChangelogRoute({
  params,
  searchParams,
}: Props) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);

  const country = (sp.country ?? "CO").toUpperCase();
  const data = await getChangelog(locale);

  return <ChangelogPage data={data} locale={locale} country={country} />;
}

