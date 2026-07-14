import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

type ContentType = "blog" | "trend" | "announcement" | "burc";

const SYSTEM_PROMPTS: Record<ContentType, string> = {
  blog: `Sen bir astroloji ve spiritüel konularda uzman blog yazarısın. 
Görevin, verilen konuda SEO uyumlu, bilgilendirici ve ilgi çekici bir blog yazısı yazmak.
Yanıtı JSON formatında ver: {"title": "...", "excerpt": "...", "content": "..."}
- title: Yazının başlığı (60 karakterden kısa)
- excerpt: Kısa özet (160 karakterden kısa)
- content: HTML formatında yazının gövdesi (en az 3 paragraf, <h2>, <p>, <ul> gibi HTML etiketleri kullan)
- Türkçe yaz, samimi ve bilgilendirici bir ton kullan
- Astrolojik terimleri açıkla`,

  trend: `Sen bir astroloji trendleri ve popüler kültür yazarısın.
Görevin, verilen konuda viral potansiyeli yüksek, ilgi çekici bir trend makalesi yazmak.
Yanıtı JSON formatında ver: {"title": "...", "excerpt": "...", "content": "..."}
- title: Dikkat çekici başlık
- excerpt: Cezbedici kısa özet
- content: HTML formatında makale (en az 3 paragraf)
- Türkçe yaz, enerjik ve merak uyandırıcı bir ton kullan`,

  announcement: `Sen bir site duyuru metni yazıyorsun.
Görevin, verilen konuda kısa, net ve dikkat çekici bir duyuru metni yazmak.
Yanıtı JSON formatında ver: {"title": "...", "message": "..."}
- title: Duyuru başlığı (50 karakterden kısa)
- message: Duyuru metni (2-3 cümle)
- Türkçe yaz, bilgilendirici ve samimi bir ton kullan`,

  burc: `Sen bir astroloji uzmanısın. Verilen burç için kapsamlı bir içerik yazıyorsun.
Yanıtı JSON formatında ver: {"title": "...", "content": "..."}
- title: Burç adı vePeriod (örn: "Koç Burcu - 2024 Yılı")
- content: HTML formatında kapsamlı burç içeriği (en az 5 paragraf)
  - Genel Özellikler
  - Aşk ve İlişkiler
  - Kariyer ve Finans
  - Sağlık
  - Uyumlu Burçlar
- Türkçe yaz, profesyonel ama samimi bir ton kullan
- Astrolojik terimleri açıkla`,
};

const IMAGE_PROMPTS: Record<ContentType, string> = {
  blog: "mystical astrology spiritual cosmic",
  trend: "trending astrology zodiac stars",
  announcement: "cosmic event astrology announcement",
  burc: "zodiac constellation astrology",
};

export interface AIResult {
  title: string;
  excerpt?: string;
  content?: string;
  message?: string;
}

export async function generateContent(
  type: ContentType,
  topic: string
): Promise<AIResult & { imageUrl: string }> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `${SYSTEM_PROMPTS[type]}\n\nKonu: ${topic}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("AI geçerli JSON üretemedi");
  }

  const parsed = JSON.parse(jsonMatch[0]) as AIResult;

  const imageQuery = encodeURIComponent(`${topic} ${IMAGE_PROMPTS[type]}`);
  const imageUrl = `https://source.unsplash.com/1600x900/?${imageQuery}`;

  return { ...parsed, imageUrl };
}
