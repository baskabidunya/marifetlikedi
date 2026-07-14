import type { ZodiacSign, PlanetName } from "./astro-utils";

const SIGN_TRAITS: Record<ZodiacSign, { element: string; quality: string; nature: string; positive: string; negative: string; keyword: string; ruler: string }> = {
  Koç: { element: "Ateş", quality: "Öncü", nature: "atılgan ve cesur", positive: "cesur, girişimci, lider", negative: "sabırsız, fevri, bencil", keyword: "ben", ruler: "Mars" },
  Boğa: { element: "Toprak", quality: "Sabit", nature: "kararlı ve sabırlı", positive: "güvenilir, sabırlı, sadık", negative: "inatçı, sahiplenici, tembel", keyword: "sahip olmak", ruler: "Venüs" },
  İkizler: { element: "Hava", quality: "Değişken", nature: "meraklı ve iletişimci", positive: "zeki, meraklı, uyumlu", negative: "yüzeysel, kararsız, huzursuz", keyword: "düşünmek", ruler: "Merkür" },
  Yengeç: { element: "Su", quality: "Öncü", nature: "duygusal ve koruyucu", positive: "sevgi dolu, şefkatli, sezgisel", negative: "aşırı duygusal, bağımlı, alıngan", keyword: "hissetmek", ruler: "Ay" },
  Aslan: { element: "Ateş", quality: "Sabit", nature: "gururlu ve cömert", positive: "cömert, yaratıcı, sadık", negative: "kibirli, gösterişçi, baskın", keyword: "ben yapacağım", ruler: "Güneş" },
  Başak: { element: "Toprak", quality: "Değişken", nature: "analitik ve detaycı", positive: "çalışkan, yardımsever, zeki", negative: "eleştirel, takıntılı, endişeli", keyword: "hizmet", ruler: "Merkür" },
  Terazi: { element: "Hava", quality: "Öncü", nature: "uyumlu ve diplomatik", positive: "sosyal, adil, zarif", negative: "kararsız, bağımlı, yüzeysel", keyword: "denge", ruler: "Venüs" },
  Akrep: { element: "Su", quality: "Sabit", nature: "tutkulu ve gizemli", positive: "kararlı, sezgisel, tutkulu", negative: "kıskanç, gizli, sahiplenici", keyword: "dönüşüm", ruler: "Plüton" },
  Yay: { element: "Ateş", quality: "Değişken", nature: "iyimser ve maceracı", positive: "özgür ruhlu, iyimser, dürüst", negative: "sabırsız, sorumsuz, patavatsız", keyword: "keşif", ruler: "Jüpiter" },
  Oğlak: { element: "Toprak", quality: "Öncü", nature: "hırslı ve disiplinli", positive: "sorumlu, hırslı, disiplinli", negative: "soğuk, karamsar, katı", keyword: "başarı", ruler: "Satürn" },
  Kova: { element: "Hava", quality: "Sabit", nature: "özgün ve bağımsız", positive: "yenilikçi, özgür, arkadaş canlısı", negative: "kopuk, asi, öngörülemez", keyword: "farkındalık", ruler: "Uranüs" },
  Balık: { element: "Su", quality: "Değişken", nature: "hayalperest ve şefkatli", positive: "sezgisel, yaratıcı, şefkatli", negative: "kaçakçı, kurban, bağımlı", keyword: "inanmak", ruler: "Neptün" },
};

const PLANET_NARRATIVES: Record<PlanetName, string> = {
  Güneş: "Öz benliğinizi, kimliğinizi ve hayattaki temel amacınızı temsil eder. Güneş'in bulunduğu burç, doğal olarak nasıl bir insan olduğunuzu ve dünyada nasıl parladığınızı gösterir. Kendinizi en rahat ifade ettiğiniz alan burasıdır.",
  Ay: "Duygusal dünyanızı, içgüdüsel tepkilerinizi ve bilinçaltı alışkanlıklarınızı yönetir. Ay'ın konumu, güvende hissetmek için nelere ihtiyaç duyduğunuzu ve duygusal olarak nasıl beslendiğinizi anlatır.",
  Merkür: "Zihninizi, iletişim biçiminizi ve öğrenme stilinizi belirler. Merkür'ün bulunduğu burç, nasıl düşündüğünüzü, konuştuğunuzu ve bilgiyi nasıl işlediğinizi gösterir.",
  Venüs: "Sevgi dilinizi, değer verdiklerinizi ve ilişkilerde nasıl davrandığınızı temsil eder. Venüs'ün konumu, sizi neyin mutlu ettiğini, güzellik anlayışınızı ve parayla ilişkinizi anlatır.",
  Mars: "Enerjinizi, tutkularınızı ve harekete geçme biçiminizi yönetir. Mars'ın bulunduğu burç, nasıl savaştığınızı, neyin sizi ateşlediğini ve arzularınızı nasıl ifade ettiğinizi gösterir.",
  Jüpiter: "Şans, bolluk ve genişleme alanınızı belirler. Jüpiter'in konumu, hayatta nerede büyüdüğünüzü, fırsatları nerede bulduğunuzu ve hangi alanda bilgelik kazandığınızı anlatır.",
  Satürn: "Hayat derslerinizi, sınırlamalarınızı ve en büyük meydan okumalarınızı temsil eder. Satürn'ün bulunduğu alan, en çok çalışmanız gereken ve sonunda en büyük ödülü alacağınız yerdir.",
  Uranüs: "Özgünlüğünüzü, isyan etme biçiminizi ve değişime açıklığınızı gösterir. Uranüs'ün konumu, hayatınızda nerede beklenmedik değişimler yaşayacağınızı ve özgürleşeceğinizi anlatır.",
  Neptün: "Hayallerinizi, sezgilerinizi, manevi yönünüzü ve yanılsamalarınızı temsil eder. Neptün'ün konumu, nerede ilham bulduğunuzu ve hangi alanda gerçeklikten kaçma eğiliminde olduğunuzu gösterir.",
  Plüton: "En derin dönüşümlerinizi, güç mücadelelerinizi ve yeniden doğuş alanlarınızı belirler. Plüton'un konumu, nerede kontrolü bırakıp dönüşmeyi öğreneceğinizi anlatır.",
  Yükselen: "Dış dünyaya gösterdiğiniz maske, ilk izlenim ve hayata yaklaşım biçiminiz. Yükselen burcunuz, başkalarının sizi ilk gördüğünde algıladığı kişiliktir. Zamanla Güneş burcunuzla bütünleşirsiniz.",
};

function houseName(num: number): string {
  const names: Record<number, string> = {
    1: "Yükselen", 2: "Para ve Değerler", 3: "İletişim", 4: "Aile ve Kökler",
    5: "Yaratıcılık ve Aşk", 6: "Sağlık ve Hizmet", 7: "Ortaklıklar", 8: "Dönüşüm",
    9: "Felsefe ve Seyahat", 10: "Kariyer", 11: "Arkadaşlıklar", 12: "Bilinçaltı",
  };
  return names[num] || `${num}. Ev`;
}

export function getHouseNarrative(houseNum: number, sign: ZodiacSign): string {
  const t = SIGN_TRAITS[sign];
  const hname = houseName(houseNum);

  const narratives: Record<number, (s: ZodiacSign, t: typeof SIGN_TRAITS[ZodiacSign]) => string> = {
    1: (s, t) =>
      `${s} burcu yükselen olduğunda, dış dünyaya ${t.nature} bir izlenim verirsiniz. Hayata "${t.keyword}" bilinciyle yaklaşır, kendinizi ${t.positive} yönlerinizle ifade edersiniz. Fiziksel görünümünüz ve doğal tavrınız ${t.nature} bir enerji yansıtır. Başkaları sizi ilk tanıdığında ${t.nature} biri olarak algılar. Zamanla ${t.negative} eğilimlerinizi fark edip dengelemeyi öğrenirsiniz. ${t.element} elementi sayesinde ${s} burcunun bu özelliklerini yaşam boyu taşırsınız.`,
    2: (s, t) =>
      `2. eviniz ${s} burcunda olduğu için paraya ve maddi değerlere ${t.nature} bir yaklaşımınız var. ${t.positive} özelliklerinizi kullanarak gelir elde eder, ${t.negative} eğilimleriniz yüzünden maddi konularda zorlanabilirsiniz. ${t.keyword} kelimesi sizin için maddi güvenlikle de bağlantılıdır. ${t.element} elementi bu evin konularını ${t.nature} bir enerjiyle yönetmenizi sağlar. Harcama alışkanlıklarınız ve yetenekleriniz ${s} burcunun doğasından izler taşır.`,
    3: (s, t) =>
      `3. eviniz ${s} burcunda olduğu için iletişim tarzınız ${t.nature} bir karaktere sahip. Konuşma biçiminiz, öğrenme stiliniz ve yakın çevrenizle ilişkileriniz ${s} burcunun ${t.nature} enerjisini yansıtır. ${t.positive} yönleriniz sayesinde çevrenizle ${t.nature} bir iletişim kurar, ${t.negative} eğilimleriniz yüzünden bazı iletişim zorlukları yaşayabilirsiniz. Zihinsel olarak en çok ${t.keyword} alanında aktiftir. Kardeşleriniz, komşularınız ve yakın arkadaşlarınızla ilişkileriniz ${s} burcunun dinamiklerini taşır.`,
    4: (s, t) =>
      `4. eviniz ${s} burcunda olduğu için ev hayatınıza ve aile köklerinize ${t.nature} bir şekilde bağlanırsınız. Çocukluk anılarınız, aile geçmişiniz ve ev ortamınız ${s} burcunun ${t.nature} doğasını yansıtır. ${t.positive} özelliklerinizle ailenize ${t.nature} bir destek sunar, ${t.negative} eğilimleriniz ev hayatınızda zorluk yaratabilir. İç dünyanızda ${s} burcunun ${t.keyword} enerjisiyle kendinizi güvende hissedersiniz. Son yıllarınız ve emeklilik döneminiz ${t.element} elementinin niteliklerini taşır.`,
    5: (s, t) =>
      `5. eviniz ${s} burcunda olduğu için yaratıcılığınız ve eğlence anlayışınız ${t.nature} bir tarz taşır. Romantik ilişkilerinizde ${t.nature} davranır, hobilerinizde ${t.positive} yönlerinizi ortaya koyarsınız. Çocuklarla ilişkiniz ve ebeveynlik tarzınız ${s} burcunun doğasından izler taşır. ${t.negative} eğilimleriniz riskli davranışlara veya aşırılığa yol açabilir. ${t.element} elementi size yaratıcılıkta ${t.nature} bir ifade gücü verir. Hayattan zevk alış biçiminiz ${s} burcunun ${t.keyword} enerjisiyle renklenir.`,
    6: (s, t) =>
      `6. eviniz ${s} burcunda olduğu için iş hayatınıza ve sağlık alışkanlıklarınıza ${t.nature} bir yaklaşımınız var. Günlük rutinlerinizi ${t.positive} yönlerinizle düzenler, ${t.negative} eğilimleriniz yüzünden iş yerinde zorlanabilirsiniz. ${t.element} elementi size sağlık ve fitness konusunda ${t.nature} bir tutku verir. Hizmet etme biçiminiz ve iş arkadaşlarınızla ilişkileriniz ${s} burcunun doğasını yansıtır. ${t.keyword} motivasyonunuz iş hayatınızda ${t.nature} bir şekilde ortaya çıkar.`,
    7: (s, t) =>
      `7. eviniz ${s} burcunda olduğu için ilişkilerinize ve ortaklıklarınıza ${t.nature} bir enerji katarsınız. Partner seçiminizde ${t.positive} özellikler arayan biri olarak, ${t.negative} eğilimleriniz ilişkilerinizde zorluk yaratabilir. Evlilik, iş ortaklıkları ve birebir ilişkileriniz ${s} burcunun ${t.nature} doğasını yansıtır. ${t.keyword} dengesini ilişkilerinizde kurmaya çalışırsınız. ${t.element} elementi sayesinde ortaklıklarınıza ${t.nature} bir boyut katarsınız.`,
    8: (s, t) =>
      `8. eviniz ${s} burcunda olduğu için dönüşüm ve derin psikolojik konulara ${t.nature} bir yaklaşımınız var. Kriz anlarında ${t.positive} yönlerinizle başa çıkar, ${t.negative} eğilimleriniz yüzünden süreçleri zorlaştırabilirsiniz. Miras, başkalarının kaynakları ve cinsellik konularında ${s} burcunun ${t.nature} enerjisi belirleyicidir. ${t.keyword} arayışınız en derin dönüşümlerinizde ${t.nature} bir rol oynar. ${t.element} elementi size dönüşüm gücü verir.`,
    9: (s, t) =>
      `9. eviniz ${s} burcunda olduğu için felsefeniz ve dünya görüşünüz ${t.nature} bir karakter taşır. Seyahat anlayışınız, yüksek öğrenime yaklaşımınız ve inanç sisteminiz ${s} burcunun ${t.nature} doğasını yansıtır. ${t.positive} özelliklerinizle hayatı geniş bir perspektiften görür, ${t.negative} eğilimleriniz yüzünden dar görüşlü olabilirsiniz. ${t.keyword} alanındaki arayışınız ${t.nature} bir tutkuyla sürer. ${t.element} elementi size bilgelik yolunda ${t.nature} bir rehberlik eder.`,
    10: (s, t) =>
      `10. eviniz ${s} burcunda olduğu için kariyerinize ve toplumsal konumunuza ${t.nature} bir yaklaşımınız var. Mesleki hedeflerinizi ${t.positive} yönlerinizle inşa eder, ${t.negative} eğilimleriniz yüzünden profesyonel hayatta engellerle karşılaşabilirsiniz. ${t.keyword} motivasyonu kariyer yolculuğunuzda ${t.nature} bir itici güçtür. ${s} burcunun ${t.nature} enerjisi, toplumdaki yerinizi ve başarı anlayışınızı şekillendirir. ${t.element} elementi size mesleki alanda ${t.nature} bir duruş kazandırır.`,
    11: (s, t) =>
      `11. eviniz ${s} burcunda olduğu için arkadaşlıklarınıza ve sosyal çevrenize ${t.nature} bir enerjiyle yaklaşırsınız. İdealleriniz, umutlarınız ve toplumsal vizyonunuz ${s} burcunun ${t.nature} doğasını yansıtır. ${t.positive} özellikleriniz sayesinde arkadaş grubunuza ${t.nature} bir katkı sunar, ${t.negative} eğilimleriniz sosyal çevrenizde sorun yaratabilir. ${t.keyword} kavramı, arkadaşlık ilişkilerinizde ${t.nature} bir şekilde ortaya çıkar. ${t.element} elementi dostluk bağlarınızı ${t.nature} bir şekilde güçlendirir.`,
    12: (s, t) =>
      `12. eviniz ${s} burcunda olduğu için bilinçaltı dünyanız ve manevi yolculuğunuz ${t.nature} bir karakter taşır. Yalnızlık anlarınızda ${t.positive} yönlerinizle huzur bulur, ${t.negative} eğilimleriniz yüzünden kaçış davranışları geliştirebilirsiniz. Gizli yetenekleriniz, psişik duyarlılığınız ve karma konuları ${s} burcunun ${t.nature} enerjisiyle bağlantılıdır. ${t.keyword} arayışınız ruhsal yolculuğunuzda ${t.nature} bir boyut kazanır. ${t.element} elementi içinize dönüşlerinizde ${t.nature} bir rehberdir.`,
  };

  const fn = narratives[houseNum];
  if (fn) return fn(sign, t);

  return `${houseNum}. eviniz ${sign} burcunda olduğu için bu evin konularına ${t.nature} bir yaklaşımınız var. ${t.positive} yönleriniz bu alanda size avantaj sağlarken, ${t.negative} eğilimleriniz zorluk yaratabilir. ${t.element} elementi bu evin dinamiklerini ${t.nature} bir şekilde etkiler. ${sign} burcunun yöneticisi ${t.ruler} gezegeni bu evdeki deneyimlerinizi şekillendirir.`;
}

export function getPlanetNarrative(planet: PlanetName, sign: ZodiacSign): string {
  const t = SIGN_TRAITS[sign];
  const base = PLANET_NARRATIVES[planet] || "";
  const signText = `${planet} ${sign} burcunda yer alıyor. Bu konum, ${base ? base.split(".")[0].toLowerCase() + (base ? base.split(".").slice(1).join(".") : "") : "hayatınızın bu alanında"} ${t.nature} bir şekilde ifade bulur. ${t.positive} özellikleriniz bu gezegenin enerjisini güçlendirirken, ${t.negative} eğilimleriniz gezegenin zor yönlerini ortaya çıkarabilir. ${sign} burcunun yöneticisi ${t.ruler} olduğu için bu gezegenin ifadesi ${t.nature} bir karakter taşır. ${t.element} elementi bu gezegenin enerjisini ${t.nature} bir yöne kanalize eder.`;

  return `**${planet} ${sign} Burcunda**\n\n${signText}`;
}

export function getRisingNarrative(sign: ZodiacSign): string {
  const t = SIGN_TRAITS[sign];
  return `${sign} burcu yükseldiğinde, dış dünyaya ${t.nature} bir izlenim verirsiniz. İnsanlar sizi ilk tanıdığında ${t.positive} özelliklerinizi fark eder, zamanla ${t.negative} eğilimlerinizi de görürler. Hayata "${t.keyword}" bilinciyle yaklaşır, kendinizi ${t.nature} bir şekilde ifade edersiniz.\n\n${t.element} elementi sayesinde doğal olarak ${t.nature} bir enerjiniz vardır. Yönetici gezegeniniz ${t.ruler} olduğu için, bu gezegenin hareketleri sizi doğrudan etkiler. Yaş aldıkça ${sign} burcunun olumlu özelliklerini daha bilinçli kullanmayı öğrenir, olumsuz yönlerinizi dengelemeye başlarsınız.`;
}

export function getAspectNarrative(type: string, p1: PlanetName, p2: PlanetName, degree: number): string {
  const aspectMeanings: Record<string, string> = {
    "Kavuşum": `${p1} ve ${p2} kavuşum halinde, yani aynı bölgede birleşiyorlar. Bu iki gezegenin enerjisi tek bir odakta toplanır, bu da size ${p1} ve ${p2} konularında yoğun bir güç verir. Ancak enerjiler o kadar iç içedir ki bazen hangisinin sizi yönettiğini ayırt etmek zor olabilir. ${degree}°\'lik bu birleşim, her iki gezegenin özelliklerini güçlü bir şekilde bir araya getirir.`,
    "Altmışlık": `${p1} ve ${p2} arasındaki altmışlık açı, doğal bir uyum ve işbirliği gösterir. Bu iki gezegenin enerjisi birbirini destekler ve kolayca akar. ${degree}°\'lik bu olumlu açı sayesinde ${p1} ve ${p2} konularında yeteneklerinizi rahatça kullanabilir, fırsatları değerlendirebilirsiniz. Bu uyumlu etkileşim, çaba gerektirmeden hayatınıza kolaylık getirir.`,
    "Kare": `${p1} ve ${p2} arasındaki kare açı, bir gerilim ve mücadele alanıdır. Bu iki gezegen birbirine zorlayıcı bir açıyla bakar, aralarında bir çatışma vardır. ${degree}°\'lik bu gergin açı, sizi bu konularda çalışmaya, büyümeye ve denge bulmaya zorlar. İlk başta engel gibi görünse de, kare açılar hayatınızda en çok geliştiğiniz alanları temsil eder.`,
    "Üçgen": `${p1} ve ${p2} arasındaki üçgen açı, doğuştan gelen bir yetenek ve uyumu işaret eder. ${degree}°\'lik bu olumlu açı sayesinde ${p1} ve ${p2} enerjileri arasında zahmetsiz bir akış vardır. Bu konularda doğal bir yeteneğiniz vardır ve bu alanlarda rahatça başarılı olursunuz. Hiç çaba harcamadan kullanabildiğiniz bu yetenekler sizin en güçlü yanlarınızdan biridir.`,
    "Karşıt": `${p1} ve ${p2} arasındaki karşıt açı, bir denge ve tamamlanma ihtiyacını gösterir. Bu iki gezegen zıt kutuplardadır ve birbirini dengelemeye çalışır. ${degree}°\'lik bu açı, içsel bir gerilim yaratır ve sizi bu iki enerji arasında bir orta yol bulmaya iter. İlişkiler ve ortaklıklar bu açının etkisini en çok hissettirdiği alanlardır.`,
  };

  return aspectMeanings[type] || `${p1} ve ${p2} arasında ${type} açı bulunuyor. ${degree}°\'lik bu açı, iki gezegenin enerjileri arasındaki etkileşimi temsil eder ve doğum haritanızda önemli bir dinamik oluşturur.`;
}

export function getPlanetInHouseNarrative(planet: PlanetName, sign: ZodiacSign, house: number): string {
  const hn = houseName(house);
  const t = SIGN_TRAITS[sign];
  const planetBase = PLANET_NARRATIVES[planet]?.split(".")[0] || "";

  let narrative = `${planet} gezegeni ${sign} burcunda ve ${hn} konumunda. ${planet}${planetBase ? ": " + planetBase.toLowerCase() + "." : ""} Bu gezegen ${sign} burcunun ${t.nature} doğasıyla ${hn} alanında ifade bulur.`;

  narrative += `\n\n${sign} burcunun ${t.nature} enerjisi sayesinde, ${hn} alanında ${t.positive} özelliklerinizi kullanarak başarılı olabilirsiniz. ${t.negative} eğilimleriniz bu alanda bazı zorluklar yaratabilir. ${t.element} elementi, bu gezegenin ${hn} konularına ${t.nature} bir yaklaşım getirmesini sağlar.`;

  return narrative;
}

export { SIGN_TRAITS, PLANET_NARRATIVES };
