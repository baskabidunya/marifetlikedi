"use client";

import { useEffect, useRef } from "react";
import { slugify } from "@/lib/slugify";

interface Props {
  name?: string;
  source?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const DEFAULT_CLASS =
  "w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary transition-all font-mono text-xs";

/**
 * Slug alanı. defaultValue boşsa (yeni içerik) kaynak alandan (varsayılan "title")
 * otomatik slug üretir; kullanıcı elle değiştirirse otomatik üretim durur.
 * Mevcut içerikte slug zaten dolu olduğu için asla üzerine yazılmaz.
 */
export default function AutoSlugInput({
  name = "slug",
  source = "title",
  defaultValue = "",
  placeholder = "otomatik-uretilir",
  required = true,
  className = DEFAULT_CLASS,
}: Props) {
  const slugRef = useRef<HTMLInputElement>(null);
  const touched = useRef(defaultValue !== "");

  useEffect(() => {
    if (touched.current) return;
    const slugEl = slugRef.current;
    const form = slugEl?.form;
    const src = form ? (form.elements.namedItem(source) as HTMLInputElement | null) : null;
    if (!slugEl || !src) return;

    const sync = () => {
      if (touched.current) return;
      const next = slugify(src.value);
      if (slugEl.value !== next) slugEl.value = next;
    };

    sync();
    src.addEventListener("input", sync);
    return () => src.removeEventListener("input", sync);
  }, [source]);

  return (
    <input
      ref={slugRef}
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      required={required}
      onChange={() => { touched.current = true; }}
      className={className}
    />
  );
}
