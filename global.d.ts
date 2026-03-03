declare module "next-intl/middleware" {
  const createMiddleware: (config: { locales: readonly string[]; defaultLocale: string }) => any;
  export default createMiddleware;
}

