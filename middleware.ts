import createMiddleware from "next-intl/middleware";

import { defaultLocale, locales } from "@/i18n/routing";

export default createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  // Exclude API routes from locale middleware so /api/* no redirections
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
