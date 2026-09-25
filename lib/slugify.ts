const TR_MAP: Record<string, string> = {
  ı: "i", İ: "i", ş: "s", Ş: "s", ğ: "g", Ğ: "g",
  ü: "u", Ü: "u", ö: "o", Ö: "o", ç: "c", Ç: "c",
};

/** Başlığın TAMAMINI alır, Türkçe harfleri ASCII'ye çevirir, URL'lik slug üretir. */
export function slugify(input: string): string {
  return input
    .split("")
    .map((c) => TR_MAP[c] ?? c)
    .join("")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
