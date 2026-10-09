// next/image ile optimize edilebilen (allowlist'e ekli) görsel hostları.
const OPTIMIZABLE_HOSTS = new Set([
  "gbgsykjrozmpkpsqukcp.supabase.co",
  "lh3.googleusercontent.com",
  "images.unsplash.com",
  "source.unsplash.com",
  "picsum.photos",
]);

export function canOptimizeImage(url: string | null | undefined): url is string {
  if (!url) return false;
  try {
    return OPTIMIZABLE_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}
