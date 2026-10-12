// İstemci-içi Ay ekliptik boylamı: Meeus "Astronomical Algorithms" Bölüm 47
// düşük hassasiyet yöntemi (Tablo 47.A, |katsayı| ≥ 0.0025° satırlar + E eksantriklik
// çarpanı + toplamsal terimler). astronomy-engine paketlenmeden ~0.03° hassasiyet
// verir; 12.86° genişliğindeki menziller (ay durakları) için fazlasıyla yeterlidir.

const RAD = Math.PI / 180;

function rev(x: number): number {
  return x - Math.floor(x / 360) * 360;
}

// Meeus Tablo 47.A: [D, M, M', F, sinüs katsayısı] (katsayı derece cinsinden)
const TERMS: [number, number, number, number, number][] = [
  [0, 0, 1, 0, 6.288774],
  [2, 0, -1, 0, 1.274027],
  [2, 0, 0, 0, 0.658314],
  [0, 0, 2, 0, 0.213618],
  [0, 1, 0, 0, -0.185116],
  [0, 0, 0, 2, -0.114332],
  [2, 0, -2, 0, 0.058793],
  [2, -1, -1, 0, 0.057066],
  [2, 0, 1, 0, 0.053322],
  [2, -1, 0, 0, 0.045758],
  [0, 1, -1, 0, -0.040923],
  [1, 0, 0, 0, -0.03472],
  [0, 1, 1, 0, -0.030383],
  [2, 0, 0, -2, 0.015327],
  [0, 0, 1, 2, -0.012528],
  [0, 0, 1, -2, 0.01098],
  [4, 0, -1, 0, 0.010675],
  [0, 0, 3, 0, 0.010034],
  [4, 0, -2, 0, 0.008548],
  [2, 1, -1, 0, -0.007888],
  [2, 1, 0, 0, -0.006766],
  [1, 0, -1, 0, -0.005163],
  [1, 1, 0, 0, 0.004987],
  [2, -1, 1, 0, 0.004036],
  [2, 0, 2, 0, 0.003994],
  [4, 0, 0, 0, 0.003861],
  [2, 0, -3, 0, 0.003665],
  [0, 1, -2, 0, -0.002689],
  [2, 0, -1, 2, -0.002602],
];

/** Verilen UTC tarihindeki Ay'ın tropikal ekliptik boylamı (derece, 0-360). */
export function moonLongitude(date: Date): number {
  // J2000.0 (2000-01-01 12:00 UTC) sonrası gün ve yüzyıl sayısı
  const d = date.getTime() / 86400000 - 10957.5;
  const t = d / 36525;

  const Lp = rev(218.3164477 + 13.17639648 * d);
  const D = rev(297.8501921 + 12.19074912 * d);
  const M = rev(357.5291092 + 0.98560028 * d);
  const Mp = rev(134.9633964 + 13.06499295 * d);
  const F = rev(93.272095 + 13.22935024 * d);

  // Dünya yörünge eksantriklik çarpanı
  const E = 1 - 0.002516 * t - 0.0000074 * t * t;

  let lon = Lp;
  for (const [dC, mC, mpC, fC, amp] of TERMS) {
    let c = amp;
    const am = Math.abs(mC);
    if (am === 1) c *= E;
    else if (am === 2) c *= E * E;
    lon += c * Math.sin((dC * D + mC * M + mpC * Mp + fC * F) * RAD);
  }

  // Toplamsal terimler
  const A1 = rev(119.75 + 131.849 * t);
  const A2 = rev(53.09 + 479264.29 * t);
  lon += 0.003958 * Math.sin(A1 * RAD);
  lon += 0.001962 * Math.sin((Lp - F) * RAD);
  lon += 0.000318 * Math.sin(A2 * RAD);

  return rev(lon);
}
