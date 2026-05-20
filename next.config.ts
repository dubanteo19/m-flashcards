import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  allowedDevOrigins: ['192.168.100.38'],
};

export default withNextIntl(nextConfig);