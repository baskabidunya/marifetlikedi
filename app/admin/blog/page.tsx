import Link from "next/link";
import { getBlogPosts, deleteBlogPost } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";
import BlogPageHeader from "./BlogPageHeader";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminBlogPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const allPosts = await getBlogPosts();
  const posts = q
    ? allPosts.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
    : allPosts;

  return (
    <div>
      <BlogPageHeader count={posts.length} />

      <div className="bg-surface-container/50 rounded-2xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-2.5 text-caption font-label-md text-outline">Başlık</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden sm:table-cell">Kategori</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden md:table-cell">Durum</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline hidden lg:table-cell">Tarih</th>
              <th className="px-4 py-2.5 text-caption font-label-md text-outline"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-2.5">
                  <Link href={`/admin/blog/${p.id}`} className="text-body-sm text-on-surface hover:text-primary transition-colors">
                    {p.title}
                  </Link>
                </td>
                <td className="px-4 py-2.5 text-body-sm text-on-surface-variant hidden sm:table-cell">{p.category}</td>
                <td className="px-4 py-2.5 hidden md:table-cell">
                  <span className={`px-2 py-0.5 rounded-md text-caption font-label-md ${
                    p.published ? "bg-primary/20 text-primary" : "bg-white/5 text-outline"
                  }`}>
                    {p.published ? "Yayında" : "Taslak"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-body-sm text-on-surface-variant hidden lg:table-cell">
                  {new Date(p.created_at).toLocaleDateString("tr-TR")}
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/blog/${p.id}`}
                      className="text-caption font-label-md text-primary hover:text-primary/80 transition-colors">
                      Düzenle
                    </Link>
                    <ConfirmButton formAction={deleteBlogPost} name="id" value={p.id} label="Sil" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="text-center py-12 text-outline">
            <span className="material-symbols-outlined text-3xl mb-2 block">article</span>
            <p className="text-body-sm">{q ? "Aramanızla eşleşen yazı bulunamadı" : "Henüz blog yazısı yok"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
