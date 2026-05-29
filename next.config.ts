import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname
  },
  // experimental: {
  //   workerThreads: false,
  //   cpus: 1
  // },
  allowedDevOrigins: ['*.trycloudflare.com'],
};

export default withNextIntl(nextConfig);