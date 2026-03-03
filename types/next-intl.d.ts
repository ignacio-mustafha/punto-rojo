declare module "next-intl" {
  import type { ReactNode } from "react";

  export function useTranslations(
    namespace?: string,
  ): (key: string, values?: Record<string, unknown>) => string;

  export interface NextIntlClientProviderProps {
    children: ReactNode;
    locale?: string;
    messages?: Record<string, unknown>;
  }

  export default function NextIntlClientProvider(
    props: NextIntlClientProviderProps,
  ): JSX.Element;
}

declare module "next-intl/server" {
  export async function getMessages(
    options?: { locale?: string },
  ): Promise<Record<string, unknown>>;
}

declare module "next-intl/middleware" {
  type NextRequest = unknown;
  type NextResponse = unknown;

  interface MiddlewareConfig {
    locales: readonly string[];
    defaultLocale: string;
  }

  export default function createMiddleware(config: MiddlewareConfig): (
    request: NextRequest,
  ) => NextResponse;
}


