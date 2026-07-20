import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Marifetli Kedi gizlilik politikası: topladığımız veriler, çerez kullanımı, Google AdSense ve üçüncü taraf reklamlar hakkında bilgilendirme.",
  alternates: { canonical: "/gizlilik-politikasi" },
};

export default function GizlilikPolitikasiPage() {
  return (
    <LegalPage
      title="Gizlilik Politikası"
      description="Marifetli Kedi olarak kişisel verilerinizin gizliliğine önem veriyoruz. Bu sayfa, sitemizi kullanırken hangi verileri topladığımızı ve bu verileri nasıl kullandığımızı açıklar."
      slug="gizlilik-politikasi"
    >
      <h2 className="font-sora text-headline-sm text-white">1. Topladığımız Bilgiler</h2>
      <p>
        Sitemizi ziyaret ettiğinizde otomatik olarak bazı teknik veriler (IP adresi, tarayıcı
        türü, cihaz bilgisi, giriş sayfaları ve ziyaret süresi) standart günlük dosyaları ve
        çerezler aracılığıyla toplanabilir. Ayrıca doğum haritası, uyum analizi ve profil
        oluşturma gibi özellikleri kullandığınızda bizimle paylaştığınız bilgiler (ad, e-posta,
        doğum tarihi, doğum yeri ve saati) yalnızca size hizmet sunmak amacıyla işlenir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">2. Çerezler (Cookies)</h2>
      <p>
        Marifetli Kedi, sitenin çalışması, tercihlerinizin hatırlanması ve içeriklerin
        kişiselleştirilmesi için çerezler kullanır. Çerezleri tarayıcı ayarlarınızdan
        yönetebilir veya devre dışı bırakabilirsiniz; ancak bu durum bazı özelliklerin
        çalışmamasına yol açabilir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">3. Google AdSense ve Üçüncü Taraf Reklamlar</h2>
      <p>
        Sitemiz, Google AdSense reklam ağı tarafından sağlanan reklamlar içerebilir. Google ve
        iş ortakları, size uygun reklamları göstermek için tarayıcınıza bir reklam çerezi
        yerleştirebilir veya tanımlayıcıları okuyabilir. Bu işlem, Google&apos;ın reklam
        politikalarına ve gizlilik uygulamalarına tabidir.
      </p>
      <p>
        Google tarafından kişiselleştirilmiş reklamların kontrolünü şu adresten
        yönetebilirsiniz:{" "}
        <Link href="https://www.google.com/ads/preferences" className="text-primary underline">
          google.com/ads/preferences
        </Link>
        . Ayrıntılı bilgi için Google Gizlilik ve Şartlar sayfasını
        ziyaret edebilirsiniz:{" "}
        <Link href="https://policies.google.com/technologies/ads" className="text-primary underline">
          policies.google.com/technologies/ads
        </Link>
        .
      </p>

      <h2 className="font-sora text-headline-sm text-white">4. Verilerin Kullanımı</h2>
      <p>
        Topladığımız veriler; sitenin işleyişini sağlamak, içerik ve reklamları
        kişiselleştirmek, analiz etmek ve yasal yükümlülükleri yerine getirmek amacıyla
        kullanılır. Verileriniz üçüncü taraflara, yalnızca yukarıda belirtilen reklam ve
        analiz hizmetleri kapsamında ve yasal sınırlar içinde aktarılabilir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">5. Veri Güvenliği</h2>
      <p>
        Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri (HTTPS
        şifreleme, erişim kontrolü) uyguluyoruz. Ancak internet üzerinden hiçbir iletim
        yöntemi %100 güvenli değildir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">6. Haklarınız (KVKK)</h2>
      <p>
        Kişisel verilerinizle ilgili olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu
        kapsamında çeşitli haklara sahipsiniz. Detaylı bilgi için{" "}
        <Link href="/kvkk" className="text-primary underline">
          KVKK Aydınlatma Metni
        </Link>{" "}
        sayfamızı inceleyebilirsiniz.
      </p>

      <h2 className="font-sora text-headline-sm text-white">7. İletişim</h2>
      <p>
        Gizlilik politikamızla ilgili sorularınız için{" "}
        <Link href="/iletisim" className="text-primary underline">
          iletişim sayfamız
        </Link>{" "}
        üzerinden bize ulaşabilirsiniz: hello@marifetlikedi.com
      </p>

      <p className="text-caption text-outline pt-4">
        Son güncelleme: 20 Temmuz 2026. Bu politika dilediğimiz zaman güncellenebilir;
        önemli değişiklikler sitemizde yayınlanır.
      </p>
    </LegalPage>
  );
}
