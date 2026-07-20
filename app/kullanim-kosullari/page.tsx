import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description:
    "Marifetli Kedi kullanım koşulları: sitemizi kullanırken uymanız gereken kurallar, sorumluluklar ve yasal bildirimler.",
  alternates: { canonical: "/kullanim-kosullari" },
};

export default function KullanimKosullariPage() {
  return (
    <LegalPage
      title="Kullanım Koşulları"
      description="Bu sayfa, Marifetli Kedi web sitesini (&quot;Site&quot;) kullanımınıza ilişkin hüküm ve koşulları belirler. Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız."
      slug="kullanim-kosullari"
    >
      <h2 className="font-sora text-headline-sm text-white">1. Genel Hükümler</h2>
      <p>
        Marifetli Kedi (İstanbul, Türkiye) tarafından işletilen bu site, astroloji,
        tarot, doğum haritası ve uyum analizi gibi içerikleri &quot;olduğu gibi&quot;
        sunmaktadır. Siteyi kullanarak, aşağıdaki kullanım koşullarını okuduğunuzu,
        anladığınızı ve kabul ettiğinizi beyan edersiniz.
      </p>

      <h2 className="font-sora text-headline-sm text-white">2. Eğlence Amaçlı İçerik</h2>
      <p>
        Sitemizde yer alan tüm burç yorumları, tarot falı, uyum analizleri ve astrolojik
        içerikler yalnızca <strong>eğlence ve bilgilendirme amaçlıdır</strong>. Bu içerikler
        profesyonel psikolojik, tıbbi, hukuki veya finansal danışmanlık yerine geçmez.
        Kararlarınızın sorumluluğu tamamen size aittir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">3. Kullanıcı Hesabı</h2>
      <p>
        Sitedeki bazı özellikleri kullanabilmek için hesap oluşturmanız gerekebilir. Hesap
        oluştururken doğru, güncel ve eksiksiz bilgi vermeyi kabul edersiniz. Hesabınızın
        güvenliğinden ve hesabınız altında gerçekleşen tüm işlemlerden siz sorumlusunuz.
        Hesabınızda şüpheli bir aktivite fark ederseniz derhal bizimle iletişime geçmelisiniz.
      </p>

      <h2 className="font-sora text-headline-sm text-white">4. Kullanıcı Yükümlülükleri</h2>
      <p>Siteyi kullanırken aşağıdaki kurallara uymayı kabul edersiniz:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Yasalara ve üçüncü taraf haklarına aykırı faaliyetlerde bulunmamak,</li>
        <li>Başka kullanıcıların deneyimini olumsuz etkileyecek davranışlardan kaçınmak,</li>
        <li>Virüs, kötü amaçlı yazılım veya zararlı kod yüklememek,</li>
        <li>Sitenin işleyişine müdahale etmemek veya erişimi engellemeye çalışmamak,</li>
        <li>Otomatik bot, tarayıcı veya benzeri araçlarla siteyi taramamak veya veri çekmemek,</li>
        <li>Başka bir kullanıcıyı taklit etmemek veya yanıltıcı bilgi paylaşmamak.</li>
      </ul>

      <h2 className="font-sora text-headline-sm text-white">5. Fikri Mülkiyet</h2>
      <p>
        Sitede yer alan tüm içerik (metinler, görseller, logolar, grafikler, yazılım ve
        kodlar) Marifetli Kedi veya lisans sahiplerine aittir ve fikri mülkiyet yasalarıyla
        korunmaktadır. Önceden yazılı izin alınmaksızın içeriğin kopyalanması, dağıtılması,
        değiştirilmesi veya ticari amaçla kullanılması yasaktır.
      </p>

      <h2 className="font-sora text-headline-sm text-white">6. Üçüncü Taraf Bağlantıları</h2>
      <p>
        Sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu bağlantılar yalnızca
        kolaylık sağlamak amacıyla sunulmaktadır ve bu sitelerin içeriği, gizlilik
        politikaları veya uygulamaları üzerinde hiçbir kontrolümüz yoktur. Üçüncü taraf
        siteleri ziyaret etmeniz durumunda, ilgili sitenin kullanım koşullarını ve gizlilik
        politikasını incelemeniz önerilir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">7. Sorumluluk Reddi</h2>
      <p>
        Marifetli Kedi, sitede yer alan bilgilerin doğruluğu, güncelliği ve eksiksizliği
        konusunda garanti vermez. Site içeriğindeki olası hata veya eksikliklerden dolayı
        oluşabilecek doğrudan veya dolaylı zararlardan sorumlu değildir. Site, herhangi bir
        bildirimde bulunmaksızın geçici olarak erişime kapatılabilir veya içerik
        değiştirilebilir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">8. Gizlilik ve Veri Koruma</h2>
      <p>
        Kişisel verilerinizin işlenmesi hakkında detaylı bilgi için{" "}
        <Link href="/gizlilik-politikasi" className="text-primary underline">
          Gizlilik Politikası
        </Link>{" "}
        ve{" "}
        <Link href="/cerez-politikasi" className="text-primary underline">
          Çerez Politikası
        </Link>{" "}
        sayfalarımızı inceleyebilirsiniz. KVKK kapsamındaki haklarınız için{" "}
        <Link href="/kvkk" className="text-primary underline">
          KVKK Aydınlatma Metni
        </Link>
        &apos;ne başvurabilirsiniz.
      </p>

      <h2 className="font-sora text-headline-sm text-white">9. Değişiklikler</h2>
      <p>
        Bu kullanım koşulları dilediğimiz zaman güncellenebilir. Değişiklikler sitede
        yayınlandığı anda yürürlüğe girer. Önemli değişikliklerde kullanıcılarımıza e-posta
        yoluyla veya sitede bildirim yapılabilir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">10. Uygulanacak Hukuk</h2>
      <p>
        Bu kullanım koşulları, Türkiye Cumhuriyeti yasalarına tabidir. İşbu koşullardan
        kaynaklanan uyuşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">11. İletişim</h2>
      <p>
        Kullanım koşullarımızla ilgili sorularınız, görüşleriniz veya talepleriniz için{" "}
        <Link href="/iletisim" className="text-primary underline">
          iletişim sayfamız
        </Link>{" "}
        üzerinden veya hello@marifetlikedi.com adresinden bize ulaşabilirsiniz.
      </p>

      <p className="text-caption text-outline pt-4">
        Son güncelleme: 21 Temmuz 2026
      </p>
    </LegalPage>
  );
}
