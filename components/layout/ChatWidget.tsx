"use client";

import { useEffect } from "react";

export default function ChatWidget() {
  useEffect(() => {
    if (document.getElementById("bbd-external-widget")) return;
    const s = document.createElement("script");
    s.src = "https://www.baskabidunya.com/widget.js";
    s.async = true;
    s.setAttribute("data-license", "#BBD-2026-9812A");
    s.setAttribute("data-company", "Astroloji & Tarot ");
    s.setAttribute("data-name", "Marifetli Kedi ");
    s.setAttribute("data-color", "#8b5cf6");
    // data-* öznitelikleri taşıyan bu <script> düğümünü DOM'a ekleyip
    // widget kodunun document.currentScript / son script fallback'ini
    // doğru şekilde çözmesini sağla.
    document.body.appendChild(s);
  }, []);

  return null;
}
