import { calculateAstroChart, ZODIAC_SIGNS, getCoordinatesFromPlace, type AstroChart, type PlanetPosition, type ZodiacSign } from "./astro-utils";
import { ZODIAC_DATA } from "./astro-utils";
import { HOUSE_MEANINGS } from "./astro-interpretations";

const ASPECT_DEFS: { angle: number; type: string; orb: number }[] = [
  { angle: 0, type: "Kavuşum", orb: 8 },
  { angle: 60, type: "Altmışlık", orb: 6 },
  { angle: 90, type: "Kare", orb: 6 },
  { angle: 120, type: "Üçgen", orb: 6 },
  { angle: 180, type: "Karşıt", orb: 8 },
];

const ZODIAC_ELEMENTS: Record<ZodiacSign, string> = {
  Koç: "Ateş", Boğa: "Toprak", İkizler: "Hava",
  Yengeç: "Su", Aslan: "Ateş", Başak: "Toprak",
  Terazi: "Hava", Akrep: "Su", Yay: "Ateş",
  Oğlak: "Toprak", Kova: "Hava", Balık: "Su",
};

const ELEMENT_COMPAT: Record<string, Record<string, number>> = {
  Ateş: { Ateş: 8, Toprak: 3, Hava: 7, Su: 4 },
  Toprak: { Ateş: 3, Toprak: 8, Hava: 4, Su: 7 },
  Hava: { Ateş: 7, Toprak: 4, Hava: 8, Su: 3 },
  Su: { Ateş: 4, Toprak: 7, Hava: 3, Su: 8 },
};

const SIGN_COMPAT: Record<string, Record<string, { score: number; note: string }>> = {
  Koç: {
    Koç: { score: 6, note: "İki Koç, ateşi ikiye katlar ama egolar çarpışabilir." },
    Boğa: { score: 4, note: "Koç'un hızı, Boğa'nın sabrıyla zorlanır." },
    İkizler: { score: 8, note: "Koç'un ateşi, İkizler'in havasını hareketlendirir." },
    Yengeç: { score: 3, note: "Koç'un sertliği, Yengeç'in hassasiyetini incitebilir." },
    Aslan: { score: 9, note: "İki ateş birbirini besler, tutkulu bir birliktelik." },
    Başak: { score: 4, note: "Koç'un dürtüselliği Başak'ın düzenini bozar." },
    Terazi: { score: 6, note: "Zıt kutuplar birbirini çeker ama denge zordur." },
    Akrep: { score: 5, note: "Yoğun ve dönüştürücü, ama kontrol savaşı olabilir." },
    Yay: { score: 9, note: "Maceraperest iki ruh, harika bir uyum." },
    Oğlak: { score: 3, note: "Koç'un isyankarlığı Oğlak'ın kurallarıyla çatışır." },
    Kova: { score: 7, note: "İkisi de özgür ruhlu, yeniliklere açık." },
    Balık: { score: 4, note: "Koç'un doğrudanlığı Balık'ın hayal dünyasını sarsar." },
  },
  Boğa: {
    Boğa: { score: 7, note: "İki Boğa güven ve istikrar inşa eder, ama inatlaşabilir." },
    İkizler: { score: 4, note: "Boğa'nın sabiti, İkizler'in değişkenliğini anlamakta zorlanır." },
    Yengeç: { score: 9, note: "İkisi de duygusal ve güven odaklı, huzurlu bir uyum." },
    Aslan: { score: 5, note: "Boğa'nın sakinliği Aslan'ın gösterişini dengeler." },
    Başak: { score: 8, note: "İkisi de toprak, pratik ve güvenilir bir ilişki." },
    Terazi: { score: 6, note: "Boğa'nın sadakati Terazi'nin dengesini bulur." },
    Akrep: { score: 7, note: "Derin ve tutkulu, ama sahiplenme savaşı olabilir." },
    Yay: { score: 3, note: "Boğa'nın konfor alanı, Yay'ın macera tutkusuyla sarsılır." },
    Oğlak: { score: 9, note: "İkisi de toprak, sağlam temelli ve hedef odaklı." },
    Kova: { score: 4, note: "Boğa'nın gelenekçiliği Kova'nın yenilikçiliğiyle çatışır." },
    Balık: { score: 7, note: "Boğa'nın sağlamlığı, Balık'ın hayallerine toprak olur." },
  },
  İkizler: {
    İkizler: { score: 7, note: "İki İkizler, sonsuz sohbet ve fikir alışverişi." },
    Yengeç: { score: 4, note: "İkizler'in zihinselliği Yengeç'in duygusallığına yetişemez." },
    Aslan: { score: 8, note: "İkizler'in zekası Aslan'ın ışıltısını besler." },
    Başak: { score: 6, note: "İkisi de Merkür yönetiminde, analitik bir bağ." },
    Terazi: { score: 9, note: "İkisi de hava, entelektüel ve sosyal bir uyum." },
    Akrep: { score: 3, note: "İkizler'in yüzeyselliği Akrep'in derinliğini rahatsız eder." },
    Yay: { score: 7, note: "İkisi de değişken, macera ve keşif dolu." },
    Oğlak: { score: 3, note: "İkizler'in hafifliği Oğlak'ın ciddiyetiyle çelişir." },
    Kova: { score: 9, note: "İki hava burcu, entelektüel ve özgürlükçü." },
    Balık: { score: 5, note: "İkizler'in mantığı Balık'ın sezgisini zorlayabilir." },
  },
  Yengeç: {
    Yengeç: { score: 7, note: "İki Yengeç, derin duygusal bağ ve korumacılık." },
    Aslan: { score: 5, note: "Yengeç'in şefkati Aslan'ın ilgi ihtiyacını karşılar." },
    Başak: { score: 7, note: "Yengeç'in duygusallığı Başak'ın pratikliğiyle dengelenir." },
    Terazi: { score: 4, note: "Yengeç'in evcimenliği Terazi'nin sosyalliğiyle çatışır." },
    Akrep: { score: 9, note: "İki su burcu, duygusal ve sezgisel mükemmel uyum." },
    Yay: { score: 3, note: "Yengeç'in güven ihtiyacı Yay'ın özgürlüğüyle sarsılır." },
    Oğlak: { score: 8, note: "Zıt kutuplar, Yengeç'in duygusu Oğlak'ın sağlamlığıyla birleşir." },
    Kova: { score: 3, note: "Yengeç'in gelenekselliği Kova'nın sıradışılığına uyum sağlamakta zorlanır." },
    Balık: { score: 9, note: "İki su burcu, sezgisel ve duygusal derin bir bağ." },
  },
  Aslan: {
    Aslan: { score: 7, note: "İki Aslan, ışıltılı ve tutkulu ama egolar çatışabilir." },
    Başak: { score: 4, note: "Aslan'ın gösterişi Başak'ın mütevazılığına ters düşer." },
    Terazi: { score: 8, note: "Aslan'ın sıcaklığı Terazi'nin zarafetiyle buluşur." },
    Akrep: { score: 5, note: "İkisi de sabit, inatçı ve tutkulu, güç savaşı olabilir." },
    Yay: { score: 9, note: "İki ateş burcu, coşkulu ve maceraperest birliktelik." },
    Oğlak: { score: 4, note: "Aslan'ın eğlencesi Oğlak'ın ciddiyetine ters düşer." },
    Kova: { score: 6, note: "Zıt kutuplar birbirini çeker, ama anlaşmak zordur." },
    Balık: { score: 6, note: "Aslan'ın sıcaklığı Balık'ın hassasiyetini besler." },
  },
  Başak: {
    Başak: { score: 7, note: "İki Başak, düzenli ve analitik mükemmel bir ekip." },
    Terazi: { score: 5, note: "Başak'ın detaycılığı Terazi'nin genel bakışıyla çelişir." },
    Akrep: { score: 8, note: "İkisi de derin ve analitik, güçlü bir bağ." },
    Yay: { score: 4, note: "Başak'ın titizliği Yay'ın başıboşluğunu zorlar." },
    Oğlak: { score: 9, note: "İki toprak burcu, pratik, hırslı ve güvenilir." },
    Kova: { score: 5, note: "Başak'ın gelenekselliği Kova'nın sıradışılığıyla zorlanır." },
    Balık: { score: 6, note: "Zıt kutuplar, Başak'ın analizi Balık'ın sezgisini dengeler." },
  },
  Terazi: {
    Terazi: { score: 7, note: "İki Terazi, uyum ve güzellik odaklı dengeli bir ilişki." },
    Akrep: { score: 4, note: "Terazi'nin yumuşaklığı Akrep'in yoğunluğuyla sarsılır." },
    Yay: { score: 7, note: "Terazi'nin sosyalliği Yay'ın maceracılığıyla uyumlu." },
    Oğlak: { score: 5, note: "Terazi'nin hafifliği Oğlak'ın ağırlığıyla dengelenir." },
    Kova: { score: 9, note: "İki hava burcu, entelektüel ve sosyal mükemmel uyum." },
    Balık: { score: 5, note: "Terazi'nin mantığı Balık'ın duygusallığına uyum sağlar." },
  },
  Akrep: {
    Akrep: { score: 7, note: "İki Akrep, derin, tutkulu ve dönüştürücü bir bağ." },
    Yay: { score: 4, note: "Akrep'in yoğunluğu Yay'ın hafifliğini boğabilir." },
    Oğlak: { score: 8, note: "İkisi de hırslı ve kararlı, sağlam bir ortaklık." },
    Kova: { score: 3, note: "Akrep'in sahiplenmesi Kova'nın özgürlüğüyle çatışır." },
    Balık: { score: 9, note: "İki su burcu, sezgisel ve duygusal derin bir bağ." },
  },
  Yay: {
    Yay: { score: 7, note: "İki Yay, macera ve keşif dolu coşkulu bir ilişki." },
    Oğlak: { score: 4, note: "Yay'ın özgürlüğü Oğlak'ın disipliniyle sınırlanır." },
    Kova: { score: 8, note: "İkisi de özgür ruhlu, yenilikçi ve maceracı." },
    Balık: { score: 5, note: "Yay'ın iyimserliği Balık'ın hassasiyetini kaldırabilir." },
  },
  Oğlak: {
    Oğlak: { score: 7, note: "İki Oğlak, hırslı ve disiplinli sağlam bir yapı." },
    Kova: { score: 4, note: "Oğlak'ın muhafazakarlığı Kova'nın isyankarlığıyla çatışır." },
    Balık: { score: 7, note: "Oğlak'ın sağlamlığı Balık'ın hayallerini gerçeğe dönüştürür." },
  },
  Kova: {
    Kova: { score: 7, note: "İki Kova, özgürlükçü ve yenilikçi sıradışı bir bağ." },
    Balık: { score: 4, note: "Kova'nın zihinselliği Balık'ın duygusallığına uzak kalır." },
  },
  Balık: {
    Balık: { score: 7, note: "İki Balık, sezgisel ve yaratıcı derin bir ruhsal bağ." },
  },
};

function getZodiacDegree(p: PlanetPosition): number {
  const idx = ZODIAC_SIGNS.indexOf(p.sign);
  return idx * 30 + p.degree + p.minute / 60;
}

function getHouseNumber(lon: number, ascLon: number): number {
  const relLon = ((lon - ascLon) % 360 + 360) % 360;
  return Math.floor(relLon / 30) + 1;
}

function getAscendantLongitude(rising: PlanetPosition): number {
  const idx = ZODIAC_SIGNS.indexOf(rising.sign);
  return idx * 30 + rising.degree + rising.minute / 60;
}

export interface CrossAspect {
  planet1: string; sign1: ZodiacSign;
  planet2: string; sign2: ZodiacSign;
  type: string; degree: number; orb: number;
}

export interface BigThreeComparison {
  sun: { userSign: ZodiacSign; partnerSign: ZodiacSign; aspect: CrossAspect | null };
  moon: { userSign: ZodiacSign; partnerSign: ZodiacSign; aspect: CrossAspect | null };
  rising: { userSign: ZodiacSign; partnerSign: ZodiacSign; aspect: CrossAspect | null };
}

export interface HouseOverlay {
  houseNum: number;
  houseTitle: string;
  planets: string[];
}

export interface ElementScore {
  user: Record<string, number>;
  partner: Record<string, number>;
}

export interface CompatibilityScores {
  temel: number;
  ask: number;
  iletisim: number;
  tutku: number;
  uzunVade: number;
}

export interface SynastryResult {
  userChart: AstroChart;
  partnerChart: AstroChart;
  bigThree: BigThreeComparison;
  loveAspects: CrossAspect[];
  communicationAspects: CrossAspect[];
  growthAspects: CrossAspect[];
  challengingAspects: CrossAspect[];
  supportiveAspects: CrossAspect[];
  crossAspects: CrossAspect[];
  userHouseOverlays: HouseOverlay[];
  partnerHouseOverlays: HouseOverlay[];
  elementScore: ElementScore;
  sunCompatibility: { score: number; note: string } | null;
  moonCompatibility: { score: number; note: string } | null;
  compatibilityScores: CompatibilityScores;
}

export function calculateSynastry(
  userChart: AstroChart | null,
  partnerBirthDate: string,
  partnerBirthTime: string,
  partnerBirthPlace: string,
): SynastryResult | null {
  const partnerChart = calculateAstroChart(partnerBirthDate, partnerBirthTime, partnerBirthPlace);
  if (!userChart || !partnerChart) return null;

  const crossAspects: CrossAspect[] = [];
  const userBodies = [userChart.sun, userChart.moon, ...userChart.planets];
  const partnerBodies = [partnerChart.sun, partnerChart.moon, ...partnerChart.planets];

  for (const ub of userBodies) {
    for (const pb of partnerBodies) {
      const lon1 = getZodiacDegree(ub);
      const lon2 = getZodiacDegree(pb);
      let diff = Math.abs(lon1 - lon2);
      diff = Math.min(diff, 360 - diff);

      for (const asp of ASPECT_DEFS) {
        const orb = Math.abs(diff - asp.angle);
        if (orb <= asp.orb) {
          crossAspects.push({
            planet1: ub.name, sign1: ub.sign,
            planet2: pb.name, sign2: pb.sign,
            type: asp.type,
            degree: Math.round(diff * 10) / 10,
            orb: Math.round(orb * 10) / 10,
          });
          break;
        }
      }
    }
  }

  const findAspect = (p1: string, p2: string) => {
    const a = crossAspects.filter(a =>
      (a.planet1 === p1 && a.planet2 === p2) || (a.planet1 === p2 && a.planet2 === p1)
    );
    return a.length > 0 ? a[0] : null;
  };

  const bigThree: BigThreeComparison = {
    sun: { userSign: userChart.sun.sign, partnerSign: partnerChart.sun.sign, aspect: findAspect("Güneş", "Güneş") },
    moon: { userSign: userChart.moon.sign, partnerSign: partnerChart.moon.sign, aspect: findAspect("Ay", "Ay") },
    rising: { userSign: userChart.rising.sign, partnerSign: partnerChart.rising.sign, aspect: findAspect("Yükselen", "Yükselen") },
  };

  const lovePairs = [["Venüs", "Venüs"], ["Venüs", "Mars"], ["Mars", "Mars"]];
  const loveAspects = crossAspects.filter(a =>
    lovePairs.some(([p1, p2]) =>
      (a.planet1 === p1 && a.planet2 === p2) || (a.planet1 === p2 && a.planet2 === p1)
    )
  );

  const commPairs = [["Merkür", "Merkür"], ["Merkür", "Güneş"], ["Merkür", "Ay"]];
  const communicationAspects = crossAspects.filter(a =>
    commPairs.some(([p1, p2]) =>
      (a.planet1 === p1 && a.planet2 === p2) || (a.planet1 === p2 && a.planet2 === p1)
    )
  );

  const growthPairs = [["Jüpiter", "Jüpiter"], ["Satürn", "Satürn"]];
  const growthAspects = crossAspects.filter(a =>
    growthPairs.some(([p1, p2]) =>
      (a.planet1 === p1 && a.planet2 === p2) || (a.planet1 === p2 && a.planet2 === p1)
    )
  );

  const challengingAspects = crossAspects.filter(a =>
    (a.type === "Kare" || a.type === "Karşıt")
  );

  const supportiveAspects = crossAspects.filter(a =>
    a.type === "Kavuşum" || a.type === "Üçgen" || a.type === "Altmışlık"
  );

  const userAscLon = getAscendantLongitude(userChart.rising);
  const partnerAscLon = getAscendantLongitude(partnerChart.rising);

  const getHouseOverlays = (bodies: PlanetPosition[], ascLon: number): HouseOverlay[] => {
    const houses: HouseOverlay[] = Array.from({ length: 12 }, (_, i) => ({
      houseNum: i + 1,
      houseTitle: `${i + 1}. Ev`,
      planets: [],
    }));
    houses.forEach((h, i) => {
      const key = (i + 1) as keyof typeof HOUSE_MEANINGS;
      if (HOUSE_MEANINGS[key]) houses[i].houseTitle = HOUSE_MEANINGS[key].title;
    });
    for (const b of bodies) {
      const lon = getZodiacDegree(b);
      const hn = getHouseNumber(lon, ascLon);
      houses[hn - 1].planets.push(b.name);
    }
    return houses;
  };

  const userHouseOverlays = getHouseOverlays(partnerBodies, userAscLon);
  const partnerHouseOverlays = getHouseOverlays(userBodies, partnerAscLon);

  const getElementPoints = (chart: AstroChart) => {
    const weights: Record<string, number> = {
      Yükselen: 3, Güneş: 3, Ay: 3,
      Merkür: 1, Venüs: 1, Mars: 1, Jüpiter: 1, Satürn: 1,
    };
    const allBodies: { sign: ZodiacSign; name: string }[] = [
      chart.rising, chart.sun, chart.moon,
      ...chart.planets.filter(p => weights[p.name]),
    ];
    const pts: Record<string, number> = { Ateş: 0, Toprak: 0, Hava: 0, Su: 0 };
    for (const b of allBodies) {
      const el = ZODIAC_ELEMENTS[b.sign];
      const w = b.name === "Yükselen" || b.name === "Güneş" || b.name === "Ay" ? 3 : 1;
      if (pts[el] !== undefined) pts[el] += w;
    }
    return pts;
  };

  const elementScore: ElementScore = {
    user: getElementPoints(userChart),
    partner: getElementPoints(partnerChart),
  };

  const sunKey = partnerChart.sun.sign as string;
  const sunComp = SIGN_COMPAT[userChart.sun.sign]?.[sunKey] || null;

  const moonKey = partnerChart.moon.sign as string;
  const moonComp = SIGN_COMPAT[userChart.moon.sign]?.[moonKey] || null;

  function computeAspectScore(aspects: CrossAspect[], base: number, weights: Record<string, number>): number {
    let score = base;
    for (const a of aspects) {
      score += weights[a.type] || 0;
    }
    return Math.min(10, Math.max(0, Math.round(score)));
  }

  const compatibilityScores: CompatibilityScores = (() => {
    const compareSigns = (userSign: ZodiacSign, partnerSign: ZodiacSign): number => {
      const key = partnerSign as string;
      const entry = SIGN_COMPAT[userSign]?.[key] ?? SIGN_COMPAT[partnerSign]?.[userSign as string];
      if (entry) return 20 + Math.round(((entry.score - 3) / 6) * 80);
      const uEl = ZODIAC_ELEMENTS[userSign];
      const pEl = ZODIAC_ELEMENTS[partnerSign];
      const elScore = ELEMENT_COMPAT[uEl]?.[pEl] ?? 5;
      return 20 + Math.round(((elScore - 3) / 5) * 80);
    };

    const loveWeights: Record<string, number> = {
      Kavuşum: 2.5, Üçgen: 2.5, Altmışlık: 2, Kare: -1, Karşıt: 1,
    };
    const ask = computeAspectScore(loveAspects, 5, loveWeights);
    const iletisim = computeAspectScore(communicationAspects, 5, loveWeights);

    const passionPlanets = ["Mars", "Venüs", "Güneş"];
    const passionAspects = crossAspects.filter(a =>
      a.planet1 !== a.planet2 && passionPlanets.includes(a.planet1) && passionPlanets.includes(a.planet2)
    );
    const passionWeights: Record<string, number> = {
      Kavuşum: 2, Üçgen: 1.5, Altmışlık: 1, Kare: 0.5, Karşıt: 1.5,
    };
    const tutku = computeAspectScore(passionAspects, 5, passionWeights);

    const longTermWeights: Record<string, number> = {
      Kavuşum: 2.5, Üçgen: 2.5, Altmışlık: 2, Kare: -1, Karşıt: -1,
    };
    const uzunVade = computeAspectScore(growthAspects, 5, longTermWeights);

    const sunMoonRaw = (compareSigns(userChart.sun.sign, partnerChart.sun.sign) + compareSigns(userChart.moon.sign, partnerChart.moon.sign)) / 2;
    const sunMoonScore = sunMoonRaw / 10;
    const temel = Math.min(100, Math.max(0, Math.round((ask + iletisim + tutku + uzunVade + sunMoonScore) / 5 * 10)));

    return { temel, ask, iletisim, tutku, uzunVade };
  })();

  return {
    userChart,
    partnerChart,
    bigThree,
    loveAspects,
    communicationAspects,
    growthAspects,
    challengingAspects,
    supportiveAspects,
    crossAspects,
    userHouseOverlays,
    partnerHouseOverlays,
    elementScore,
    sunCompatibility: sunComp,
    moonCompatibility: moonComp,
    compatibilityScores,
  };
}
