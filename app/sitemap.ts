import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog-public";
import { getTrendArticles } from "@/lib/admin";
import { getAllAnnouncements } from "@/lib/public-queries";
import { SIGN_SLUGS } from "@/lib/sign-slugs";

const SITE_URL = "https://www.marifetlikedi.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/blog",
    "/burclar",
    "/tarot",
    "/trend",
    "/uyum",
    "/dogum-haritasi",
    "/eglenceli-testler",
    "/duyurular",
    "/sss",
    "/gizlilik-politikasi",
    "/kvkk",
    "/hakkimizda",
    "/iletisim",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  let trendRoutes: MetadataRoute.Sitemap = [];
  let duyuruRoutes: MetadataRoute.Sitemap = [];
  let burcRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts = await getPublishedPosts();
    blogRoutes = posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at || p.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    /* DB unavailable */
  }

  try {
    const trends = await getTrendArticles();
    trendRoutes = trends.map((t) => ({
      url: `${SITE_URL}/trend/${t.slug}`,
      lastModified: new Date(t.updated_at || t.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    /* DB unavailable */
  }

  try {
    const duyurular = await getAllAnnouncements();
    duyuruRoutes = duyurular.map((d) => ({
      url: `${SITE_URL}/duyurular/${d.id}`,
      lastModified: new Date(d.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));
  } catch {
    /* DB unavailable */
  }

  burcRoutes = Object.values(SIGN_SLUGS).map((slug) => ({
    url: `${SITE_URL}/burclar/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...trendRoutes,
    ...duyuruRoutes,
    ...burcRoutes,
  ];
}
