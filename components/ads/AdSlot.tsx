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
    return null;
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
