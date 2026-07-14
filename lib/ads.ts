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
  | "synastry";

const AD_SLOT_ENV: Record<AdSlotName, string | undefined> = {
  home_leaderboard: process.env.NEXT_PUBLIC_AD_SLOT_HOME,
  content_inline: process.env.NEXT_PUBLIC_AD_SLOT_CONTENT,
  sidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR,
  footer: process.env.NEXT_PUBLIC_AD_SLOT_FOOTER,
  tarot: process.env.NEXT_PUBLIC_AD_SLOT_TAROT,
  profile: process.env.NEXT_PUBLIC_AD_SLOT_PROFILE,
  synastry: process.env.NEXT_PUBLIC_AD_SLOT_SYNASTRY,
};

export function getAdSlot(name: AdSlotName): string {
  return AD_SLOT_ENV[name] || "";
}
