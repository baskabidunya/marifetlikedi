import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog-public";

export default async function FeaturedContent() {
  const posts = await getPublishedPosts();
  const articles = posts.slice(0, 3);

  return (
    <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto bg-surface-container-low/30 rounded-[3rem]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
        <div className="space-y-2">
          <h2 className="font-sora text-headline-lg-mobile md:text-headline-lg text-white font-bold">Gök Günlüğü</h2>
          <p className="text-body-md text-on-surface-variant">
            Astroloji dünyasından en son haberler ve derinlemesine makaleler.
          </p>
        </div>
        <Link
          href="/blog"
          className="text-primary font-label-md hover:underline shrink-0"
        >
          Tümünü Gör
        </Link>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a) => (
            <Link key={a.id} href={`/blog/${a.slug}`} className="group block">
              <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                {a.cover_image ? (
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url("${a.cover_image}")` }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 group-hover:scale-110 transition-transform duration-500" />
                )}
                <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur text-caption rounded-full">
                  {a.category}
                </div>
              </div>
              <h4 className="font-sora text-headline-md text-white group-hover:text-primary transition-colors font-semibold">
                {a.title}
              </h4>
              <p className="text-body-md text-on-surface-variant mt-2 line-clamp-2">
                {a.excerpt}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl mb-4 block">auto_stories</span>
          <p className="text-body-lg">Henüz gök günlüğü yazısı yayınlanmamış</p>
        </div>
      )}
    </section>
  );
}
