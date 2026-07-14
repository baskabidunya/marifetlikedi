import { getBlogPost } from "@/lib/admin";
import BlogEditor from "./BlogEditor";

export default async function AdminBlogEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const post = id === "yeni" ? null : await getBlogPost(id);

  const aiTitle = sp.title || "";
  const aiExcerpt = sp.excerpt || "";
  const aiContent = sp.content || "";
  const aiImage = sp.imageUrl || "";

  const defaultValues = post ? {
    id: post.id, title: post.title, slug: post.slug, excerpt: post.excerpt || "",
    content: post.content || "", cover_image: post.cover_image || "",
    category: post.category || "genel", published: post.published,
    author_name: post.author_name || "",
  } : {
    id: "",
    title: aiTitle,
    slug: aiTitle
      .toLowerCase()
      .replace(/[^a-z0-9ğüşıöç\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 80),
    excerpt: aiExcerpt,
    content: aiContent,
    cover_image: aiImage,
    category: "genel",
    published: false,
    author_name: "",
  };

  return (
    <div>
      <h1 className="text-headline-lg font-headline-lg text-primary mb-8">
        {post ? "Yazıyı Düzenle" : "Yeni Yazı"}
      </h1>
      <BlogEditor defaultValues={defaultValues} />
    </div>
  );
}
