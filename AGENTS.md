# Marifetli Kedi — Kalıcı Kurallar

Bu dosya her otomatik oturumda okunur. Buradaki kurallar bağlayıcıdır.
**Yeni bir kalıcı kural geldikçe bu dosyaya EKLENECEK.**

## 1. Eğlenceli testler — EN AZ 15 SORU

- Her `fun_tests` kaydı **en az 15 soru** içermelidir. 4, 5, 10 soru YASAKTIR.
- Her soru 4 seçeneklidir; seçenek puanları `1, 2, 3, 4` artan sıradadır.
- `results` 4 banttır ve `scoreRange` şu formata uyar (n = soru sayısı):

  | n | min | max | scoreRange |
  |---|-----|-----|------------|
  | 15 | 15 | 60 | `[15,30],[31,45],[46,55],[56,60]` |
  | 20 | 20 | 80 | `[20,35],[36,50],[51,65],[66,80]` |

- Zorunlu doğrulama (0 satır dönmeli):

  ```sql
  select slug, jsonb_array_length(questions) as n
  from fun_tests
  where active = true and jsonb_array_length(questions) < 15;
  ```

- **Her `results[].description` EN AZ 150 kelimelik analizdir** (test sonunda
  kullanıcıya gösterilen metin). `advice` en fazla 2-3 cümlelik kısa tavsiye kalır.
- **Giriş metni (intro) KULLANILMAZ** — test sayfasında gösterilmez, adminde
  düzenlenmez, yeni test eklenirken yazılmaz.
- Analiz doğrulaması (0 satır dönmeli):

  ```sql
  select slug from fun_tests, jsonb_array_elements(results) r
  where active = true
    and array_length(regexp_split_to_array(trim(r->>'description'), '\s+'), 1) < 150;
  ```

## 2. Türkçe karakter — ASCII katlaması YASAK

- `gore`→`göre`, `guclu`→`güçlü`, `yildiz`→`yıldız`, `gunes`→`güneş`,
  `kesfedin`→`keşfedin`, `nasil`→`nasıl`, `onceki`→`önceki`, `burc`→`burç`,
  `dogal`→`doğal`, `baslangic`→`başlangıç` vb. **hiçbir şekilde kullanılmaz.**
- **Slug'lar ASCII kalır** (URL için doğru). **Görünen metin Türkçe olur:**
  `title`, `description`, `excerpt`, `content`, `questions`, `results`,
  `tag`, `announcement`, `faq`, sayfa metinleri.
- Türkçe karakter seti: `ç Ç ğ Ğ ı İ ö Ö ş Ş ü Ü`
- Her içerik ekleme/değişikliğinden sonra zorunlu tarama:

  ```bash
  node scripts/check-turkish.mjs --write-report   # salt okunur rapor -> turkish-report.txt
  node scripts/check-turkish.mjs --sql            # SQL üretir -> turkish-fix.sql
  node scripts/check-turkish.mjs --suggest        # sözlükte olmayanlar için öneri
  ```

- **Akış zorunlu:** `--write-report` → raporu kullanıcıya sun → **onay** → `--sql` →
  `turkish-fix.sql`'i Supabase MCP `execute_sql` ile uygula. Onaysız UPDATE yasaktır.

- Slug ile başlık aynı yazımda olmak ZORUNDA DEĞİL.
  Örnek: slug `astrolojide-sabit-yildizlar`, başlık `Astrolojide Sabit Yıldızlar`.

## 3. "İçerik ekle" komutu

Kullanıcı **"İçerik ekle"** dediğinde **5 + 5 + 5** eklenir, hepsi 1. ve 2. kurallara uygun:

| istek | tablo | adet | not |
|---|---|---|---|
| test | `fun_tests` | 5 | **15 soru**, 4 sonuç bandı (**her açıklama 150+ kelime**), `active=true` |
| blog | `blog_posts` | 5 | `published=true`, kategori + görsel + excerpt, Türkçe |
| eğlenceli içerik (trend) | `trend_articles` | 5 | `active=true`, doğru yazılmış `tag`, excerpt + content |

- Önce **konu listesi** kullanıcıya sunulur, onay sonrası INSERT yapılır.
- `trend_articles.tag` değerleri mevcut doğrularıyla eşleşir:
  `Burç Analizi`, `Listik İçerik`, `Astroloji Rehberi`

## 4. Ortam

| şey | değer |
|---|---|
| Build | `npm run build` (lint scripti yok; build = tip + derleme kontrolü) |
| Node | 22.x |
| Supabase proje | `gbgsykjrozmpkpsqukcp` (üretim — dikkatli ol) |
| Site | `https://www.marifetlikedi.com` |
| AdSense | `ca-pub-8173666333919708` — slot adı sınırı: `lib/ads.ts` içinde **5 slot** |
| Deploy | Vercel, GitHub `main` push → otomatik |
| Marka | Başka bir Dünya (baskabidunya.com) üst firma |

## 5. Emniyet

- Üretim DB'sine UPDATE/INSERT öncesi **önce rapor + kullanıcı onayı**.
- `git restore .` gibi geri alma işlemleri çalışma dizini bozulduğunda; commit/push
  yalnızca kullanıcı açıkça istediğinde.
- Secret/anahtar dosyalara commit edilmez (`.env.local` gitignored).
