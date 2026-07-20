const { createClient } = require('@supabase/supabase-js');
const { marked } = require('marked');
const fs = require('fs');

const supabase = createClient(
  'https://gbgsykjrozmpkpsqukcp.supabase.co',
  'sb_publishable_m_Q7yrrlE5Bu_tqTD9teVg_3xjSzAj-'
);

// Load Turkish dictionary
const dict = new Set(
  fs.readFileSync('/tmp/tr_words.txt', 'utf8')
    .split('\n')
    .map(w => w.trim().toLowerCase())
    .filter(Boolean)
);

// Also load extra astrology/domain terms that won't be in dict
const extra = new Set([
  'astroloji', 'astrolojik', 'burç', 'burçlar', 'gezegen', 'gezegenler',
  'yükselen', 'doğum', 'harita', 'haritası', 'horoskop', 'numeroloji',
  'merkür', 'venüs', 'mars', 'jüpiter', 'satürn', 'uranüs', 'neptün',
  'plüton', 'ay', 'güneş', 'zodyak', 'kozmik', 'retro', 'retrosu',
  'kova', 'koç', 'boğa', 'ikizler', 'yengeç', 'aslan', 'başak', 'terazi',
  'akrep', 'yay', 'oğlak', 'balık', 'element', 'duygusal', 'ruhsal',
  'düğüm', 'düğümleri', 'karmik', 'kader', 'ev', 'evler', 'kart', 'kartları',
  'tarot', 'arakan', 'güneş', 'ay', 'yıldız', 'yıldızlar', 'enerji',
  'enerjisi', 'frekans', 'meditasyon', 'şi', 'şekil', 'ilişki', 'uyum',
  'cinsel', 'sezgisel', 'ruh', 'ruhsal', 'bilinç', 'bilinçaltı', 'duygu',
  'psikolojik', 'kişilik', 'karakter', 'motivasyon', 'hayat', 'yaşam',
  'deneyim', 'potansiyel', 'fırsat', 'değişim', 'dönüşüm', 'gelişim',
  'büyüme', 'ilerleme', 'başarı', 'mutluluk', 'huzur', 'denge', 'uyum',
  'harmoni', 'aşk', 'sevgi', 'para', 'kariyer', 'sağlık', 'aile',
  'arkadaş', 'iletişim', 'öğrenme', 'bilgi', 'bilgelik', 'rehber',
  'rehberlik', 'işaret', 'sembol', 'anlam', 'anlamı', 'sır', 'gizem',
  'evrim', 'ritüel', 'niyet', 'afirmasyon', 'vizyon', 'hayal', 'umut',
  'inanç', 'değer', 'değerler', 'özgüven', 'özgür', 'bağımsız', 'cesur',
  'yaratıcı', 'yaratıcılık', 'sezgi', 'mantık', 'akıl', 'zihin', 'ruh',
  'kader', 'kısmet', 'şans', 'talih', 'fırsat', 'tesadüf', 'synchron',
  'kozmik', 'evrensel', 'ilahi', 'tanrısal', 'spiritüel', 'mistik',
  'gizli', 'derin', 'yüksek', 'alt', 'üst', 'iç', 'dış', 'ön', 'arka',
  'sağ', 'sol', 'doğu', 'batı', 'kuzey', 'güney', 'merkez', 'çevre',
  'dünya', 'evren', 'uzay', 'zaman', 'an', 'saniye', 'dakika', 'saat',
  'gün', 'hafta', 'ay', 'yıl', 'yüzyıl', 'çağ', 'devir', 'dönem',
  'döngü', 'siklus', 'faz', 'evre', 'mevsim', 'mevsimsel', 'yörünge',
  'yörüngesi', 'gezegen', 'yıldız', 'güneş', 'ay', 'meteor', 'kuyruklu',
  'konum', 'pozisyon', 'açı', 'derece', 'yükselim', 'alçalış', 'gerileme',
  'ileri', 'geri', 'durgun', 'durağan', 'hareket', 'akış', 'akan',
  'kılavuz', 'rehber', 'öğreti', 'felsefe', 'düşünce', 'görüş', 'bakış',
  'perspektif', 'yöntem', 'teknik', 'uygulama', 'pratik', 'egzersiz',
  'alıştırma', 'test', 'sınav', 'soru', 'cevap', 'çözüm', 'sonuç',
  'tavsiye', 'öneri', 'ipucu', 'strateji', 'plan', 'program', 'sistem',
  'yapı', 'model', 'örnek', 'şablon', 'formül', 'kural', 'yas', 'kanun',
  'prensip', 'ilke', 'temel', 'esas', 'özet', 'özetle', 'genel', 'özel',
  'kişi', 'kişisel', 'bireysel', 'toplumsal', 'kolektif', 'ortak',
  'grup', 'topluluk', 'ağ', 'bağ', 'bağlantı', 'ilişki', 'etkileşim',
  'etki', 'tesir', 'güç', 'kuvvet', 'enerji', 'titreşim', 'frekans',
  'dalga', 'ışın', 'ışık', 'parıltı', 'parlak', 'parlaklık', 'aydınlık',
  'karanlık', 'gölge', 'siyah', 'beyaz', 'renk', 'ton', 'gölgeli',
  'canlı', 'sıcak', 'soğuk', 'nemli', 'kuru', 'yumuşak', 'sert',
  'esnek', 'katı', 'akıcı', 'durgun', 'hızlı', 'yavaş', 'ani', 'anlık',
  'sürekli', 'geçici', 'kalıcı', 'sabit', 'değişken', 'dalgalı',
  'istikrarlı', 'düzenli', 'düzensiz', 'organik', 'yapay', 'doğal',
  'sentetik', 'gerçek', 'sahte', 'yanıltıcı', 'net', 'belirsiz',
  'açık', 'kapalı', 'gizli', 'aşikar', 'belli', 'muğlak', 'kesin',
  'olası', 'ihtimal', 'risk', 'tehlike', 'fırsat', 'tehdit', 'destek',
  'engel', 'zorluk', 'kolaylık', 'basit', 'karmaşık', 'zor', 'kolay',
  'ağır', 'hafif', 'büyük', 'küçük', 'geniş', 'dar', 'uzun', 'kısa',
  'yüksek', 'alçak', 'derin', 'sığ', 'kalın', 'ince', 'yoğun', 'seyrek'
]);

// Character substitution candidates for Turkish
const SUB_MAP = {
  c: ['c', 'ç'],
  g: ['g', 'ğ'],
  i: ['i', 'ı'],
  o: ['o', 'ö'],
  s: ['s', 'ş'],
  u: ['u', 'ü'],
  C: ['C', 'Ç'],
  G: ['G', 'Ğ'],
  I: ['I', 'İ'],
  O: ['O', 'Ö'],
  S: ['S', 'Ş'],
  U: ['U', 'Ü'],
};

// Words that are valid in either form (common ones that cause false fixes)
const KNOWN_OK = new Set([
  'cin', 'cins', 'cift', 'cocuk', 'cadir', 'cam', 'can', 'casus', 'cop',
  'cik', 'cikis', 'cal', 'calis', 'car', 'cat', 'cay', 'cevir', 'ciz',
  'cikar', 'corap', 'cul', 'cumle', 'cur', 'cus', 'cuzdan', 'cuzi',
  'gic', 'gider', 'giris', 'goster', 'gormek', 'gotur', 'guc', 'guc',
  'ikamet', 'icer', 'icin', 'ic', 'içe', 'idare', 'ideal', 'idam',
  'okul', 'okumak', 'on', 'once', 'ol', 'olay', 'oldu', 'olmak', 'olsun',
  'sokak', 'soru', 'soz', 'soyle', 'sifir', 'sicak', 'sik', 'sil', 'sistem',
  'uc', 'ucak', 'uzak', 'uzer', 'uzman', 'ulus', 'ulusal', 'umut', 'un',
  'yuk', 'yukari', 'yuz', 'yuzde', 'yuzey', 'yuksel', 'yumurta',
  'kucuk', 'buyuk', 'cok', 'butun', 'kultur', 'sanat', 'dunya', 'zaman',
  'gun', 'guneş', 'ay', 'yil', 'saat', 'dakika', 'sn', 'dk', 'cm', 'km',
  'tl', 'usd', 'www', 'http', 'https', 'com', 'org', 'net', 'tr', 'html',
  'jpg', 'png', 'img', 'src', 'alt', 'href', 'div', 'p', 'br', 'h1', 'h2',
  'h3', 'strong', 'em', 'ul', 'li', 'a', 'span', 'class', 'style', 'id'
]);

function isWordValid(word) {
  if (!word) return true;
  const lw = word.toLowerCase();
  if (KNOWN_OK.has(lw)) return true;
  if (dict.has(lw)) return true;
  if (extra.has(lw)) return true;
  return false;
}

// Try to fix a single token by substituting Turkish chars
function fixToken(token) {
  // token may contain punctuation; separate prefix/suffix non-letters
  const m = token.match(/^([^a-zA-ZİıÇçĞğÖöŞşÜü]*)([a-zA-ZİıÇçĞğÖöŞşÜü]+)([^a-zA-ZİıÇçĞğÖöŞşÜü]*)$/);
  if (!m) return token;
  const [_, pre, core, post] = m;
  if (isWordValid(core)) return token;

  // Generate candidate by substituting each substitutable char
  const chars = core.split('');
  // For each position that has a sub candidate, try alternate
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (SUB_MAP[c]) {
      for (const alt of SUB_MAP[c]) {
        if (alt === c) continue;
        const candidate = core.slice(0, i) + alt + core.slice(i + 1);
        if (isWordValid(candidate)) {
          return pre + candidate + post;
        }
      }
    }
  }
  // Try two simultaneous substitutions
  for (let i = 0; i < chars.length; i++) {
    for (let j = i + 1; j < chars.length; j++) {
      const ci = chars[i], cj = chars[j];
      if (SUB_MAP[ci] && SUB_MAP[cj]) {
        for (const ai of SUB_MAP[ci]) {
          if (ai === ci) continue;
          for (const aj of SUB_MAP[cj]) {
            if (aj === cj) continue;
            const candidate = core.slice(0, i) + ai + core.slice(i + 1, j) + aj + core.slice(j + 1);
            if (isWordValid(candidate)) {
              return pre + candidate + post;
            }
          }
        }
      }
    }
  }
  return token;
}

function fixTurkish(text) {
  // Only operate on text outside of HTML tags to avoid breaking tags/attributes
  // Split by tags, process text nodes only
  return text.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, textNode) => {
    if (tag) return tag;
    if (!textNode) return '';
    return textNode.replace(/[^\s]+/g, fixToken);
  });
}

function convertContent(raw) {
  if (!raw) return raw;
  // marked expects markdown; convert
  let html;
  try {
    html = marked.parse(raw, { breaks: true, gfm: true });
  } catch (e) {
    html = raw;
  }
  // Fix Turkish chars in text nodes (preserve tags)
  html = fixTurkish(html);
  return html;
}

(async () => {
  const dump = JSON.parse(fs.readFileSync('/tmp/content_dump.json', 'utf8'));
  let changed = 0;

  for (const table of ['trend_articles', 'blog_posts']) {
    for (const row of dump[table]) {
      const converted = convertContent(row.content);
      if (converted !== row.content) {
        const { error } = await supabase
          .from(table)
          .update({ content: converted })
          .eq('slug', row.slug);
        if (error) {
          console.error('UPDATE ERROR', table, row.slug, error.message);
        } else {
          changed++;
          console.log('updated', table, row.slug);
        }
      }
    }
  }
  console.log('Total updated:', changed);
})();
