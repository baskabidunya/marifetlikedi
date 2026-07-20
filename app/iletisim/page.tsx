import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Marifetli Kedi ile iletişime geçin: sorularınız, önerileriniz ve iş birliği talepleriniz için iletişim formu ve adres bilgileri.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimPage() {
  return (
    <LegalPage
      title="İletişim"
      description="Sorularınız, önerileriniz veya iş birliği talepleriniz için bizimle iletişime geçebilirsiniz."
    >
      <div className="not-prose space-y-2 text-on-surface-variant">
        <p className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-sm">mail</span>
          hello@marifetlikedi.com
        </p>
        <p className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-sm">location_on</span>
          İstanbul, Türkiye
        </p>
      </div>

      <div className="pt-4">
        <ContactForm />
      </div>

      <h2 className="font-sora text-headline-sm text-white pt-4">Yasal Bilgiler</h2>
      <p>
        Gizlilik ve veri işleme hakkında{" "}
        <a href="/gizlilik-politikasi" className="text-primary underline">Gizlilik Politikası</a>{" "}
        ile{" "}
        <a href="/kvkk" className="text-primary underline">KVKK Aydınlatma Metni</a>{" "}
        sayfalarımızı inceleyebilirsiniz.
      </p>
    </LegalPage>
  );
}
