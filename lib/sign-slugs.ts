export const SIGN_SLUGS: Record<string, string> = {
  Koç: "kocburcu",
  Boğa: "bogaburcu",
  İkizler: "ikizlerburcu",
  Yengeç: "yengecburcu",
  Aslan: "aslanburcu",
  Başak: "basakburcu",
  Terazi: "teraziburcu",
  Akrep: "akrepburcu",
  Yay: "yayburcu",
  Oğlak: "oglakburcu",
  Kova: "kovaburcu",
  Balık: "balikburcu",
};

export function signSlug(sign: string): string {
  return SIGN_SLUGS[sign] || sign.toLowerCase();
}

export function slugToSign(slug: string): string | undefined {
  switch (slug) {
    case "kocburcu": return "Koç";
    case "bogaburcu": return "Boğa";
    case "ikizlerburcu": return "İkizler";
    case "yengecburcu": return "Yengeç";
    case "aslanburcu": return "Aslan";
    case "basakburcu": return "Başak";
    case "teraziburcu": return "Terazi";
    case "akrepburcu": return "Akrep";
    case "yayburcu": return "Yay";
    case "oglakburcu": return "Oğlak";
    case "kovaburcu": return "Kova";
    case "balikburcu": return "Balık";
    default: return undefined;
  }
}
