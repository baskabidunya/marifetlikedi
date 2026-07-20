import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["quill"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  productionBrowserSourceMaps: false,
  serverExternalPackages: [
    "@supabase/supabase-js",
    "@supabase/ssr",
    "astronomy-engine",
  ],
};

export default nextConfig;
