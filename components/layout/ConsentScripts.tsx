"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "marifetlikedi_cookie_consent";
const ADSENSE_URL =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8173666333919708";
const GA_ID = "G-KKDKPBQWKF";

const CONSENT_DEFAULTS = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

type GtagConsent = {
  ad_storage?: string;
  ad_user_data?: string;
  ad_personalization?: string;
  analytics_storage?: string;
};

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

function initDataLayer() {
  if (window.gtag !== undefined) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;
  gtag("consent", "default", CONSENT_DEFAULTS);
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.head.appendChild(s);
  });
}

function initGA() {
  const existing = document.getElementById("gtag-init");
  if (existing) return;
  const s1 = document.createElement("script");
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s1.async = true;
  document.head.appendChild(s1);
  const s2 = document.createElement("script");
  s2.id = "gtag-init";
  s2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `;
  document.head.appendChild(s2);
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    adsbygoogle?: unknown[];
  }
}

export default function ConsentScripts() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    initDataLayer();

    function load() {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored !== "accepted" || done) return;
      setDone(true);
      gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
      loadScript(ADSENSE_URL);
      initGA();
    }

    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      load();
    }

    window.addEventListener("consent-accepted", load, { once: true });
    return () => window.removeEventListener("consent-accepted", load);
  }, [done]);

  return null;
}
