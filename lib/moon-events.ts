import * as Astronomy from "astronomy-engine";
import { ZODIAC_SIGNS, type ZodiacSign } from "./astro-utils";

export type MoonEventKind = "yeni-ay" | "dolunay";

export interface AspectInfo {
  key: string;
  label: string;
  desc: string;
}

/** Olay gününe yakın gerçek yeni ay / dolunay anındaki Ay burcu. */
export function getEventMoonSign(year: number, month: number, day: number, kind: MoonEventKind): ZodiacSign {
  const start = new Date(Date.UTC(year, month, day - 5, 0, 0, 0));
  const found = Astronomy.SearchMoonPhase(kind === "yeni-ay" ? 0 : 180, Astronomy.MakeTime(start), 15);
  const at = found ? found.date : new Date(Date.UTC(year, month, day, 12, 0, 0));
  const lon = Astronomy.EclipticGeoMoon(Astronomy.MakeTime(at)).lon;
  const idx = Math.floor((((lon % 360) + 360) % 360) / 30) % 12;
  return ZODIAC_SIGNS[idx];
}

/** Ay burcu ile hedef burç arasındaki açı ilişkisi (0-11 fark üzerinden). */
export function aspectOf(moonSign: ZodiacSign, targetSign: ZodiacSign): AspectInfo {
  const diff = (((ZODIAC_SIGNS.indexOf(targetSign) - ZODIAC_SIGNS.indexOf(moonSign)) % 12) + 12) % 12;
  if (diff === 0) return { key: "same", label: "Kavuşum", desc: "aynı burçta" };
  if (diff === 6) return { key: "opposite", label: "Karşıt", desc: "denge arayan" };
  if (diff === 4 || diff === 8) return { key: "trine", label: "Üçgen", desc: "uyumlu akış" };
  if (diff === 3 || diff === 9) return { key: "square", label: "Kare", desc: "gerilimli" };
  if (diff === 2 || diff === 10) return { key: "sextile", label: "Altmışlık", desc: "fırsat getiren" };
  if (diff === 1 || diff === 11) return { key: "semisextile", label: "30° Açı", desc: "ince ayar" };
  return { key: "quincunx", label: "150° Açı", desc: "ayar gerektiren" };
}

const NEW_MOON_TEXTS: Record<string, string> = {
  same: "{A} burcundaki bu yeni ay doğrudan senin burcunda doğuyor; bu ay senin kişisel yeni yılın gibi. Dış görünüşünden hedeflerine kadar kendini yeniden tanımlamak için en güçlü dönemdesin. Niyetlerini yaz, ilk adımı bu hafta at; gökyüzü seninle aynı hizada.",
  opposite:
    "{A} burcundaki yeni ay, karşıt burcun {H} için ilişkiler evini aydınlatıyor. Bu ay odağın 'ben' değil 'biz' olacak: ortaklıklar ve yakın dostluklarda yeni bir sayfa açılıyor. Bekleyen bir konuşma varsa şimdi yap; dengeyi yeniden kurmak için gökyüzü seni destekliyor.",
  trine:
    "{A} burcundaki yeni ay, {H} burcuna üçgen açıyla akıyor; bu ay şans senden yana. Çaba harcamadan ilerleyen işler, kendiliğinden gelen fırsatlar seni bulacak. Yine de gelen fırsatı değerlendirmek sana düşüyor: kapı açık, içeri girmek senin işin.",
  square:
    "{A} burcundaki yeni ay, {H} burcuna kare açı yapıyor; bu ay biraz sürtünme var. Planların istediğin hızda ilerlemeyebilir, fikir ayrılıkları yaşanabilir. Ama kare açılar büyütür: engelleri aşarken güçlenirsin. Sabırlı ol, direksiyonu bırakma.",
  sextile:
    "{A} burcundaki yeni ay, {H} burcuna altmışlık açıyla küçük ama değerli fırsatlar sunuyor. Büyük mucizeler değil; doğru zamanda gelen telefon, tanışma ve fikirler bekle. Gözün açık olsun, bu ayın hediyeleri sessizce geliyor.",
  semisextile:
    "{A} burcundaki yeni ay, komşu burcun {H} için ince bir ayar dönemi. Büyük kararlar yerine küçük düzeltmeler yap: rutinlerini ve günlük düzenini gözden geçir. Küçük vidaları sıkmak bu ay büyük fark yaratacak.",
  quincunx:
    "{A} burcundaki yeni ay, {H} burcuna alışılmadık bir açıdan geliyor. Bu ay planlarınla gerçekler uyuşmayabilir; esnek ol, B planını hazır tut. Alışkanlıklarının dışına çıkmak sana beklediğinden çok şey kazandırabilir.",
};

const FULL_MOON_TEXTS: Record<string, string> = {
  same: "Dolunay senin burcunda parlıyor {H}: bu ay sahne senin. Duyguların zirvede, gerçekler gün yüzünde. İki haftadır büyüyen bir konu bu dolunayda sonuçlanıyor. Kendini göstermekten çekinme ama fevri tepkilerden kaçın; ışığın hem aydınlatır hem yakar.",
  opposite:
    "{A} burcundaki dolunay, karşıt burcun {H} için ilişkilerde bir dönüm noktası. Bir ortaklıkta perde aralanıyor: ya bağ güçleniyor ya da gerçekler konuşuluyor. Duygusal kararları dolunay gecesi değil, bir gün sonra ver.",
  trine:
    "{A} burcundaki dolunay, {H} burcuna uyumlu akıyor; emeklerinin karşılığını toplama zamanı. Başlattığın bir iş meyvesini veriyor, bir dileğin gerçek oluyor. Şükretmeyi unutma; minnet, bu dolunayın bereketini katlar.",
  square:
    "{A} burcundaki dolunay, {H} burcuna kare açı yapıyor; tansiyon yüksek. İş ya da aile cephesinde bir gerilim zirveye çıkabilir. Bu enerji yıkım için değil, düğümü çözmek için var: sakin kal, net konuş, fevri davranma.",
  sextile:
    "{A} burcundaki dolunay, {H} burcuna küçük bir aydınlanma getiriyor. Kafanı kurcalayan bir sorunun cevabı bu günlerde kendiliğinden beliriyor. Günlük tut, rüyalarına dikkat et; mesajlar ince detaylarda saklı.",
  semisextile:
    "{A} burcundaki dolunay, komşu burcun {H} için sağlık ve rutinleri aydınlatıyor. Bedenin sana bir şey söylüyor olabilir: uyku ve tempo. Bu dolunayda kendine verdiğin sözleri tutmak, önümüzdeki haftaları kolaylaştırır.",
  quincunx:
    "{A} burcundaki dolunay, {H} burcuna alışılmadık bir açıdan yansıyor; bir şeyler 'tam oturmuyor' hissi verebilir. Zorlama: bu dolunay anlamak için değil, bırakmak için. Kontrolü gevşet, akışa güven.",
};

/** Belirli bir olayda hedef burca özel yorum metni üretir. */
export function interpret(kind: MoonEventKind, moonSign: ZodiacSign, targetSign: ZodiacSign): { aspect: AspectInfo; text: string } {
  const aspect = aspectOf(moonSign, targetSign);
  const tpl = (kind === "yeni-ay" ? NEW_MOON_TEXTS : FULL_MOON_TEXTS)[aspect.key];
  const text = tpl.split("{A}").join(moonSign).split("{H}").join(targetSign);
  return { aspect, text };
}
