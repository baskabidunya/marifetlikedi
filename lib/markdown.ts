import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function renderMarkdown(md: string): string {
  return marked.parse(md ?? "", { async: false }) as string;
}

export interface FaqItem {
  question: string;
  answer: string;
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
