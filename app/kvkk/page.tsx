import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Marifetli Kedi tarafından 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sahibi olarak aydınlatılmanız.",
  alternates: { canonical: "/kvkk" },
};

export default function KvkkPage() {
  return (
    <LegalPage
      title="KVKK Aydınlatma Metni"
      description="Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında veri sorumlusu sıfatıyla Marifetli Kedi tarafından aydınlatılmanız amacıyla hazırlanmıştır."
    >
      <h2 className="font-sora text-headline-sm text-white">Veri Sorumlusu</h2>
      <p>
        Marifetli Kedi (İstanbul, Türkiye), kişisel verilerinizin KVKK uyarınca veri sorumlusu
        sıfatıyla işlenmesinden sorumludur. İletişim: hello@marifetlikedi.com
      </p>

      <h2 className="font-sora text-headline-sm text-white">İşlenen Kişisel Veriler</h2>
      <p>
        Kimlik bilgileri (ad), iletişim bilgileri (e-posta), doğum bilgileri (tarih, yer,
        saat), hesap bilgileri, teknik ve konum verileri (IP adresi, cihaz bilgisi) ile
        çerezler aracılığıyla elde edilen kullanım verileri işlenebilir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">İşleme Amaçları</h2>
      <p>
        Kişisel verileriniz; doğum haritası, uyum analizi ve astroloji rehberliği gibi
        hizmetleri sunmak, hesabınızı yönetmek, içerik ve reklamları kişiselleştirmek,
        analiz ve iyileştirme çalışmaları yapmak ile yasal yükümlülükleri yerine getirmek
        amaçlarıyla işlenir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">İşleme Hukuki Sebebi</h2>
      <p>
        Verileriniz, KVKK m. 5&apos;te yer alan &quot;açık rıza&quot;, &quot;bir sözleşmenin
        kurulması ve ifası&quot;, &quot;hukuki yükümlülüğün yerine getirilmesi&quot; ve
        &quot;meşru menfaat&quot; hukuki sebeplerine dayalı olarak toplanır ve işlenir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">Üçüncü Taraflara Aktarım</h2>
      <p>
        Verileriniz, reklam (Google AdSense), analiz ve barındırma hizmeti sağlayıcıları
        gibi yurt içi/yurt dışı iş ortaklarıyla yalnızca yukarıdaki amaçlarla ve KVKK&apos;ya
        uygun olarak paylaşılabilir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">Saklama Süresi</h2>
      <p>
        Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve yasal zorunluluklar
        çerçevesinde saklanır. Saklama süresi sona erdiğinde veriler silinir, yok edilir veya
        anonim hale getirilir.
      </p>

      <h2 className="font-sora text-headline-sm text-white">Veri Sahibi Olarak Haklarınız</h2>
      <p>KVKK m. 11 uyarınca aşağıdaki haklara sahipsiniz:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
        <li>Yurt içi/yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
        <li>Eksik veya yanlış işlenen verilerin düzeltilmesini isteme,</li>
        <li>KVKK m. 7 uyarınca silinmesini veya yok edilmesini isteme,</li>
        <li>İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkması hâlinde itiraz etme,</li>
        <li>Kanuna aykırı işlenme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
      </ul>

      <h2 className="font-sora text-headline-sm text-white">Başvuru</h2>
      <p>
        Haklarınızı kullanmak için{" "}
        <Link href="/iletisim" className="text-primary underline">
          iletişim sayfamız
        </Link>{" "}
        üzerinden veya hello@marifetlikedi.com adresinden bizimle iletişime geçebilirsiniz.
      </p>

      <p className="text-caption text-outline pt-4">
        Bu aydınlatma metni, Gizlilik Politikamızın ayrılmaz bir parçasıdır. Detay için{" "}
        <Link href="/gizlilik-politikasi" className="text-primary underline">
          Gizlilik Politikası
        </Link>{" "}
        sayfamıza bakınız.
      </p>
    </LegalPage>
  );
}
