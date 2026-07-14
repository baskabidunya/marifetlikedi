import { getTestimonials, approveTestimonial, deleteTestimonial } from "@/lib/admin";
import ConfirmButton from "@/components/admin/ConfirmButton";

export default async function AdminYorumlarPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Kullanıcı Yorumları</h1>
        <p className="text-caption text-outline mt-0.5">{testimonials.length} yorum, {testimonials.filter(t => t.approved).length} onaylı</p>
      </div>

      <div className="space-y-3">
        {testimonials.map(t => (
          <div key={t.id} className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-body-sm text-on-surface font-medium">{t.name}</span>
                  {t.title && <span className="text-caption text-on-surface-variant">— {t.title}</span>}
                  <span className="text-caption text-primary">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</span>
                </div>
                <p className="text-body-sm text-on-surface-variant">{t.content}</p>
                <p className="text-caption text-outline mt-2">
                  {new Date(t.created_at).toLocaleDateString("tr-TR")}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2 py-0.5 rounded-md text-caption ${t.approved ? "bg-primary/15 text-primary" : "bg-white/5 text-outline"}`}>
                  {t.approved ? "Onaylı" : "Bekliyor"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <form action={approveTestimonial}>
                <input type="hidden" name="id" value={t.id} />
                <input type="hidden" name="approved" value={t.approved ? "false" : "true"} />
                <button type="submit"
                  className={`px-3 py-1 rounded-lg text-caption font-label-md transition-all ${
                    t.approved ? "bg-white/5 text-on-surface-variant hover:bg-white/10" : "bg-primary/20 text-primary hover:bg-primary/30"
                  }`}>
                  {t.approved ? "Onayı Kaldır" : "Onayla"}
                </button>
              </form>
              <ConfirmButton formAction={deleteTestimonial} name="id" value={t.id} label="Sil" />
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 text-outline text-body-sm">Henüz yorum yok</div>
      )}
    </div>
  );
}
