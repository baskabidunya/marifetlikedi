"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  placeholder?: string;
}

export default function AdminSearchBox({ placeholder = "Başlıkta ara..." }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(searchParams.get("q") || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (q.trim()) {
      params.set("q", q.trim());
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="w-48 lg:w-64 bg-surface-container border border-white/10 rounded-xl pl-9 pr-3 py-2 text-body-sm text-on-surface placeholder:text-outline focus:border-primary transition-all outline-none"
      />
    </form>
  );
}
