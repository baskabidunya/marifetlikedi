// İstemci-içi gezegen konumları: Meeus "Astronomical Algorithms" Bölüm 31
// yaklaşık konum yöntemi (Tablo 31.3 Kepler elemanları + yüzyıllık değişimler,
// 1800-2050 aralığında geçerli). astronomy-engine paketlenmeden çalışır;
// retro başlangıç/bitiş (durak) anları için yeterlidir.

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

function rev(x: number): number {
  return x - Math.floor(x / 360) * 360;
}

export interface PlanetDef {
  key: string;
  name: string;
  symbol: string;
  theme: string;
  el: { a: number; e: number; i: number; L: number; lp: number; om: number };
  rate: { a: number; e: number; i: number; L: number; lp: number; om: number };
}

export const PLANETS: PlanetDef[] = [
  {
    key: "merkur", name: "Merkür", symbol: "☿",
    theme: "İletişim, teknoloji, anlaşmalar ve seyahatler gözden geçirilir.",
    el: { a: 0.38709927, e: 0.20563593, i: 7.00497902, L: 252.2503235, lp: 77.45779628, om: 48.33076593 },
    rate: { a: 0.00000037, e: 0.00001906, i: -0.00594749, L: 149472.67411175, lp: 0.16047689, om: -0.12534081 },
  },
  {
    key: "venus", name: "Venüs", symbol: "♀",
    theme: "Aşk, ilişkiler, estetik ve maddi değerler yeniden değerlendirilir.",
    el: { a: 0.72333566, e: 0.00677672, i: 3.39467605, L: 181.9790995, lp: 131.60246718, om: 76.67984255 },
    rate: { a: 0.0000039, e: -0.00004107, i: -0.0007889, L: 58517.81538729, lp: 0.00268329, om: -0.27769418 },
  },
  {
    key: "dunya", name: "Dünya", symbol: "⊕",
    theme: "",
    el: { a: 1.00000261, e: 0.01671123, i: -0.00001531, L: 100.46457166, lp: 102.93768193, om: 0 },
    rate: { a: 0.00000562, e: -0.00004392, i: -0.01294668, L: 35999.37244981, lp: 0.32327364, om: 0 },
  },
  {
    key: "mars", name: "Mars", symbol: "♂",
    theme: "Enerji, motivasyon ve öfke kontrolü; girişimler yavaşlatılır.",
    el: { a: 1.52371034, e: 0.0933941, i: 1.84969142, L: -4.55343205, lp: -23.94368959, om: 49.55953891 },
    rate: { a: 0.00001847, e: 0.00007882, i: -0.00813131, L: 19140.30268499, lp: 0.44441088, om: -0.29257343 },
  },
  {
    key: "jupiter", name: "Jüpiter", symbol: "♃",
    theme: "Büyüme, inanç ve abartılar; şansın yönü içe döner.",
    el: { a: 5.202887, e: 0.04838624, i: 1.30439695, L: 34.39644051, lp: 14.72847983, om: 100.47390909 },
    rate: { a: -0.00011607, e: -0.00013253, i: -0.00183714, L: 3034.74612775, lp: 0.21252668, om: 0.20469106 },
  },
  {
    key: "saturn", name: "Satürn", symbol: "♄",
    theme: "Sorumluluk, sınırlar ve kariyer yapıları sağlamlaştırılır.",
    el: { a: 9.53667594, e: 0.05386179, i: 2.48599187, L: 49.95424423, lp: 92.59887831, om: 113.66242448 },
    rate: { a: -0.0012506, e: -0.00050991, i: 0.00193609, L: 1222.49362201, lp: -0.41897216, om: -0.28867794 },
  },
  {
    key: "uranus", name: "Uranüs", symbol: "♅",
    theme: "Ani değişim, özgürlük arayışı ve uyanışlar hızlanır.",
    el: { a: 19.18916464, e: 0.04725744, i: 0.77263783, L: 313.23810451, lp: 170.9552763, om: 74.01692503 },
    rate: { a: -0.00196176, e: -0.00004397, i: -0.00242966, L: 428.48202785, lp: 0.40805281, om: 0.04240589 },
  },
  {
    key: "neptun", name: "Neptün", symbol: "♆",
    theme: "Hayaller, sezgiler ve sis perdesi; maneviyat derinleşir.",
    el: { a: 30.06992276, e: 0.00859048, i: 1.77004347, L: -55.12002969, lp: 44.96476227, om: 131.78422574 },
    rate: { a: 0.00026291, e: 0.00005105, i: 0.00035372, L: 218.45945325, lp: -0.32241464, om: -0.00508664 },
  },
  {
    key: "pluton", name: "Plüton", symbol: "♇",
    theme: "Dönüşüm, güç dengeleri ve gölgeyle yüzleşme öne çıkar.",
    el: { a: 39.48211675, e: 0.2488273, i: 17.14175, L: 238.92903833, lp: 224.06891629, om: 110.30393684 },
    rate: { a: -0.00031596, e: 0.0000517, i: -0.00034388, L: 145.20780515, lp: -0.04062942, om: -0.01183482 },
  },
];

export const RETRO_PLANETS = PLANETS.filter((p) => p.key !== "dunya");

function helio(def: PlanetDef, t: number): { x: number; y: number; z: number } {
  const a = def.el.a + def.rate.a * t;
  const e = def.el.e + def.rate.e * t;
  const i = (def.el.i + def.rate.i * t) * RAD;
  const L = rev(def.el.L + def.rate.L * t);
  const lp = rev(def.el.lp + def.rate.lp * t);
  const om = rev(def.el.om + def.rate.om * t) * RAD;
  const M = rev(L - lp) * RAD;
  const w = (lp - def.el.om - def.rate.om * t) * RAD;

  let E = M + e * Math.sin(M);
  for (let k = 0; k < 6; k++) {
    E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  }
  const xv = a * (Math.cos(E) - e);
  const yv = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const v = Math.atan2(yv, xv);
  const r = Math.sqrt(xv * xv + yv * yv);
  return {
    x: r * (Math.cos(om) * Math.cos(v + w) - Math.sin(om) * Math.sin(v + w) * Math.cos(i)),
    y: r * (Math.sin(om) * Math.cos(v + w) + Math.cos(om) * Math.sin(v + w) * Math.cos(i)),
    z: r * (Math.sin(v + w) * Math.sin(i)),
  };
}

/** Yermerkezli ekliptik boylam (derece, 0-360). Sabit çerçeve kayması durak anlarını etkilemez. */
export function geoLongitude(def: PlanetDef, date: Date): number {
  const t = (date.getTime() / 86400000 - 10957.5) / 36525;
  const earth = PLANETS.find((p) => p.key === "dunya")!;
  const p = helio(def, t);
  const e = helio(earth, t);
  return rev(Math.atan2(p.y - e.y, p.x - e.x) * DEG);
}

export interface RetroPeriod {
  planet: PlanetDef;
  start: Date;
  end: Date;
  startLon: number;
  endLon: number;
}

function dailyMotion(def: PlanetDef, date: Date): number {
  const a = geoLongitude(def, new Date(date.getTime() - 43200000));
  const b = geoLongitude(def, new Date(date.getTime() + 43200000));
  let d = b - a;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

/** Verilen yıl içinde başlayıp biten (yıla taşanlar dahil) retro dönemleri. */
export function retroPeriods(year: number): RetroPeriod[] {
  const out: RetroPeriod[] = [];
  const winStart = Date.UTC(year - 1, 11, 1);
  const winEnd = Date.UTC(year + 1, 1, 15);
  const step = 86400000;

  for (const def of RETRO_PLANETS) {
    let t = winStart;
    let prevMotion = dailyMotion(def, new Date(t));
    let prevT = t;
    let inRetro = prevMotion < 0;
    let rStart = inRetro ? t : 0;
    t += step;
    while (t <= winEnd) {
      const m = dailyMotion(def, new Date(t));
      const retro = m < 0;
      if (retro !== inRetro) {
        // ikiye bölerek durak anını dakikaya indir
        let lo = prevT, hi = t;
        for (let k = 0; k < 20; k++) {
          const mid = (lo + hi) / 2;
          if ((dailyMotion(def, new Date(mid)) < 0) === inRetro) lo = mid;
          else hi = mid;
        }
        if (!inRetro) {
          rStart = hi;
          inRetro = true;
        } else {
          const start = new Date(rStart);
          const end = new Date(hi);
          const y0 = start.getUTCFullYear();
          const y1 = end.getUTCFullYear();
          if (y0 === year || y1 === year) {
            out.push({
              planet: def,
              start,
              end,
              startLon: geoLongitude(def, start),
              endLon: geoLongitude(def, end),
            });
          }
          inRetro = false;
        }
      }
      prevMotion = m;
      prevT = t;
      t += step;
    }
  }
  return out.sort((a, b) => a.start.getTime() - b.start.getTime());
}
