import type { ReactNode } from "react";
import NextIntlClientProvider from "next-intl";
import { getMessages } from "next-intl/server";

import type { Locale } from "@/i18n/routing";

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

