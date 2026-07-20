"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "marifetlikedi_cookie_consent";

type ConsentChoice = "accepted" | "declined" | null;

export default function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentChoice;
    if (stored === "accepted" || stored === "declined") {
      setChoice(stored);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setChoice("accepted");
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setChoice("declined");
  }

  if (!mounted || choice !== null) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[9998]">
      <div className="bg-surface-container-lowest backdrop-blur-xl border-t border-white/10 p-4 md:p-6 shadow-2xl">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex-1 text-sm md:text-body-md text-on-surface-variant leading-relaxed">
            Sitemizde size daha iyi bir deneyim sunmak, içerik ve reklamları
            kişiselleştirmek için çerezler kullanıyoruz. Detaylı bilgi için{" "}
            <Link href="/cerez-politikasi" className="text-primary underline hover:text-primary/80">
              Çerez Politikası
            </Link>{" "}
            sayfamızı ziyaret edebilirsiniz.
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={decline}
              className="px-5 py-2.5 rounded-xl text-sm font-label-md text-on-surface-variant border border-white/15 hover:bg-white/5 transition-all"
            >
              Reddet
            </button>
            <button
              onClick={accept}
              className="px-5 py-2.5 rounded-xl text-sm font-label-md text-on-primary bg-gradient-to-r from-primary-container to-secondary-container hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              Kabul Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
