import { getBlogPost } from "@/lib/admin";
import BlogEditor from "./BlogEditor";

export default async function AdminBlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = id === "yeni" ? null : await getBlogPost(id);
  const defaultValues = post ? {
    id: post.id, title: post.title, slug: post.slug, excerpt: post.excerpt || "",
    content: post.content || "", cover_image: post.cover_image || "",
    category: post.category || "genel", published: post.published,
    author_name: post.author_name || "",
  } : { id: "", title: "", slug: "", excerpt: "", content: "", cover_image: "", category: "genel", published: false, author_name: "" };

  return (
    <div>
      <h1 className="text-headline-lg font-headline-lg text-primary mb-8">
        {post ? "Yazıyı Düzenle" : "Yeni Yazı"}
      </h1>
      <BlogEditor defaultValues={defaultValues} />
    </div>
  );
}
