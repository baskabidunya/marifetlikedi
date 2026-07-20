import Link from "next/link";
import { getPublicNavLinks } from "@/lib/public-queries";
import AdSlot from "@/components/ads/AdSlot";

// Footer menüsü tek veri kaynağından (navigation_links) gruplanır; böylece
// aynı bağlantı iki kez görünmez ve başlık/altlık menüleri çakışmaz.
const QUICK_URLS = ["/", "/burclar", "/tarot", "/blog", "/sss", "/duyurular"];
const CORPORATE_URLS = [
  "/hakkimizda",
  "/iletisim",
  "/gizlilik-politikasi",
  "/kvkk",
  "/kullanim-kosullari",
  "/cerez-politikasi",
];

export default async function Footer() {
  const footerLinks = await getPublicNavLinks("footer");

  const quickLinks = footerLinks.filter((l) => QUICK_URLS.includes(l.url));
  const corporateLinks = footerLinks.filter((l) => CORPORATE_URLS.includes(l.url));

  return (
    <footer className="bg-surface-container-lowest w-full py-12 border-t border-outline-variant/30 mt-section-gap">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto items-start">
        <div className="space-y-4">
          <div className="text-headline-md text-primary font-bold">Marifetli Kedi</div>
          <p className="text-caption text-on-surface-variant leading-relaxed">
            &copy; 2026 Marifetli Kedi. Kozmik bilgeliği modern dünyayla buluşturuyoruz.
          </p>
        </div>
        <div className="space-y-4">
          <h5 className="text-label-md text-white">Hızlı Linkler</h5>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
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
            {corporateLinks.map((link) => (
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
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com/marifetli.kedi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-400/30 transition-all"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <AdSlot
        name="footer"
        className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop mb-10"
      />
      <div className="text-center mt-12 pt-8 border-t border-white/5 text-caption text-outline">
        Yıldızlar sadece yol gösterir, seçimi sen yaparsın.
      </div>
      <div className="text-center mt-3 px-container-padding-mobile md:px-container-padding-desktop">
        <p className="text-caption text-outline/70">
          Marifetli Kedi, bir <span className="text-on-surface-variant">Başka bir Dünya</span> (baskabidunya.com) sitesidir.
        </p>
      </div>
      <div className="text-center mt-4 px-container-padding-mobile md:px-container-padding-desktop max-w-4xl mx-auto">
        <p className="text-caption text-outline/70 leading-relaxed">
          Marifetli Kedi&apos;ndeki tüm burç yorumları, tarot ve uyum analizleri{" "}
          <span className="text-on-surface-variant">yalnızca eğlence amaçlıdır</span> ve
          profesyonel astroloji, psikolojik, tıbbi veya hukuki danışmanlık yerine geçmez.
          Kararların sorumluluğu size aittir.
        </p>
      </div>
    </footer>
  );
}
