import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Let next-intl auto-discover ./i18n/request.ts for App Router.
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default withNextIntl(nextConfig);
