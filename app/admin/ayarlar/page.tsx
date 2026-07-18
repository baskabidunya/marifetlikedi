import { getSettings, updateSetting } from "@/lib/admin";
import LogoUploader from "./LogoUploader";

const SETTING_META: Record<string, { label: string; type: string; desc: string }> = {
  site_title: {
    label: "Site Başlığı",
    type: "text",
    desc: "Tarayıcı sekmesinde ve arama sonuçlarında görünen başlık.",
  },
  site_description: {
    label: "Site Açıklaması",
    type: "textarea",
    desc: "Arama motorları için meta açıklama.",
  },
  site_logo: {
    label: "Site Logosu",
    type: "logo",
    desc: "Header'da görünen logo görseli. Boş bırakılırsa \"Marifetli Kedi\" yazısı gösterilir.",
  },
  adsense_client_id: {
    label: "Google AdSense Client ID",
    type: "text",
    desc: "AdSense yayıncı kimliği (ca-pub-XXXXXXXXXXXX). Boş bırakılırsa NEXT_PUBLIC_ADSENSE_CLIENT ortam değişkeni kullanılır.",
  },
  contact_email: {
    label: "İletişim E-posta",
    type: "email",
    desc: "Kullanıcıların size ulaşabileceği e-posta adresi.",
  },
};

export default async function AdminAyarlarPage() {
  const settings = await getSettings();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-lg font-headline-lg text-primary">Site Ayarları</h1>
        <p className="text-body-md text-on-surface-variant mt-1">Genel site yapılandırması</p>
      </div>

      <div className="space-y-4">
        {Object.entries(SETTING_META).map(([key, meta]) => {
          const value = settings[key] || "";

          if (meta.type === "logo") {
            return (
              <div key={key} className="glass-card p-6 md:p-8 rounded-3xl">
                <LogoUploader currentValue={value} />
              </div>
            );
          }

          return (
            <form key={key} action={updateSetting}
              className="glass-card p-6 md:p-8 rounded-3xl">
              <input type="hidden" name="key" value={key} />
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-headline-md font-headline-md text-on-surface">{meta.label}</label>
                  <p className="text-body-md text-on-surface-variant">{meta.desc}</p>
                  {meta.type === "textarea" ? (
                    <textarea name="value" defaultValue={value} rows={3}
                      className="w-full bg-surface-container border border-white/10 rounded-2xl p-4 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" />
                  ) : (
                    <input type={meta.type} name="value" defaultValue={value}
                      className="w-full bg-surface-container border border-white/10 rounded-2xl px-5 py-3.5 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                  )}
                </div>
                <button type="submit"
                  className="shrink-0 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary font-label-md shadow-lg hover:shadow-xl transition-all">
                  Kaydet
                </button>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}
