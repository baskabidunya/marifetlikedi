import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function renderMarkdown(md: string): string {
  const renderer = new marked.Renderer();
  renderer.heading = function ({ text, depth }: { text: string; depth: number }) {
    const raw = typeof text === "string" ? text : String(text);
    const id = raw
      .toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/İ/g, "i").replace(/Ğ/g, "g").replace(/Ü/g, "u").replace(/Ş/g, "s").replace(/Ö/g, "o").replace(/Ç/g, "c")
      .replace(/<[^>]+>/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `<h${depth} id="${id}">${raw}</h${depth}>`;
  };
  return marked.parse(md ?? "", { async: false, renderer }) as string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TocItem {
  id: string;
  title: string;
}

export function extractTocItems(md: string): TocItem[] {
  if (!md) return [];
  const lines = md.split(/\r?\n/);
  const items: TocItem[] = [];
  for (const line of lines) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) {
      const title = h[1].trim();
      const id = title
        .toLowerCase()
        .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
        .replace(/İ/g, "i").replace(/Ğ/g, "g").replace(/Ü/g, "u").replace(/Ş/g, "s").replace(/Ö/g, "o").replace(/Ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      items.push({ id, title });
    }
  }
  return items;
}

export function extractFaqItems(md: string, limit = 8): FaqItem[] {
  if (!md) return [];
  const lines = md.split(/\r?\n/);
  const items: FaqItem[] = [];
  let current: FaqItem | null = null;
  for (const line of lines) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) {
      if (current) items.push(current);
      current = { question: h[1].trim(), answer: "" };
    } else if (current) {
      const t = line.trim();
      if (t) current.answer += (current.answer ? " " : "") + t;
    }
  }
  if (current) items.push(current);
  return items
    .filter((i) => i.question && i.answer.replace(/[#*_>`]/g, "").trim().length > 25)
    .map((i) => ({ question: i.question, answer: i.answer.replace(/[#*_>`]/g, "").trim() }))
    .slice(0, limit);
}
