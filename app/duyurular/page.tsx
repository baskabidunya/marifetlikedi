import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllAnnouncements } from "@/lib/public-queries";
import AdSlot from "@/components/ads/AdSlot";

const TYPE_STYLES: Record<string, string> = {
  info: "bg-primary/15 text-primary border-primary/30",
  warning: "bg-tertiary/15 text-tertiary border-tertiary/30",
  success: "bg-secondary/15 text-secondary border-secondary/30",
};

const TYPE_LABEL: Record<string, string> = {
  info: "Bilgilendirme",
  warning: "Önemli",
  success: "Yeni",
};

export const dynamic = "force-dynamic";

export default async function AnnouncementsPage() {
  const items = await getAllAnnouncements();

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant">Duyurular</span>
      </nav>
      <header className="mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-secondary border border-secondary/20 mb-4">
          <span className="material-symbols-outlined text-sm">campaign</span>
          <span className="text-label-md">Duyurular</span>
        </span>
        <h1 className="font-sora text-headline-lg-mobile md:text-display-lg mb-3 gradient-text">
          Gökyüzünden Haberler
        </h1>
        <p className="text-body-md text-on-surface-variant">
          Yıldızların ve gezegenlerin gündeminden en güncel gök olayları ve kozmik rehberlik.
          Öne çıkan duyuru her hafta otomatik olarak yenilenir.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="glass-card rounded-xl p-10 text-center">
          <span className="material-symbols-outlined text-5xl text-outline/40 mb-4">campaign</span>
          <p className="text-on-surface-variant">Şu an aktif bir duyuru bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((a) => (
            <Link
              key={a.id}
              href={`/duyurular/${a.id}`}
              className="block glass-card rounded-2xl p-6 md:p-8 border-white/10 hover:border-primary/40 transition-all group no-underline"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-caption font-label-md border ${TYPE_STYLES[a.type] || TYPE_STYLES.info}`}>
                  {TYPE_LABEL[a.type] || "Duyuru"}
                </span>
                <span className="text-caption text-outline">
                  {new Date(a.start_date).toLocaleDateString("tr-TR")}
                </span>
              </div>
              <h2 className="font-sora text-headline-md text-on-background mb-2 group-hover:text-primary transition-colors">
                {a.title}
              </h2>
              <p className="text-body-md text-on-surface-variant leading-relaxed line-clamp-2">
                {a.message}
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-label-md text-primary">
                Daha fazlası
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      )}

      <AdSlot
        name="duyurular"
        className="my-12 max-w-3xl mx-auto"
      />
    </main>
  );
}
