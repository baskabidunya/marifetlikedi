"use client";

import { useEffect, useRef } from "react";
import { useAdClient } from "./AdNetwork";
import { getAdSlot, type AdSlotName } from "@/lib/ads";

export default function AdSlot({
  name,
  className,
  style,
  format = "auto",
  responsive = true,
}: {
  name: AdSlotName;
  className?: string;
  style?: React.CSSProperties;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  responsive?: boolean;
}) {
  const clientId = useAdClient();
  const slot = getAdSlot(name);
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!clientId || !slot) return;
    const el = ref.current;
    if (!el || el.getAttribute("data-ad-loaded")) return;
    el.setAttribute("data-ad-loaded", "1");

    const tryPush = () => {
      try {
        (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle).push({});
      } catch {
        /* AdSense not ready */
      }
    };

    if ((window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle) {
      tryPush();
    } else {
      const timer = setInterval(() => {
        if ((window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle) {
          clearInterval(timer);
          tryPush();
        }
      }, 200);
      setTimeout(() => clearInterval(timer), 5000);
    }
  }, [clientId, slot]);

  if (!clientId || !slot) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-dashed border-on-surface/15 bg-on-surface/[0.03] text-caption text-outline min-h-[250px] ${className || ""}`}
        style={style}
        data-ad-placeholder="true"
        data-ad-name={name}
        data-ad-client={clientId || undefined}
        role="complementary"
        aria-label="Reklam alanı"
      >
        <span className="tracking-widest uppercase select-none">Reklam</span>
      </div>
    );
  }

  return (
    <ins
      ref={ref}
      className={`adsbygoogle block ${className || ""}`}
      style={style}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
