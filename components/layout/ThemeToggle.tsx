"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "marifetlikedi_theme";
const DARK_COLOR = "#0e1322";
const LIGHT_COLOR = "#f6f4fb";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? LIGHT_COLOR : DARK_COLOR);
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    const current: Theme = stored === "dark" || stored === "light" ? stored : "light";
    setTheme(current);
    applyTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`flex items-center justify-center w-11 h-11 rounded-full hover:bg-on-surface/5 transition-colors text-outline hover:text-on-surface ${className}`}
      aria-label={theme === "dark" ? "Aydınlık moda geç" : "Karanlık moda geç"}
      title={theme === "dark" ? "Aydınlık mod" : "Karanlık mod"}
    >
      <span aria-hidden="true" className="material-symbols-outlined">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
