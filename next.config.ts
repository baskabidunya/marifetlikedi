import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  serverExternalPackages: [
    "@supabase/supabase-js",
    "@supabase/ssr",
    "astronomy-engine",
  ],
};

export default nextConfig;
