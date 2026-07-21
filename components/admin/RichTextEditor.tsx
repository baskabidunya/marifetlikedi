"use client";

import { useRef, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import "quill/dist/quill.snow.css";

interface Props {
  value?: string;
  name?: string;
  folder?: string;
  onChange?: (html: string) => void;
}

export default function RichTextEditor({ value = "", name = "content", folder = "trend", onChange }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    let QuillCtor: any;

    async function init() {
      const Quill = (await import("quill")).default;
      QuillCtor = Quill;
      if (!mounted || !editorRef.current) return;

      const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "İçeriği buraya yazın...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "link", "image"],
          ],
        },
      });
      quillRef.current = quill;

      if (value) quill.clipboard.dangerouslyPasteHTML(value);

      (quill.getModule("toolbar") as any).addHandler("image", () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;
          try {
            const supabase = createClient();
            const ext = file.name.split(".").pop() || "png";
            const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
            const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
            if (error) throw error;
            const { data } = supabase.storage.from("media").getPublicUrl(path);
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "image", data.publicUrl, "user");
          } catch (err) {
            alert("Görsel yüklenemedi: " + (err instanceof Error ? err.message : "bilinmeyen hata"));
          }
        };
      });

      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        onChange?.(html);
        if (hiddenRef.current) hiddenRef.current.value = html;
      });

      setReady(true);
    }

    init();
    return () => {
      mounted = false;
      if (quillRef.current && editorRef.current) {
        editorRef.current.innerHTML = "";
      }
      quillRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hiddenRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      {!ready && (
        <div className="rounded-xl border border-white/10 bg-surface-container px-4 py-6 text-caption text-outline">
          Editör yükleniyor…
        </div>
      )}
      <div ref={editorRef} style={{ minHeight: 280, background: "white" }} />
      <textarea ref={hiddenRef} name={name} defaultValue={value} className="hidden" />
    </div>
  );
}
