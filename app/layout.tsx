import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdNetwork from "@/components/ads/AdNetwork";
import CookieConsent from "@/components/layout/CookieConsent";
import ConsentScripts from "@/components/layout/ConsentScripts";
import { getSiteSetting } from "@/lib/public-queries";
import { ADSENSE_CLIENT } from "@/lib/ads";
import "@/styles/globals.css";

const SITE_URL = "https://www.marifetlikedi.com";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marifetli Kedi — Kozmik Keşifler Portalı",
    template: "%s | Marifetli Kedi",
  },
  description:
    "Astroloji, burç yorumları, tarot, doğum haritası ve uyum analizleriyle kozmik rehberlik sunan eğlence ve kişisel gelişim portalı.",
  applicationName: "Marifetli Kedi",
  authors: [{ name: "Marifetli Kedi" }],
  keywords: [
    "astroloji",
    "burç yorumları",
    "tarot",
    "doğum haritası",
    "uyum analizi",
    "burç uyumu",
    "günlük burç",
    "kozmik rehberlik",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "Marifetli Kedi",
    title: "Marifetli Kedi — Kozmik Keşifler Portalı",
    description:
      "Astroloji, burç yorumları, tarot ve doğum haritasıyla kozmik rehberlik portalı.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Marifetli Kedi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marifetli Kedi — Kozmik Keşifler Portalı",
    description:
      "Astroloji, burç yorumları, tarot ve doğum haritasıyla kozmik rehberlik portalı.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e0c1a",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClient =
    ADSENSE_CLIENT || (await getSiteSetting("adsense_client_id")) || "";

  return (
    <html
      lang="tr"
      className={`dark ${sora.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-8173666333919708"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Marifetli Kedi",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              description: "Astroloji, burç yorumları, tarot, doğum haritası ve uyum analizleriyle kozmik rehberlik sunan eğlence ve kişisel gelişim portalı.",
              publisher: {
                "@type": "Organization",
                name: "Başka bir Dünya",
                url: "https://baskabidunya.com",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Marifetli Kedi",
              url: SITE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/blog?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
        />
      </head>
      <body className="bg-surface text-on-surface font-inter antialiased">
        <ConsentScripts />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
        />
        <AdNetwork clientId={adsenseClient}>
          <div className="fixed top-0 inset-x-0 z-50">
            <Header />
          </div>
          {children}
          <Footer />
        </AdNetwork>
        <CookieConsent />
      </body>
    </html>
  );
}