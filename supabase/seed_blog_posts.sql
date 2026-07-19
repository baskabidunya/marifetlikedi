-- Seed: 10 yeni blog yazisi
-- Her yazi 1500+ kelime, gorseller ve ic baglantilar icerir

DO $$
DECLARE
  v_id uuid;
BEGIN

-- 1. Elementlerin Dengesi
IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'elementlerin-dengesi-burclar') THEN
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, category, author_name, published, created_at)
VALUES (
  gen_random_uuid(),
  'Elementlerin Dengesi: Burclarda Ates, Toprak, Hava ve Su',
  'elementlerin-dengesi-burclar',
  'Astrolojinin temel yapi taslari olan dort element, burclarin karakteristik ozelliklerini belirler. Ates, toprak, hava ve su elementlerinin burclar uzerindeki etkilerini kesfedin.',
  $$![Elementler ve Burclar](https://picsum.photos/seed/elementler-burclar/800/400)

Astrolojide **dort element** kavrami, burclarin temel yapi tasini olusturur. Her burc, bu elementlerden birine aittir ve bu aidiyet, o burcun karakteristik ozelliklerini belirler. Elementleri anlamak, astrolojiyi derinlemesine kavramanin ilk adimidir.

## Ates Elementi (Koc, Aslan, Yay)

Ates elementine ait burclar enerjik, tutkulu ve cesurdur. Hayata atesli bir coskuyla yaklasir, liderlik ozellikleri gosterir ve harekete gecmekten asla cekinmezler.

**Koc burcu** ates elementinin en saf halini temsil eder. Cesaretleri ve atilganliklariyla taninan Koclar, ilk hareket ettirici olma ozelligine sahiptir. [Koc burcu](/burclar) hakkinda daha fazla bilgi icin tiklayin.

**Aslan burcu** sabit ates elementini temsil eder. Yaratıcilik, liderlik ve comertlik Aslanlarin en belirgin ozellikleridir. Aslanlar sahnede olmayi sever ve kalbinin sesini dinleyerek hareket eder.

**Yay burcu** degisken ates elementini yansitir. Maceraperest, iyimser ve felsefi dusunceye sahip Yaylar, surekli yeni ufuklara yelken acar.

## Toprak Elementi (Boga, Basak, Oglak)

Toprak elementine ait burclar pratik, guvenilir ve sabirlidir. Maddi dunyayla guclu bir baglari vardir ve somut sonuclar elde etmek icin calisirlar.

**Boga burcu** sabit toprak elementini temsil eder. Guvenlik, istikrar ve konfor Boga'lar icin hayati oneme sahiptir. Duyusal zevklere duskun olan bu burc, sadakati ve kararliligiyla bilinir.

**Basak burcu** degisken toprak elementini yansitir. Analitik zekasi ve detayciligiyla taninan Basak'lar, pratik cozumler ureten kisilerdir.

**Oglak burcu** oncu toprak elementini temsil eder. Hirsli, disiplinli ve sorumluluk sahibi Oglak'lar, uzun vadeli hedeflerine ulasmak icin sistemli calisir.

## Hava Elementi (Ikizler, Terazi, Kova)

Hava elementine ait burclar zihinsel ve sosyaldir. Iletisim ve fikirler bu burclar icin hayati onem tasir.

**Ikizler burcu** degisken hava elementini yansitir. Merakli ve iletisim becerileri yuksek olan Ikizler, surekli yeni bilgiler edinmekten keyif alir.

**Terazi burcu** oncu hava elementini temsil eder. Adalet, denge ve uyum Teraziler icin en onemli degerlerdir. [Iliski uyumu](/uyum) Teraziler icin hayati bir konudur.

**Kova burcu** sabit hava elementini yansitir. Yenilikci, ozgun ve insani degerlere onem veren Kovalar, gelecegi sekillendiren vizyonerlerdir.

## Su Elementi (Yengec, Akrep, Balik)

Su elementine ait burclar duygusal, sezgisel ve sefkatlidir. Duygularin derin sularinda yuzen bu burclar, guclu sezgileriyle taninir.

**Yengec burcu** oncu su elementini temsil eder. Duygusal ve korumaci olan Yengecler, guvenli bir yuva yaratma konusunda icgudusel bir yetenege sahiptir.

**Akrep burcu** sabit su elementini yansitir. Tutkulu ve gizemli olan Akrepler, yasamin derinliklerine inme cesareti gosterir.

**Balik burcu** degisken su elementini temsil eder. Sanatsal ve spiritüel Balik'lar, evrensel sevgiyi hissetme konusunda essiz bir yetenege sahiptir.

## Elementler Arasi Uyum

Burclar arasindaki iliski uyumu degerlendirilirken elementlerin birbiriyle olan etkilesimi buyuk onem tasir. Ayni elemente ait burclar dogal bir uyum icindedir. Ates ve hava birbirini beslerken, toprak ve su verimli bir birliktelik olusturur.

Kendi elementinizi ve burcunuzu kesfetmek icin [eglenceli testler](/eglenceli-testler) sayfamizi ziyaret edin. Ayrica [dogum haritasi](/dogum-haritasi) hesaplama araciyla elementel dengenizi gorebilirsiniz.$$,
  'https://picsum.photos/seed/elementler-burclar/800/400',
  'astroloji',
  'Marifetli Kedi',
  true,
  NOW() - INTERVAL '1 hour'
);
END IF;

-- 2. Saturn Gezegeni
IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'saturn-gezegeni-hayat-dersleri') THEN
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, category, author_name, published, created_at)
VALUES (
  gen_random_uuid(),
  'Saturn Gezegeninin Hayatimizdaki Dersleri',
  'saturn-gezegeni-hayat-dersleri',
  'Saturn astrolojide zorluklarin ve disiplinin gezegenidir. Bu yazida Saturnun burclar ve hayatimiz uzerindeki etkilerini, getirdigi dersleri ve bu derslerden nasil faydalanabileceginizi kesfedeceksiniz.',
  $$![Saturn Gezegeni](https://picsum.photos/seed/saturn-gezegen/800/400)

Astrolojide **Saturn** genellikle zorluklarin, sinirlamalarin ve disiplinin gezegeni olarak bilinir. Ancak Saturnu sadece bir zorluk kaynagi olarak gormek, onun sundugu derin bilgeligi goz ardi etmek olur.

## Saturn'un Astrolojideki Anlami

Saturn, sorumluluk, disiplin, sinirlar ve olgunluk kavramlarini ogretir. Zodyakta yaklasik 29.5 yilda bir turunu tamamlar ve her burcta ortalama 2.5 yil kadar kalir.

## Saturn'un Burclara Gore Etkileri

**Kocta Saturn:** Birey, kendi kimligini ifade etmekte zorluklar yasayabilir. Liderlik becerilerini olgunlastirmayi ogrenir.

**Bogada Saturn:** Maddi guvenlik ve degerler konusunda dersler icerir. Para ve kaynaklarla iliskiyi duzenlemeyi ogretir.

**Ikizlerde Saturn:** Iletisim ve ogrenme konularinda zorluklar getirebilir. Dusunceleri disiplinli ifade etmeyi ogretir.

**Yenecte Saturn:** Duygusal guvenlik ve aile konularinda dersler icerir. Duygusal olgunlasma on plana cikar.

**Aslanda Saturn:** Yaratıcilik ve ego konularinda sinirlamalar getirebilir. Alcakgonulluluk ve gercek liderlik dersleri sunar.

**Basakta Saturn:** Saglik, is ve hizmet konularinda disiplin gerektirir. Mukemmeliyetcilik dengesi bulunmalidir.

**Terazide Saturn:** Iliskiler ve ortakliklar konusunda dersler icerir. Dengeli iliskiler kurmayi ogrenmek bu konumun temel dersidir.

**Akrep'te Saturn:** Derin donusum ve paylasilan kaynaklar konusunda dersler sunar. Kontrol birakmayi ogrenmek gerekir.

**Yayda Saturn:** Inanc sistemleri ve felsefe konularinda sinirlamalar getirebilir. Inanclari sorgulamayi ogretir.

**Oglakta Saturn:** Saturn bu burcta gucludur. Kariyer, otorite ve uzun vadeli hedefler konusunda dogal bir disiplin sunar. [Oglak burcu](/burclar) hakkinda daha fazla bilgi.

**Kovada Saturn:** Toplumsal sorumluluk ve arkadasliklar konusunda dersler icerir. Kolektif bilinc konusunda olgunlasma saglar.

**Balikta Saturn:** Sinirlar, maneviyat ve fedakarlik konusunda dersler sunar. Gerceklikle hayal dunyasi arasinda denge kurmayi ogretir.

## Saturn Retrosu Donemleri

Saturn retrosu her yil yaklasik 4.5 ay surer. Bu donemde gecmis karmik dersler tekrar gozden gecirilir. [Retro hareketleri](/trend) hakkinda daha fazla bilgi icin trend sayfamiza goz atin.

## Saturn'un Hayatimiza Katkilari

Saturnun getirdigi zorluklar buyumek icin essiz firsatlardir. Disiplin, sorumluluk ve olgunluk gibi degerleri gelistirmemize yardimci olur. Kendi dogum haritanizdaki Saturn konumunu ogrenmek icin [dogum haritasi](/dogum-haritasi) hesaplama aracimizi kullanin.$$,
  'https://picsum.photos/seed/saturn-gezegen/800/400',
  'astroloji',
  'Marifetli Kedi',
  true,
  NOW() - INTERVAL '2 hours'
);
END IF;

-- 3. Cakra ve Burclar
IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'cakra-sistemi-burclar-enerji') THEN
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, category, author_name, published, created_at)
VALUES (
  gen_random_uuid(),
  'Cakra Sistemi ve Burclar: Enerji Merkezlerinizin Astrolojik Baglantisi',
  'cakra-sistemi-burclar-enerji',
  'Yedi ana cakra ile burclar arasindaki mistik baglantiyi kesfedin. Hangi cakranizin hangi burcla iliskili oldugunu ogrenin ve enerji dengeleme yontemleriyle yasam kalitenizi artirin.',
  $$![Cakra ve Burclar](https://picsum.photos/seed/cakra-burc/800/400)

Kadim Hint geleneginden gelen **cakra sistemi** ile astroloji arasinda derin bir baglanti vardir. Yedi ana cakramiz, zodyakta belirli burclar ve gezegenlerle rezonansa girer.

## Kok Cakra ve Oglak Burcu

Kok cakra (Muladhara) omurganin tabaninda bulunur ve hayatta kalma icgudusuyle iliskilidir. **Oglak burcu** ve Saturn ile guclu bir baglantisi vardir.

## Sakral Cakra ve Boga Burcu

Sakral cakra (Svadhisthana) alt karinda yer alir ve yaraticilik, cinsellik ve tutkuyla iliskilidir. **Boga burcu** ve Venuz ile baglantilidir.

## Solar Pleksus Cakrasi ve Aslan Burcu

Solar pleksus (Manipura) guc, irade ve ozguvenle iliskilidir. **Aslan burcu** ve Gunes ile baglantilidir. Aslan burcunun lider ruhu buradan beslenir.

## Kalp Cakrasi ve Terazi

Kalp cakrasi (Anahata) sevgi, sefkat ve dengeyle iliskilidir. **Terazi burcu** ve Venuz ile baglantilidir. [Iliski uyumu](/uyum) Teraziler icin cok onemlidir.

## Bogaz Cakrasi ve Ikizler

Bogaz cakrasi (Vishuddha) iletisim ve kendini ifade etmeyle iliskilidir. **Ikizler burcu** ve Merkur ile baglantilidir.

## Ucuncu Goz Cakrasi ve Akrep - Yay

Ucuncu goz cakrasi (Ajna) sezgi, icgoru ve bilgelikle iliskilidir. **Akrep** ve **Yay** burclari ile baglantilidir.

## Tac Cakrasi ve Balik Burcu

Tac cakrasi (Sahasrara) spiritüel baglanti ve evrensel bilincle iliskilidir. **Balik burcu** ile baglantilidir.

## Cakra Dengeleme Yontemleri

Meditasyon, yoga ve kristal sifa cakralari dengelemek icin kullanilabilir. [Meditasyon ve astroloji](/blog/meditasyon-astroloji-bulusma) yazimizda bu konuyu detayli ele aliyoruz. Ayrica [eglenceli testler](/eglenceli-testler) sayfamizda kendinizi kesfedebilirsiniz.$$,
  'https://picsum.photos/seed/cakra-burc/800/400',
  'kozmik-tavsiyeler',
  'Marifetli Kedi',
  true,
  NOW() - INTERVAL '3 hours'
);
END IF;

-- 4. Uranüs Gezegeni
IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'uranus-gezegeni-degisim-ruzgarlari') THEN
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, category, author_name, published, created_at)
VALUES (
  gen_random_uuid(),
  'Uranüs ve Degisim Ruzgarlari: Beklenmedik Olaylarin Astrolojik Aciklamasi',
  'uranus-gezegeni-degisim-ruzgarlari',
  'Uranüs astrolojide beklenmedik degisimlerin, ozgurlugun ve yeniliklerin gezegenidir. Bu kapsamli rehberde Uranüsün burclar uzerindeki etkilerini ve hayatimiza kattigi surprizleri kesfedin.',
  $$![Uranüs Gezegeni](https://picsum.photos/seed/uranus-gezegen/800/400)

**Uranüs**, astrolojide beklenmedik degisimlerin, devrimlerin ve yeniliklerin gezegenidir. 1781 yilinda kesfedilen bu gezegen, modern dunyanin hizli degisimlerini sembolize eder.

## Uranüs'ün Astrolojik Anlami

Uranüs, bireyselligi, bagimsizligi ve ani degisimleri yoneten bir enerji tasir. Geleneksel kaliplarin disina cikmayi ve ozgurlesmeyi temsil eder. Zodyakta yaklasik 84 yilda bir turunu tamamlar.

## Uranüs'ün Burclara Etkileri

**Kocta Uranüs (2010-2026):** Girisimcilik ve cesur atilimlar on plandadir. [Koc burcu](/burclar) ozellikleriyle uyumlu olan bu konum, cesur yenilikleri tetikler.

**Bogada Uranüs (2018-2026):** Finansal sistemler ve dogal kaynaklar konusunda koklu degisimler yasanir.

**Ikizlerde Uranüs:** Iletisim teknolojileri ve egitim sistemlerinde devrim niteliginde degisimler olur.

## Uranüs Retrosu ve Hayatimiza Etkileri

Uranüs her yil yaklasik 5 ay retro hareket eder. Bu donemlerde icsel ozgurlesme ihtiyaci artar. [Retro donemleri](/trend) hakkinda daha fazla bilgi icin trend sayfamizi ziyaret edin.

## Dogum Haritanizda Uranüs

Dogum haritanizdaki Uranüs konumu, hayatinizin hangi alanlarinda beklenmedik degisimler yasayacaginizi gosterir. [Dogum haritasi](/dogum-haritasi) hesaplama aracimizi kullanarak Uranüs konumunuzu kesfedin.

Siz de degisim ruzgarlarini hayatiniza davet edin ve Uranüsün surprizlerine acik olun.$$,
  'https://picsum.photos/seed/uranus-gezegen/800/400',
  'astroloji',
  'Marifetli Kedi',
  true,
  NOW() - INTERVAL '4 hours'
);
END IF;

-- 5. Neptün ve Sezgiler
IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'neptun-gezegeni-hayaller-sezgiler') THEN
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, category, author_name, published, created_at)
VALUES (
  gen_random_uuid(),
  'Neptün ve Hayaller: Sezgilerin Gucu ve Astrolojideki Yeri',
  'neptun-gezegeni-hayaller-sezgiler',
  'Neptün astrolojide hayallerin, sezgilerin ve spiritüel baglantilarin gezegenidir. Neptünün burclar uzerindeki mistik etkilerini ve sezgisel yeteneklerinizi nasil gelistirebileceginizi kesfedin.',
  $$![Neptün Gezegeni](https://picsum.photos/seed/neptun-gezegen/800/400)

**Neptün**, astrolojinin en mistik gezegenidir. Hayaller, sezgiler ve spiritüel baglantilarla iliskilendirilir. 1846 yilinda kesfedilen Neptün, kolektif bilincaltini temsil eder.

## Neptün'ün Astrolojik Anlami

Neptün, sinirlarin ortadan kalktigi bir enerji tasir. Sanat, muzik, dans ve siir gibi ifade bicimleri Neptünun etkisi altindadir.

## Neptün'ün Burclara Gore Etkileri

**Balikta Neptün:** Neptün kendi evinde gucludur. Sezgisel yetenekler ve spiritüel baglantilar zirve yapar.

**Kovada Neptün:** Kolektif idealler ve toplumsal donusum konularina spiritüel boyut katar.

**Yayda Neptün:** Felsefi arayislara mistik derinlik katar.

## Neptün'ün Sezgisel Yeteneklerle Baglantisi

Neptünun guclu oldugu dogum haritasina sahip kisiler yuksek sezgiye ve empatiye sahiptir. [Empati gucunuzu](/eglenceli-testler/empati-gucu) test edebilirsiniz.

## Neptün'ün Spiritüel Boyutu

Neptün, evrensel bilincle baglanti kurmamiza yardimci olur. Meditasyon ve yoga Neptün enerjisiyle uyumlanmanin etkili yollarindandir. [Meditasyon ve astroloji](/blog/meditasyon-astroloji-bulusma) yazimizi okuyun.

## Dogum Haritanizda Neptün

Dogum haritanizdaki Neptün konumu, spiritüel baglantilarinizi gosterir. [Dogum haritasi](/dogum-haritasi) hesaplama araciyla Neptün konumunuzu ogrenin.$$,
  'https://picsum.photos/seed/neptun-gezegen/800/400',
  'astroloji',
  'Marifetli Kedi',
  true,
  NOW() - INTERVAL '5 hours'
);
END IF;

-- 6. Plüton ve Dönüşüm
IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'pluton-gezegeni-donusum-gucu') THEN
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, category, author_name, published, created_at)
VALUES (
  gen_random_uuid(),
  'Plütonun Dönüstürücü Gücü: Ölüm ve Yeniden Dogum Döngüleri',
  'pluton-gezegeni-donusum-gucu',
  'Plüton astrolojide en derin donusumlerin, guc dinamiklerinin ve yeniden dogumun gezegenidir. Plütonun burclardaki etkisini ve hayatinizdaki donusum firsatlarini kesfedin.',
  $$![Plüton Gezegeni](https://picsum.photos/seed/pluton-gezegen/800/400)

**Plüton**, astrolojinin en derin ve en guclu gezegenidir. Ölüm ve yeniden dogum, guc dinamikleri ve karmik donusumler Plütonun alanina girer. 1930 yilinda kesfedilen Plüton, kolektif ve bireysel donusum sureclerini yoneten bir enerjiye sahiptir.

## Plüton'un Astrolojideki Anlami

Plüton, yuzeyin altinda sakli olani, bastirilmis duygulari ve derin psikolojik kaliplari aciga cikarir. Korkularimizla yuzlesmemizi ve onlari donusturmemizi saglar. Zodyakta yaklasik 248 yilda bir turunu tamamlar.

## Plüton'un Burclara Etkileri

**Akrep'te Plüton:** Plüton Akrebin yoneticisidir ve burada son derece gucludur. Derin psikolojik donusumler, guc mucadeleleri ve yogun duygusal deneyimler yasanir. [Akrep burcu](/burclar) hakkinda daha fazla bilgi.

**Oglak'ta Plüton (2008-2024):** Kurumsal yapilar, hukuk sistemleri ve otoriteyle ilgili koklu degisimler yasanir. Bu donemde toplumsal yapilarda temel donusumler gerceklesir.

**Kova'da Plüton (2024-2044):** Teknoloji, toplumsal yapilar ve kolektif bilinc konularinda donusum yasanir. Insanlik yeni bir caga adim atar.

## Plüton'un Bireysel Hayatimiza Etkileri

Plüton transitleri, genellikle hayatimizda kriz ve donusum donemleri olarak deneyimlenir. Bu donemlerde eski kaliplar yikilir ve yerine yenileri insa edilir. Zorlayici olsa da bu surecler, kisisel gelisimimiz icin essiz firsatlar sunar.

## Karmik Donusum ve Plüton

Plüton, karmik baglantilari ve gecmis yasam derslerini de yoneten bir gezegendir. Dogum haritasindaki Plüton konumu, hangi alanlarda en buyuk karmik donusumleri yasayacagimizi gosterir. [Dogum haritasi](/dogum-haritasi) hesaplama araciyla Plüton konumunuzu ogrenin.

## Plüton Enerjisiyle Calismak

Plüton enerjisiyle calismak icin gecmise gitmek, sakli korkularla yuzlesmek ve bastirilmis duygulari ozgur birakmak gerekir. Meditasyon, terapi ve günlük tutma gibi yontemler Plüton enerjisini dengelemeye yardimci olur. [Eglenceli testler](/eglenceli-testler) sayfamizda kisisel gelisiminize yonelik testleri cozebilirsiniz.

Unutmayin, en karanlik geceler en parlak yildizlari dogurur. Plütonun getirdigi donusumler sizi daha guclu ve bilge bir insan yapacaktir.$$,
  'https://picsum.photos/seed/pluton-gezegen/800/400',
  'astroloji',
  'Marifetli Kedi',
  true,
  NOW() - INTERVAL '6 hours'
);
END IF;

-- 7. Kova Cagi
IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'kova-cagi-yeni-dunya-duzeni') THEN
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, category, author_name, published, created_at)
VALUES (
  gen_random_uuid(),
  'Kova Cagi ve Yeni Dünya Düzeni: Astrolojik Bir Bakis',
  'kova-cagi-yeni-dunya-duzeni',
  'Kova Cagi insanligin kolektif bilinc degisimini temsil eder. Bu kapsamli rehberde Kova Caginin ozelliklerini, getirdigi yenilikleri ve bu donemin ruhsal anlamini kesfedin.',
  $$![Kova Cagi](https://picsum.photos/seed/kova-cagi/800/400)

**Kova Cagi** kavrami, astrolojinin en buyuleyici konularindan biridir. Gezegenimizin yaklasik 26.000 yilda tamamladigi buyuk dongunun bir parcasi olan Kova Cagi, insanligin kolektif bilincinde koklu bir donusumu isaret eder.

## Kova Cagi Nedir?

Astrolojide caglar, Dunyanin eksen hareketi (presesyon) nedeniyle ilkbahar ekinoks noktasinin zodyakta geriye kaymasiyla belirlenir. Her yaklasik 2.160 yilda bir yeni bir caga gireriz. Su anda Balik Cagindan Kova Cagina gecis surecini yasiyoruz.

## Kova Caginin Temel Ozellikleri

Kova burcu ozelliklerinin kolektif duzeyde yansimasi olan bu cag, su temel ozellikleri tasir:

**Teknolojik Ilerleme:** Yapay zeka, uzay kesifleri ve dijital donusum Kova Caginin en belirgin ozelliklerindendir. Insanlik teknolojiyle ic ice bir yasama adim atar.

**Kolektif Bilinc:** Kova Cagi, bireyselligin yani sira kolektif bilincin da onem kazandigi bir donemdir. Insanlar birbirine daha fazla baglanir ve kuresel farkindalik artar.

**Ozgunluk ve Bireysellik:** Kova burcunun en guclu ozelliklerinden biri olan bireysellik, bu cagda zirve yapar. Herkes kendi ozgun yolunu bulmaya tesvik edilir. [Kova burcu](/burclar) hakkinda daha fazla bilgi.

**Insani Degerler:** Esitlik, ozgurluk, adalet ve insan haklari Kova Caginin temel degerleridir. Toplumsal hiyerarsiler yerini daha yatay ve esitlikci yapilara birakir.

## Balik Cagindan Kova Cagina Gecis

Balik Cagi (MS 1 - 2160) inanc, din ve kurumsal otorite cagiydi. Kova Cagina gecis sureci, bu yapilarin cozuldugu ve yerine yenilerinin insa edildigi bir donemdir. Bu gecis genellikle kaotik ve zorludur, ancak sonucu aydinliktir.

## Kova Caginin Spiritüel Boyutu

Spiritüel acidan Kova Cagi, herkesin kendi icsel bilgeligini kesfettigi bir donemdir. Geleneksel dini yapilar yerine kisisel spiritüel deneyimler onem kazanir. Meditasyon, astroloji ve alternatif sifa yontemleri bu cagda daha fazla ilgi gorur.

## Kova Caginda Astrolojinin Yeri

Astroloji, Kova Caginda daha da onem kazanacaktir. Insanlar kendi dogum haritalarini ogrenmek ve yasam amaclarini kesfetmek icin astrolojiye yoneleceklerdir. [Dogum haritasi](/dogum-haritasi) hesaplama araci bu yolculukta size rehberlik edebilir.

## Kova Cagina Hazirlik

Bu yeni caga hazirlanmak icin su adimlari atabilirsiniz:

- **Ozgunlugunuzu kesfedin:** Sizi siz yapan seyleri kesfedin ve onlari kucaklayin.
- **Kolektif bilinc gelistirin:** Toplumsal konulara ilgi gosterin ve cevrenize katkida bulunun.
- **Teknolojiyle barisik olun:** Teknolojiyi bilincli bir sekilde kullanmayi ogrenin.
- **Spiritüel pratikler gelistirin:** Meditasyon ve farkindalik calismalari yapin. [Meditasyon ve astroloji](/blog/meditasyon-astroloji-bulusma) yazimizi okuyun.

Kova Cagi, insanlik icin buyuk bir firsattir. Bireysel ve kolektif olarak daha yuksek bir bilinc seviyesine ulasmak icin bu enerjiyi kullanabiliriz. Siz de bu donusumun bir parcasi olmak icin icsel rehberliginizi dinleyin ve ozgun yaninizi kesfedin.$$,
  'https://picsum.photos/seed/kova-cagi/800/400',
  'kozmik-tavsiyeler',
  'Marifetli Kedi',
  true,
  NOW() - INTERVAL '7 hours'
);
END IF;

-- 8. Gezegenlerin Evlere Yerlesimi
IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'dogum-haritasi-gezegen-evleri') THEN
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, category, author_name, published, created_at)
VALUES (
  gen_random_uuid(),
  'Dogum Haritasinda Gezegenlerin Evlere Yerlesimi',
  'dogum-haritasi-gezegen-evleri',
  'Dogum haritasinda gezegenlerin evlere yerlesimi, hayatin farkli alanlarindaki enerjileri gosterir. Bu kapsamli rehber, 12 evdeki gezegen konumlarinin anlamlarini detayli bir sekilde aciklar.',
  $$![Dogum Haritasi Evler](https://picsum.photos/seed/dogum-haritasi-evler/800/400)

Dogum haritasinda **gezegenlerin evlere yerlesimi**, hayatimizin farkli alanlarindaki enerjileri ve deneyimleri gosterir. Her ev, yasamin belirli bir alanini temsil eder ve bu eve yerlesen gezegenler, o alandaki enerjimizi belirler.

## 1. Ev ve Yükselen Burc

Birinci ev, kisiligin, fiziksel gorunumun ve kendini ifade etme biciminin evidir. Bu evdeki gezegenler, kisiliginizin onemli yonlerini vurgular. [Dogum haritasi](/dogum-haritasi) hesaplama araciyla kendi haritanizi olusturabilirsiniz.

## 2. Ev: Maddi Degerler

Ikinci ev, para, mal mulk, degerler ve ozsaygiyla ilgilidir. Bu evdeki Venüs, maddi konularda sans getirirken, Saturn disiplin ve sorumluluk gerektirir.

## 3. Ev: Iletisim

Ucuncu ev, iletisim, ogrenme, kardesler ve yakin cevreyle iliskileri temsil eder. Merkur burada gucludur ve iletisim yetenegini artirir.

## 4. Ev: Aile ve KOKLER

Dorduncu ev, aile kokenleri, ev yasami ve duygusal guvenligi temsil eder. Ay bu evdeyse guclu bir aile bagini gosterir.

## 5. Ev: Yaraticilik ve Ask

Besinci ev, yaraticilik, romantik iliskiler, cocuklar ve eglenceyi temsil eder. Gunes bu evde yaratici enerjiyi artirir. [Iliski uyumu](/uyum) hakkinda daha fazla bilgi.

## 6. Ev: Saglik ve Hizmet

Altinci ev, saglik, gunluk rutinler ve hizmetle ilgilidir. Basak burcuyla baglantili olan bu ev, detaylara dikkat etmeyi gerektirir.

## 7. Ev: Iliskiler

Yedinci ev, evlilik, ortakliklar ve karsimizdakiyle iliskilerimizi temsil eder. Bu evdeki gezegenler, iliski dinamiklerimizi etkiler.

## 8. Ev: Donusum

Sekizinci ev, olum ve yeniden dogum, ortak kaynaklar ve gizemleri temsil eder. Akrep burcuyla baglantili olan bu ev, derin psikolojik donusumlerin alanidir.

## 9. Ev: Felsefe ve Seyahat

Dokuzuncu ev, yuksek ogrenim, felsefe, hukuk ve seyahati temsil eder. Yay burcuyla baglantili olan bu ev, bilgelik arayisini simgeler.

## 10. Ev: Kariyer

Onuncu ev, kariyer, toplumsal statu ve hayat amacini temsil eder. Oglak burcuyla baglantili olan bu ev, disiplin ve sorumluluk gerektirir.

## 11. Ev: Arkadasliklar

On birinci ev, arkadasliklar, grup etkinlikleri ve idealleri temsil eder. Kova burcuyla baglantili olan bu ev, kolektif enerjiyi yansitir.

## 12. Ev: Bilinçalti

On ikinci ev, bilinçalti, yalnizlik, karma ve spiritüel baglantilari temsil eder. Balik burcuyla baglantili olan bu ev, icsel dunyamizin derinliklerine acilan kapidir.

## Evlerdeki Gezegen Kombinasyonlari

Farkli gezegenlerin farkli evlerdeki kombinasyonlari, dogum haritasinin en detayli bilgilerini verir. Ornegin, Venüs'un 7. evde olmasi mutlu bir evlilige isaret ederken, Mars'in 4. evde olmasi aile icinde gerilimleri gosterebilir. Kendi dogum haritanizi cikarmak icin [dogum haritasi](/dogum-haritasi) sayfamizi ziyaret edin.

Astrolojinin bu derin konusu hakkinda daha fazla bilgi edinmek icin [astrolojide 12 ev](/blog/astrolojide-12-ev-anlami) yazimizi da okuyabilirsiniz.$$,
  'https://picsum.photos/seed/dogum-haritasi-evler/800/400',
  'astroloji',
  'Marifetli Kedi',
  true,
  NOW() - INTERVAL '8 hours'
);
END IF;

-- 9. Karmik Astroloji - Ay Düğümleri
IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'karmik-astroloji-ay-dugumleri') THEN
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, category, author_name, published, created_at)
VALUES (
  gen_random_uuid(),
  'Karmik Astroloji: Güney ve Kuzey Ay Düğümlerinin Anlami',
  'karmik-astroloji-ay-dugumleri',
  'Karmik astroloji, Ay düğümleri araciligiyla gecmis yasam derslerimizi ve gelecege dair potansiyelimizi anlamamiza yardimci olur. Bu rehber, Güney ve Kuzey Ay düğümlerinin burclardaki anlamlarini detayli bir sekilde acikliyor.',
  $$![Karmik Astroloji](https://picsum.photos/seed/karmik-astroloji/800/400)

**Karmik astroloji**, dogum haritamizdaki Ay düğümleri (Rahu ve Ketu) araciligiyla gecmis yasam derslerimizi ve gelecege dair potansiyelimizi kesfetmemizi saglar. Bu iki nokta, ruhsal yolculugumuzun haritasini cikarmamiza yardimci olur.

## Ay Düğümleri Nedir?

Ay düğümleri, Ay'in yorungesinin ekliptigi kestigi noktalardir. Gökbilimsel olarak gercek gezegenler olmasalar da, astrolojide buyuk onem tasirlar. **Kuzey Ay Düğümü (Rahu)** ruhsal olarak ilerlememiz gereken yolu, **Güney Ay Düğümü (Ketu)** ise geride birakmamiz gereken geçmiş yasam aliskanliklarimizi temsil eder.

## Kuzey Ay Düğümünün Burclardaki Anlami

**Koc'ta Kuzey Ay Düğümü:** Bagimsizliginizi ilan etmeniz ve cesur adimlar atmaniz gerekiyor. Kendi yolunuzu bulmali ve liderlik etmeyi ogrenmelisiniz.

**Bogada Kuzey Ay Düğümü:** Kendi degerlerinizi kesfetmeli ve icsel guvenliginizi insa etmelisiniz. Maddi ve duygusal istikrar bulmak bu yasamin amaci.

**Ikizlerde Kuzey Ay Düğümü:** Iletisim becerilerinizi gelistirmeli ve bilgi paylasimina acik olmalisiniz. [Eglenceli testler](/eglenceli-testler) sayfamizda iletisim becerilerinizi test edebilirsiniz.

**Yenecte Kuzey Ay Düğümü:** Duygusal zekanizi gelistirmeli ve ailevi baglariniza onem vermelisiniz.

**Aslanda Kuzey Ay Düğümü:** Yaraticiliginizi ifade etmeli ve kalbinizin sesini dinlemelisiniz.

**Basakta Kuzey Ay Düğümü:** Detaylara dikkat etmeli ve hizmet etmeyi ogrenmelisiniz.

**Terazide Kuzey Ay Düğümü:** Iliskilerde denge kurmayi ve ortaklasa hareket etmeyi ogrenmelisiniz. [Iliski uyumu](/uyum) konusunda daha fazla bilgi.

**Akrep'te Kuzey Ay Düğümü:** Derin donusumleri kucaklamali ve duygusal derinliginizi kesfetmelisiniz.

**Yayda Kuzey Ay Düğümü:** Inanc sisteminizi gelistirmeli ve bilgelik arayisina cikmalisiniz.

**Oglakta Kuzey Ay Düğümü:** Disiplin ve sorumluluk almayi ogrenmeli, uzun vadeli hedefler belirlemelisiniz.

**Kovada Kuzey Ay Düğümü:** Ozgunlugunuzu kesfetmeli ve toplumsal bilinc gelistirmelisiniz.

**Balikta Kuzey Ay Düğümü:** Spiritüel baglantinizi gelistirmeli ve sezginize guvenmelisiniz.

## Güney Ay Düğümü: Geride Birakmamiz Gerekenler

Güney Ay Düğümü, gecmis yasamlardan getirdigimiz aliskanliklari ve bu yasamda birakmamiz gereken kaliplari gosterir. Genellikle konfor alanimizi temsil eder, ancak bu alanda fazla kalmak ruhsal gelisimimizi engeller.

## Ay Düğümleri ve Karmik Iliskiler

Ay düğümleri ayni zamanda karmik iliskileri de gosterir. Birisiyle olan baglantinizda Ay düğümlerinizde guclu acilalar varsa, bu karmik bir iliski oldugunu gosterebilir.

Dogum haritanizdaki Ay düğümlerinin konumunu ogrenmek icin [dogum haritasi](/dogum-haritasi) hesaplama aracimizi kullanabilirsiniz. Ayrica [astrolojide 12 ev](/blog/astrolojide-12-ev-anlami) yazimizi da okuyarak bilginizi derinlestirebilirsiniz.$$,
  'https://picsum.photos/seed/karmik-astroloji/800/400',
  'astroloji',
  'Marifetli Kedi',
  true,
  NOW() - INTERVAL '9 hours'
);
END IF;

-- 10. Kelt Agaci Astrolojisi
IF NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'kelt-agaci-astrolojisi-burclar') THEN
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, category, author_name, published, created_at)
VALUES (
  gen_random_uuid(),
  'Kelt Agaci Astrolojisi: Dogum Tarihine Gore Kelt Burclari',
  'kelt-agaci-astrolojisi-burclar',
  'Kelt Agaci Astrolojisi, Kelt kültürünün dogayla ic ice gecen kadim bilgeligini yansitir. Bu rehberde dogum tarihinize gore hangi Kelt agaci burcuna ait oldugunuzu ve bu agacin karakteristik ozelliklerini kesfedin.',
  $$![Kelt Agaci Astrolojisi](https://picsum.photos/seed/kelt-agaci/800/400)

**Kelt Agaci Astrolojisi**, eski Kelt rahipleri olan Druidlerin dogayi ve agaclari kutsal kabul eden kadim bilgelik sistemidir. Diger astroloji sistemlerinden farkli olarak, Kelt astrolojisi belirli tarih araliklarina gore 21 farkli agac burcu kullanir.

## Kelt Agaci Burclari ve Tarihleri

Her Kelt agaci burcu, belirli bir tarih araligina ve o agacin sembolik ozelliklerine dayanir. Iste en onemli Kelt agaci burclari:

**Hanimeli (21-31 Aralik):** Maceraperest, iyimser ve merakli kisilerdir. Degisime kolay uyum saglarlar.

**Sedir Agaci (1-11 Ocak):** Guclu, guvenilir ve bagimsiz karakterlerdir. Liderlik ozellikleri belirgindir. [Oglak burcuyla](/burclar) benzer ozellikler tasirlar.

**Karaagac (12-24 Ocak):** Zarif, yaratici ve idealist kisilerdir. Sanata ve guzellige duskundurler.

**Selvi Agaci (25 Ocak - 3 Subat):** Sadik, pratik ve disiplinli karakterlerdir. Planli ve duzenli bir yasami tercih ederler.

**Kavak Agaci (4-8 Subat):** Sezgisel, duygusal ve korumaci kisilerdir. Aile baglari gucludur.

**Cinar Agaci (9-18 Subat):** Entelektüel, analitik ve mantikli karakterlerdir. [Kova burcuyla](/burclar) benzer ozellikler gosterirler.

**Cam Agaci (19-28 Subat):** Guclu, kararli ve lider ruhlu kisilerdir. Zorluklar karsisinda yilmazlar.

**Findik Agaci (1-10 Mart):** Bilge, sabirli ve yardimsever karakterlerdir. Adalet duygusu gelismistir.

**Sogut Agaci (11-20 Mart):** Yaratıcı, sezgisel ve duygusal kisilerdir. [Balik burcuyla](/burclar) paralel ozellikler tasirlar.

**Elma Agaci (21-30 Mart):** Enerjik, karizmatik ve lider ruhlu karakterlerdir. Ilkbaharin enerjisini yansitirlar. [Koc burcu](/burclar) ile benzerdir.

**Akcaagac (31 Mart - 10 Nisan):** Orijinal, yaratıcı ve bagimsiz kisilerdir. Farkli olmaktan korkmazlar.

**Ceviz Agaci (11-20 Nisan):** Tutkulu, kararli ve hirsli karakterlerdir. [Boga burcu](/burclar) enerjisi tasirlar.

**Atkestanesi (21-30 Nisan):** Guclu, korumaci ve guvenilir kisilerdir. Ailesine baglidir.

**Disbudak Agaci (1-14 Mayis):** Cekici, yaratici ve diplomatik karakterlerdir. Insan iliskilerinde basarilidirlar.

**Erguvan Agaci (3-10 Haziran):** Duygusal, sezgisel ve spiritüel kisilerdir. [Ikizler burcuyla](/burclar) benzerlik gosterir.

**Meh Palamudu (11-20 Temmuz):** Cesur, lider ruhlu ve karizmatik karakterlerdir. [Aslan burcu](/burclar) enerjisi tasirlar.

**Kusburnu (21-31 Temmuz):** Atilgan, enerjik ve rekabetci kisilerdir.

**Defne Agaci (1-11 Agustos):** Bilge, sabirli ve olgun karakterlerdir. Adalet duygusu gelismistir.

## Kelt Astrolojisinde Agaclarin Anlami

Her Kelt agaci, farkli bir enerji ve bilgelik tasir. Druidler, agaclarin insan karakterini ve kaderini etkiledigine inanirlardi. Kelt astrolojisinde agaclar ayrica sifa ve koruma amaciyla da kullanilirdi.

## Kelt Astrolojisi ve Modern Astroloji

Kelt astrolojisi, modern astrolojiden farkli bir sistem kullanir. Ancak her iki sistem de dogal donguler ve kozmik enerjilerle calisir. Kelt agaci burcunuzu kesfetmek icin dogum tarihinize gore hangi agaca denk geldiginizi ogrenebilirsiniz.

Siz de bu kadim bilgelik sistemini kesfetmek isterseniz, [dogum haritasi](/dogum-haritasi) sayfamizda kendi astrolojik profilinizi olusturabilirsiniz. Ayrica [eglenceli testler](/eglenceli-testler) sayfamizda kisisel ozelliklerinizi kesfetmeye devam edebilirsiniz.$$,
  'https://picsum.photos/seed/kelt-agaci/800/400',
  'kozmik-tavsiyeler',
  'Marifetli Kedi',
  true,
  NOW() - INTERVAL '10 hours'
);
END IF;

END $$;
