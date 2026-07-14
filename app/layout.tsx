import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdNetwork from "@/components/ads/AdNetwork";
import { getSiteSetting } from "@/lib/public-queries";
import { ADSENSE_CLIENT } from "@/lib/ads";
import "@/styles/globals.css";

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
  title: "Marifetli Kedi — Kozmik Keşifler Portalı",
  description: "Evrenin fısıltılarını keşfetmek için portalı arala.",
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
      <body className="bg-surface text-on-surface font-inter antialiased">
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