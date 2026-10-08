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
  publishedTime?: string;
  modifiedTime?: string;
};

/** Mutlak URL üretir; zaten http(s) ise olduğu gibi döner. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

const HTML_ENTITY_MAP: Record<string, string> = {
  "&quot;": '"',
  "&apos;": "'",
  "&#39;": "'",
  "&#x27;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&amp;": "&",
  "&nbsp;": " ",
};

/** HTML entity'lerini decode eder (&quot; -> "). Idempotent. */
export function decodeEntities(text: string | null | undefined): string {
  if (!text) return "";
  let out = text;
  for (let i = 0; i < 2; i++) {
    out = out.replace(/&(?:quot|apos|lt|gt|amp|nbsp);|&#(?:39|x27);/gi, (m) =>
      HTML_ENTITY_MAP[m.toLowerCase()] ?? HTML_ENTITY_MAP[m] ?? m,
    );
  }
  return out;
}

/** HTML etiketlerini ve markdown işaretlerini temizler. */
export function stripMarkup(text: string): string {
  return decodeEntities(text)
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*#_`~>|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Meta description üretir: temizler, HTML/markdown artıklarını atar ve
 * kelime sınırında140-160 karaktere keser. Metin zaten kısaysa olduğu gibi döner.
 */
export function cleanDescription(text: string, min = 140, max = 160): string {
  const clean = stripMarkup(text || "");
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const wordCut = lastSpace > min ? cut.slice(0, lastSpace) : cut;
  return wordCut.trimEnd();
}

/**
 * Trend etiketinin ekranda görünen biçimi.
 * DB değeri ("Listik İçerik") değişmez; yalnızca gösterim düzeltilir.
 */
export function trendTagLabel(tag: string | null | undefined): string {
  const t = (tag || "").trim();
  if (t === "Listik İçerik") return "Liste";
  return t;
}

export function ogMeta({
  title,
  description,
  path,
  type = "website",
  image,
  publishedTime,
  modifiedTime,
}: OGInput): Pick<Metadata, "openGraph" | "twitter"> {
  const img = absoluteUrl(image || "/og-default.png");
  return {
    openGraph: {
      type,
      title,
      description,
      url: absoluteUrl(path),
      siteName: "Marifetli Kedi",
      locale: "tr_TR",
      images: [{ url: img, alt: title }],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img],
    },
  };
}
