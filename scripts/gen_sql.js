const { marked } = require('marked');
const fs = require('fs');

const dict = new Set(
  fs.readFileSync('/tmp/tr_words.txt', 'utf8')
    .split('\n').map(w => w.trim().toLowerCase()).filter(Boolean)
);

const extra = new Set([
  'astroloji','astrolojik','burç','burçlar','gezegen','gezegenler','yükselen',
  'doğum','harita','haritası','horoskop','numeroloji','merkür','venüs','mars',
  'jüpiter','satürn','uranüs','neptün','plüton','zodyak','kozmik','retro',
  'retrosu','kova','koç','boğa','ikizler','yengeç','aslan','başak','terazi',
  'akrep','yay','oğlak','balık','element','duygusal','ruhsal','düğüm','düğümleri',
  'karmik','kader','ev','evler','kart','kartları','tarot','aran','güneş','yıldız',
  'yıldızlar','enerji','enerjisi','frekans','meditasyon','ilişki','uyum','cinsel',
  'sezgisel','ruh','bilinç','bilinçaltı','duygu','psikolojik','kişilik','karakter',
  'motivasyon','hayat','yaşam','deneyim','potansiyel','fırsat','değişim','dönüşüm',
  'gelişim','büyüme','ilerleme','başarı','mutluluk','huzur','denge','harmoni','aşk',
  'sevgi','para','kariyer','sağlık','aile','arkadaş','iletişim','öğrenme','bilgi',
  'bilgelik','rehber','rehberlik','işaret','sembol','anlam','anlamı','sır','gizem',
  'evrim','ritüel','niyet','afirmasyon','vizyon','hayal','umut','inanç','değer',
  'değerler','özgüven','özgür','bağımsız','cesur','yaratıcı','yaratıcılık','sezgi',
  'mantık','akıl','zihin','kısmet','şans','talih','tesadüf','kozmik','evrensel',
  'ilahi','tanrısal','spiritüel','mistik','gizli','derin','yüksek','iç','dış','doğu',
  'batı','kuzey','güney','merkez','dünya','evren','uzay','zaman','hafta','yıl',
  'yüzyıl','çağ','devir','dönem','döngü','faz','evre','mevsim','yörünge','yörüngesi',
  'konum','pozisyon','açı','derece','yükselim','alçalış','gerileme','ileri','geri',
  'durgun','durağan','hareket','akış','akan','kılavuz','öğreti','felsefe','düşünce',
  'görüş','bakış','perspektif','yöntem','teknik','uygulama','pratik','egzersiz',
  'alıştırma','test','sınav','soru','cevap','çözüm','sonuç','tavsiye','öneri','ipucu',
  'strateji','plan','program','sistem','yapı','model','örnek','şablon','formül','kural',
  'yas','kanun','prensip','ilke','temel','esas','özet','özetle','genel','özel','kişi',
  'kişisel','bireysel','toplumsal','kolektif','ortak','grup','topluluk','ağ','bağ',
  'bağlantı','etkileşim','etki','tesir','güç','kuvvet','titreşim','dalga','ışın',
  'ışık','parıltı','parlak','parlaklık','aydınlık','karanlık','gölge','siyah','beyaz',
  'renk','ton','gölgeli','canlı','sıcak','soğuk','nemli','kuru','yumuşak','sert','esnek',
  'katı','akıcı','hızlı','yavaş','ani','anlık','sürekli','geçici','kalıcı','sabit',
  'değişken','dalgalı','istikrarlı','düzenli','düzensiz','organik','yapay','doğal',
  'sentetik','gerçek','sahte','yanıltıcı','net','belirsiz','açık','kapalı','aşikar',
  'belli','muğlak','kesin','olası','ihtimal','risk','tehlike','destek','engel','zorluk',
  'kolaylık','basit','karmaşık','zor','kolay','ağır','hafif','büyük','küçük','geniş',
  'dar','uzun','kısa','alçak','sığ','kalın','ince','yoğun','seyrek','uyumlu','uyumsuz',
  'astro','loji','kozmos','mistisizm','şaman','şamanizm','büyü','büyücülük','fal',
  'falcı','günlük','haftalık','aylık','yıllık','burç','yükselen','ay','güneş','yıldız',
  'gezegen','ev','evler','aşk','ilişki','para','kariyer','sağlık','aile','evlilik',
  'arkadaşlık','eğitim','seyahat','iş','aşk','sağlık','güzellik','moda','yemek',
  'spor','sanat','müzik','edebiyat','sinema','tiyatro','fotoğraf','resim','heykel',
  'mimari','tasarım','teknoloji','bilim','tarih','coğrafya','matematik','fizik',
  'kimya','biyoloji','astronomi','astrofizik','uzay','gezegen','yıldız','güneş','ay',
  'meteor','kuyruklu','kuyruk','yörünge','yörüngesi','gök','gök bilim','gökyüzü',
  'güneş','ay','yıldız','gezegen','meteor','kuyruklu','konum','pozisyon','açı','derece'
]);

const KNOWN_OK = new Set([
  'cin','cins','cift','cocuk','cadir','cam','can','casus','cop','cik','cikis','cal',
  'calis','car','cat','cay','cevir','ciz','cikar','corap','cul','cumle','cur','cus',
  'cuzdan','cuzi','gic','gider','giris','goster','gormek','gotur','guc','ikamet','icer',
  'icin','ic','idare','ideal','idam','okul','okumak','on','once','ol','olay','oldu',
  'olmak','olsun','sokak','soru','soz','soyle','sifir','sicak','sik','sil','sistem',
  'uc','ucak','uzak','uzer','uzman','ulus','ulusal','umut','un','yuk','yukari','yuz',
  'yuzde','yuzey','yuksel','yumurta','kucuk','buyuk','cok','butun','kultur','sanat',
  'dunya','zaman','gun','guneş','ay','yil','saat','dakika','sn','dk','cm','km','tl',
  'usd','www','http','https','com','org','net','tr','html','jpg','png','img','src',
  'alt','href','div','p','br','h1','h2','h3','strong','em','ul','li','a','span','class',
  'style','id','img','the','and','for','with','that','this','from','your','you','are',
  'astrology','zodiac','planet','sign','moon','sun','star','house','rising','retrograde'
]);

const SUB_MAP = {
  c: ['c', 'ç'], g: ['g', 'ğ'], i: ['i', 'ı'], o: ['o', 'ö'],
  s: ['s', 'ş'], u: ['u', 'ü'], C: ['C', 'Ç'], G: ['G', 'Ğ'],
  I: ['I', 'İ'], O: ['O', 'Ö'], S: ['S', 'Ş'], U: ['U', 'Ü'],
};

function isWordValid(word) {
  if (!word) return true;
  const lw = word.toLowerCase();
  return KNOWN_OK.has(lw) || dict.has(lw) || extra.has(lw);
}

function fixToken(token) {
  const m = token.match(/^([^a-zA-ZİıÇçĞğÖöŞşÜü]*)([a-zA-ZİıÇçĞğÖöŞşÜü]+)([^a-zA-ZİıÇçĞğÖöŞşÜü]*)$/);
  if (!m) return token;
  const core = m[2];
  if (isWordValid(core)) return token;
  const chars = core.split('');
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (SUB_MAP[c]) {
      for (const alt of SUB_MAP[c]) {
        if (alt === c) continue;
        const cand = core.slice(0, i) + alt + core.slice(i + 1);
        if (isWordValid(cand)) return cand;
      }
    }
  }
  for (let i = 0; i < chars.length; i++) {
    for (let j = i + 1; j < chars.length; j++) {
      const ci = chars[i], cj = chars[j];
      if (SUB_MAP[ci] && SUB_MAP[cj]) {
        for (const ai of SUB_MAP[ci]) {
          if (ai === ci) continue;
          for (const aj of SUB_MAP[cj]) {
            if (aj === cj) continue;
            const cand = core.slice(0, i) + ai + core.slice(i + 1, j) + aj + core.slice(j + 1);
            if (isWordValid(cand)) return cand;
          }
        }
      }
    }
  }
  return token;
}

function fixTurkish(text) {
  return text.replace(/(<[^>]+>)|([^<]+)/g, (mm, tag, tn) => {
    if (tag) return tag;
    if (!tn) return '';
    return tn.replace(/[^\s]+/g, fixToken);
  });
}

function convertContent(raw) {
  if (!raw) return raw;
  let html;
  try { html = marked.parse(raw, { breaks: true, gfm: true }); }
  catch (e) { html = raw; }
  return fixTurkish(html);
}

const dump = JSON.parse(fs.readFileSync('/tmp/content_dump.json', 'utf8'));
const out = [];
for (const table of ['trend_articles', 'blog_posts']) {
  for (const row of dump[table]) {
    const converted = convertContent(row.content);
    // dollar-quote the content to avoid escaping issues
    const q = '$_' + Math.random().toString(36).slice(2) + '_$';
    out.push(
      `UPDATE ${table} SET content = ${q}${converted}${q} WHERE slug = '${row.slug}';`
    );
  }
}
fs.writeFileSync('/tmp/updates.sql', out.join('\n'));
console.log('Wrote', out.length, 'UPDATE statements to /tmp/updates.sql');
