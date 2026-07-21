"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({ open, onClose }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const q = form.get("q") as string;
    if (q?.trim()) {
      router.push(`/ara?q=${encodeURIComponent(q.trim())}`);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl mx-4 bg-surface-container-high rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 px-5 py-4">
          <span className="material-symbols-outlined text-outline">search</span>
          <input
            ref={inputRef}
            name="q"
            type="text"
            placeholder="Aramak istediğiniz kelimeyi yazın..."
            className="flex-1 bg-transparent border-none outline-none text-body-md text-on-surface placeholder:text-outline"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={onClose}
            className="material-symbols-outlined text-outline hover:text-on-surface transition-colors"
            aria-label="Kapat"
          >
            close
          </button>
        </form>
      </div>
    </div>
  );
}
