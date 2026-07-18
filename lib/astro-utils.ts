import * as Astronomy from "astronomy-engine";

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;
const OBLIQUITY = 23.4392911;

export type ZodiacSign =
  | "Koç" | "Boğa" | "İkizler" | "Yengeç"
  | "Aslan" | "Başak" | "Terazi" | "Akrep"
  | "Yay" | "Oğlak" | "Kova" | "Balık";

const ZODIAC_SIGNS: ZodiacSign[] = [
  "Koç", "Boğa", "İkizler", "Yengeç",
  "Aslan", "Başak", "Terazi", "Akrep",
  "Yay", "Oğlak", "Kova", "Balık",
];

const ZODIAC_ICONS: Record<ZodiacSign, string> = {
  "Koç": "ramp",
  "Boğa": "pedal_bike",
  "İkizler": "2k",
  "Yengeç": "crab",
  "Aslan": "lion",
  "Başak": "spa",
  "Terazi": "balance",
  "Akrep": "scorpion",
  "Yay": "arc",
  "Oğlak": "goat",
  "Kova": "water",
  "Balık": "fishing",
};

export type PlanetName = "Güneş" | "Ay" | "Merkür" | "Venüs" | "Mars" | "Jüpiter" | "Satürn" | "Uranüs" | "Neptün" | "Plüton" | "Yükselen";

const PLANET_CONFIG: { name: PlanetName; body: Astronomy.Body; icon: string }[] = [
  { name: "Güneş", body: Astronomy.Body.Sun, icon: "light_mode" },
  { name: "Ay", body: Astronomy.Body.Moon, icon: "dark_mode" },
  { name: "Merkür", body: Astronomy.Body.Mercury, icon: "trip" },
  { name: "Venüs", body: Astronomy.Body.Venus, icon: "female" },
  { name: "Mars", body: Astronomy.Body.Mars, icon: "male" },
  { name: "Jüpiter", body: Astronomy.Body.Jupiter, icon: "thunderstorm" },
  { name: "Satürn", body: Astronomy.Body.Saturn, icon: "donut_large" },
  { name: "Uranüs", body: Astronomy.Body.Uranus, icon: "blur_on" },
  { name: "Neptün", body: Astronomy.Body.Neptune, icon: "water_drop" },
  { name: "Plüton", body: Astronomy.Body.Pluto, icon: "dark_mode" },
];

const TURKISH_CITIES: Record<string, { lat: number; lng: number }> = {
  "adana": { lat: 37.0, lng: 35.3213 },
  "adiyaman": { lat: 37.7648, lng: 38.2786 },
  "afyonkarahisar": { lat: 38.7507, lng: 30.5567 },
  "agri": { lat: 39.7191, lng: 43.0503 },
  "aksaray": { lat: 38.3687, lng: 34.0370 },
  "amasya": { lat: 40.6499, lng: 35.8353 },
  "ankara": { lat: 39.9334, lng: 32.8597 },
  "antalya": { lat: 36.8841, lng: 30.7056 },
  "ardahan": { lat: 41.1105, lng: 42.7022 },
  "artvin": { lat: 41.1828, lng: 41.8183 },
  "aydin": { lat: 37.8560, lng: 27.8416 },
  "balikesir": { lat: 39.6484, lng: 27.8826 },
  "bartin": { lat: 41.6344, lng: 32.3375 },
  "batman": { lat: 37.8812, lng: 41.1351 },
  "bayburt": { lat: 40.2552, lng: 40.2249 },
  "bilecik": { lat: 40.0567, lng: 30.9773 },
  "bingol": { lat: 38.8855, lng: 40.4966 },
  "bitlis": { lat: 38.4005, lng: 42.1095 },
  "bolu": { lat: 40.7360, lng: 31.6061 },
  "burdur": { lat: 37.7203, lng: 30.2908 },
  "bursa": { lat: 40.1828, lng: 29.0568 },
  "canakkale": { lat: 40.1553, lng: 26.4142 },
  "cankiri": { lat: 40.6013, lng: 33.6134 },
  "corum": { lat: 40.5506, lng: 34.9556 },
  "denizli": { lat: 37.7765, lng: 29.0864 },
  "diyarbakir": { lat: 37.9136, lng: 40.2172 },
  "duzce": { lat: 40.8438, lng: 31.1565 },
  "edirne": { lat: 41.6818, lng: 26.5623 },
  "elazig": { lat: 38.6810, lng: 39.2264 },
  "erzincan": { lat: 39.7500, lng: 39.5000 },
  "erzurum": { lat: 39.9087, lng: 41.2769 },
  "eskisehir": { lat: 39.7767, lng: 30.5206 },
  "gaziantep": { lat: 37.0662, lng: 37.3833 },
  "giresun": { lat: 40.9128, lng: 38.3895 },
  "gumushane": { lat: 40.4386, lng: 39.5086 },
  "hakkari": { lat: 37.5833, lng: 43.7408 },
  "hatay": { lat: 36.4018, lng: 36.3498 },
  "igdir": { lat: 39.9167, lng: 44.0500 },
  "isparta": { lat: 37.7648, lng: 30.5566 },
  "istanbul": { lat: 41.0082, lng: 28.9784 },
  "izmir": { lat: 38.4192, lng: 27.1287 },
  "kahramanmaras": { lat: 37.5858, lng: 36.9371 },
  "karabuk": { lat: 41.2061, lng: 32.6204 },
  "karaman": { lat: 37.1759, lng: 33.2287 },
  "kars": { lat: 40.6167, lng: 43.1000 },
  "kastamonu": { lat: 41.3887, lng: 33.7827 },
  "kayseri": { lat: 38.7333, lng: 35.4833 },
  "kirikkale": { lat: 39.8468, lng: 33.5153 },
  "kirklareli": { lat: 41.7333, lng: 27.2167 },
  "kirsehir": { lat: 39.1425, lng: 34.1709 },
  "kilis": { lat: 36.7184, lng: 37.1212 },
  "kocaeli": { lat: 40.8533, lng: 29.8815 },
  "konya": { lat: 37.8667, lng: 32.4833 },
  "kutahya": { lat: 39.4167, lng: 29.9833 },
  "malatya": { lat: 38.3552, lng: 38.3095 },
  "manisa": { lat: 38.6191, lng: 27.4289 },
  "mardin": { lat: 37.3212, lng: 40.7245 },
  "mersin": { lat: 36.8, lng: 34.6333 },
  "mugla": { lat: 37.2153, lng: 28.3636 },
  "mus": { lat: 38.9462, lng: 41.7539 },
  "nevsehir": { lat: 38.6244, lng: 34.6850 },
  "nigde": { lat: 37.9667, lng: 34.6833 },
  "ordu": { lat: 40.9839, lng: 37.8764 },
  "osmaniye": { lat: 37.0742, lng: 36.2464 },
  "rize": { lat: 41.0201, lng: 40.5234 },
  "sakarya": { lat: 40.6940, lng: 30.4358 },
  "samsun": { lat: 41.2867, lng: 36.33 },
  "sanliurfa": { lat: 37.1591, lng: 38.7969 },
  "siirt": { lat: 37.9333, lng: 41.9500 },
  "sinop": { lat: 42.0231, lng: 35.1531 },
  "sivas": { lat: 39.7477, lng: 37.0179 },
  "sirnak": { lat: 37.4187, lng: 42.4918 },
  "tekirdag": { lat: 41.0027, lng: 27.5127 },
  "tokat": { lat: 40.3167, lng: 36.5500 },
  "trabzon": { lat: 41.0015, lng: 39.7168 },
  "tunceli": { lat: 39.1079, lng: 39.5401 },
  "usak": { lat: 38.6823, lng: 29.4082 },
  "van": { lat: 38.4891, lng: 43.4089 },
  "yalova": { lat: 40.6500, lng: 29.2667 },
  "yozgat": { lat: 39.8181, lng: 34.8147 },
  "zonguldak": { lat: 41.4564, lng: 31.7987 },
};

export interface PlanetPosition {
  name: PlanetName;
  sign: ZodiacSign;
  degree: number;
  minute: number;
  isRetrograde: boolean;
  icon: string;
}

export interface AspectData {
  planet1: PlanetName;
  planet2: PlanetName;
  type: "Kavuşum" | "Altmışlık" | "Kare" | "Üçgen" | "Karşıt";
  degree: number;
  orb: number;
  icon: string;
}

export interface AstroChart {
  sun: PlanetPosition;
  moon: PlanetPosition;
  rising: PlanetPosition;
  planets: PlanetPosition[];
  aspects: AspectData[];
}

function normalizeDeg(d: number): number {
  return ((d % 360) + 360) % 360;
}

function getSignFromLongitude(lon: number): ZodiacSign {
  const idx = Math.floor(normalizeDeg(lon) / 30);
  return ZODIAC_SIGNS[idx];
}

function getDegreeInSign(lon: number): { degree: number; minute: number } {
  const deg = normalizeDeg(lon) % 30;
  return {
    degree: Math.floor(deg),
    minute: Math.floor((deg - Math.floor(deg)) * 60),
  };
}

function getEclipticLongitude(body: Astronomy.Body, time: Astronomy.AstroTime): number {
  if (body === Astronomy.Body.Sun) {
    const sp = Astronomy.SunPosition(time);
    return sp.elon;
  }
  if (body === Astronomy.Body.Moon) {
    const m = Astronomy.EclipticGeoMoon(time);
    return m.lon;
  }
  const vec = Astronomy.GeoVector(body, time, true);
  const ecl = Astronomy.Ecliptic(vec);
  return ecl.elon;
}

function isRetrograde(body: Astronomy.Body, time: Astronomy.AstroTime): boolean {
  const mid = Astronomy.MakeTime(new Date(time.date.getTime() - 86400000));
  const fwd = Astronomy.MakeTime(new Date(time.date.getTime() + 86400000));
  const lonNow = getEclipticLongitude(body, time);
  const lonFwd = getEclipticLongitude(body, fwd);
  const diff = lonFwd - lonNow;
  return diff < -180 || (diff >= 0 && diff < 180) ? false : true;
}

function makeTime(dateStr: string, timeStr: string): Astronomy.AstroTime {
  const [h, m] = (timeStr || "12:00").split(":").map(Number);
  const d = new Date(`${dateStr}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
  return Astronomy.MakeTime(d);
}

function getRisingSign(birthDate: string, birthTime: string, lat: number, lng: number): { sign: ZodiacSign; degree: number; minute: number } {
  const time = makeTime(birthDate, birthTime);
  const gst = Astronomy.SiderealTime(time);
  const ramcDeg = normalizeDeg(gst * 15 + lng);
  const φ = lat * DEG;
  const ε = OBLIQUITY * DEG;
  const θ = ramcDeg * DEG;

  const y = Math.cos(θ);
  const x = -(Math.sin(ε) * Math.tan(φ) + Math.cos(ε) * Math.sin(θ));

  let asc = Math.atan2(y, x) * RAD;
  asc = normalizeDeg(asc);
  const { degree, minute } = getDegreeInSign(asc);
  return { sign: getSignFromLongitude(asc), degree, minute };
}

function getPlanetPositions(birthDate: string, birthTime: string): PlanetPosition[] {
  const time = makeTime(birthDate, birthTime);
  return PLANET_CONFIG.map(({ name, body, icon }) => {
    const lon = getEclipticLongitude(body, time);
    const { degree, minute } = getDegreeInSign(lon);
    const retro = body !== Astronomy.Body.Sun && body !== Astronomy.Body.Moon
      ? isRetrograde(body, time) : false;
    return {
      name,
      sign: getSignFromLongitude(lon),
      degree,
      minute,
      isRetrograde: retro,
      icon,
    };
  });
}

function getSunPlanet(birthDate: string, birthTime: string): PlanetPosition {
  const time = makeTime(birthDate, birthTime);
  const lon = getEclipticLongitude(Astronomy.Body.Sun, time);
  const { degree, minute } = getDegreeInSign(lon);
  return {
    name: "Güneş",
    sign: getSignFromLongitude(lon),
    degree,
    minute,
    isRetrograde: false,
    icon: "light_mode",
  };
}

function getMoonPlanet(birthDate: string, birthTime: string): PlanetPosition {
  const time = makeTime(birthDate, birthTime);
  const lon = getEclipticLongitude(Astronomy.Body.Moon, time);
  const { degree, minute } = getDegreeInSign(lon);
  return {
    name: "Ay",
    sign: getSignFromLongitude(lon),
    degree,
    minute,
    isRetrograde: false,
    icon: "dark_mode",
  };
}

function getAspects(planets: PlanetPosition[]): AspectData[] {
  const aspects: AspectData[] = [];
  const aspectDefs: { angle: number; type: AspectData["type"]; icon: string; orb: number }[] = [
    { angle: 0, type: "Kavuşum", icon: "circle", orb: 8 },
    { angle: 60, type: "Altmışlık", icon: "hexagon", orb: 6 },
    { angle: 90, type: "Kare", icon: "square", orb: 6 },
    { angle: 120, type: "Üçgen", icon: "change_history", orb: 6 },
    { angle: 180, type: "Karşıt", icon: "horizontal_rule", orb: 8 },
  ];

  const getLon = (p: PlanetPosition) => {
    const signIdx = ZODIAC_SIGNS.indexOf(p.sign);
    return signIdx * 30 + p.degree + p.minute / 60;
  };

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const lon1 = getLon(planets[i]);
      const lon2 = getLon(planets[j]);
      let diff = Math.abs(lon1 - lon2);
      diff = Math.min(diff, 360 - diff);

      for (const asp of aspectDefs) {
        const orb = Math.abs(diff - asp.angle);
        if (orb <= asp.orb) {
          aspects.push({
            planet1: planets[i].name,
            planet2: planets[j].name,
            type: asp.type,
            degree: Math.round(diff * 10) / 10,
            orb: Math.round(orb * 10) / 10,
            icon: asp.icon,
          });
          break;
        }
      }
    }
  }
  return aspects;
}

export function getCoordinatesFromPlace(place: string): { lat: number; lng: number } | null {
  if (!place) return null;
  const key = place.toLowerCase().trim()
    .replace(/[ı]/g, "i").replace(/[ş]/g, "s")
    .replace(/[ç]/g, "c").replace(/[ö]/g, "o")
    .replace(/[ü]/g, "u").replace(/[ğ]/g, "g")
    .replace(/[^a-z0-9\s]/g, "");
  const city = TURKISH_CITIES[key];
  if (city) return city;
  return TURKISH_CITIES["ankara"];
}

export function calculateAstroChart(birthDate: string, birthTime: string, birthPlace: string): AstroChart | null {
  if (!birthDate) return null;

  const coords = getCoordinatesFromPlace(birthPlace);

  const sun = getSunPlanet(birthDate, birthTime);
  const moon = getMoonPlanet(birthDate, birthTime);
  const planets = getPlanetPositions(birthDate, birthTime).filter(p => p.name !== "Güneş" && p.name !== "Ay");

  let rising: PlanetPosition = {
    name: "Yükselen",
    sign: "Koç", degree: 0, minute: 0,
    isRetrograde: false, icon: "arrow_upward",
  };

  if (coords && birthTime) {
    const rs = getRisingSign(birthDate, birthTime, coords.lat, coords.lng);
    rising.sign = rs.sign;
    rising.degree = rs.degree;
    rising.minute = rs.minute;
  }

  const allBodies = [sun, moon, ...planets];
  const aspects = getAspects(allBodies);

  return { sun, moon, rising, planets, aspects };
}

export const ZODIAC_DATA: Record<ZodiacSign, {
  element: string; ruler: string; quality: string;
  symbol: string; emoji: string; dateRange: string;
}> = {
  Koç: { element: "Ateş", ruler: "Mars", quality: "Öncü", symbol: "Ram", emoji: "♈︎", dateRange: "21 Mar - 19 Nis" },
  Boğa: { element: "Toprak", ruler: "Venüs", quality: "Sabit", symbol: "Boğa", emoji: "♉︎", dateRange: "20 Nis - 20 May" },
  İkizler: { element: "Hava", ruler: "Merkür", quality: "Değişken", symbol: "İkizler", emoji: "♊︎", dateRange: "21 May - 20 Haz" },
  Yengeç: { element: "Su", ruler: "Ay", quality: "Öncü", symbol: "Yengeç", emoji: "♋︎", dateRange: "21 Haz - 22 Tem" },
  Aslan: { element: "Ateş", ruler: "Güneş", quality: "Sabit", symbol: "Aslan", emoji: "♌︎", dateRange: "23 Tem - 22 Ağu" },
  Başak: { element: "Toprak", ruler: "Merkür", quality: "Değişken", symbol: "Başak", emoji: "♍︎", dateRange: "23 Ağu - 22 Eyl" },
  Terazi: { element: "Hava", ruler: "Venüs", quality: "Öncü", symbol: "Terazi", emoji: "♎︎", dateRange: "23 Eyl - 22 Eki" },
  Akrep: { element: "Su", ruler: "Plüton", quality: "Sabit", symbol: "Akrep", emoji: "♏︎", dateRange: "23 Eki - 21 Kas" },
  Yay: { element: "Ateş", ruler: "Jüpiter", quality: "Değişken", symbol: "Yay", emoji: "♐︎", dateRange: "22 Kas - 21 Ara" },
  Oğlak: { element: "Toprak", ruler: "Satürn", quality: "Öncü", symbol: "Keçi", emoji: "♑︎", dateRange: "22 Ara - 19 Oca" },
  Kova: { element: "Hava", ruler: "Uranüs", quality: "Sabit", symbol: "Kova", emoji: "♒︎", dateRange: "20 Oca - 18 Şub" },
  Balık: { element: "Su", ruler: "Neptün", quality: "Değişken", symbol: "Balık", emoji: "♓︎", dateRange: "19 Şub - 20 Mar" },
};

export { TURKISH_CITIES, ZODIAC_SIGNS, PLANET_CONFIG, ZODIAC_ICONS };
