import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Marifetli Kedi nedir? Kozmik rehberlik, astroloji ve tarot içeriklerini modern bir bakışla sunan portalımızın hikâyesi ve misyonu.",
  alternates: { canonical: "/hakkimizda" },
};

export default function HakkimizdaPage() {
  return (
    <LegalPage
      title="Hakkımızda"
      description="Yıldızların sessiz dilini herkes için anlaşılır ve keyifli hâle getirmek için yola çıktık."
    >
      <h2 className="font-sora text-headline-sm text-white">Hikâyemiz</h2>
      <p>
        Marifetli Kedi, astroloji, tarot ve kozmik rehberliği günlük hayatın içine sokan bir
        keşif portalıdır. Burç yorumlarından doğum haritası analizlerine, uyum testlerinden
        eğlenceli kozmik içeriklere kadar geniş bir yelpazede içerik üretiyoruz. Amacımız;
        gök yüzündeki işaretleri merak eden herkes için güvenilir, keyifli ve öğretici bir
        durak olmak.
      </p>

      <h2 className="font-sora text-headline-sm text-white">Misyonumuz</h2>
      <p>
        Kadim bilgeliği modern bir bakışla sunarak okuyucularımıza kendilerini ve
        çevrelerindeki dünyayı daha iyi anlama fırsatı vermek istiyoruz. İçeriklerimiz
        eğlence ve kişisel farkındlık odaklıdır; profesyonel danışmanlık, tıbbi veya
        hukuki tavsiye yerine geçmez.
      </p>

      <h2 className="font-sora text-headline-sm text-white">Neler Sunuyoruz?</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Günlük, haftalık ve aylık burç yorumları</li>
        <li>Kişisel doğum haritası ve uyum (synastry) analizleri</li>
        <li>Tarot kartı anlamları ve rehberliği</li>
        <li>Eğlenceli kozmik testler ve trend içerikler</li>
        <li>Gök Günlüğü blog köşemizde derin astroloji yazıları</li>
      </ul>

      <h2 className="font-sora text-headline-sm text-white">Editörlerimiz</h2>
      <p>
        İçeriklerimiz, astroloji ve kişisel gelişim alanında deneyimli bir editör ekibi
        tarafından hazırlanır ve düzenli olarak güncellenir. Her yazı, okuyucusuna gerçek
        değer katması için özenle yazılır.
      </p>

      <h2 className="font-sora text-headline-sm text-white">Bize Ulaşın</h2>
      <p>
        Sorularınız, önerileriniz veya iş birliği talepleriniz için{" "}
        <Link href="/iletisim" className="text-primary underline">
          iletişim sayfamızı
        </Link>{" "}
        kullanabilirsiniz. Ayrıca{" "}
        <Link href="/gizlilik-politikasi" className="text-primary underline">
          gizlilik politikamızı
        </Link>{" "}
        ve{" "}
        <Link href="/kvkk" className="text-primary underline">
          KVKK aydınlatma metnini
        </Link>{" "}
        inceleyebilirsiniz.
      </p>

      <p className="text-caption text-outline pt-4">
        Marifetli Kedi — İstanbul, Türkiye. Tüm içerikler eğlence amaçlıdır.
      </p>
    </LegalPage>
  );
}
