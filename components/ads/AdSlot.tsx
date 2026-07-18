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
    if (!clientId || !slot || !ref.current) return;
    if (ref.current.getAttribute("data-ad-loaded")) return;
    ref.current.setAttribute("data-ad-loaded", "1");
    try {
      (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle =
        (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || [];
      ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle).push({});
    } catch {
      /* AdSense not ready */
    }
  }, [clientId, slot]);

  if (!clientId || !slot) {
    return (
      <div
        className={`flex items-center justify-center border-2 border-dashed border-outline/30 rounded-lg bg-surface-dim/50 min-h-[90px] text-outline/40 text-sm select-none ${className || ""}`}
        style={style}
      >
        Reklam Alanı ({name.replace("_", " ")})
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
