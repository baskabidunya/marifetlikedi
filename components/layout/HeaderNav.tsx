"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

interface NavLink {
  id: string;
  label: string;
  url: string;
}

export default function HeaderNav({ links, isLoggedIn }: { links: NavLink[]; isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navLinks = Array.isArray(links) ? links : [];

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-surface-container border border-white/10 text-on-surface"
        aria-label="Menüyü aç"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className="text-body-md font-medium text-on-surface-variant hover:text-on-surface transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile drawer — portal to escape header z-50 stacking context */}
      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[9999]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          <div className="absolute top-0 right-0 w-72 max-w-[85vw] h-full bg-surface-container border-l border-white/10 p-6 overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <span className="text-headline-sm font-sora text-primary">Menü</span>
              <button
                onClick={close}
                className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.length === 0 && (
                <p className="px-4 py-3 text-body-md text-error">Bağlantı bulunamadı</p>
              )}
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  onClick={close}
                  className="block px-4 py-3 rounded-xl text-body-md text-tertiary hover:bg-white/10 hover:text-on-surface transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-4 border-t border-white/10 mt-4 flex flex-col gap-2">
              {isLoggedIn ? (
                <Link
                  href="/profil"
                  onClick={close}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary/20 text-primary font-label-md text-center"
                >
                  <span className="material-symbols-outlined text-lg">account_circle</span>
                  Profilim
                </Link>
              ) : (
                <>
                  <Link
                    href="/giris"
                    onClick={close}
                    className="block px-4 py-3 rounded-xl text-on-surface-variant border border-white/15 text-center"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/kayit"
                    onClick={close}
                    className="block px-4 py-3 rounded-xl bg-primary/20 text-primary font-label-md text-center"
                  >
                    Kaydol
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
