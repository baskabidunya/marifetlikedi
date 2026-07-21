"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/contact";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMsg("");
    const fd = new FormData(e.currentTarget);
    const res = await submitContactMessage(fd);
    if (res.ok) {
      setStatus("done");
      setMsg("Mesajınız alındı, en kısa sürede dönüş yapacağız.");
      e.currentTarget.reset();
    } else {
      setStatus("error");
      setMsg(res.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="hidden" aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-caption text-on-surface-variant mb-1">Ad Soyad</label>
          <input name="name" required
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2.5 text-body-sm text-on-surface focus:border-primary transition-all" />
        </div>
        <div>
          <label className="block text-caption text-on-surface-variant mb-1">E-posta</label>
          <input name="email" type="email" required
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2.5 text-body-sm text-on-surface focus:border-primary transition-all" />
        </div>
      </div>
      <div>
        <label className="block text-caption text-on-surface-variant mb-1">Konu</label>
        <input name="subject"
          className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2.5 text-body-sm text-on-surface focus:border-primary transition-all" />
      </div>
      <div>
        <label className="block text-caption text-on-surface-variant mb-1">Mesaj</label>
        <textarea name="message" rows={5} required
          className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2.5 text-body-sm text-on-surface focus:border-primary transition-all resize-none" />
      </div>
      <button type="submit" disabled={status === "sending"}
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-on-primary font-label-md shadow-lg hover:shadow-xl transition-all disabled:opacity-50">
        {status === "sending" ? "Gönderiliyor..." : "Mesajı Gönder"}
      </button>
      {msg && (
        <p className={`text-body-sm ${status === "done" ? "text-tertiary" : "text-red-400"}`}>
          {msg}
        </p>
      )}
    </form>
  );
}
