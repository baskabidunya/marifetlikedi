import Link from "next/link";
import { notFound } from "next/navigation";
import { getAnnouncementById, getActiveAnnouncements } from "@/lib/public-queries";
import AdSlot from "@/components/ads/AdSlot";

const TYPE_META: Record<string, { label: string; icon: string; cls: string; accent: string }> = {
  info: {
    label: "Bilgilendirme",
    icon: "info",
    cls: "bg-primary/15 text-primary border-primary/30",
    accent: "from-primary to-secondary",
  },
  warning: {
    label: "Önemli",
    icon: "warning",
    cls: "bg-tertiary/15 text-tertiary border-tertiary/30",
    accent: "from-tertiary to-primary",
  },
  success: {
    label: "Yeni",
    icon: "celebration",
    cls: "bg-secondary/15 text-secondary border-secondary/30",
    accent: "from-secondary to-primary",
  },
};

function rangeLabel(a: { start_date: string; end_date: string | null }) {
  const fmt = (d: Date) => d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  const s = new Date(a.start_date);
  const e = a.end_date ? new Date(a.end_date) : null;
  return e ? `${fmt(s)} – ${fmt(e)}` : fmt(s);
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await getAnnouncementById(id);
  if (!a) return { title: "Duyuru - Marifetli Kedi" };
  return { title: `${a.title} - Marifetli Kedi`, description: a.message };
}

export default async function AnnouncementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const announcement = await getAnnouncementById(id);
  if (!announcement) notFound();

  const meta = TYPE_META[announcement.type] || TYPE_META.info;
  const others = (await getActiveAnnouncements()).filter((a) => a.id !== id).slice(0, 3);

  return (
    <main className="top-clear-2 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-caption text-outline mb-6 flex-wrap">
        <Link href="/" className="hover:text-on-surface transition-colors">Ana Sayfa</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/duyurular" className="hover:text-on-surface transition-colors">Duyurular</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface-variant truncate max-w-[200px]">{announcement.title}</span>
      </nav>
      <Link
        href="/duyurular"
        className="inline-flex items-center gap-2 text-label-md text-outline hover:text-on-surface transition-colors mb-8 no-underline"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Tüm Duyurular
      </Link>

      <article className="relative overflow-hidden rounded-3xl border border-white/10 glass-card">
        <div className={`h-1.5 w-full bg-gradient-to-r ${meta.accent}`} />
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption font-label-md border ${meta.cls}`}
            >
              <span className="material-symbols-outlined text-base">{meta.icon}</span>
              {meta.label}
            </span>
            <span className="text-caption text-outline">{rangeLabel(announcement)}</span>
          </div>

          <h1 className="font-sora text-headline-lg-mobile md:text-display-lg mb-6 gradient-text">
            {announcement.title}
          </h1>

          <div className="flex items-start gap-3 mt-2 mb-6 text-outline">
            <span className="material-symbols-outlined text-[18px] mt-0.5">campaign</span>
            <p className="text-body-lg text-on-surface-variant leading-relaxed whitespace-pre-wrap m-0">
              {announcement.message}
            </p>
          </div>

        </div>
      </article>

      <AdSlot
        name="duyurular_detay"
        className="my-section-gap max-w-3xl mx-auto"
      />

      {others.length > 0 && (
        <section className="mt-section-gap">
          <h2 className="font-sora text-headline-md text-on-background mb-5">Diğer Duyurular</h2>
          <div className="space-y-4">
            {others.map((a) => {
              const om = TYPE_META[a.type] || TYPE_META.info;
              return (
                <Link
                  key={a.id}
                  href={`/duyurular/${a.id}`}
                  className="block glass-card rounded-2xl p-6 border-white/10 hover:border-primary/40 transition-all group no-underline"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-caption font-label-md border ${om.cls}`}
                    >
                      <span className="material-symbols-outlined text-sm">{om.icon}</span>
                      {om.label}
                    </span>
                    <span className="text-caption text-outline">{rangeLabel(a)}</span>
                  </div>
                  <h3 className="font-sora text-headline-sm text-on-background group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
