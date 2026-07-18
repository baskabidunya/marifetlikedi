// Google AdSense configuration.
// The publisher client id is resolved in the layout: NEXT_PUBLIC_ADSENSE_CLIENT first,
// then the admin "adsense_client_id" site setting. Ad unit slot ids are per-placement
// environment variables (set in .env.local / Vercel project env). When a slot id is
// empty, the corresponding <AdSlot> renders nothing — so the site is safe to deploy
// before AdSense approval / before slot ids are known.

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";

export type AdSlotName =
  | "home_leaderboard"
  | "content_inline"
  | "sidebar"
  | "footer"
  | "tarot"
  | "profile"
  | "synastry"
  | "blog_listing"
  | "burc_detail"
  | "burclar_listing"
  | "trend_listing"
  | "uyum"
  | "uyum_result"
  | "dogum_haritasi"
  | "duyurular"
  | "duyurular_detay"
  | "sss"
  | "static_page"
  | "auth";

const AD_SLOT_ENV: Record<AdSlotName, string | undefined> = {
  home_leaderboard: process.env.NEXT_PUBLIC_AD_SLOT_HOME,
  content_inline: process.env.NEXT_PUBLIC_AD_SLOT_CONTENT,
  sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR,
  footer: process.env.NEXT_PUBLIC_AD_SLOT_FOOTER,
  tarot: process.env.NEXT_PUBLIC_AD_SLOT_TAROT,
  profile: process.env.NEXT_PUBLIC_AD_SLOT_PROFILE,
  synastry: process.env.NEXT_PUBLIC_AD_SLOT_SYNASTRY,
  blog_listing: process.env.NEXT_PUBLIC_AD_SLOT_BLOG_LISTING,
  burc_detail: process.env.NEXT_PUBLIC_AD_SLOT_BURC_DETAIL,
  burclar_listing: process.env.NEXT_PUBLIC_AD_SLOT_BURCLAR_LISTING,
  trend_listing: process.env.NEXT_PUBLIC_AD_SLOT_TREND_LISTING,
  uyum: process.env.NEXT_PUBLIC_AD_SLOT_UYUM,
  uyum_result: process.env.NEXT_PUBLIC_AD_SLOT_UYUM_RESULT,
  dogum_haritasi: process.env.NEXT_PUBLIC_AD_SLOT_DOGUM_HARITASI,
  duyurular: process.env.NEXT_PUBLIC_AD_SLOT_DUYURULAR,
  duyurular_detay: process.env.NEXT_PUBLIC_AD_SLOT_DUYURULAR_DETAY,
  sss: process.env.NEXT_PUBLIC_AD_SLOT_SSS,
  static_page: process.env.NEXT_PUBLIC_AD_SLOT_STATIC_PAGE,
  auth: process.env.NEXT_PUBLIC_AD_SLOT_AUTH,
};

export function getAdSlot(name: AdSlotName): string {
  return AD_SLOT_ENV[name] || "";
}
