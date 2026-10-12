import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BirthChartCalculator from "@/components/birthchart/BirthChartCalculator";
import CompatibilityCalculator from "@/components/compatibility/CompatibilityCalculator";
import AdSlot from "@/components/ads/AdSlot";
import Disclaimer from "@/components/layout/Disclaimer";
import { ogMeta, breadcrumbLd, jsonLd } from "@/lib/seo";

interface ToolContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  icon: string;
  focus?: "sun" | "rising" | "moon" | "venus";
  isSinastri?: boolean;
  intro: string;
  howTitle: string;
  howText: string;
  meaningTitle: string;
  meaningText: string;
  faqs: { q: string; a: string }[];
}

const TOOLS: Record<string, ToolContent> = {
  "yukselen-burc": {
    slug: "yukselen-burc",
    title: "Yükselen Burç Hesaplama | Nasıl Hesaplanır, Ne Anlama Gelir",
    description:
      "Yükselen burç nasıl hesaplanır? Doğum saati ve yeriyle yükselen burcunu ücretsiz hesapla, dışarıya yansımanı ve ilk izlenimini öğren.",
    h1: "Yükselen Burç Hesaplama",
    icon: "arrow_upward",
    focus: "rising",
    intro:
      "Yükselen burç, doğduğun an ufukta yükselen astrolojik burçtur ve kişiliğin dışa yansıyan yüzünü, diğerlerine bıraktığın ilk izlenimi temsil eder. Güneş burcun kim olduğunu, yükselen burçun ise dünyaya nasıl göründüğünü anlatır. Doğum saatin ve doğum yerini girerek yükselen burcunu ücretsiz hesapla.",
    howTitle: "Yükselen Burç Nasıl Hesaplanır?",
    howText:
      "Yükselen burç hesaplaması için doğum tarihin, doğum saatin ve doğum şehrin bilgilerine ihtiyaç duyulur. Doğum anında ufukta tam olarak hangi burcun yükselmekte olduğu, yerel saate ve coğrafi konuma göre hesaplanır. Hesaplama, astronomik ephemeris tablolarıyla doğum anının gezegen konumlarını belirler ve ardından doğum yerinin boylamı-bağlamıyla ufukta yükselen burcu bulur. Doğum saatin bilinmesi kritik öneme sahiptir: yükselen burç iki saatte bir değişir, bu yüzden aynı gün doğmuş iki kişinin farklı yükselen burçları olabilir. Doğum saatin net olmadığı durumlarda veya tahmin aralıklarında birden fazla burc değerlendirilir. Burcumuzdaki bu hesaplama motoru, astronomik verileri kullanarak aynı mantıkla yükselen burcunu hesaplar. Sonuç olarak elde ettiğin yükselen burcu, doğum haritasındaki ikinci en önemli konumdur.",
    meaningTitle: "Yükselen Burç Ne Anlama Gelir?",
    meaningText:
      "Yükselen burç, kişiliğin dışa açılan kapısıdır ve diğerlerinin seni ilk gördüğünde algıladığı enerjiyi yansıtarak davranış tarzını, giyim tercihlerini ve genel duruşunu etkiler. Güneş burcun kim olduğun gerçeğini gösterirken, yükselen burçun bu gerçeği dünyaya hangi renkte yansıtacağını belirler. Örneğin yükselen Koç burcu biri için kararlı ve hızlı davranan bir ilk izlenim yaratırken, yükselen Balık burcu daha sakin, hayalperest ve empatik bir hava katar. Yükselen burç aynı zamanda doğum haritasındaki evlerin yönetimini üstlenen gezegenin etkisini de taşır; bu da hayatın hangi alanlarında doğal olarak öne çıktığını gösterir. Astrolojide güneş, ay ve yükselen üçlüsü 'kim olduğumuzun üç anahtarı' olarak görülür. Yükselen burcunu öğrenmek, güneş ve ay burcunla birlikte kendini daha bütünsel anlamana yardımcı olur.",
    faqs: [
      { q: "Yükselen burç neden bu kadar önemli?", a: "Yükselen burç, diğerlerinin seni ilk algılayışıdır ve kişiliğin dışa yansıyan yüzünü temsil eder. Güneş ve ay burcuyla birlikte astrolojide en kritik üç unsurdan biridir." },
      { q: "Yükselen burç bilinmiyorsa nasıl hesaplanır?", a: "Doğum saati bilinmiyorsa doğum haritası bir saat dilimi yayı hesaplanır ve olası burç listesi çıkarılır. Doğum saati net olduğunda tek bir kesin yükselen burcu belirlenir." },
      { q: "Yükselen burç iki saatte bir değişir mi?", a: "Evet. Yükselen burç ortalama iki saatte bir değişir. Bu nedenle aynı gün ve şehirde doğmuş olsa bile farklı saatlerde doğan kişilerin farklı yükselen burçları olabilir." },
      { q: "Yükselen burç güneş burçtan farklı mıdır?", a: "Farklıdır. Güneç burcu kim olduğunuzu, yükselen burç ise dünyaya nasıl göründüğünüzü gösterir. İkisi aynı kişide farklı burçlarda olabilir ve birlikte kişiliğin daha bütünsel resmini çizer." },
    ],
  },
  "ay-burcu": {
    slug: "ay-burcu",
    title: "Ay Burcu Hesaplama | Ay Burcu Ne Anlama Gelir?",
    description:
      "Ay burcunu ücretsiz hesapla: duygusal dünyan, içsel ihtiyaçların ve ruhsal dengeni anla. Ay burcu nasıl hesaplanır, ne anlama gelir öğren.",
    h1: "Ay Burcu Hesaplama",
    icon: "dark_mode",
    focus: "moon",
    intro:
      "Ay burcu, doğum anında Ay'ın bulunduğu burçtur ve kişiliğin duygusal yönünü, içsel ihtiyaçlarını ve dünya ile kurduğu bağın doğasını gösterer. Yükselen burcun dışa açılan kapısıysa ay burçunuz içe açılan penceredir: kim olduğunuzu değil, hissettiğinizi oluşturur.",
    howTitle: "Ay Burcu Nasıl Hesaplanır?",
    howText:
      "Ay burcu, doğum tarihin ve doğum saatin üzerinden hesaplanır. Ay her 2-3 günde bir burç değiştirdiği için, doğum tarihi tek başına yeterli olabilir; ancak tam doğum saati ve özellikle gece-gündüz geçişleri gibi özel dönemlerde daha isabetli sonuçlar için saat bilgisi önem kazanır. Hesaplama, astronomik ephemeris tablolarıyla doğum anında Ay'ın zodyak konumunu zar derecesine kadar kesin olarak belirler ve bu konumun hangi burca karşılık geldiğini tespit eder. Burcumuzdaki hesaplama motoru, doğum haritası hesaplamasıyla aynı astronomik verileri kullanır. Ay'ın yörüngesinin hızı nedeniyle yılın aynı tarihinde doğmuş kişiler bile farklı ay burçlarına sahip olabilir; bu yüzden tek doğum tarihi yeterli olmayabilir, saat de dikkate alınır.",
    meaningTitle: "Ay Burcu Ne Anlama Gelir?",
    meaningText:
      "Ay burcu, duygusal dünyanın yöneticisidir ve bir beşiğin rahat hissettiği güven alanını simgeler. Duygularını nasıl işlediğinizi, neyin sizi tatmin ettiğini ve sevdiklerinizle nasıl bir bağ kurduğunuzu gösterir. Ay burcu Boğa'da olan bir kişi güven ve istikrar ararken, Akrep'te olan bir kişi derin duygusal bağlar ve dönüşüm ister. Ay burcu aynı zamanda içsel öz benliğin kısmıdır; gün ışığında sergilediğiniz kişilik (güneş) ile karanlıktaki gerçek benliğiniz (ay) arasındaki farkı anlamak, kendinizi daha derin keşfetmenizi sağlar. Astrolojide Ay annesinin temsilcisi olarak görülür; çocukluk ilişkileriniz, aile dinamikleriniz ve duygusal güvenlik algınız ay burcunuzla anlam kazanır. Doğum haritasında Ay'ın bulunduğu ev, hangi hayat alanında duygusal ödullere ihtiyaç duyduğunuzu da gösterir.",
    faqs: [
      { q: "Ay burcu ile güneş burcu arasındaki fark nedir?", a: "Güneş burcu kim olduğunuzu ve öz benliğinizi gösterirken, ay burcu duygusal dünyanızı ve içsel ihtiyaçlarınızı temsil eder. Güneş dışa dönük, ay içe dönüktür." },
      { q: "Ay burcu nasıl etkiler?", a: "Ay burcu duygusal tepkilerinizi, güven ilişkilerinizi ve ruhsal dengeinizi etkiler. Aynı zamanda beslenme alışkanlıklarınızı ve uyku düzeninizi de yönlendirebilir." },
      { q: "Ay burcu hesaplaması için doğum saati gerekli midir?", a: "Doğum tarihi genelde yeterlidir, ancak Ay her 2-3 günde bir burç değiştirdiği için kesin sonuç için doğum saati önerilir. Gece-gündüz geçişlerinde doğmuşlarda saat kritik hale gelir." },
      { q: "Ay burcu değişir mi?", a: "Hayır. Ay burcu doğum anındaki Ay konumuna bağlıdır ve hayat boyu sabittir. Ancak Ay'ın buradaki cinsel ve dönüşüm gözüyle, mevcut Ay transitleri ve fazları duygusal durumunuzu etkileyebilir." },
    ],
  },
  "venus-burcu": {
    slug: "venus-burcu",
    title: "Venüs Burcu Hesaplama | Aşkta Ne Anlatır?",
    description:
      "Venüs burcunu ücretsiz hesapla: aşkta ne anlattığını, sevgi dilini ve ilişki tarzını öğren. Venüs burcu nasıl hesaplanır, aşk hayatını nasıl etkiler?",
    h1: "Venüs Burcu Hesaplama",
    icon: "female",
    focus: "venus",
    intro:
      "Venüs burcu, doğum anında Venüs gezegeninin bulunduğu zodyak konumudur ve aşk hayatındaki en belirleyici göstergelerden biridir. Venüs sevgi dilinizi, romantik beklentilerinizi ve ilişkilerinizde neyin sizi mutlu ettiğini gösterir. Doğum bilgilerinizi girerek Venüs burcunuzu ücretsiz hesaplayın.",
    howTitle: "Venüs Burcu Nasıl Hesaplanır?",
    howText:
      "Venüs burcu, doğum tarihin ve doğum saatin üzerinden hesaplanır. Doğum anında Venüs'ün zodyakta bulunduğu burc, kişinin aşk dilini ve romantik doğasını gösterir. Hesaplama, astronomik ephemeris tablolarıyla Venüs'ün konumunu zar derecesine kadar belirler ve bunun hangi burca denk geldiğini tespit eder. Venüs güneşe yakın bir gezegen olduğundan, Venüs burcu genellikle güneş burcınızla aynı ya da bitişik bir burç olabilir. Burcumuzdaki hesaplama motoru, aynı astronomik verileri kullanarak Venüs burcunuzu hesaplar. Venüs'ün yörüngesi boyunca burç değişimleri yavaştır, bu nedenle doğum tarihi genelde Venüs burcu için yeterlidir; ancak güneş ile Venüs'ün aynı burca girdiği dönemlerde (örneğin güneş Dışarıda gibi kritik dönemler) saat bilgisi belirleyici olabilir.",
    meaningTitle: "Venüs Burcu Aşkta Ne Anlatır?",
    meaningText:
      "Venüs burcu, aşk hayatının haritasıdır ve romantik ilişkilerinizin doğasını, sevgi ifade biçiminizi ve partnerinizden ne beklediğinizi gösterir. Venüs, aşkın ve güzelliğin gezegenidir; hangi burcuda olduğu, sevgiyi nasıl verdiğinizi ve aldığınızı yansıtır. Venüs burcu Koç'ta olan bir kişi aşkta çıkarcı ve açıktan ifade ederken, Terazi'de olan bir kişi uyum ve denge arar. Venüs aynı zamanda maddi konfor ve estetik zevkleri de yönetir; neyin güzel olduğuna dair algınızı ve romantik hayatınızda kalite beklentilerinizi etkiler. Astrolojide Venüs, erkek ve kadın arasındaki ceket dengesini de temsil eder. Venüs burcunuzu öğrenmek, neden bazı kişilerle anında bağlandığınızı ve bazılarıyla neden yıldızlarınızın uyuşmadığını anlamanızı sağlar. Uyum analizinde Venüs konumu, ilişkisel uyumun temel göstergelerinden biridir.",
    faqs: [
      { q: "Venüs burcu ile güneş burcu aynı olabilir mi?", a: "Evet. Venüs güneşe yakın bir gezegen olduğundan, güneş burcunuzla aynı ya da hemen yanında bir burç olabilir. Bu nedenle herkes için farklı değildir, ancak ayrı bir Venüs burcu da mümkündür." },
      { q: "Venüs burcu ilişkileri nasıl etkiler?", a: "Venüs burcu sevgi dilinizi, romantik beklentilerinizi ve partnerinize yaklaşım tarzınızı etkiler. Aşkta aradığınız özellikleri ve ilişki dinamiklerinizi gösterir." },
      { q: "Venüs burcu neden aşkla ilişkilendirilir?", a: "Venüs, Roma mitolojisinde aşk ve güzelliğe tanrıçasıdır. Astroloji'de Venüs burcu aşkın, güzelliğin ve değer yargılarının yöneticisi olarak görülür." },
      { q: "Venüs burcu değişir mi?", a: "Venüs burcu doğum anındaki konuma bağlıdır ve sabit kalır. Ancak Venüs'ün mevcut transitleri ve diğer gezegenlerle açıları aşk hayatınızı dönemsel olarak etkileyebilir." },
    ],
  },
  sinastri: {
    slug: "sinastri",
    title: "Sinastri Haritası Nedir | İki Doğum Haritası Uyumu",
    description:
      "Sinastri haritası nedir? İki doğum haritasını karşılaştırarak aşk uyumunu, iletişim ve zorluk alanlarını öğren. Ücretsiz sinastri analizi yap.",
    h1: "Sinastri Haritası Nedir?",
    icon: "sync_alt",
    isSinastri: true,
    intro:
      "Sinastri, iki kişinin doğum haritalarını yan yana koyarak aralarındaki kimyayı inceleyen astrolojinin en eski ve en yaygın uygulamasıdır. İki güneş burcu uyumundan yükselen burçların etkileşimine, Ay'ların duygu bağlantısından Venüs ve Mars'ın çekim gücüne kadar pek çok farklı alan değerlendirilir.",
    howTitle: "Sinastri Haritası Nasıl Çalışır?",
    howText:
      "Sinastri analizi, iki kişinin doğum tarihi, saati ve yerinden hesaplanan doğum haritalarını birleştirerek yapılır. Her iki haritanın gezegen konumları karşılaştırılır ve gezegenler arasındaki açılar (trin, kare, karşıtlık vb.) incelenir. Örneğin bir kişinin Venüs'ü ile diğerinin Mars'ı arasında güçlü bir açı varsa, arada yüksek bir çekim ve romantik çekim olduğu yorumlanır. Ay'lar arasındaki uyum ise duygusal anlayışı ve güveni gösterir. Sinastri sadece uyumluluğu değil, aynı zamanda zorluk alanlarını da gösterir; zor açılar bir ilişkinin öğrenme fırsatlarını da işaret eder. Burcumuzdaki uyum aracı, güneş, ay, yükselen, venüs ve diğer gezegen konumlarını karşılaştırarak kapsamlı bir analiz sunar. Sinastri özellikle aşk ilişkilerinde oldukça popüler olsa da, arkadaşlık, aile ve iş ortaklığı gibi tüm ilişki türlerine uygulanabilir.",
    meaningTitle: "Sinastri Haritasında Bakılan Temel Unsurlar",
    meaningText:
      "Sinastri analizinde öncelikle güneş, ay ve yükselen burçların uyumu incelenir; bunlar kişiliğin temel üç unsurudur. Güneş uyumu hayat değerlerinin ve yaşam enerjisinin uyuşup uyuşmadığını gösterirken, ay uyumu duygusal anlayışı ve güveni yansıtır. Yükselen uyumu ise birbirlerine karşı ilk izlenimi ve doğal etkileşim tarzını gösterir. Ardından Venüs ve Mars gibi cinsel ve romantik enerjiyi yöneten gezegenler ve Jüpiter-Satürn gibi büyüme ve sınırlamayı temsil eden gezegenler değerlendirilir. Sinastri, bir ilişkinin sadece 'uyumlu mu' sorusunu değil, 'birbirimizi nasıl geliştiririz' sorusunu da yanıtlar. Burcumuzdaki araç, tek bir skor yerine farklı uyum alanlarını ayrı ayrı gösterir; böylece ilişkinin hem güçlü hem de gelişime açık yönlerini görebilirsiniz.",
    faqs: [
      { q: "Sinastri ile burç uyumu aynı şey midir?", a: "Hayır. Burç uyumu genel burç özelliklerini karşılaştırır; sinastri ise iki kişinin gerçek doğum haritası konumlarını ve gezegenler arası açıları detaylı olarak inceler." },
      { q: "Sinastri için doğum saati gerekli midir?", a: "Doğum saati özellikle yükselen burç ve evler için önemlidir. Bileşik ve daha isabetli sonuçlar için her iki kişinin doğum saati önerilir." },
      { q: "Sinastri sadece aşk için mi kullanılır?", a: "Hayır. Sinastri arkadaşlık, aile, iş ortaklığı ve hatta öğretmen-öğrenci ilişkileri gibi tüm ilişki türlerine uygulanabilir." },
      { q: "Sinastri sonucu değişir mi?", a: "Doğum haritaları sabit olduğundan sinastri sonucu da sabittir. Ancak kişiler geliştikçe ve değiştikçe, ilişkideki yorumlanabilir ve gelişebilir." },
    ],
  },
};

export async function generateStaticParams() {
  return Object.values(TOOLS).map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool } = await params;
  const t = TOOLS[tool];
  if (!t) return { title: "Hesaplama Aracı" };
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `/hesapla/${t.slug}` },
    ...ogMeta({
      title: t.title,
      description: t.description,
      path: `/hesapla/${t.slug}`,
    }),
  };
}

export default async function HesaplaToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const t = TOOLS[tool];
  if (!t) notFound();

  const breadcrumb = breadcrumbLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Hesaplama Araçları", path: "/hesaplama-araclari" },
    { name: t.h1 },
  ]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-5xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />

      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/hesaplama-araclari" className="hover:text-on-surface transition-colors">Hesaplama Araçları</Link>
        <span aria-hidden="true" className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">{t.h1}</span>
      </nav>

      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-tertiary border border-tertiary/20 mb-4">
          <span aria-hidden="true" className="material-symbols-outlined text-sm">{t.icon}</span>
          <span className="text-label-md">Ücretsiz {t.h1}</span>
        </span>
        <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-on-surface font-bold">
          {t.h1}
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4">
          {t.intro}
        </p>
      </div>

      {t.isSinastri ? (
        <CompatibilityCalculator />
      ) : (
        <BirthChartCalculator focus={t.focus} />
      )}

      <div className="glass p-6 rounded-3xl border border-tertiary/20 mb-10">
        <h3 className="font-sora text-headline-sm text-on-surface font-semibold mb-3 flex items-center gap-2">
          <span aria-hidden="true" className="material-symbols-outlined text-tertiary">info</span>
          Doğum Saati Bilinmiyorsa Ne Yapmalı?
        </h3>
        <p className="text-body-md text-on-surface-variant leading-relaxed">
          Doğum saati yükselen burç ve ev hesaplamaları için kritik öneme sahiptir.
          Saatinizi bilmiyorsanız, anne veya aile büyüklerinizden öğrenmeyi deneyin;
          doğum belgenizde veya hastane kayıtlarında da yer alabilir. Kesin saat bulunamazsa,
          öğle saati kabul edilerek bir saat dilimi yayı hesaplanır ve olası burç listesi
          çıkarılır. Ayrıca dördüncü trimestrda doğan bebeklerde doğum saati net
          olmayabilir; bu durumlarda evet/hayır tarot veya diğer araçlarla da yönlendirme
          alabilirsiniz.
        </p>
      </div>

      <section className="mb-section-gap max-w-3xl mx-auto space-y-10">
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            {t.howTitle}
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">{t.howText}</p>
        </div>
        <div>
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            {t.meaningTitle}
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">{t.meaningText}</p>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-primary/10">
          <h3 className="text-headline-md font-headline-md text-primary mb-3">Sık Sorulan Sorular</h3>
          <div className="space-y-4">
            {t.faqs.map((f) => (
              <div key={f.q}>
                <p className="text-body-md font-body-md text-on-surface font-semibold mb-1">{f.q}</p>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-section-gap">
        <h3 className="text-headline-lg font-headline-lg text-primary mb-6">Diğer Araçlar</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dogum-haritasi" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">🌌</span>
            <p className="text-label-md font-label-md text-on-surface">Doğum Haritası</p>
            <p className="text-caption text-outline mt-1">Tüm burçlarını öğren</p>
          </Link>
          <Link href="/uyum" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">💞</span>
            <p className="text-label-md font-label-md text-on-surface">Uyum Analizi</p>
            <p className="text-caption text-outline mt-1">Partnerinle uyumunu ölç</p>
          </Link>
          <Link href="/tarot" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">🔮</span>
            <p className="text-label-md font-label-md text-on-surface">Tarot Falı</p>
            <p className="text-caption text-outline mt-1">Günün kartını çek</p>
          </Link>
          <Link href="/eglenceli-testler" className="glass-card p-6 rounded-3xl text-center hover:-translate-y-1 transition-all">
            <span className="text-3xl mb-2 block">🧩</span>
            <p className="text-label-md font-label-md text-on-surface">Eğlenceli Testler</p>
            <p className="text-caption text-outline mt-1">Kendini test et</p>
          </Link>
        </div>
      </section>

      <AdSlot name="content_inline" className="my-12 max-w-5xl mx-auto" />

      <Disclaimer variant="box" />
    </main>
  );
}
