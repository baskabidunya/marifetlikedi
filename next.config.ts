import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // CSS'i HTML'e göm: render-blocking stylesheet isteği kalkar (FCP/LCP kazancı).
    inlineCss: true,
  },
  transpilePackages: ["quill"],
  images: {
    // Optimize edilmiş görseller uzun süre CDN'de kalsın (varsayılan 4 saatti).
    minimumCacheTTL: 604800,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "gbgsykjrozmpkpsqukcp.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  productionBrowserSourceMaps: false,
  async redirects() {
    return [
      { source: "/duyurular/:path*", destination: "/", permanent: true },
      { source: "/duyurular", destination: "/", permanent: true },
    ];
  },
  serverExternalPackages: [
    "@supabase/supabase-js",
    "@supabase/ssr",
    "astronomy-engine",
  ],
};

export default nextConfig;
