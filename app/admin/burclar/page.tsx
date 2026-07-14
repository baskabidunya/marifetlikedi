"use client";

import { useState, useEffect } from "react";
import { ZODIAC_SIGNS, ZODIAC_DATA } from "@/lib/astro-utils";
import { updateSignContent, getSignContentBySign } from "@/lib/admin";
import AIGenerateButton from "@/components/admin/AIGenerateButton";

type SignContent = {
  sign: string;
  description: string;
  daily_prophecy: string;
  lucky_color: string;
  lucky_stone: string;
  lucky_activity: string;
  hero_image: string;
};

const emptyContent = (sign: string): SignContent => ({
  sign,
  description: "",
  daily_prophecy: "",
  lucky_color: "",
  lucky_stone: "",
  lucky_activity: "",
  hero_image: "",
});

function SignEditor({ sign, initial }: { sign: string; initial: SignContent }) {
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fields, setFields] = useState(initial);

  const info = ZODIAC_DATA[sign as keyof typeof ZODIAC_DATA];

  function handleAI(data: { title?: string; content?: string }) {
    if (data.content) {
      setFields(prev => ({ ...prev, description: data.content || prev.description }));
    }
    if (data.title) {
      setFields(prev => ({ ...prev, daily_prophecy: data.title }));
    }
    setDirty(true);
  }

  function updateField(key: keyof SignContent, value: string) {
    setFields(prev => ({ ...prev, [key]: value }));
    setDirty(true);
  }

  async function action(formData: FormData) {
    setSaving(true);
    try {
      await updateSignContent(formData);
      setDirty(false);
    } catch { /* ignore */ }
    setSaving(false);
  }

  return (
    <form action={action} className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
      <input type="hidden" name="sign" value={sign} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center">
            <span className="text-3xl text-primary">{info.emoji}</span>
          </div>
          <div>
            <h3 className="font-sora font-bold text-headline-md text-on-surface">{sign}</h3>
            <p className="text-caption text-outline">{info.element} · {info.quality} · {info.ruler}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AIGenerateButton type="burc" onGenerated={handleAI} />
          <button type="submit" disabled={!dirty || saving}
            className={`px-6 py-2.5 rounded-xl font-label-md transition-all ${
              dirty && !saving
                ? "bg-gradient-to-r from-primary to-secondary text-on-primary shadow-lg hover:shadow-xl"
                : "bg-white/5 text-outline cursor-not-allowed"
            }`}>
            {saving ? "Kaydediliyor..." : dirty ? "Kaydet" : "Kaydedildi"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label className="block text-label-md text-on-surface-variant mb-2">Açıklama</label>
            <textarea name="description" value={fields.description} rows={4} onChange={(e) => updateField("description", e.target.value)}
              className="w-full bg-surface-container border border-white/10 rounded-2xl p-4 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline resize-none" />
          </div>
          <div>
            <label className="block text-label-md text-on-surface-variant mb-2">Günlük Kehanet</label>
            <textarea name="daily_prophecy" value={fields.daily_prophecy} rows={4} onChange={(e) => updateField("daily_prophecy", e.target.value)}
              className="w-full bg-surface-container border border-white/10 rounded-2xl p-4 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline resize-none" />
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-label-md text-on-surface-variant mb-2">Uğurlu Renk</label>
            <input name="lucky_color" value={fields.lucky_color} onChange={(e) => updateField("lucky_color", e.target.value)}
              className="w-full bg-surface-container border border-white/10 rounded-2xl px-5 py-3.5 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline" />
          </div>
          <div>
            <label className="block text-label-md text-on-surface-variant mb-2">Değerli Taş</label>
            <input name="lucky_stone" value={fields.lucky_stone} onChange={(e) => updateField("lucky_stone", e.target.value)}
              className="w-full bg-surface-container border border-white/10 rounded-2xl px-5 py-3.5 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline" />
          </div>
          <div>
            <label className="block text-label-md text-on-surface-variant mb-2">Günün Aktivitesi</label>
            <input name="lucky_activity" value={fields.lucky_activity} onChange={(e) => updateField("lucky_activity", e.target.value)}
              className="w-full bg-surface-container border border-white/10 rounded-2xl px-5 py-3.5 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline" />
          </div>
          <div>
            <label className="block text-label-md text-on-surface-variant mb-2">Hero Görsel URL</label>
            <input name="hero_image" value={fields.hero_image} onChange={(e) => updateField("hero_image", e.target.value)}
              className="w-full bg-surface-container border border-white/10 rounded-2xl px-5 py-3.5 text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline" />
          </div>
        </div>
      </div>
    </form>
  );
}

export default function AdminBurclarPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-headline-lg font-headline-lg text-primary">Burç İçerikleri</h1>
          <p className="text-body-md text-on-surface-variant mt-1">12 burcun içeriklerini düzenleyin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {ZODIAC_SIGNS.map(sign => {
          const isOpen = expanded === sign;
          const info = ZODIAC_DATA[sign];
          return (
            <div key={sign} className="glass-card rounded-3xl overflow-hidden">
              <button onClick={() => setExpanded(isOpen ? null : sign)}
                className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-all text-left">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center">
                    <span className="text-xl text-primary">{ZODIAC_DATA[sign]?.emoji || ""}</span>
                  </div>
                  <div>
                    <span className="font-sora font-bold text-headline-md text-on-surface">{sign}</span>
                    <span className="text-caption text-outline ml-3">{info.element} · {info.dateRange}</span>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-outline transition-transform ${isOpen ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-6">
                  <SignEditorLoader sign={sign} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SignEditorLoader({ sign }: { sign: string }) {
  const [content, setContent] = useState<SignContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSignContentBySign(sign).then(data => {
      setContent(data || emptyContent(sign));
      setLoading(false);
    });
  }, [sign]);

  if (loading) {
    return <div className="text-center py-8 text-outline">Yükleniyor...</div>;
  }

  return <SignEditor sign={sign} initial={content!} />;
}
