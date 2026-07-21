"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AIGenerateButton from "@/components/admin/AIGenerateButton";

export default function BlogPageHeader({ count }: { count: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");

  function handleAI(data: { title: string; excerpt?: string; content?: string; imageUrl: string }) {
    const params = new URLSearchParams();
    if (data.title) params.set("title", data.title);
    if (data.excerpt) params.set("excerpt", data.excerpt);
    if (data.content) params.set("content", data.content);
    if (data.imageUrl) params.set("imageUrl", data.imageUrl);
    router.push(`/admin/blog/yeni?${params.toString()}`);
  }

  function handleSearch(e: React.FormEvent) {
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
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-headline-md font-headline-md text-on-surface">Blog</h1>
          <p className="text-caption text-outline mt-0.5">{count} yazı</p>
        </div>
        <form onSubmit={handleSearch} className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Başlıkta ara..."
            className="w-48 lg:w-64 bg-surface-container border border-white/10 rounded-xl pl-9 pr-3 py-2 text-body-sm text-on-surface placeholder:text-outline focus:border-primary transition-all outline-none"
          />
        </form>
      </div>
      <div className="flex items-center gap-3">
        <AIGenerateButton type="blog" onGenerated={handleAI} />
        <Link href="/admin/blog/yeni"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-primary font-label-md shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5 text-sm">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Yeni Yazı
        </Link>
      </div>
    </div>
  );
}
