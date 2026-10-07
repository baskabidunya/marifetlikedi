import type { Metadata } from "next";

const SITE_URL = "https://www.marifetlikedi.com";

export function breadcrumbLd(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: `${SITE_URL}${it.path}` } : {}),
    })),
  };
}

export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

type OGInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
};

export function ogMeta({
  title,
  description,
  path,
  type = "website",
  image,
}: OGInput): Pick<Metadata, "openGraph" | "twitter"> {
  const img = image || "/og-default.png";
  return {
    openGraph: {
      type,
      title,
      description,
      url: path,
      siteName: "Marifetli Kedi",
      locale: "tr_TR",
      images: [{ url: img, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img],
    },
  };
}
