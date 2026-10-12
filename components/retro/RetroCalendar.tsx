"use client";

import { useMemo, useState } from "react";
import CalendarTabs from "@/components/moon/CalendarTabs";
import { RETRO_PLANETS, retroPeriods, type RetroPeriod } from "./planets";

const SIGNS_TR = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];
const MONTHS_TR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const MIN_YEAR = 1900;
const MAX_YEAR = 2050;

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/** TR saati (UTC+3, sabit) bileşenleri */
function trParts(d: Date): { y: number; m: number; day: number; hh: number; mm: number } {
  const t = new Date(d.getTime() + 3 * 3600000);
  return { y: t.getUTCFullYear(), m: t.getUTCMonth(), day: t.getUTCDate(), hh: t.getUTCHours(), mm: t.getUTCMinutes() };
}

function fmtDate(d: Date): string {
  const p = trParts(d);
  return `${p.day} ${MONTHS_TR[p.m]} ${p.y}`;
}

function fmtDateTime(d: Date): string {
  const p = trParts(d);
  return `${p.day} ${MONTHS_TR[p.m]} ${p.y}, ${pad(p.hh)}:${pad(p.mm)}`;
}

function fmtDeg(lon: number): string {
  const l = ((lon % 360) + 360) % 360;
  const s = Math.floor(l / 30);
  const deg = Math.floor(l % 30);
  const min = Math.floor(((l % 30) - deg) * 60);
  return `${SIGNS_TR[s]} ${deg}°${pad(min)}'`;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export default function RetroCalendar() {
  const now = useMemo(() => new Date(), []);
  const thisYear = trParts(now).y;
  const [year, setYear] = useState(() => Math.min(2030, Math.max(2025, thisYear)));
  const [winStart, setWinStart] = useState(2025);
  const [filter, setFilter] = useState<string>("all");
  const [showDirect, setShowDirect] = useState(true);

  const periods = useMemo(() => retroPeriods(year), [year]);

  // Durum kutusu: bu yıl + komşu yılların dönemleri üzerinden bugün hesabı
  const status = useMemo(() => {
    const y = trParts(now).y;
    const all = [...retroPeriods(y - 1), ...retroPeriods(y), ...retroPeriods(y + 1)];
    const active = all.filter((p) => p.start.getTime() <= now.getTime() && now.getTime() <= p.end.getTime());
    const seen = new Set(active.map((p) => p.planet.key));
    const direct = RETRO_PLANETS.filter((pl) => !seen.has(pl.key)).map((pl) => {
      const next = all
        .filter((p) => p.planet.key === pl.key && p.start.getTime() > now.getTime())
        .sort((a, b) => a.start.getTime() - b.start.getTime())[0];
      return { planet: pl, next };
    });
    return { active, direct };
  }, [now]);

  const filtered = filter === "all" ? periods : periods.filter((p) => p.planet.key === filter);

  const shiftWin = (dir: 1 | -1) => {
    setWinStart((w) => Math.min(MAX_YEAR - 5, Math.max(MIN_YEAR, w + dir)));
    setYear((y) => {
      const w = Math.min(MAX_YEAR - 5, Math.max(MIN_YEAR, winStart + dir));
      return Math.min(w + 5, Math.max(w, y));
    });
  };

  const visibleYears = Array.from({ length: 6 }, (_, i) => winStart + i);

  return (
    <div>
      {/* 1. Sekmeler */}
      <CalendarTabs active="retro" />

      {/* 2. Anlık durum kutusu */}
      <section className="glass-card p-6 md:p-8 rounded-3xl border border-primary/20 mb-10">
        <h2 className="font-sora text-headline-sm md:text-headline-md text-on-surface font-bold mb-1">
          Bugün Hangi Gezegenler Retro?
        </h2>
        <p className="text-caption text-outline mb-5">
          {fmtDate(now)} TR saatiyle güncel gökyüzü durumu
        </p>
        {status.active.length === 0 ? (
          <p className="text-body-md text-on-surface-variant">
            Şu anda retro harekette gezegen bulunmuyor; tüm gezegenler direkt hareket ediyor.
          </p>
        ) : (
          <div className="space-y-3 mb-5">
            <p className="text-body-md text-on-surface">
              Şu anda{" "}
              <strong className="text-primary">
                {status.active.map((p) => p.planet.name).join(", ")}
              </strong>{" "}
              retro hareket ediyor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {status.active.map((p) => (
                <ActiveRow key={p.planet.key} period={p} now={now} />
              ))}
            </div>
          </div>
        )}
        <div className="pt-4 border-t border-on-surface/10">
          <button
            onClick={() => setShowDirect((v) => !v)}
            aria-expanded={showDirect}
            className="w-full flex items-center justify-between py-1 text-label-md text-on-surface font-semibold cursor-pointer"
          >
            <span>Direkt Hareket Edenler ({status.direct.length})</span>
            <span aria-hidden="true" className={`material-symbols-outlined transition-transform ${showDirect ? "rotate-180" : ""}`}>
              expand_more
            </span>
          </button>
          {showDirect && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 mt-2">
              {status.direct.map(({ planet, next }) => (
                <p key={planet.key} className="text-caption text-on-surface-variant leading-snug">
                  <span className="text-base align-middle mr-1">{planet.symbol}</span> {planet.name} şu an direkt.
                  {next ? (
                    <> Sonraki: <strong className="text-on-surface-variant">{fmtDate(next.start)} - {fmtDate(next.end)}</strong></>
                  ) : (
                    <> Yakın dönemde retro öngörülmüyor.</>
                  )}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Yıl seçim alanı */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
        <div>
          <p className="text-caption font-label-md tracking-[0.25em] text-tertiary mb-2">GEZEGEN DÖNGÜLERİ</p>
          <h1 className="font-sora text-display-lg-mobile md:text-display-lg text-on-surface font-bold">
            Retro Takvimi
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-2xl mt-3">
            Merkür, Venüs, Mars, Jüpiter, Satürn, Uranüs, Neptün ve Plüton retrolarının başlangıç ve direkt hareket tarihleri.
          </p>
        </div>
        <div className="shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => shiftWin(-1)}
              disabled={winStart <= MIN_YEAR}
              aria-label="Önceki yıllar"
              className="w-10 h-10 rounded-xl glass border border-on-surface/10 text-on-surface-variant hover:text-on-surface disabled:opacity-30 transition-all cursor-pointer flex items-center justify-center"
            >
              <span aria-hidden="true" className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex gap-2" role="group" aria-label="Yıl seçimi">
              {visibleYears.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  aria-pressed={year === y}
                  className={`px-4 py-2.5 rounded-xl font-label-md transition-all cursor-pointer ${
                    year === y
                      ? "cta-glow text-on-primary font-bold"
                      : "glass text-on-surface-variant hover:text-on-surface border border-on-surface/10"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
            <button
              onClick={() => shiftWin(1)}
              disabled={winStart + 5 >= MAX_YEAR}
              aria-label="Sonraki yıllar"
              className="w-10 h-10 rounded-xl glass border border-on-surface/10 text-on-surface-variant hover:text-on-surface disabled:opacity-30 transition-all cursor-pointer flex items-center justify-center"
            >
              <span aria-hidden="true" className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <p className="text-caption text-outline text-right mt-2">1900 - 2050</p>
        </div>
      </div>

      {/* 4. Gezegen filtreleri */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Gezegen filtresi">
        <button
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
          className={`px-4 py-2 rounded-xl text-label-md transition-all cursor-pointer ${
            filter === "all"
              ? "bg-primary text-on-primary font-bold"
              : "glass text-on-surface-variant hover:text-on-surface border border-on-surface/10"
          }`}
        >
          Tümü
        </button>
        {RETRO_PLANETS.map((pl) => (
          <button
            key={pl.key}
            onClick={() => setFilter(pl.key)}
            aria-pressed={filter === pl.key}
            className={`px-4 py-2 rounded-xl text-label-md transition-all cursor-pointer ${
              filter === pl.key
                ? "bg-primary text-on-primary font-bold"
                : "glass text-on-surface-variant hover:text-on-surface border border-on-surface/10"
            }`}
          >
            <span aria-hidden="true" className="mr-1">{pl.symbol}</span> {pl.name}
          </button>
        ))}
      </div>

      {/* 5. Tablo */}
      <h2 className="font-sora text-headline-sm md:text-headline-md text-on-surface font-bold mb-1">
        {year} Retro Tarihleri
      </h2>
      <p className="text-caption text-outline mb-4">
        Türkiye saatine (Europe/Istanbul) göre {filtered.length} kayıt
      </p>
      <div className="glass rounded-3xl overflow-hidden border border-on-surface/10 mb-10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left border-collapse">
            <thead>
              <tr className="border-b border-on-surface/10">
                <th className="p-4 text-label-md text-on-surface font-bold">Gezegen</th>
                <th className="p-4 text-label-md text-on-surface font-bold">Retro Başlangıcı</th>
                <th className="p-4 text-label-md text-on-surface font-bold">Retro Bitişi</th>
                <th className="p-4 text-label-md text-on-surface font-bold">Derece</th>
                <th className="p-4 text-label-md text-on-surface font-bold">Süre</th>
                <th className="p-4 text-label-md text-on-surface font-bold">Tema</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={`${p.planet.key}-${i}`} className="border-b border-on-surface/5 hover:bg-on-surface/[0.03] transition-colors">
                  <td className="p-4 whitespace-nowrap">
                    <span aria-hidden="true" className="text-2xl align-middle mr-2">{p.planet.symbol}</span>
                    <span className="font-sora font-bold text-on-surface">{p.planet.name}</span>
                  </td>
                  <td className="p-4 text-body-sm text-on-surface-variant whitespace-nowrap">{fmtDateTime(p.start)}</td>
                  <td className="p-4 text-body-sm text-on-surface-variant whitespace-nowrap">{fmtDateTime(p.end)}</td>
                  <td className="p-4 text-body-sm text-on-surface-variant whitespace-nowrap">
                    {fmtDeg(p.startLon)} → {fmtDeg(p.endLon)}
                  </td>
                  <td className="p-4 text-body-sm text-on-surface whitespace-nowrap">{daysBetween(p.start, p.end)} gün</td>
                  <td className="p-4 text-body-sm text-on-surface-variant max-w-[260px]">{p.planet.theme}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                    Bu yıl bu gezegen için retro dönemi bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ActiveRow({ period, now }: { period: RetroPeriod; now: Date }) {
  const left = Math.max(0, Math.ceil((period.end.getTime() - now.getTime()) / 86400000));
  return (
    <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-body-sm text-on-surface-variant">
      <span aria-hidden="true" className="text-xl align-middle mr-2">{period.planet.symbol}</span>
      <strong className="text-on-surface">{period.planet.name}</strong> retroda:{" "}
      {fmtDate(period.start)} - {fmtDate(period.end)} ({fmtDeg(period.startLon)} → {fmtDeg(period.endLon)}) •{" "}
      <span className="text-primary font-semibold">{left} gün kaldı</span>
    </div>
  );
}
