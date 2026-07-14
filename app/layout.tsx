import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import { CreditProvider } from "@/components/CreditProvider";
import { getActiveAnnouncements } from "@/lib/public-queries";
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
  const announcements = await getActiveAnnouncements();

  return (
    <html lang="tr" className={`dark ${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-surface text-on-surface font-inter antialiased">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
        />
        <AnnouncementBanner items={announcements} />
        <Header />
        <CreditProvider>
          {children}
        </CreditProvider>
        <Footer />
      </body>
    </html>
  );
}