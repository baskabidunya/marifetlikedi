import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https://apis.google.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com https://www.gstatic.com",
  "frame-src 'self' https://pagead2.googlesyndication.com https://www.google.com",
  "connect-src 'self' https://gbgsykjrozmpkpsqukcp.supabase.co https://www.google-analytics.com https://pagead2.googlesyndication.com https://www.googletagmanager.com https://apis.google.com",
  "manifest-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const isLocal =
    host === "localhost:3000" || host === "127.0.0.1:3000" || host.startsWith("192.168.");

  if (!isLocal && !host.startsWith("www.")) {
    const url = new URL(request.url);
    url.host = `www.${host}`;
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", CSP);
  return response;
}

export const config = {
  matcher: "/((?!api|_next|static|favicon.ico|ads.txt|robots.txt|sitemap.xml).*)",
};
