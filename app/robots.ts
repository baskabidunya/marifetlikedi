import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/admin", "/profil", "/giris", "/kayit", "/sifre-yenile", "/sifremi-unuttum"],
      },
    ],
    sitemap: "https://www.marifetlikedi.com/sitemap.xml",
  };
}
