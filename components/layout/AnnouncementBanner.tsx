"use client";

import { useState } from "react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string;
}

const STYLES: Record<string, string> = {
  info: "text-primary",
  warning: "text-tertiary",
  success: "text-secondary",
};

export default function AnnouncementBanner({ items }: { items: Announcement[] }) {
  const [visible, setVisible] = useState(items.length > 0);

  if (!visible || items.length === 0) return null;
  const a = items[0];

  const dismiss = () => {
    setVisible(false);
    document.documentElement.classList.remove("banner-active");
  };

  return (
    <div className={`w-full bg-[#8B5CF6] ${STYLES[a.type] || STYLES.info}`}>
      <div className="px-container-padding-mobile md:px-container-padding-desktop py-2.5 flex items-center justify-center gap-3 text-center relative">
        <span className="material-symbols-outlined text-[18px]">campaign</span>
        <span className="text-caption md:text-body-sm font-label-md">
          {a.title}
          {a.message ? ` — ${a.message}` : ""}
          <a href={`/duyurular/${a.id}`} className="underline underline-offset-2 ml-2 hover:opacity-80">
            İncele
          </a>
        </span>
        <button
          onClick={dismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
          aria-label="Kapat"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
}
