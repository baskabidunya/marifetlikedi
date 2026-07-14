import { getSlides, saveSlide, deleteSlide } from "@/lib/admin";
import { ZODIAC_SIGNS, ZODIAC_DATA } from "@/lib/astro-utils";
import ConfirmButton from "@/components/admin/ConfirmButton";

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
        <p className="text-caption text-outline uppercase tracking-wider mb-3 px-1">Ana Sayfa Slider</p>
        <div className="space-y-3">
          {homeSlides.map(s => (
            <form key={s.id} action={saveSlide}
              className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
              <input type="hidden" name="id" value={s.id} />
              <input type="hidden" name="type" value="home" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-caption text-outline mb-1">Rozet Yazısı</label>
                  <input name="title" defaultValue={s.title}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">Görsel URL</label>
                  <input name="image_url" defaultValue={s.image_url}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">Aktif</label>
                  <select name="active" defaultValue={s.active ? "true" : "false"}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                    <option value="true">Aktif</option>
                    <option value="false">Pasif</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption text-outline mb-1">Başlık Satır 1</label>
                  <input name="heading1" defaultValue={s.heading1}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">Başlık Satır 2 (Gradient)</label>
                  <input name="heading2" defaultValue={s.heading2}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption text-outline mb-1">1. Buton Yazısı</label>
                  <input name="button1_text" defaultValue={s.button1_text} placeholder="Boşsa buton gizlenir"
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">1. Buton Linki</label>
                  <input name="button1_link" defaultValue={s.button1_link} placeholder="/burclar"
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption text-outline mb-1">2. Buton Yazısı</label>
                  <input name="button2_text" defaultValue={s.button2_text} placeholder="Boşsa buton gizlenir"
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">2. Buton Linki</label>
                  <input name="button2_link" defaultValue={s.button2_link} placeholder="/tarot"
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-caption text-outline mb-1">Açıklama</label>
                <textarea name="description" defaultValue={s.description} rows={2}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all resize-none" />
              </div>

              <div className="flex items-center gap-2">
                <input type="number" name="slide_index" defaultValue={s.slide_index}
                  className="w-16 bg-surface-container border border-white/10 rounded-lg px-2 py-1.5 text-caption text-on-surface text-center focus:border-primary transition-all" />
                <button type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
                  Kaydet
                </button>
                <ConfirmButton formAction={deleteSlide} name="id" value={s.id} label="Sil" />
              </div>
            </form>
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
        <p className="text-caption text-outline uppercase tracking-wider mb-3 px-1">Burçlar Sayfası Slider</p>
        <div className="space-y-3">
          {burclarSlides.map(s => (
            <form key={s.id} action={saveSlide}
              className="bg-surface-container/60 rounded-2xl p-4 space-y-3 border border-white/5">
              <input type="hidden" name="id" value={s.id} />
              <input type="hidden" name="type" value="burclar" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-caption text-outline mb-1">Sıra</label>
                  <input name="slide_index" defaultValue={s.slide_index} type="number"
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">Burç</label>
                  <select name="sign" defaultValue={s.sign}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                    {ZODIAC_SIGNS.map(sign => (
                      <option key={sign} value={sign}>{ZODIAC_DATA[sign]?.emoji || ""} {sign}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">Başlık</label>
                  <input name="title" defaultValue={s.title}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-caption text-outline mb-1">Aktif</label>
                  <select name="active" defaultValue={s.active ? "true" : "false"}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all">
                    <option value="true">Aktif</option>
                    <option value="false">Pasif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-caption text-outline mb-1">Açıklama</label>
                <input name="description" defaultValue={s.description}
                  className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-caption text-outline mb-1">Görsel URL</label>
                  <input name="image_url" defaultValue={s.image_url}
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all" />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <button type="submit"
                    className="px-4 py-1.5 rounded-lg bg-primary/20 text-primary text-caption font-label-md hover:bg-primary/30 transition-all">
                    Kaydet
                  </button>
                  <ConfirmButton formAction={deleteSlide} name="id" value={s.id} label="Sil" />
                </div>
              </div>
            </form>
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
