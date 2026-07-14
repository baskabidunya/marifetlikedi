export interface ZodiacUi {
  emoji: string;
  element: string;
  ruler: string;
  quality: string;
  color: string;
  textColor: string;
}

export const ZODIAC_UI: Record<string, ZodiacUi> = {
  "Koç": { emoji: "♈︎", element: "Ateş", ruler: "Mars", quality: "Öncü", color: "bg-red-900/20 border-red-500/30", textColor: "text-red-400" },
  "Boğa": { emoji: "♉︎", element: "Toprak", ruler: "Venüs", quality: "Sabit", color: "bg-emerald-900/20 border-emerald-500/30", textColor: "text-emerald-400" },
  "İkizler": { emoji: "♊︎", element: "Hava", ruler: "Merkür", quality: "Değişken", color: "bg-amber-900/20 border-amber-500/30", textColor: "text-amber-400" },
  "Yengeç": { emoji: "♋︎", element: "Su", ruler: "Ay", quality: "Öncü", color: "bg-cyan-900/20 border-cyan-500/30", textColor: "text-cyan-400" },
  "Aslan": { emoji: "♌︎", element: "Ateş", ruler: "Güneş", quality: "Sabit", color: "bg-orange-900/20 border-orange-500/30", textColor: "text-orange-400" },
  "Başak": { emoji: "♍︎", element: "Toprak", ruler: "Merkür", quality: "Değişken", color: "bg-lime-900/20 border-lime-500/30", textColor: "text-lime-400" },
  "Terazi": { emoji: "♎︎", element: "Hava", ruler: "Venüs", quality: "Öncü", color: "bg-rose-900/20 border-rose-500/30", textColor: "text-rose-400" },
  "Akrep": { emoji: "♏︎", element: "Su", ruler: "Plüton", quality: "Sabit", color: "bg-purple-900/20 border-purple-500/30", textColor: "text-purple-400" },
  "Yay": { emoji: "♐︎", element: "Ateş", ruler: "Jüpiter", quality: "Değişken", color: "bg-indigo-900/20 border-indigo-500/30", textColor: "text-indigo-400" },
  "Oğlak": { emoji: "♑︎", element: "Toprak", ruler: "Satürn", quality: "Öncü", color: "bg-slate-800/40 border-slate-500/30", textColor: "text-slate-300" },
  "Kova": { emoji: "♒︎", element: "Hava", ruler: "Uranüs", quality: "Sabit", color: "bg-sky-900/20 border-sky-500/30", textColor: "text-sky-400" },
  "Balık": { emoji: "♓︎", element: "Su", ruler: "Neptün", quality: "Değişken", color: "bg-violet-900/20 border-violet-500/30", textColor: "text-violet-400" },
};

export function elementBadgeClass(element: string): string {
  switch (element) {
    case "Ateş": return "bg-red-500/15 text-red-300 border border-red-500/30";
    case "Toprak": return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
    case "Hava": return "bg-sky-500/15 text-sky-300 border border-sky-500/30";
    case "Su": return "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30";
    default: return "bg-white/10 text-on-surface-variant border border-white/10";
  }
}

export const SIGN_DESCRIPTIONS: Record<string, string> = {
  "Koç": "Cesur, lider ruhlu ve girişimci. Kendini kanıtlama ihtiyacı ve güçlü bir iradeye sahipsin.",
  "Boğa": "Kararlı, güvenilir ve pratik. Maddi ve duygusal güvenliğe önem verirsin.",
  "İkizler": "Meraklı, iletişimci ve uyumlu. Zihinsel özgürlük senin için önemli.",
  "Yengeç": "Şefkatli, sezgisel ve korumacı. Duygusal bağlar hayatının merkezinde.",
  "Aslan": "Yaratıcı, cömert ve karizmatik. Kendini ifade etmeyi ve takdir edilmeyi seversin.",
  "Başak": "Analitik, titiz ve yardımsever. Detaylara önem verir, hizmet etmeyi seversin.",
  "Terazi": "Dengeli, diplomatik ve estetik odaklı. Uyum ve ortaklık senin için değerli.",
  "Akrep": "Tutkulu, sezgisel ve derin. Yoğun duygular ve dönüşüm seni besler.",
  "Yay": "Özgür, iyimser ve maceraperest. Bilgelik ve keşif peşinde koşarsın.",
  "Oğlak": "Disiplinli, hırslı ve sorumlu. Uzun vadeli hedeflere kararlılıkla ilerlersin.",
  "Kova": "Özgün, bağımsız ve ilerici. Yenilikçi fikirler ve özgürlük senin alanın.",
  "Balık": "Şefkatli, sezgisel ve hayalperest. Sanatsal ve ruhsal derinlik seni çeker.",
};

export const RISING_DESCRIPTIONS: Record<string, string> = {
  "Koç": "Doğrudan, atılgan ve enerjik bir duruş sergilersin. İlk izlenimde cesur ve girişimci algılanırsın.",
  "Boğa": "Sakin, kararlı ve güven veren bir aura yayarsın. İlk izlenimde güvenilir görünürsün.",
  "İkizler": "Konuşkan, hareketli ve meraklı bir enerji verirsin. Sosyal ve zihinsel ilk izlenim bırakırsın.",
  "Yengeç": "Sıcak, koruyucu ve duygusal bir yaklaşımın vardır. Şefkatli bir ilk izlenim bırakırsın.",
  "Aslan": "Karizmatik, sıcak ve gösterişli bir varlık sergilersin. Odak noktası olmayı seversin.",
  "Başak": "Düzenli, mütevazı ve özenli görünürsün. Analitik ve güven veren bir ilk izlenim bırakırsın.",
  "Terazi": "Zarif, nazik ve dengeli bir duruşun vardır. Uyumlu ve estetik bir ilk izlenim bırakırsın.",
  "Akrep": "Gizemli, yoğun ve etkileyici bir enerji verirsin. Derin ve güçlü bir ilk izlenim bırakırsın.",
  "Yay": "Açık, iyimser ve maceraperest bir tavrın vardır. Özgür ve sıcak bir ilk izlenim bırakırsın.",
  "Oğlak": "Otokratik, sorumlu ve olgun görünürsün. Disiplinli ve güven veren bir ilk izlenim bırakırsın.",
  "Kova": "Sıradışı, bağımsız ve modern bir enerji verirsin. Özgün bir ilk izlenim bırakırsın.",
  "Balık": "Hayalperest, şefkatli ve sezgisel bir aura yayarsın. Yumuşak ve ruhsal bir ilk izlenim bırakırsın.",
};
