"use client";

import { useState } from "react";
import Link from "next/link";

type Period = "gunluk" | "haftalik" | "aylik" | "yillik";

const PERIOD_LABELS: Record<Period, string> = {
  gunluk: "Günlük",
  haftalik: "Haftalık",
  aylik: "Aylık",
  yillik: "Yıllık",
};

const PERIOD_ICONS: Record<Period, string> = {
  gunluk: "today",
  haftalik: "date_range",
  aylik: "calendar_month",
  yillik: "calendar_view_month",
};

const WEEKLY: Record<string, string> = {
  Koç: "Bu hafta Mars enerjiniz zirvede. Hafta başında yeni bir projeye başlamak için ideal. Çarşamba günü iletişim gezegeninizin desteğiyle önemli bir görüşme bekleyebilirsiniz. Hafta sonuna doğru finansal konularda sezgilerinize güvenin.",
  Boğa: "Venüs'ün etkisiyle ilişkilerinizde uyumlu bir hafta sizi bekliyor. Salı günü iş hayatında beklenmedik bir fırsatla karşılaşabilirsiniz. Perşembe ailevi konular gündeme gelebilir. Hafta sonu sanatsal aktiviteler için harika bir zaman.",
  İkizler: "Merkür'ün hızlı enerjisiyle zihinsel olarak çok üretken bir hafta olacak. Pazartesi yeni bir öğrenme fırsatı kapınızı çalabilir. Çarşamba sosyal çevrenizde önemli bir buluşma var. Hafta sonunu seyahat planları yaparak değerlendirin.",
  Yengeç: "Duygusal olarak derin bir haftaya merhaba deyin. Ay'ın konumu sayesinde sezgileriniz oldukça güçlü olacak. Çarşamba aile büyüklerinizle anlamlı bir konuşma yapabilirsiniz. Cuma günü ev dekorasyonu gibi yaratıcı projelere yönelebilirsiniz.",
  Aslan: "Güneş'in aydınlatıcı enerjisiyle haftaya güçlü başlıyorsunuz. Salı günü yeteneklerinizi sergilemek için bir fırsat yakalayabilirsiniz. Perşembe romantik ilişkilerde sürpriz bir gelişme olabilir. Hafta sonu arkadaşlarınızla keyifli bir etkinlik planlayın.",
  Başak: "Detaylara odaklanma zamanı! Pazartesi iş hayatında önemli bir projeyi tamamlayabilirsiniz. Çarşamba sağlık rutinlerinizde bir değişiklik yapmak için ideal. Cuma günü beklenmedik bir misafir gelebilir. Hafta sonunu dinlenmeye ayırın.",
  Terazi: "Denge ve uyum arayışında bir hafta. Salı günü ikili ilişkilerde önemli bir karar almanız gerekebilir. Perşembe sanatsal bir etkinlikte ilham bulabilirsiniz. Cuma günü adalet duygunuz ön plana çıkacak. Hafta sonu doğa yürüyüşü yapın.",
  Akrep: "Dönüşüm haftası! Pazartesi gizli kalmış bir gerçekle yüzleşebilirsiniz. Çarşamba finansal bir konuda flaş bir gelişme olabilir. Cuma günü derin meditasyon için harika bir zaman. Hafta sonu gizemli bir kitapla baş başa kalın.",
  Yay: "Macera çağrısı alıyorsunuz! Salı günü yeni bir kültür veya felsefe ile tanışabilirsiniz. Perşembe iş seyahati planları gündeme gelebilir. Cuma günü iyimser enerjiniz çevrenizdekileri etkileyecek. Hafta sonu doğa ile iç içe olun.",
  Oğlak: "Disiplinli ilerleme haftası. Pazartesi kariyerinizde önemli bir adım atabilirsiniz. Çarşamba uzun vadeli planlar yapmak için ideal. Cuma günü sorumluluklarınız artsa da başarı sizi bekliyor. Hafta sonu ailenizle vakit geçirin.",
  Kova: "Yenilik rüzgarları esiyor! Salı günü teknoloji veya inovasyon alanında ilham verici bir keşif yapabilirsiniz. Perşembe sosyal çevrenizde sürpriz bir tanışma olabilir. Cuma günü arkadaşlarınızla yaratıcı projeler üzerinde çalışın.",
  Balık: "Hayal gücünüzün sınırlarını keşfetme haftası. Pazartesi sanatsal bir projeye başlamak için ilham alabilirsiniz. Çarşamba manevi bir farkındalık yaşayabilirsiniz. Cuma günü empati yeteneğiniz sayesinde bir dostunuza destek olun.",
};

const MONTHLY: Record<string, string> = {
  Koç: "Bu ay kariyer ve kişisel gelişim odaklı. Ayın ilk haftası Mars'ın desteğiyle agresif bir başlangıç yapabilirsiniz. Ortalarında Venüs'ün etkisiyle ilişkiler yumuşayacak. Ay sonu Jüpiter sayesinde maddi bir sürpriz yaşayabilirsiniz. Önemli kararlar için ayın 15'inden sonrasını bekleyin.",
  Boğa: "Finansal fırsatlar ayı. Ay başında Satürn'ün disipliniyle bütçe planlaması yapmak için ideal zaman. Ay ortalarında Venüs'ün etkisiyle romantik bir sürpriz yaşanabilir. Ay sonuna doğru yeni bir hobi edinmek isteyebilirsiniz. Sağlık rutininize dikkat edin.",
  İkizler: "Sosyal bağlantılar ayı. Ayın başında Merkür'ün etkisiyle önemli bir görüşme gerçekleşebilir. Ortalarında seyahat planları yapmak için harika bir dönem. Ay sonu yeni bir öğrenme fırsatı kapınızı çalabilir. İletişim yetenekleriniz bu ay zirvede.",
  Yengeç: "Duygusal keşifler ayı. Ay başında ailevi konular gündeminizi meşgul edebilir. Ay ortalarında Ay'ın konumu sayesinde sezgileriniz oldukça güçlü olacak. Ay sonu ev dekorasyonu veya taşınma gibi fiziksel değişiklikler gündeme gelebilir.",
  Aslan: "Yaratıcılık ayı. Ayın başında Güneş'in enerjisiyle yeni bir projeye imza atabilirsiniz. Ortalarında bir davet veya sosyal etkinlik ön plana çıkabilir. Ay sonu romantik ilişkilerde önemli bir adım atabilirsiniz. Kalbinizi dinleyin.",
  Başak: "Düzen ve sağlık ayı. Ay başında iş hayatınızda bir düzenleme yapmak için ideal. Ay ortalarında Merkür'ün detaycı etkisiyle önemli bir belgeyi imzalayabilirsiniz. Ay sonu beslenme alışkanlıklarınızı gözden geçirin. Küçük değişiklikler büyük fark yaratır.",
  Terazi: "İlişkiler ayı. Ay başında Venüs'ün etkisiyle romantik bir başlangıç yapabilirsiniz. Ay ortalarında iş ortaklıklarında denge kurma zamanı. Ay sonu adalet duygunuz sayesinde bir anlaşmazlığı çözebilirsiniz. Sosyal aktivitelere zaman ayırın.",
  Akrep: "Dönüşüm ayı. Ay başında Plüton'un etkisiyle derin bir içsel yolculuğa çıkabilirsiniz. Ay ortalarında finansal bir konuda gizli bir detayı keşfedebilirsiniz. Ay sonu güçlü sezgileriniz sayesinde doğru kararlar alacaksınız.",
  Yay: "Keşif ayı. Ay başında Jüpiter'in genişletici etkisiyle yeni bir maceraya atılabilirsiniz. Ay ortalarında bir eğitim veya seminer fırsatı doğabilir. Ay sonu felsefi düşüncelere dalıp hayatınızı sorgulayabilirsiniz.",
  Oğlak: "Kariyer odağı. Ay başında Satürn'ün disipliniyle kariyer hedeflerinize odaklanın. Ay ortalarında iş yerinde bir terfi veya sorumluluk artışı bekleyebilirsiniz. Ay sonu özel hayatınızda denge kurma zamanı. Başarı yolunda emin adımlarla ilerliyorsunuz.",
  Kova: "Yenilik ayı. Ay başında Uranüs'ün sürpriz enerjisiyle beklenmedik bir gelişme yaşayabilirsiniz. Ay ortalarında yeni bir teknoloji veya uygulama hayatınızı kolaylaştırabilir. Ay sonu arkadaş grubunuzda bir değişiklik olabilir.",
  Balık: "Ruhsal keşif ayı. Ay başında Neptün'ün etkisiyle yaratıcı ilhamlar alabilirsiniz. Ay ortalarında bir meditasyon veya yoga deneyimi derin bir farkındalık getirebilir. Ay sonu hayallerinizin peşinden gitmek için cesaret bulacaksınız.",
};

const YEARLY: Record<string, string> = {
  Koç: "Bu yıl, cesaret ve girişimcilik yılı. Jüpiter'in Koç burcundaki geçişi size büyük fırsatlar sunuyor. Yılın ilk yarısında kariyer odaklı ilerleyin, ikinci yarıda ilişkilere odaklanın. Satürn'ün etkisiyle uzun vadeli planlar yapmak için ideal bir yıl. Yaz aylarında bir seyahat ufkunuzu genişletecek.",
  Boğa: "Bolluk ve bereket yılı. Bu yıl maddi konularda şanslı bir döneme giriyorsunuz. Venüs'ün etkisiyle yılın ilk yarısı romantik ilişkilerde hareketli geçecek. Sonbaharda kariyerinizde önemli bir adım atabilirsiniz. Sağlık rutininize bu yıl özellikle dikkat edin.",
  İkizler: "Öğrenme ve keşif yılı. Merkür'ün hızlı enerjisiyle bu yıl yeni bir dil veya beceri öğrenebilirsiniz. İlkbaharda seyahat fırsatları doğacak. Yaz aylarında sosyal çevreniz genişleyecek. Yıl sonu finansal konularda doğru kararlar almanızı sağlayacak bir içgörü kazanacaksınız.",
  Yengeç: "Aile ve duygusal büyüme yılı. Bu yıl ailevi konular ön planda olacak. Ay'ın konumu sayesinde sezgileriniz güçlenecek. İlkbaharda evle ilgili bir değişiklik gündeme gelebilir. Yaz aylarında yaratıcı projelere yönelecek, sonbaharda kariyerinizde ilerleme kaydedeceksiniz.",
  Aslan: "Parlama yılı! Güneş'in enerjisiyle bu yıl sahnede olma zamanı. Yılın ilk yarısı kariyer odaklı geçecek, ikinci yarısı ise romantik ilişkilerde hareketli. Yaz aylarında yaratıcı bir projeye imza atabilirsiniz. Yıl boyunca liderlik yetenekleriniz ön plana çıkacak.",
  Başak: "Düzen ve sağlık yılı. Bu yıl sağlık rutinlerinizi düzene sokmak için ideal. İlkbaharda iş hayatınızda bir düzenleme yapabilirsiniz. Merkür'ün etkisiyle yaz aylarında önemli bir anlaşma yapabilirsiniz. Sonbahar detoks ve yenilenme için harika bir zaman.",
  Terazi: "Denge ve uyum yılı. Bu yıl ilişkilerinizde dengeyi bulma zamanı. Venüs'ün etkisiyle yılın ilk yarısı romantik açıdan oldukça verimli. Yaz aylarında bir sanat projesi veya yaratıcı bir hobi edinebilirsiniz. Sonbaharda iş ortaklıklarında önemli adımlar atacaksınız.",
  Akrep: "Dönüşüm yılı. Bu yıl hayatınızın birçok alanında derin dönüşümler yaşayacaksınız. Plüton'un etkisiyle ilkbaharda gizli kalmış bir gerçek ortaya çıkabilir. Yaz aylarında finansal konularda bir yenilik yapacaksınız. Yıl sonu güçlü sezgileriniz sayesinde doğru yolda olduğunuzu hissedeceksiniz.",
  Yay: "Büyüme ve keşif yılı. Jüpiter'in bolluk enerjisiyle yeni ufuklara yelken açıyorsunuz. İlkbaharda bir eğitim veya seyahat fırsatı doğacak. Yaz aylarında kariyerinizde yükselme şansı yakalayabilirsiniz. Sonbahar felsefi sorgulamalar ve içsel büyüme için ideal.",
  Oğlak: "Başarı yılı. Satürn'ün disipliniyle kariyer hedeflerinize emin adımlarla ilerliyorsunuz. Yılın ilk yarısı yoğun çalışma gerektirecek, ancak yaz aylarında meyvelerini toplamaya başlayacaksınız. Sonbaharda bir terfi veya yeni bir iş teklifi alabilirsiniz. Ailenizle kaliteli zaman geçirmeyi unutmayın.",
  Kova: "Yenilik ve özgürlük yılı. Uranüs'ün etkisiyle bu yıl hayatınızda beklenmedik değişimler olabilir. İlkbaharda teknoloji alanında bir girişim başlatabilirsiniz. Yaz aylarında sosyal çevrenizde önemli tanışıklıklar edineceksiniz. Sonbahar özgün fikirlerinizi hayata geçirmek için ideal.",
  Balık: "Ruhsal ve yaratıcı yıl. Neptün'ün ilham verici enerjisiyle sanatsal yetenekleriniz zirve yapacak. İlkbaharda bir sanat projesi veya yaratıcı bir işe başlayabilirsiniz. Yaz aylarında manevi bir yolculuğa çıkabilirsiniz. Sonbaharda empati yeteneğiniz sayesinde bir ilişkide köprüler kurabilirsiniz.",
};

const SCORE_DATA: Record<Period, Record<string, { ask: number; kariyer: number; saglik: number }>> = {
  gunluk: {
    Koç: { ask: 72, kariyer: 85, saglik: 68 },
    Boğa: { ask: 88, kariyer: 65, saglik: 70 },
    İkizler: { ask: 60, kariyer: 78, saglik: 82 },
    Yengeç: { ask: 90, kariyer: 55, saglik: 75 },
    Aslan: { ask: 85, kariyer: 80, saglik: 65 },
    Başak: { ask: 45, kariyer: 92, saglik: 88 },
    Terazi: { ask: 78, kariyer: 70, saglik: 72 },
    Akrep: { ask: 82, kariyer: 75, saglik: 60 },
    Yay: { ask: 65, kariyer: 60, saglik: 85 },
    Oğlak: { ask: 50, kariyer: 95, saglik: 78 },
    Kova: { ask: 70, kariyer: 72, saglik: 80 },
    Balık: { ask: 95, kariyer: 48, saglik: 62 },
  },
  haftalik: {
    Koç: { ask: 68, kariyer: 82, saglik: 72 },
    Boğa: { ask: 85, kariyer: 60, saglik: 75 },
    İkizler: { ask: 65, kariyer: 75, saglik: 80 },
    Yengeç: { ask: 88, kariyer: 58, saglik: 70 },
    Aslan: { ask: 80, kariyer: 78, saglik: 68 },
    Başak: { ask: 50, kariyer: 90, saglik: 85 },
    Terazi: { ask: 82, kariyer: 65, saglik: 70 },
    Akrep: { ask: 78, kariyer: 72, saglik: 65 },
    Yay: { ask: 60, kariyer: 65, saglik: 82 },
    Oğlak: { ask: 55, kariyer: 92, saglik: 75 },
    Kova: { ask: 72, kariyer: 70, saglik: 78 },
    Balık: { ask: 92, kariyer: 52, saglik: 60 },
  },
  aylik: {
    Koç: { ask: 65, kariyer: 88, saglik: 70 },
    Boğa: { ask: 82, kariyer: 68, saglik: 72 },
    İkizler: { ask: 62, kariyer: 72, saglik: 78 },
    Yengeç: { ask: 85, kariyer: 60, saglik: 72 },
    Aslan: { ask: 78, kariyer: 82, saglik: 65 },
    Başak: { ask: 48, kariyer: 88, saglik: 82 },
    Terazi: { ask: 80, kariyer: 68, saglik: 68 },
    Akrep: { ask: 75, kariyer: 78, saglik: 62 },
    Yay: { ask: 62, kariyer: 62, saglik: 80 },
    Oğlak: { ask: 52, kariyer: 90, saglik: 72 },
    Kova: { ask: 68, kariyer: 75, saglik: 75 },
    Balık: { ask: 90, kariyer: 55, saglik: 58 },
  },
  yillik: {
    Koç: { ask: 70, kariyer: 85, saglik: 72 },
    Boğa: { ask: 80, kariyer: 72, saglik: 75 },
    İkizler: { ask: 65, kariyer: 70, saglik: 80 },
    Yengeç: { ask: 85, kariyer: 62, saglik: 70 },
    Aslan: { ask: 82, kariyer: 85, saglik: 68 },
    Başak: { ask: 55, kariyer: 85, saglik: 85 },
    Terazi: { ask: 78, kariyer: 72, saglik: 72 },
    Akrep: { ask: 80, kariyer: 75, saglik: 65 },
    Yay: { ask: 65, kariyer: 68, saglik: 82 },
    Oğlak: { ask: 55, kariyer: 92, saglik: 78 },
    Kova: { ask: 72, kariyer: 78, saglik: 78 },
    Balık: { ask: 88, kariyer: 58, saglik: 62 },
  },
};

export default function KozmikTakvim({
  sign,
  dailyProphecy,
  luckyColor,
  luckyStone,
  luckyActivity,
}: {
  sign: string;
  dailyProphecy: string;
  luckyColor: string;
  luckyStone: string;
  luckyActivity: string;
}) {
  const [period, setPeriod] = useState<Period>("gunluk");

  const prophecyText =
    period === "gunluk" ? dailyProphecy :
    period === "haftalik" ? WEEKLY[sign] || dailyProphecy :
    period === "aylik" ? MONTHLY[sign] || dailyProphecy :
    YEARLY[sign] || dailyProphecy;

  const scores = SCORE_DATA[period]?.[sign] || { ask: 50, kariyer: 50, saglik: 50 };

  return (
    <section className="mb-section-gap">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-headline-lg font-headline-lg text-primary">Kozmik Takvim</h3>
        <div className="flex p-1 bg-surface-container rounded-2xl border border-white/5">
          {(Object.keys(PERIOD_LABELS) as Period[]).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 md:px-6 py-2 rounded-xl text-label-md font-label-md flex items-center gap-1.5 transition-all ${
                period === p
                  ? "bg-primary text-on-primary shadow-lg"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}>
              <span className="material-symbols-outlined text-[16px]">{PERIOD_ICONS[p]}</span>
              <span className="hidden sm:inline">{PERIOD_LABELS[p]}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-headline-md font-headline-md text-tertiary">{PERIOD_LABELS[period]} Kehanet</span>
            <span className="text-caption font-label-md opacity-60 text-outline">
              {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
          <p className="text-body-lg font-body-lg text-on-surface-variant italic leading-relaxed">
            &ldquo;{prophecyText}&rdquo;
          </p>
          <div className="flex gap-4 pt-4">
            {[
              { label: "Aşk", value: scores.ask, color: "secondary" },
              { label: "Kariyer", value: scores.kariyer, color: "primary" },
              { label: "Sağlık", value: scores.saglik, color: "tertiary" },
            ].map(s => (
              <div key={s.label} className="flex-1 p-4 bg-surface-container rounded-2xl text-center">
                <p className="text-caption font-label-md uppercase text-on-surface-variant mb-1">{s.label}</p>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full bg-${s.color} rounded-full`} style={{ width: `${s.value}%` }} />
                </div>
                <span className={`text-label-md font-label-md mt-2 inline-block text-${s.color}`}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <h4 className="text-headline-md font-headline-md text-primary mb-6">Şanslı Ritüeller</h4>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface">palette</span>
                </div>
                <div>
                  <p className="text-caption font-label-md text-on-surface-variant">Uğurlu Renk</p>
                  <p className="text-label-md font-label-md text-on-surface">{luckyColor}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface">diamond</span>
                </div>
                <div>
                  <p className="text-caption font-label-md text-on-surface-variant">Değerli Taş</p>
                  <p className="text-label-md font-label-md text-on-surface">{luckyStone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface">self_improvement</span>
                </div>
                <div>
                  <p className="text-caption font-label-md text-on-surface-variant">Günün Aktivitesi</p>
                  <p className="text-label-md font-label-md text-on-surface">{luckyActivity}</p>
                </div>
              </div>
            </div>
          </div>
          <Link href="/burclar"
            className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/10 text-primary font-label-md flex items-center justify-center gap-2 hover:from-primary/30 hover:to-secondary/30 transition-all">
            <span>Tüm Burçları Keşfet</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
