"use client";

import { useState } from "react";
import SearchDialog from "./SearchDialog";

export default function SearchTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-white/5 transition-colors text-outline hover:text-on-surface"
        aria-label="Ara"
      >
        <span className="material-symbols-outlined">search</span>
      </button>
      <SearchDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
