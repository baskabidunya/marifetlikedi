"use client";

import { useState } from "react";
import Link from "next/link";

interface NavLink {
  id: string;
  label: string;
  url: string;
}

export default function HeaderNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container border border-white/10 text-on-surface"
        aria-label="Menüyü aç/kapat"
      >
        <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
      </button>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-8 items-center">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className="text-body-md font-medium text-on-surface-variant hover:text-on-surface transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 right-0 w-72 max-w-[85vw] h-full bg-surface-container border-l border-white/10 p-6 space-y-2 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-headline-sm font-sora text-primary">Menü</span>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-body-md text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 mt-4 space-y-2">
              <Link
                href="/burclar"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl bg-primary/20 text-primary font-label-md text-center"
              >
                Burcunu Keşfet
              </Link>
              <Link
                href="/profil"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-on-surface-variant hover:bg-white/5 text-center"
              >
                Profilim
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
