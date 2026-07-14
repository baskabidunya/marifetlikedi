"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { createClient } from "@/lib/supabase/client";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border border-white/10 bg-surface-container px-4 py-6 text-caption text-outline">
      Editör yükleniyor…
    </div>
  ),
});

interface Props {
  value?: string;
  name?: string;
  onChange?: (html: string) => void;
}

const FORMATS = [
  "header", "bold", "italic", "underline",
  "list", "blockquote", "link", "image",
];

export default function RichTextEditor({ value = "", name = "content", onChange }: Props) {
  const quillRef = useRef<any>(null);
  const hiddenRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState(value || "");

  function handleChange(html: string) {
    setContent(html);
    if (hiddenRef.current) hiddenRef.current.value = html;
    onChange?.(html);
  }

  function imageHandler() {
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
        const path = `trend/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
        if (error) throw error;
        const { data } = supabase.storage.from("media").getPublicUrl(path);
        const quill = quillRef.current?.getEditor();
        const range = quill?.getSelection(true);
        if (quill && range) quill.insertEmbed(range.index, "image", data.publicUrl, "user");
      } catch (err) {
        alert("Görsel yüklenemedi: " + (err instanceof Error ? err.message : "bilinmeyen hata"));
      }
    };
  }

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "link", "image"],
      ],
      handlers: { image: imageHandler },
    },
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={FORMATS}
      />
      <textarea ref={hiddenRef} name={name} defaultValue={value} className="hidden" />
    </div>
  );
}
