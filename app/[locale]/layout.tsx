import type { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Providers } from "@/components/providers";
import { MobileMenuProvider } from "@/components/MobileMenuProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
type Props = {
  children: ReactNode;
  params: { locale: Locale };
};
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  const messages = await getMessages({ locale });
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <MobileMenuProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MobileMenuProvider>
      </Providers>
    </NextIntlClientProvider>
  );
}
