import { getTrendArticles } from "@/lib/admin";
import TrendArticleList from "@/components/admin/TrendArticleList";
import TrendForm from "./TrendForm";
import AdminSearchBox from "@/components/admin/AdminSearchBox";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminTrendPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const allArticles = await getTrendArticles();
  const articles = q
    ? allArticles.filter(a => a.title.toLowerCase().includes(q.toLowerCase()))
    : allArticles;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-headline-md font-headline-md text-on-surface">Trend İçerikler</h1>
          <p className="text-caption text-outline mt-0.5">{articles.length} içerik</p>
        </div>
        <AdminSearchBox />
      </div>

      <TrendForm />

      <TrendArticleList articles={articles} />
    </div>
  );
}
