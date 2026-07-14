import Link from "next/link";
import { getPublicNavLinks } from "@/lib/public-queries";
import AdSlot from "@/components/ads/AdSlot";

export default async function Footer() {
  const footerLinks = await getPublicNavLinks("footer");

  return (
    <footer className="bg-surface-container-lowest w-full py-12 border-t border-outline-variant/30 mt-section-gap">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-container-padding-desktop max-w-7xl mx-auto items-start">
        <div className="space-y-4">
          <div className="text-headline-md text-primary font-bold">Marifetli Kedi</div>
          <p className="text-caption text-on-surface-variant leading-relaxed">
            &copy; 2024 Marifetli Kedi. Guided by the stars, crafted for the soul.
            Kozmik bilgeliği modern dünyayla buluşturuyoruz.
          </p>
        </div>
        <div className="space-y-4">
          <h5 className="text-label-md text-white">Hızlı Linkler</h5>
          <ul className="space-y-2">
            {footerLinks.slice(0, 5).map(link => (
              <li key={link.id}>
                <Link className="text-body-md text-on-surface-variant hover:text-tertiary transition-colors" href={link.url}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="text-label-md text-white">Kurumsal</h5>
          <ul className="space-y-2">
            {footerLinks.slice(5, 10).map(link => (
              <li key={link.id}>
                <Link className="text-body-md text-on-surface-variant hover:text-tertiary transition-colors" href={link.url}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="text-label-md text-white">İletişim</h5>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">mail</span> hello@marifetlikedi.com
            </li>
            <li className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">location_on</span> İstanbul, Türkiye
            </li>
          </ul>
        </div>
      </div>
      <AdSlot
        name="footer"
        className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop mb-10"
      />
      <div className="text-center mt-12 pt-8 border-t border-white/5 text-caption text-outline">
        Yıldızlar sadece yol gösterir, seçimi sen yaparsın.
      </div>
    </footer>
  );
}
