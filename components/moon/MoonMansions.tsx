"use client";

import { useMemo, useState } from "react";
import { moonLongitude } from "./moon-position";

export const MANSION_DEG = 360 / 28;

export interface MansionInfo {
  name: string;
  note: string;
  good: string;
  caution: string;
}

// Klasik menazilü'l-kamer (28 ay durağı), tropikal zodyaktan 0° Koç'tan başlar.
export const MANSIONS: MansionInfo[] = [
  { name: "Şartayn", note: "Ay döngüsünün ilk durağı; yeni başlangıçlar için tohum günü.", good: "Niyet belirleme", caution: "Acele karar" },
  { name: "Butayn", note: "Sabır ve sebat enerjisi; planları sağlamlaştırma günü.", good: "Planlama", caution: "İnatlaşma" },
  { name: "Süreyya", note: "Parlaklık ve görünürlük; yetenekleri sergileme günü.", good: "Sunum, sahne", caution: "Gösteriş" },
  { name: "Deberan", note: "Kararlılık ve takip günü; yarım işleri bitirme zamanı.", good: "Tamamlama", caution: "Tartışma" },
  { name: "Haka", note: "İnce işler ve detaylar; dikkat gerektiren konulara eğilme günü.", good: "Detay işleri", caution: "Dağınıklık" },
  { name: "Hena", note: "Merhamet ve şefkat; sevdiklerle bağ kurma günü.", good: "Aile, vefa", caution: "Alınganlık" },
  { name: "Zira", note: "Ölçü ve denge; harcamaları ve sözleri tartma günü.", good: "Bütçe, söz", caution: "Savurganlık" },
  { name: "Nesre", note: "Koruma ve sığınma; güvenli limanlara çekilme günü.", good: "Dinlenme", caution: "Kapanma" },
  { name: "Tarf", note: "Bakış açısı değişimi; olaylara başka gözle bakma günü.", good: "Değerlendirme", caution: "Önyargı" },
  { name: "Cebhe", note: "Alın teri ve emek; çalışmanın karşılığını alma günü.", good: "Emek, üretim", caution: "Tükenmişlik" },
  { name: "Zübre", note: "Güzellik ve süs; çevre düzenlemesi ve estetik günü.", good: "Dekorasyon", caution: "Yüzeysellik" },
  { name: "Sarfe", note: "Dönüşüm eşiği; eskiyi bırakıp yeniye hazırlanma günü.", good: "Bırakma", caution: "Tutunma" },
  { name: "Avva", note: "Sığınma ve dua; içe dönüş ve sükûnet günü.", good: "Meditasyon", caution: "Karamsarlık" },
  { name: "Simak", note: "Yükseliş ve itibar; emeklerin görünür olduğu gün.", good: "Takdir", caution: "Kibir" },
  { name: "Gafr", note: "Bağışlama ve affetme; yükleri hafifletme günü.", good: "Affetme", caution: "Kırgınlık" },
  { name: "Zübana", note: "Denge arayışı; terazinin kefelerini eşitleme günü.", good: "Uzlaşma", caution: "Kararsızlık" },
  { name: "İklil", note: "Taçlanma ve kutlama; başarıları onurlandırma günü.", good: "Kutlama", caution: "Abartı" },
  { name: "Kalb", note: "Kalbin sesi; sezgilere kulak verme günü.", good: "Sezgi", caution: "Kuşku" },
  { name: "Şevle", note: "Yükselen enerji; cesaret isteyen adımlar günü.", good: "Cesaret", caution: "Fevrilik" },
  { name: "Naim", note: "Nimet ve şükür; eldekilerin kıymetini bilme günü.", good: "Şükür", caution: "Tatminsizlik" },
  { name: "Belde", note: "Yerleşme ve köklenme; düzen kurma günü.", good: "Düzen", caution: "Durgunluk" },
  { name: "Zâbih", note: "Feda ve adanmışlık; emek isteyen başlangıçlar günü.", good: "Adanmışlık", caution: "Fazla yüklenme" },
  { name: "Bula", note: "Yutma ve sindirme; bilgi ve deneyimi hazmetme günü.", good: "Öğrenme", caution: "Bilgi kirliliği" },
  { name: "Suud", note: "Uğur ve bereket; şans getiren girişimler günü.", good: "Girişim", caution: "Rehavet" },
  { name: "Ahbiye", note: "Gizlenme ve saklanma; planları olgunlaştırma günü.", good: "Hazırlık", caution: "Gizlilik" },
  { name: "Mukdim", note: "Öncülük ve ilk adım; öne çıkma günü.", good: "Liderlik", caution: "Bencillik" },
  { name: "Muahhar", note: "Tamamlama ve sonuç; döngüyü kapatma günü.", good: "Sonuçlandırma", caution: "Erteleme" },
  { name: "Reşa", note: "Derin sular ve sırlar; bilinçaltı çalışmaları günü.", good: "Rüya, içgörü", caution: "Korku" },
];

const SIGNS_TR = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];
const MONTHS_TR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const YEARS = [2026, 2027, 2028, 2029];

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/** TR saati (UTC+3, sabit) ile Date üretir. */
function trDate(y: number, m: number, d: number, h = 0, min = 0): Date {
  return new Date(Date.UTC(y, m, d, h - 3, min));
}

function mansionIndex(lon: number): number {
  return Math.floor((((lon % 360) + 360) % 360) / MANSION_DEG) % 28;
}

function fmtDeg(lon: number): string {
  const l = ((lon % 360) + 360) % 360;
  const deg = Math.floor(l % 30);
  const min = Math.floor(((l % 30) - deg) * 60);
  return `${SIGNS_TR[Math.floor(l / 30)]} ${deg}°${pad(min)}'`;
}

function fmtWithin(lon: number): string {
  const l = ((lon % 360) + 360) % 360;
  const w = l - Math.floor(l / MANSION_DEG) * MANSION_DEG;
  const deg = Math.floor(w);
  const min = Math.floor((w - deg) * 60);
  return `${deg}°${pad(min)}'`;
}

interface Transition {
  time: string;
  to: number;
}

interface DayRow {
  day: number;
  noonIdx: number;
  noonLon: number;
  transitions: Transition[];
}

function computeDay(y: number, m: number, day: number): DayRow {
  const noonLon = moonLongitude(trDate(y, m, day, 12, 0));
  const noonIdx = mansionIndex(noonLon);
  // Gün içi geçişleri bul: saatlik tara, kesişince dakikaya in
  const transitions: Transition[] = [];
  let prevT = 0;
  let prevIdx = mansionIndex(moonLongitude(trDate(y, m, day, 0, 0)));
  for (let h = 1; h <= 24; h++) {
    const t = h * 60;
    const idx = mansionIndex(moonLongitude(trDate(y, m, day, 0, t)));
    if (idx !== prevIdx) {
      // ikiye bölerek dakikayı bul
      let lo = prevT, hi = t, loIdx = prevIdx;
      for (let k = 0; k < 8; k++) {
        const mid = Math.floor((lo + hi) / 2);
        const midIdx = mansionIndex(moonLongitude(trDate(y, m, day, 0, mid)));
        if (midIdx === loIdx) lo = mid;
        else hi = mid;
      }
      transitions.push({ time: `${pad(Math.floor(hi / 60))}:${pad(hi % 60)}`, to: idx });
      prevIdx = idx;
    }
    prevT = t;
  }
  return { day, noonIdx, noonLon, transitions };
}

function trToday(): { y: number; m: number; d: number } {
  const t = new Date(Date.now() + 3 * 3600000);
  return { y: t.getUTCFullYear(), m: t.getUTCMonth(), d: t.getUTCDate() };
}

export default function MoonMansions() {
  const initial = trToday();
  const [year, setYear] = useState(() => Math.min(2029, Math.max(2026, initial.y)));
  const [month, setMonth] = useState(() => initial.m);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rows = useMemo(() => {
    const out: DayRow[] = [];
    for (let d = 1; d <= daysInMonth; d++) out.push(computeDay(year, month, d));
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  const today = trToday();
  const isTodayRow = (d: number) => today.y === year && today.m === month && today.d === d;

  const goToday = () => {
    const t = trToday();
    setYear(Math.min(2029, Math.max(2026, t.y)));
    setMonth(t.m);
  };

  return (
    <div>
      {/* Üst kısım: başlık + yıl butonları */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
        <div>
          <p className="text-caption font-label-md tracking-[0.25em] text-tertiary mb-2">AY DURAKLARI</p>
          <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-on-surface font-bold">
            Ay Takvimi
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-2xl mt-3">
            2026-2029 arasında her günün öğle saatindeki Ay durağı, gün içi geçiş saatleri ve kısa günlük kullanım notları.
          </p>
        </div>
        <div className="flex gap-2 shrink-0" role="group" aria-label="Yıl seçimi">
          {YEARS.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              aria-pressed={year === y}
              className={`px-5 py-2.5 rounded-xl font-label-md transition-all cursor-pointer ${
                year === y
                  ? "cta-glow text-on-primary font-bold"
                  : "glass text-on-surface-variant hover:text-on-surface border border-on-surface/10"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Kontrol alanı */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button
          onClick={goToday}
          className="px-6 py-2.5 rounded-xl glass text-on-surface font-label-md border border-primary/30 hover:border-primary/60 hover:-translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-sm">today</span>
          Bugün
        </button>
        <span className="text-caption text-outline">2026 - 2029 - TR saati</span>
      </div>

      {/* Ay sekmeleri */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8" role="tablist" aria-label="Ay seçimi">
        {MONTHS_TR.map((name, i) => (
          <button
            key={name}
            role="tab"
            aria-selected={month === i}
            onClick={() => setMonth(i)}
            className={`px-4 py-2 rounded-xl text-label-md whitespace-nowrap transition-all cursor-pointer ${
              month === i
                ? "bg-primary text-on-primary font-bold"
                : "glass text-on-surface-variant hover:text-on-surface border border-on-surface/10"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Veri tablosu */}
      <div className="glass rounded-3xl overflow-hidden border border-on-surface/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left border-collapse">
            <thead>
              <tr className="border-b border-on-surface/10">
                <th className="p-4 text-label-md text-on-surface font-bold">Tarih</th>
                <th className="p-4 text-label-md text-on-surface font-bold">Öğle Durağı</th>
                <th className="p-4 text-label-md text-on-surface font-bold">Geçiş</th>
                <th className="p-4 text-label-md text-on-surface font-bold">Kısa Not</th>
                <th className="p-4 text-label-md text-on-surface font-bold">İyi Gelir / Temkin</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const info = MANSIONS[r.noonIdx];
                const todayRow = isTodayRow(r.day);
                return (
                  <tr
                    key={r.day}
                    className={`border-b border-on-surface/5 transition-colors ${
                      todayRow ? "bg-primary/10" : "hover:bg-on-surface/[0.03]"
                    }`}
                  >
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-label-md text-on-surface">
                        {r.day} {MONTHS_TR[month]} {year}
                      </span>
                      {todayRow && (
                        <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-primary text-on-primary text-caption font-bold">
                          Bugün
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-sora font-bold text-on-surface">{info.name}</div>
                      <div className="text-caption text-on-surface-variant mt-0.5">
                        {fmtDeg(r.noonLon)} • durakta {fmtWithin(r.noonLon)}
                      </div>
                    </td>
                    <td className="p-4 text-body-sm text-on-surface-variant whitespace-nowrap">
                      {r.transitions.length === 0 ? (
                        <span className="text-outline">—</span>
                      ) : (
                        r.transitions.map((t, i) => (
                          <div key={i}>
                            {t.time} → {MANSIONS[t.to].name}
                          </div>
                        ))
                      )}
                    </td>
                    <td className="p-4 text-body-sm text-on-surface-variant max-w-[240px]">{info.note}</td>
                    <td className="p-4 text-body-sm max-w-[220px]">
                      <div className="text-secondary">✓ {info.good}</div>
                      <div className="text-tertiary mt-1">⚠ {info.caution}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
