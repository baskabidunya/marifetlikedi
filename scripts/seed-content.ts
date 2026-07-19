// Blog ve trend icerik seed scripti
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const posts = [
  {
    title: "Elementlerin Dengesi: Burclarda Ates, Toprak, Hava ve Su",
    slug: "elementlerin-dengesi-burclar",
    excerpt: "Astrolojinin temel yapi taslari olan dort element, burclarin karakteristik ozelliklerini belirler. Bu rehberde ates, toprak, hava ve su elementlerinin burclar uzerindeki etkilerini kesfedeceksiniz.",
    category: "astroloji",
  },
  {
    title: "Saturn Gezegeninin Hayatimizdaki Dersleri",
    slug: "saturn-gezegeni-hayat-dersleri",
    excerpt: "Saturn astrolojide zorluklarin ve disiplinin gezegenidir. Bu yazida Saturnun burclar ve hayatimiz uzerindeki etkilerini, getirdigi dersleri kesfedeceksiniz.",
    category: "astroloji",
  },
  {
    title: "Cakra Sistemi ve Burclar: Enerji Merkezlerinizin Astrolojik Baglantisi",
    slug: "cakra-sistemi-burclar-enerji",
    excerpt: "Yedi ana cakra ile burclar arasindaki mistik baglantiyi kesfedin. Enerji dengeleme yontemleriyle yasam kalitenizi artirin.",
    category: "kozmik-tavsiyeler",
  },
  {
    title: "Uranus ve Degisim Ruzgarlari: Beklenmedik Olaylarin Astrolojik Aciklamasi",
    slug: "uranus-gezegeni-degisim-ruzgarlari",
    excerpt: "Uranus astrolojide beklenmedik degisimlerin, ozgurlugun ve yeniliklerin gezegenidir. Bu kapsamli rehberde Uranusun burclar uzerindeki etkilerini kesfedin.",
    category: "astroloji",
  },
  {
    title: "Neptun ve Hayaller: Sezgilerin Gucu ve Astrolojideki Yeri",
    slug: "neptun-gezegeni-hayaller-sezgiler",
    excerpt: "Neptun astrolojide hayallerin, sezgilerin ve spiritual baglantilarin gezegenidir. Neptunun burclar uzerindeki mistik etkilerini kesfedin.",
    category: "astroloji",
  },
  {
    title: "Plutonun Donusturucu Gucu: Olum ve Yeniden Dogum Donguleri",
    slug: "pluton-gezegeni-donusum-gucu",
    excerpt: "Pluton astrolojide en derin donusumlerin, guc dinamiklerinin ve yeniden dogumun gezegenidir. Plutonun burclardaki etkisini kesfedin.",
    category: "astroloji",
  },
  {
    title: "Kova Cagi ve Yeni Dunya Duzeni: Astrolojik Bir Bakis",
    slug: "kova-cagi-yeni-dunya-duzeni",
    excerpt: "Kova Cagi insanligin kolektif bilinc degisimini temsil eder. Bu kapsamli rehberde Kova Caginin ozelliklerini kesfedin.",
    category: "kozmik-tavsiyeler",
  },
  {
    title: "Dogum Haritasinda Gezegenlerin Evlere Yerlesimi",
    slug: "dogum-haritasi-gezegen-evleri",
    excerpt: "Dogum haritasinda gezegenlerin evlere yerlesimi, hayatin farkli alanlarindaki enerjileri gosterir. 12 evdeki gezegen konumlarinin anlamlarini kesfedin.",
    category: "astroloji",
  },
  {
    title: "Karmik Astroloji: Guney ve Kuzey Ay Dugumlerinin Anlami",
    slug: "karmik-astroloji-ay-dugumleri",
    excerpt: "Karmik astroloji, Ay dugumleri araciligiyla gecmis yasam derslerimizi anlamamiza yardimci olur. Guney ve Kuzey Ay dugumlerinin burclardaki anlamlarini kesfedin.",
    category: "astroloji",
  },
  {
    title: "Kelt Agaci Astrolojisi: Dogum Tarihine Gore Kelt Burclari",
    slug: "kelt-agaci-astrolojisi-burclar",
    excerpt: "Kelt Agaci Astrolojisi, Kelt kulturunun dogayla ic ice gecen kadim bilgeligini yansitir. Dogum tarihinize gore Kelt burcunuzu kesfedin.",
    category: "kozmik-tavsiyeler",
  },
];

const trends = [
  {
    title: "2026 Yaz Gunodonumu: En Uzun Gunun Astrolojik Anlami",
    slug: "2026-yaz-gunodonumu-astroloji",
    tag: "Kozmik Dongu",
    tag_color: "text-tertiary",
    excerpt: "Yaz gunodonumu, yilin en uzun gunu ve astrolojik olarak guclu bir donemdir. Bu yaz gunodonumunun burclar uzerindeki etkilerini ve ritüel onerilerini kesfedin.",
  },
  {
    title: "Dolunayda Yapilmasi Gereken 5 Ritüel",
    slug: "dolunay-rituelleri-rehber",
    tag: "Kozmik Tavsiyeler",
    tag_color: "text-primary",
    excerpt: "Dolunay enerjisi, niyetlerimizi gerceklestirmek icin guclu bir firsattir. Dolunayda yapabileceginiz 5 etkili ritüeli kesfedin.",
  },
  {
    title: "Yeni Ayda Hedef Belirleme: Evrenle Uyumlanma Rehberi",
    slug: "yeni-ay-hedef-belirleme",
    tag: "Kozmik Tavsiyeler",
    tag_color: "text-primary",
    excerpt: "Yeni Ay donemi, yeni baslangiclar icin en ideal zamandir. Hedef belirleme ve evrenle uyumlanma rehberi ile yeni aylarin gucunden faydalanin.",
  },
  {
    title: "Gezegen Saatleri: Dogru Zamanda Dogru Isi Yapmak",
    slug: "gezegen-saatleri-rehber",
    tag: "Kozmik Tavsiyeler",
    tag_color: "text-secondary",
    excerpt: "Gezegen saatleri, antik astrolojinin en pratik araclarindan biridir. Dogru zamanda dogru isi yapmak icin gezegen saatlerini nasil kullanacaginizi ogrenin.",
  },
  {
    title: "Kristallerle Astroloji: Burcunuza Gore Sifa Taslari",
    slug: "burcunuza-gore-kristaller",
    tag: "Burc Yorumlari",
    tag_color: "text-tertiary",
    excerpt: "Her burcun enerjisiyle rezonansa giren kristaller ve sifa taslari vardir. Burcunuza uygun kristali kesfedin ve enerjinizi dengeleyin.",
  },
  {
    title: "Ruyalarin Dili: Astrolojik Rüya Yorumlama Rehberi",
    slug: "astrolojik-ruya-yorumlama",
    tag: "Kozmik Tavsiyeler",
    tag_color: "text-primary",
    excerpt: "Ruyalar, bilincaltimizin ve evrenin bizimle iletisim kurma bicimidir. Astrolojik rüya yorumlama teknikleriyle ruyalarinizin gizli anlamlarini kesfedin.",
  },
  {
    title: "Retro Dönemleri: 2026 Yilinin Kalaninda Gezegen Geri Hareketleri",
    slug: "2026-retro-donemleri-rehber",
    tag: "Retrosu",
    tag_color: "text-secondary",
    excerpt: "2026 yilinin kalaninda bizi hangi retro donemleri bekliyor? Merkur, Venus, Mars ve diger gezegenlerin geri hareketlerinin burclara etkilerini kesfedin.",
  },
  {
    title: "Ugurlu Sayilar ve Burclar: Numerolojik Astroloji Rehberi",
    slug: "ugurlu-sayilar-burclar-numeroloji",
    tag: "Kozmik Tavsiyeler",
    tag_color: "text-tertiary",
    excerpt: "Numeroloji ve astroloji arasindaki guclu baglantiyi kesfedin. Burcunuza gore ugurlu sayilarinizi ogrenin ve hayatinizda bu sayilarin enerjisini kullanin.",
  },
  {
    title: "Ay Burcu Degisimleri: Duygusal Dalgalanmalarin Haritasi",
    slug: "ay-burcu-degisimleri-duygular",
    tag: "Burc Yorumlari",
    tag_color: "text-primary",
    excerpt: "Ay her 2-3 gunde bir burc degistirir ve bu degisimler duygusal durumumuzu etkiler. Ayin burc degisimlerini takip ederek duygusal dalgalanmalarinizi yonetin.",
  },
  {
    title: "Cinsellik ve Burclar: Yatak Odasinda Astrolojik Uyum",
    slug: "cinsellik-burclar-astrolojik-uyum",
    tag: "Ask",
    tag_color: "text-secondary",
    excerpt: "Her burcun cinsellige yaklasimi ve yatak odasindaki tercihleri farklidir. Burclar arasi cinsel uyumu kesfedin ve iliskinizdeki tutkuyu artirin.",
  },
];

async function seed() {
  console.log("Seeding blog posts...");
  for (const post of posts) {
    const { data: existing } = await supabase.from("blog_posts").select("id").eq("slug", post.slug).maybeSingle();
    if (existing) {
      console.log(`  Skipping existing: ${post.slug}`);
      continue;
    }
    const { error } = await supabase.from("blog_posts").insert({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: "Icerik hazirlaniyor...",
      cover_image: `https://picsum.photos/seed/${post.slug}/800/400`,
      category: post.category,
      author_name: "Marifetli Kedi",
      published: true,
      created_at: new Date().toISOString(),
    });
    if (error) console.error(`  Error inserting ${post.slug}:`, error.message);
    else console.log(`  Inserted: ${post.slug}`);
  }

  console.log("Seeding trend articles...");
  for (const trend of trends) {
    const { data: existing } = await supabase.from("trend_articles").select("id").eq("slug", trend.slug).maybeSingle();
    if (existing) {
      console.log(`  Skipping existing: ${trend.slug}`);
      continue;
    }
    const { data: maxOrder } = await supabase.from("trend_articles").select("sort_order").order("sort_order", { ascending: false }).limit(1).maybeSingle();
    const nextOrder = (maxOrder?.sort_order ?? 0) + 1;
    const { error } = await supabase.from("trend_articles").insert({
      title: trend.title,
      slug: trend.slug,
      tag: trend.tag,
      tag_color: trend.tag_color,
      excerpt: trend.excerpt,
      content: "Icerik hazirlaniyor...",
      sort_order: nextOrder,
      active: true,
      created_at: new Date().toISOString(),
    });
    if (error) console.error(`  Error inserting ${trend.slug}:`, error.message);
    else console.log(`  Inserted: ${trend.slug}`);
  }

  console.log("Done!");
}

seed().catch(console.error);
