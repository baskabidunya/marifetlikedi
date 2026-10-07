#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

function loadEnv() {
  const out = {};
  try {
    const raw = readFileSync(resolve(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {}
  return out;
}

const env = loadEnv();
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const TR_RE = /[çÇğĞıİöÖşŞüÜ]/;
const FOLD = { "ç": "c", "Ç": "C", "ğ": "g", "Ğ": "G", "ı": "i", "İ": "I", "ö": "o", "Ö": "O", "ş": "s", "Ş": "S", "ü": "u", "Ü": "U" };

const CORRECT_WORDS = `
keşfet keşfedin keşfetmek keşfeder keşfedebilirsiniz keşfedilm keşif keşfedilen
göre görebilir göreceksin görebilirsin görüş görüşler görüşmek görüşmek görürsün görürüm
güç güçlü güçlendirmek güçlük gücün gücünüz güçlendirir güçlendir
yıldız yıldızlar yıldızların yıldızları yıldızı yıldızlarda yıldızlı yıldönümü yıldızlarla
güneş güneşin güneşi güneşle güneşte güneşin
burç burçlar burçların burçları burcun burcunu burcuna burcunda burcunuz burçtadır
nasıl nasip nazik nazikçe nezaket nezih
önceden önceki öncesinde önce öncelik öncelikle önceliklidir öncelikli
yaşam yaşamın yaşamı yaşamsal yaşamış yaşıyor yaşantısı yaşamak
düşün düşün düşünmek düşünce düşünceler düşünceli düşündüğün düşünürsün düşünürüm düşünme
doğal doğa doğum doğumlu doğruluk doğru doğrusu doğduğu doğrultusunda doğal olarak
insanın insanlar insanlık insanları insanın insanlara
bağlantı bağlantılı bağlantıları bağ bağlı bağlanmak bağlam bağlan
eşleşme eşleşir eşleşmek eşit eşitlik eşitçe eşleşmenin
geçmiş geçmişi geçmişte geçmişteki
önemli önem önemsemek önemsiz önemlidir önemseyen
farklı farklılık fark farkında farklıdır farklıdır farklılaş
iletişim iletişimde iletir iletildi
rüya rüyalar rüyada rüyası rüyalarında rüyalarıyla
güven güvenli güvenilir güvenmek güvendiğin güvensiz güvenini güvenle
seçim seçmek seçenek seçeneği seçti seçtiği seçerek seçen
kişi kişiler kişisel kişiliği kişilik kişiye kişilerin
biçim biçimde biçimde biçimde
yalnız yalnızlık yalnızca yalnızdı yalnızken
üçgen açı açısı açmak açıl açılımı açılması
ateş ateşte ateşin ateşle
hava havada havanın havalar
toprak toprakta toprağın
element elementler elementin elementleri
retro retrosu gezegen gezegenler gezegenin gezegenleri
kader kısmet talih şans şanslı şansın
ruh ruhun ruhlar ruhsal ruhani ruhunun ruhuna
meditasyon nefes nefesle nefesin yoga nefesini
kristal kristaller taş taşlar taşının
aşk aşkın aşkı aşka aşkla aşık aşık olmak
ilişki ilişkiler ilişkide ilişkileri ilişkisel ilişkinin
evlilik evli bekar evlenmek
arkadaş arkadaşlık arkadaşları arkadaşın arkadaşlar arkadaşına arkadaşların
aile ailede aileyi ailenin aileler
çocuk çocuklar çocukluk çocuğun çocukların çocukken
yaşlı yaşlılık yaşlının
genç gençlik gençken genci
uyku uykusuz uykulu uykuya uykusunun
sağlık sağlıklı hastalıklar hastalık sağlıkla sağlığını
spor egzersiz yürüyüş yürüyerek sporcu
yemek tarif tarifleri pişirmek pişirir pişirme
seyahat tatil yolculuk yolculuklar yolculuğa
para kazanç yatırım yatırımlar borç borçlu kazanmak
kariyer iş işte patron çalışan çalışanlar çalıştığı
okul öğretmen öğretmenler öğrenci öğrenciler ders dersler sınıfta
kitap kitaplar okumak okuyucu yazı yazmak yazar yazarın
müzik müzikler şarkı şarkılar dans dans etmek şarkıyı
film filmler dizi diziler tiyatro tiyatroda
fotoğraf fotoğraflar resim resimler renk renkler renkli
bilgisayar telefon internet uygulama uygulamalar uygulamayı
çalışma çalışıyor çalışır çalışan çalışmak çalıştığı çalışmanın
kullanım kullanmak kullanır kullanıcı kullanıcılar kullanarak kullanılan
anlam anlamak anlamı anlamlı anlatım anlatmak anlatır anlamına
destek destekler desteklemek destekleyici desteklen
değer değerli değerler değerlerini değerleri değerinde
denge dengeli dengesiz dengede dengenin
dönem dönemi dönüş dönüşüm döngü dörtlük dönüştürmek dönemsel
hedef hedefler hedefe hedefle hedeflerin
huzur huzurlu huzursuz huzura huzurlu
güzellik güzel güzelce güzelleşmek güzellikleri
zor zorluk zorlamak zorunlu zorunluluk zorla zordur zorlanmak
kolay kolayca kolaylaş kolaylık kolaydır
sorun sorunlar sorunları sorumlu sorumluluk sorular sordu sorunu
çözüm çözümler çözmek çözüldü çözülebilir çözümü çözülmesi
sevgi sevgili sevgiyi sevgililer sevgiyle
saygı saygıdeğer saygılı saygıyla saygıdeğer
sessiz sessizce sessizlik sessizleş
korku korkusuz korkmuş korkar korkular korkusuna
deneyim deneyimli deneyimler deneyerek deneyimlemek
değerlendir değerlendirme değerlendirir değerlen
enerji enerjik enerjileri enerjiyle enerjinin
görünür görünmez görünüm görünüşü
hikâye hikâyeler hikayesi hikâyede
eğitim eğitimi eğitimli eğlence eğlenceli eğitimde eğitimle
kültür kültürel kültürler kültürün
pratik pratikte pratik olarak
strateji stratejik stratejiler stratejiyi
teknik teknikler teknoloji teknolojik teknolojinin
temel temellere temelli temelden
uygun uygunluk uyar uyardı uyarmak uyarlamak uyarlan
ulaşım ulaşmak ulaştı ulaşır ulaşana
üretim üretmek üretir üretimi üretil
verim verimli verimlilik verimli
yönetim yönetmek yönetir yöneticisi yönetm
zaman zamanlama zamanla zamanı zamanlar zamanında
zemin zemine
plan planlar planlamak planlı planlan
program programı programlar programlamak
proje projeler projesi projelerde
rapor raporlar raporlama raporlar
rehber rehberlik rehberi rehberine
ritüel ritüeller ritüeli
sunum sunmak sunulan
sistem sistemli sistemler sistemde
standart standartlar standartına
şart şartlar şartlarda şartları
şüphe şüphesiz şüpheci
tablo tablolar tablodaki tabloda
takip takipçi takip etmek takipçisi
tanım tanımlamak tanımlar tanıtım tanımlan
tasarım tasarlamak tasarımı tasarlayan
tatmin tatmin edici tatminsiz
tecrübe tecrübeler tecrübeli tecrübesi
tedbir tedbirler tedbirli
tehdit tehditler tehdidi
teslim teslim etmek teslimi
titiz titizlik titizce
toplantı toplantılar topluluk topluluklar topluluğun
tutum tutumlar tutumlu
uyar uyarmak uyarısı uyarlar
ulaşmak ulaşılan
unsur unsurlar unsurları
üstün üstünlük üstün
varyasyon çeşit çeşitleri çeşitlilik
yetkili yetenek yetenekli yetenekler yeteneğini
yeşil yeşillik yeşile
yorum yorumlar yorumlamak yorumcu yorumları
özet özetle özetlenir özeti
öneri önermek önerir önerileri önerilen
ödeme ödemek ödedi ödenir ödemesi
özellik özellikler özellikleri özellikle özellikle
öğrenme öğrenmek öğrenir öğrenmiş öğrenil
ölçüm ölçmek ölçülü ölçül
çevre çevresi çevresinde çevresel çevreyle
çizgi çizmek çizilmiş çizim
çarpıcı çarpışma çarpış
dağlar dağlık dağda dağların
daima sürekli süreklilik sürdür
düşlemek düş düşler düşle
dürüst dürüstlük dürüstçe dürüstlüğün
eğilim eğilmek eğlene eğlenceli
eksi eksik eksiklik eksikleri
evren evrensel evrende evrenin
faydalı fayda faydası
fırsat fırsatlar fırsatı fırsatını
yaygın yaygınlaş yayılır yaygınlaştır
geniş genişlet genişletmek genişlik genişçe genişletil
genel genelde genellikle genellemek geneli
gerçek gerçeği gerçekçi gerçekten gerçekler
gerçek gereken gerekiyor gerekli gereklilik gerekçesi
gıda gıdalar gıdaların
gizlilik gizli gizemli gizlen
gönüllü gönüllüler gönüllü
görsel görseller görsel
grafik grafikler grafiği
grup gruplar grup içinde gruplarda
hazırlamak hazır hazırlık hazırlıklı hazırlan hazırlığın
hassas hassasiyet hassasiyetleri
içerik içerikler içerikli içerikte
ideal idealde idealist
ilave ileri ilerlemek ileriye ilerici ilerlet
ilgi ilgili ilgilendir ilgisiz ilgilenmek ilgilendi
imsak imsakta
inanç inançlı inanmak inanır inancı
ince incelemek inceleme incelemeler ince incele
istatistik istemek ister istek istekli isteği
işlem işlemek işlemler işlemci işlemek
kabul kabullenmek kabul eder kabul
kademeli kadro kadroları kadroya
kaynak kaynaklar kaynaklı kaynakları kaynağı
kimlik kimlikli kimliğin
klasik klasikler klasiği
lütuf lütfen lütfen
madde maddeler maddenin
makul makul
maliyet maliyetler maliyeti
mantıklı mantık mantığını
meydan meyve meyveler meyvesi
mümkün imkânsız mümkün
nihai nihai
nitelik nitelikli nitelikler niteliğinde
nüfus nüfusu nüfusun
okumak okuryazar okuyarak okudu
onay onaylamak onaylı onayı onaylan
organize organizasyon organize
ortalam ortalama ortalamanın ortalama
özgür özgürlük özgürce özgürleştirmek özgürlüğü
pazar pazarlama pazarı
rahat rahatlatmak rahatça rahatlar rahatlat
sinyal sinyaller sinyali
taban tabanlı tabanı tabana
tanıtım tanıtımlı tanıtı
titiz (dup)
unsur (dup)
üstün (dup)
yetenek (dup)
yorum (dup)
zorunlu (dup)
açık açıkçası açıklama açıklamak açıkça açıklık açıklayan
açıklamak açıklık
çalışmalar çalışıyor
değerlendirmek
dönüştürmek
duygusal duygular duygusallık duygularını
deneyimlem
eğitmen eğitimciler
görüşlerini
hareket hareketli hareketle hareketin
hazırlıkçı
ilişkilendirmek
kesintisiz kesinti
kişiselleştir
kullanışlı kullanışlı
mesafe mesaj mesai
önemsemek
paylaş paylaşmak paylaşır paylaşılır
rekabet rekabetçi
seçmeli seçimci
sevgi (dup)
sıkıntı sıkıntılı sıkıntısız
sorumluluk (dup)
tanış tanışmak tanışır tanışma
tavsiye tavsiyeler tavsiye
uygulamalı uygulan
ziyaret ziyaretçi ziyaret
zorunluluk (dup)
çözümlemek
ünvan ünvanı
yalnızlaş
açabilir açar açığa adım Ağustos akış alanı alanın alırım alıyorsunuz altında amacınızı anı anlamanıza anlatırım anlayış araç Aralık arasında Araştırır artık Aşkta Aslında ateşi ateşli atılım aynı ayrı ayrılık bağımlı bağlanma bağlantılar bağlantısı bağlar bağları bağlılık bakım Balık Başak başar başarı başarılara Başarılı başarılıdır başarısız Başarıyı Başkalarına başladığı başlangıçlar başlangıçların batımı bazı bazıları biçimi bilgeliğini bırakın bırakma birleştiğinde bittiğinde Boğa bölgede Burçlara Büyük büyüme çaba çalabilir çalışırım çalışırsın çalışkan canlı çatışma çeker çıkan çıkar çıkarabilir çıkarır çıkma çıkmak çıkması Çoğu çok Dayanıklılık değerini değerlere değil değildir değilsin Değişim değişimden değişimler değiştirmek Derinliği dır Direnç dışı doğada doğanın doğuş dönük dönüm
dönüp dönüşü dönüşümler dönüşümü düğüm düğümleri Düğümlerinizi Dünya dünyada dünyanı dünyanızı dünyanızın dünyaya duruş düşkün Duygularımı duygusaldır düzene düzenli düzgün entelektüel erkeği eşinizi eşleşen Eşyaları fırsatları geçer geçin geçirme Geçişleri geçişlerini geldiğinde gelişme geliştirin genişleme gerçeklerin Gökyüzü gökyüzünde görür gösterebilir gösterin gösterir Göz güçlüdür gücü gücünü gücünüzü gün Günde güney Günler güvende güveni hakkında haritanızdaki haritanızı Haritası haritasını hayatı hayatımıza hayatımızda hayatın hayatında hayatınızda hayatınızdaki hiç hiçbir hırs hissettiğinde Hızlı hoşlanmaz içe içgörü için içine içinizdeki içsel ihtiyacı ihtiyacın iletişimci ilginç ilişkilidir inatçı insanı insanların ipuçları işe işler işlerde Jüpiter kalmayı kapatıp kapıları kapınızı kapısını kapıyı karanlık Karanlıkta kararları Kararlı
kararlılığı karşı karşılaştığınız karşılaştırarak karşılığını kartı Kasım katmanını kaybı kaynağıdır kılar Kırmızı kış Kişiliğinin Kişinin kişiyi Koç kök kontrolünü konularını Konuşarak konuşur Korunması koyarım kullandığınızda kullanılır kullanın kullanırım kültürlerden kurmayı Mayıs mesajları mısın Mükemmel müsün noktalarını noktasına Odası öğren öğrenin öğretir öğretmek olacağını olduğu olduğuna olduğunu olmalı olmasını ölüm oluşturur oluşur ömür Öncü onları onların önünde önünü ortaklık Ortamı Ortamın ortasında özelliği Özgürlüğe Özgürlüğüne özgürlüğünü paylaşın Plüton Sabır Sabırlı sabırlıdır sabrı sadık sağlamak Sarı Satürn Savaşçı seçersin seçimi şefkatli Şehir şekilde şey şeyden şeyi şeyin şeyler şeylerden şeyleri sıcak sıkar Sınavları Sınır sınırlarını sırrı sonrası sorumluluklarınız söyler süredir süren tanımak
tarafın tarafından taşı taşır taşırlar Tür tutulmaları Tutulması üretirim uzaklaşırım vardır Venüs yakın yaklaştığında yalnızlığı yanında yaparım yaparsın yapı yapıcı yapın Yapısı yapıyı yapmayı Yaratıcı Yaratıcılık yardım yardımcı yarışmada Yaş yaşama yaşamlardan yazın Yengeç Yenilikçi yeteneği YOĞUN yolculuğun yolculuğunu yönlendir yönlendirin yönlendirmeyi yük yüksektir Yürüyüşü yüzeye yüzeysel zamanıdır Zorlayıcı
Ağırlığı amaca araçları bağlantılarla bağlantınızı Bahçeli borçlarınızı canlısınız çevrenle
derinliğinizi döken düzgünlük etrafınızı geçişlerinizi getirdiğiniz göstergeler göstergeleri götürüyor
gözlerimi güçleniyor hüzünlü iyileştirici kalkanı kalkanını kalkanınızı kalkanın kartını kristalı
kristalınızı kullanıyorsun özgürlüğümü sessizliğini şifacı sınavlarınızı süreyi tutulmalarını yağışı
yıldızla yönlendiriyor Dünyana eşini hayatınız Kraliçesi Öncülük şarkısı yıldızlara yönde Kararlılık
başarısızlık bırakmanız çevreni bulmanızda iç çekilebileceğin akşam anlaşma aradığı emeği parçası
`.split(/\s+/).filter((w) => w && TR_RE.test(w));

const CAP = (w) => (!w ? w : w[0] === "i" ? "İ" + w.slice(1) : w[0].toUpperCase() + w.slice(1));

function foldAscii(word) {
  return [...word].map((ch) => FOLD[ch] ?? ch).join("");
}

function buildMap() {
  const map = new Map();
  for (const w of CORRECT_WORDS) {
    const key = foldAscii(w).toLowerCase();
    if (!map.has(key)) map.set(key, w);
  }
  return map;
}

function applyCase(token, correct) {
  let base = correct;
  if (correct === correct.toUpperCase()) {
    base = token === token.toUpperCase() ? correct : correct.toLowerCase();
  }
  if (token.length > 1 && token === token.toUpperCase()) return base.toUpperCase();
  if (token[0] !== token[0].toLowerCase()) return CAP(base);
  if (token === token.toLowerCase()) return base.toLowerCase();
  return base;
}

const FOLDED_MAP = buildMap();

const SUGGEST_MAP = {
  c: ["ç"], g: ["ğ"], i: ["ı"], o: ["ö"], s: ["ş"], u: ["ü"],
  C: ["Ç"], G: ["Ğ"], I: ["İ"], O: ["Ö"], S: ["Ş"], U: ["Ü"],
};

const SPECIAL_FIXES = new Map([
  ["ic", "iç"], ["Ic", "İç"],
  ["bitsede", "bitse de"], ["Bitsede", "Bitse de"],
]);

const AMBIGUOUS = new Set([
  "o", "a", "e", "u", "y", "ve", "ile", "ki", "bu", "su", "de", "da", "ne", "bu",
  "on", "ol", "olmak", "oldu", "olur", "olsun", "olacak", "olan", "ona", "onu", "onun",
  "sen", "beni", "benim", "sana", "seni", "siz", "size", "bize", "bizi",
  "mi", "mu", "se", "ise", "in", "un", "im", "um", "dir", "dur", "tir", "tur",
  "mis", "mus", "musun", "musunuz", "misin", "misiniz", "mısın", "mısınız",
  "kimi", "kime", "kimin", "gibi", "bile", "kes", "kas", "gul", "as", "ac", "il",
  "sinir", "ani", "koru", "yas", "acil", "donup", "donmak", "olasilik", "sadece",
  "ic", "izin", "isim", "isleri", "ist",
  "html", "class", "style", "div", "span", "href", "src", "alt", "img",
  "jpg", "png", "webp", "svg", "http", "https", "www", "com", "net", "org",
  "the", "and", "for", "with", "this", "that", "you", "are", "from",
  "css", "js", "json", "api", "url", "utf", "nbsp", "strong", "em", "li",
  "yani", "bas", "sus", "isin", "nin", "duş",
  "aci", "acı", "açı", "basan", "başan",
  "hayati", "acısı", "dişi", "dışı", "insani", "insanı", "basar", "donuk", "öldüğü", "olduğu",
  "Venus", "Jupiter", "Saturn",
]);

function suggestCandidates(token, correctSet) {
  const chars = [...token];
  const positions = [];
  for (let i = 0; i < chars.length; i++) if (SUGGEST_MAP[chars[i]]) positions.push(i);
  if (positions.length === 0 || positions.length > 5) return [];
  const hits = [];
  const total = 1 << positions.length;
  for (let mask = 1; mask < total; mask++) {
    const next = [...chars];
    let changed = 0;
    for (let b = 0; b < positions.length; b++) {
      if (mask & (1 << b)) {
        const p = positions[b];
        const alt = SUGGEST_MAP[next[p]][0];
        if (alt !== token[p]) { next[p] = alt; changed++; }
      }
    }
    if (!changed) continue;
    const cand = next.join("");
    if (cand !== token && TR_RE.test(cand) && (correctSet.has(cand) || correctSet.has(CAP(cand)))) {
      hits.push(cand);
    }
  }
  return hits;
}

const TARGETS = [
  { table: "fun_tests", id: "slug", where: { col: "active", val: true },
    cols: [{ col: "title", kind: "text" }, { col: "description", kind: "text" },
           { col: "questions", kind: "jsonb" }, { col: "results", kind: "jsonb" }] },
  { table: "blog_posts", id: "slug", where: { col: "published", val: true },
    cols: [{ col: "title", kind: "text" }, { col: "excerpt", kind: "text" },
           { col: "content", kind: "html" }] },
  { table: "trend_articles", id: "slug", where: { col: "active", val: true },
    cols: [{ col: "title", kind: "text" }, { col: "tag", kind: "text" },
           { col: "excerpt", kind: "text" }, { col: "content", kind: "html" }] },
  { table: "announcements", id: "id", where: { col: "active", val: true },
    cols: [{ col: "title", kind: "text" }, { col: "message", kind: "html" }] },
  { table: "faq", id: "id", where: { col: "active", val: true },
    cols: [{ col: "question", kind: "text" }, { col: "answer", kind: "text" }] },
  { table: "pages", id: "slug", where: { col: "published", val: true },
    cols: [{ col: "title", kind: "text" }, { col: "meta_title", kind: "text" },
           { col: "meta_description", kind: "text" }, { col: "content", kind: "html" }] },
  { table: "blog_categories", id: "slug", where: { col: "active", val: true },
    cols: [{ col: "name", kind: "text" }, { col: "description", kind: "text" }] },
  { table: "sign_content", id: "sign", where: null,
    cols: [{ col: "description", kind: "text" }, { col: "daily_prophecy", kind: "text" },
           { col: "lucky_color", kind: "text" }, { col: "lucky_stone", kind: "text" },
           { col: "lucky_activity", kind: "text" }] },
];

function walkFiles(dir, out = [], depth = 0) {
  if (depth > 6) return out;
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    if (["node_modules", ".next", ".git", "public", ".vercel"].includes(e)) continue;
    const full = dir + "/" + e;
    try {
      if (statSync(full).isDirectory()) walkFiles(full, out, depth + 1);
      else if (/\.(ts|tsx|mjs|js|sql|md)$/.test(e)) out.push(full);
    } catch {}
  }
  return out;
}

function tokenize(text) {
  return text.match(/[A-Za-zÇĞİÖŞÜçğıöşü]+/g) || [];
}

function buildCorrectSet() {
  const set = new Set();
  for (const w of CORRECT_WORDS) {
    set.add(w); set.add(CAP(w)); set.add(w.toUpperCase());
  }
  for (const f of walkFiles(ROOT)) {
    let raw = "";
    try { raw = readFileSync(f, "utf8"); } catch { continue; }
    if (!TR_RE.test(raw)) continue;
    for (const w of tokenize(raw)) {
      if (TR_RE.test(w)) { set.add(w); set.add(CAP(w)); set.add(w.toLowerCase()); }
    }
  }
  return set;
}

function makeFixer(correctSet, wordMap, suggestMode) {
  const cache = new Map();
  return (token) => {
    if (cache.has(token)) return cache.get(token);
    let out = token;
    if (SPECIAL_FIXES.has(token)) {
      out = SPECIAL_FIXES.get(token);
    } else if (AMBIGUOUS.has(token) || AMBIGUOUS.has(token.toLowerCase())) {
      out = token;
    } else {
      const key = foldAscii(token).toLowerCase();
      if (FOLDED_MAP.has(key)) out = applyCase(token, FOLDED_MAP.get(key));
    }
    if (out === token && suggestMode) {
      const hits = suggestCandidates(token, correctSet);
      if (hits.length) {
        hits.sort((a, b) => [...b].filter((ch) => TR_RE.test(ch)).length - [...a].filter((ch) => TR_RE.test(ch)).length);
        out = hits[0];
      }
    }
    if (TR_RE.test(token) && token.toLowerCase() === out.toLowerCase()) out = token;
    if (out !== token) wordMap.set(token, out);
    cache.set(token, out);
    return out;
  };
}

function fixText(text, fixToken) {
  if (!text) return text;
  return text.replace(/(<[^>]*>)|([^<]+)/g, (m, tag, node) => {
    if (tag) return tag;
    if (!node) return "";
    return node.replace(/[A-Za-zÇĞİÖŞÜçğıöşü]+/g, (w, off) => {
      if (w.length < 3 && !SPECIAL_FIXES.has(w)) return w;
      const before = node.slice(Math.max(0, off - 1), off);
      if (before === "'" || before === "’") return w;
      return fixToken(w);
    });
  });
}

function walkJson(value, path, fn) {
  if (typeof value === "string") {
    const fixed = fn(value, path);
    return { v: fixed, changed: fixed !== value };
  }
  if (Array.isArray(value)) {
    let changed = false;
    const out = value.map((item, i) => {
      const r = walkJson(item, `${path}[${i}]`, fn);
      if (r.changed) changed = true;
      return r.v;
    });
    return { v: out, changed };
  }
  if (value && typeof value === "object") {
    let changed = false;
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      const r = walkJson(v, path ? `${path}.${k}` : k, fn);
      if (r.changed) changed = true;
      out[k] = r.v;
    }
    return { v: out, changed };
  }
  return { v: value, changed: false };
}

function extractTextParts(html) {
  const parts = [];
  const re = /(<[^>]*>)|([^<]+)/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (m[2]) parts.push({ start: m.index + m[0].indexOf(m[2]), text: m[2] });
  }
  return parts;
}

function restoreHtml(original, fixes) {
  let out = original;
  let delta = 0;
  for (const f of fixes) {
    const at = f.start + delta;
    out = out.slice(0, at) + f.after + out.slice(at + f.before.length);
    delta += f.after.length - f.before.length;
  }
  return out;
}

function sqlLiteral(v) {
  if (v === null || v === undefined) return "null";
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "object") return `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;
  return `'${String(v).replace(/'/g, "''")}'`;
}

async function main() {
  const args = process.argv.slice(2);
  const writeReport = args.includes("--write-report");
  const emitSql = args.includes("--sql");
  const suggestMode = args.includes("--suggest");
  const applyMode = args.includes("--apply");

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error(".env.local icinde SUPABASE_URL / ANON_KEY yok");
    process.exit(1);
  }

  const db = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
  const correctSet = buildCorrectSet();
  const findings = [];
  const changes = [];
  const wordMap = new Map();
  const fixToken = makeFixer(correctSet, wordMap, suggestMode);
  const rowsByTarget = [];

  for (const t of TARGETS) {
    const cols = [t.id, ...t.cols.map((c) => c.col)].join(", ");
    let q = db.from(t.table).select(cols);
    if (t.where) q = q.eq(t.where.col, t.where.val);
    const { data, error } = await q;
    if (error) { console.error(`[skip] ${t.table}: ${error.message}`); continue; }
    rowsByTarget.push({ t, rows: data || [] });
  }

  for (const { t, rows } of rowsByTarget) {
    for (const row of rows) {
      for (const c of t.cols) {
        const raw = row[c.col];
        if (raw === null || raw === undefined || raw === "") continue;

        if (c.kind === "jsonb") {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          const r = walkJson(parsed, "", (str) => fixText(str, fixToken));
          if (r.changed) {
            findings.push({ table: t.table, id: row[t.id], col: c.col, kind: "jsonb", before: JSON.stringify(parsed), after: JSON.stringify(r.v) });
            changes.push({ table: t.table, id: row[t.id], idCol: t.id, col: c.col, value: r.v });
          }
          continue;
        }

        if (c.kind === "html") {
          const parts = extractTextParts(String(raw));
          const fixes = [];
          for (const p of parts) {
            const after = fixText(p.text, fixToken);
            if (after !== p.text) fixes.push({ start: p.start, before: p.text, after });
          }
          if (fixes.length) {
            const next = restoreHtml(String(raw), fixes);
            findings.push({ table: t.table, id: row[t.id], col: c.col, kind: "html", before: String(raw), after: next });
            changes.push({ table: t.table, id: row[t.id], idCol: t.id, col: c.col, value: next });
          }
          continue;
        }

        const next = fixText(String(raw), fixToken);
        if (next !== raw) {
          findings.push({ table: t.table, id: row[t.id], col: c.col, kind: "text", before: String(raw), after: next });
          changes.push({ table: t.table, id: row[t.id], idCol: t.id, col: c.col, value: next });
        }
      }
    }
  }

  const lines = [];
  lines.push("TURKCE KARAKTER RAPORU — salt okunur, duzeltme uygulanmadi");
  lines.push(`mod: ${suggestMode ? "kesin + oneri" : "kesin (acik sozluk)"}`);
  lines.push(`sozluk: ${CORRECT_WORDS.length} dogru kelime / ${FOLDED_MAP.size} esleme | bulgu: ${findings.length}`);
  lines.push("");
  lines.push("KELIME DONUSUMLERI (incele):");
  for (const [a, b] of [...wordMap.entries()].sort((x, y) => x[0].localeCompare(y[0], "tr"))) {
    lines.push(`  ${a} -> ${b}`);
  }
  lines.push("");

  for (const f of findings) {
    lines.push(`[${f.table}] ${f.id} :: ${f.col}`);
    if (f.kind === "jsonb") {
      lines.push(`  - ${f.before}`);
      lines.push(`  + ${f.after}`);
    } else {
      lines.push(`  - ${f.before.replace(/\s+/g, " ").slice(0, 500)}`);
      lines.push(`  + ${f.after.replace(/\s+/g, " ").slice(0, 500)}`);
    }
    lines.push("");
  }

  const byTable = {};
  for (const f of findings) byTable[f.table] = (byTable[f.table] || 0) + 1;
  lines.push("OZET");
  for (const [k, v] of Object.entries(byTable)) lines.push(`  ${k}: ${v}`);
  if (!findings.length) lines.push("  temiz");

  const report = lines.join("\n");
  console.log(report);

  if (writeReport) {
    const p = resolve(ROOT, "turkish-report.txt");
    writeFileSync(p, report, "utf8");
    console.log(`\nrapor yazildi: ${p}`);
  }

  const sqlStatements = changes.map(
    (c) => `update ${c.table} set ${c.col} = ${sqlLiteral(c.value)}, updated_at = now() where ${c.idCol} = ${sqlLiteral(c.id)};`
  );

  if (emitSql) {
    const p = resolve(ROOT, "turkish-fix.sql");
    writeFileSync(p, `-- onaydan sonra calistir\nbegin;\n` + sqlStatements.join("\n") + "\ncommit;\n", "utf8");
    console.log(`\nsql yazildi: ${p} (${sqlStatements.length} ifade)`);
  }

  if (applyMode) {
    if (!changes.length) {
      console.log("\nuygulanacak degisiklik yok");
    } else if (!args.includes("--yes")) {
      console.error("\n--apply calistirildi ama --yes yok; DB'ye yazilmadi. Devam: npm run turkish:apply");
      process.exit(2);
    } else {
      const grouped = new Map();
      for (const c of changes) {
        const k = `${c.table}|${c.id}`;
        if (!grouped.has(k)) grouped.set(k, { table: c.table, idCol: c.idCol, id: c.id, set: {} });
        grouped.get(k).set[c.col] = c.value;
      }
      let ok = 0;
      for (const g of grouped.values()) {
        const { error } = await db.from(g.table).update(g.set).eq(g.idCol, g.id);
        if (error) { console.error(`[hata] ${g.table}/${g.id}: ${error.message}`); continue; }
        ok++;
      }
      console.log(`\nDB guncellendi: ${ok}/${grouped.size} satir, ${changes.length} alan`);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
