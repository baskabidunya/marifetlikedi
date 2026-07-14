"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AIGenerateButton from "@/components/admin/AIGenerateButton";

export default function BlogPageHeader({ count }: { count: number }) {
  const router = useRouter();

  function handleAI(data: { title: string; excerpt?: string; content?: string; imageUrl: string }) {
    const params = new URLSearchParams();
    if (data.title) params.set("title", data.title);
    if (data.excerpt) params.set("excerpt", data.excerpt);
    if (data.content) params.set("content", data.content);
    if (data.imageUrl) params.set("imageUrl", data.imageUrl);
    router.push(`/admin/blog/yeni?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-headline-md font-headline-md text-on-surface">Blog</h1>
        <p className="text-caption text-outline mt-0.5">{count} yazı</p>
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
