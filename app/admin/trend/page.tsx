import { getTrendArticles } from "@/lib/admin";
import TrendArticleList from "@/components/admin/TrendArticleList";
import TrendForm from "./TrendForm";

export default async function AdminTrendPage() {
  const articles = await getTrendArticles();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Trend İçerikler</h1>
        <p className="text-caption text-outline mt-0.5">{articles.length} içerik</p>
      </div>

      <TrendForm />

      <TrendArticleList articles={articles} />
    </div>
  );
}
