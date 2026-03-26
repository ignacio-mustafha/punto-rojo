import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { defaultLocale, locales } from "@/i18n/routing";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const authCookie = request.cookies.get("puntored_auth")?.value;

  if (authCookie) {
    response.headers.set("x-authenticated", "true");
    response.headers.set("x-user", decodeURIComponent(authCookie));
  } else {
    response.headers.set("x-authenticated", "false");
    response.headers.delete("x-user");
  }

  return response;
}

export const config = {
  // Exclude API routes from locale middleware so /api/* no redirections
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
