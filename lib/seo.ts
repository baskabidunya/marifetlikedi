import type { Metadata } from "next";

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
