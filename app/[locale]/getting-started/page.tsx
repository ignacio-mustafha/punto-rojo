import type { Locale } from "@/i18n/routing";
import GettingStartedPage from "@/components/GettingStartedPage";
import { getOnboarding } from "@/lib/actions/onboarding";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    country?: string;
  }>;
};

export default async function GettingStartedRoute({ params, searchParams }: Props) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);

  const country = (sp.country ?? "CO").toUpperCase();
  const data = await getOnboarding(locale);

  return <GettingStartedPage initialData={data} locale={locale} country={country} />;
}
