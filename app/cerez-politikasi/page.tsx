import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "Marifetli Kedi çerez politikası: sitemizde kullanılan çerez türleri, amaçları ve tercihlerinizi nasıl yönetebileceğiniz hakkında bilgi.",
  alternates: { canonical: "/cerez-politikasi" },
};

export default function CerezPolitikasiPage() {
  return (
    <LegalPage
      title="Çerez Politikası"
      description="Bu sayfa, Marifetli Kedi (&quot;biz&quot;, &quot;bize&quot;, &quot;bizim&quot;) tarafından kullanılan çerezler hakkında sizi bilgilendirmek amacıyla hazırlanmıştır. Sitemizi kullanarak bu politikada belirtilen şekilde çerez kullanımına izin vermiş olursunuz."
      slug="cerez-politikasi"
    >
      <h2 className="font-sora text-headline-sm text-white">1. Çerez Nedir?</h2>
      <p>
        Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınıza veya cihazınıza kaydedilen
        küçük metin dosyalarıdır. Çerezler, web sitesinin düzgün çalışması, tercihlerinizi
        hatırlaması ve size daha iyi bir kullanıcı deneyimi sunması için kullanılır.
      </p>

      <h2 className="font-sora text-headline-sm text-white">2. Kullandığımız Çerez Türleri</h2>

      <h3 className="font-sora text-title-md text-white mt-6">Zorunlu Çerezler</h3>
      <p>
        Bu çerezler, web sitemizin düzgün çalışması için gereklidir. Oturum yönetimi, güvenlik
        ve erişim kontrolü gibi temel işlevleri sağlarlar. Bu çerezler olmadan sitemizin bazı
        özellikleri kullanılamaz.
      </p>

      <h3 className="font-sora text-title-md text-white mt-6">İşlevsellik Çerezleri</h3>
      <p>
        Bu çerezler, tercihlerinizi hatırlamamıza ve size daha kişiselleştirilmiş bir deneyim
        sunmamıza olanak tanır. Örneğin, burç tercihiniz veya oturum bilgileriniz bu çerezler
        aracılığıyla saklanabilir.
      </p>

      <h3 className="font-sora text-title-md text-white mt-6">Analitik Çerezler</h3>
      <p>
        Google Analytics aracılığıyla kullanılan bu çerezler, ziyaretçilerin sitemizi nasıl
        kullandığını anlamamıza yardımcı olur. Hangi sayfaların daha popüler olduğunu,
        kullanıcıların sitede nasıl gezindiğini ve iyileştirme alanlarını belirlemek için
        anonimleştirilmiş veriler toplarız.
      </p>

      <h3 className="font-sora text-title-md text-white mt-6">Reklam/Pazarlama Çerezleri</h3>
      <p>
        Google AdSense tarafından kullanılan bu çerezler, size ilgi alanlarınıza göre
        kişiselleştirilmiş reklamlar göstermek için kullanılır. Bu çerezler, reklamların
        etkinliğini ölçmek ve reklam tekrarlarını sınırlamak için de kullanılabilir.
        Reklam çerezleri yalnızca açık izniniz doğrultusunda etkinleştirilir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">3. Üçüncü Taraf Çerezleri</h2>
      <p>
        Sitemizde aşağıdaki üçüncü taraf hizmet sağlayıcıları tarafından yerleştirilen
        çerezler kullanılmaktadır:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Google AdSense</strong> &ndash; Reklam sunumu ve kişiselleştirme için
          çerezler kullanır. Detaylı bilgi:{" "}
          <Link href="https://policies.google.com/technologies/ads" className="text-primary underline">
            policies.google.com/technologies/ads
          </Link>
        </li>
        <li>
          <strong>Google Analytics</strong> &ndash; Kullanım istatistiklerini toplamak için
          çerezler kullanır.
        </li>
      </ul>

      <h2 className="font-sora text-headline-sm text-white">4. Çerez Tercihlerinizi Yönetme</h2>
      <p>
        Çerez tercihlerinizi aşağıdaki yollarla yönetebilirsiniz:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Tarayıcı Ayarları:</strong> Tüm modern tarayıcılar, çerezleri kabul etme
          veya reddetme, belirli çerez türlerini engelleme ve kayıtlı çerezleri silme
          imkanı sunar. Tarayıcınızın yardım menüsünden bu ayarlara ulaşabilirsiniz.
        </li>
        <li>
          <strong>Çerez Onay Yöneticisi:</strong> Sitemizi ilk ziyaretinizde görüntülenen
          çerez onay banner&apos;ı aracılığıyla reklam ve analitik çerezlerine izin
          verebilir veya reddedebilirsiniz.
        </li>
        <li>
          <strong>Google Reklam Tercihleri:</strong>{" "}
          <Link href="https://www.google.com/ads/preferences" className="text-primary underline">
            google.com/ads/preferences
          </Link>{" "}
          sayfasından kişiselleştirilmiş reklam tercihlerinizi yönetebilirsiniz.
        </li>
      </ul>

      <h2 className="font-sora text-headline-sm text-white">5. Çerezlerin Saklanma Süresi</h2>
      <p>
        Çerezler, oturum çerezleri (tarayıcıyı kapattığınızda sona erer) ve kalıcı çerezler
        (belirli bir süre sonunda veya manuel olarak silinene kadar cihazınızda kalır) olarak
        ikiye ayrılır. Kalıcı çerezlerimizin saklanma süresi, çerez türüne bağlı olarak
        1 aydan 2 yıla kadar değişebilir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">6. Değişiklikler</h2>
      <p>
        Bu çerez politikası gerektiğinde güncellenebilir. Önemli değişiklikler sitemizde
        yayınlanır ve yürürlüğe girdiği tarihten itibaren geçerli olur.
      </p>

      <h2 className="font-sora text-headline-sm text-white">7. İletişim</h2>
      <p>
        Çerez politikamızla ilgili sorularınız için{" "}
        <Link href="/iletisim" className="text-primary underline">
          iletişim sayfamız
        </Link>{" "}
        üzerinden bize ulaşabilirsiniz.
      </p>

      <p className="text-caption text-outline pt-4">
        Son güncelleme: 21 Temmuz 2026
      </p>
    </LegalPage>
  );
}
