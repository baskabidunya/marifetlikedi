import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdNetwork from "@/components/ads/AdNetwork";
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "Marifetli Kedi",
    title: "Marifetli Kedi — Kozmik Keşifler Portalı",
    description:
      "Astroloji, burç yorumları, tarot ve doğum haritasıyla kozmik rehberlik portalı.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marifetli Kedi — Kozmik Keşifler Portalı",
    description:
      "Astroloji, burç yorumları, tarot ve doğum haritasıyla kozmik rehberlik portalı.",
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8173666333919708"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-surface text-on-surface font-inter antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KKDKPBQWKF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KKDKPBQWKF');
          `}
        </Script>
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
      </body>
    </html>
  );
}