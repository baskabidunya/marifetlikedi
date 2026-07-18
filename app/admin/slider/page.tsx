import { getSlides, saveSlide, deleteSlide } from "@/lib/admin";
import SlideCard from "@/components/admin/SlideCard";

export default async function AdminSliderPage() {
  const homeSlides = await getSlides("home");
  const burclarSlides = await getSlides("burclar");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Slider Yönetimi</h1>
        <p className="text-caption text-outline mt-0.5">Ana sayfa ve burçlar sayfası slider içerikleri</p>
      </div>

      {/* HOME SLIDER */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="material-symbols-outlined text-lg text-primary">home</span>
          <p className="text-caption text-outline uppercase tracking-wider">Ana Sayfa Slider</p>
          <span className="text-caption text-outline">({homeSlides.length})</span>
        </div>
        <div className="space-y-2">
          {homeSlides.map(s => (
            <SlideCard key={s.id} slide={s} saveAction={saveSlide} deleteAction={deleteSlide} isHome />
          ))}
          {homeSlides.length === 0 && (
            <div className="bg-surface-container/30 rounded-2xl p-8 text-center text-outline border border-white/5">
              <p className="text-body-sm">Henüz ana sayfa slider içeriği yok</p>
            </div>
          )}
        </div>
      </div>

      {/* BURCLAR SLIDER */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="material-symbols-outlined text-lg text-primary">astrology</span>
          <p className="text-caption text-outline uppercase tracking-wider">Burçlar Sayfası Slider</p>
          <span className="text-caption text-outline">({burclarSlides.length})</span>
        </div>
        <div className="space-y-2">
          {burclarSlides.map(s => (
            <SlideCard key={s.id} slide={s} saveAction={saveSlide} deleteAction={deleteSlide} isHome={false} />
          ))}
          {burclarSlides.length === 0 && (
            <div className="bg-surface-container/30 rounded-2xl p-8 text-center text-outline border border-white/5">
              <p className="text-body-sm">Henüz burçlar slider içeriği yok</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
