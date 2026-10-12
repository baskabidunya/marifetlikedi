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
  const htmlBtnRef = useRef<HTMLButtonElement | null>(null);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"rich" | "html">("rich");
  const [htmlSrc, setHtmlSrcState] = useState(value);
  const modeRef = useRef<"rich" | "html">("rich");
  const htmlSrcRef = useRef(value);

  const setHtmlSrc = (html: string) => {
    htmlSrcRef.current = html;
    setHtmlSrcState(html);
  };

  const setModeBoth = (m: "rich" | "html") => {
    modeRef.current = m;
    setMode(m);
  };

  const syncHidden = (html: string) => {
    onChange?.(html);
    if (hiddenRef.current) hiddenRef.current.value = html;
  };

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
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
              ["blockquote", "code-block", "link", "image"],
              ["clean", "html"],
            ],
            handlers: {
              image: () => {
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
              },
              html: () => toggleMode(),
            },
          },
        },
      });
      quillRef.current = quill;

      if (value) quill.clipboard.dangerouslyPasteHTML(value);

      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        setHtmlSrc(html);
        syncHidden(html);
      });

      htmlBtnRef.current = editorRef.current.parentElement?.querySelector(".ql-html") as HTMLButtonElement | null;
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

  function toggleMode() {
    if (modeRef.current === "rich") {
      const html = quillRef.current ? quillRef.current.root.innerHTML : htmlSrcRef.current;
      setHtmlSrc(html);
      setModeBoth("html");
      htmlBtnRef.current?.classList.add("ql-active");
    } else {
      if (quillRef.current) {
        quillRef.current.clipboard.dangerouslyPasteHTML(htmlSrcRef.current);
        syncHidden(quillRef.current.root.innerHTML);
      }
      setModeBoth("rich");
      htmlBtnRef.current?.classList.remove("ql-active");
    }
  }

  const hiddenRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="rounded-xl overflow-hidden border border-on-surface/10 rich-editor-scroll">
      <style>{`
        .rich-editor-scroll .ql-editor { max-height: 420px; overflow-y: auto; }
        .rich-editor-scroll .ql-toolbar .ql-html { width: auto !important; padding: 0 10px !important; font-size: 12px; font-weight: 700; color: #444; }
        .rich-editor-scroll .ql-toolbar .ql-html::after { content: "HTML"; }
        .rich-editor-scroll .ql-toolbar .ql-html.ql-active { color: #06c !important; }
      `}</style>
      {!ready && (
        <div className="rounded-xl border border-on-surface/10 bg-surface-container px-4 py-6 text-caption text-outline">
          Editör yükleniyor…
        </div>
      )}
      <div ref={editorRef} style={{ minHeight: 280, background: "white", display: mode === "rich" ? undefined : "none" }} />
      {mode === "html" && (
        <textarea
          value={htmlSrc}
          onChange={(e) => {
            setHtmlSrc(e.target.value);
            syncHidden(e.target.value);
          }}
          spellCheck={false}
          className="w-full h-[420px] overflow-y-auto font-mono text-[13px] leading-relaxed p-4 bg-[#1e1e1e] text-[#d4d4d4] outline-none resize-y"
        />
      )}
      <div className="flex items-center justify-between px-3 py-1.5 bg-surface-container-low border-t border-on-surface/10">
        <span className="text-caption text-outline">
          {mode === "rich" ? "Zengin metin modu" : "HTML kaynak modu"} • İçerik kutusu kaydırmalı
        </span>
        <button
          type="button"
          onClick={toggleMode}
          className="text-caption font-label-md text-primary hover:underline cursor-pointer"
        >
          {mode === "rich" ? "HTML olarak düzenle" : "Editöre dön"}
        </button>
      </div>
      <textarea ref={hiddenRef} name={name} defaultValue={value} className="hidden" />
    </div>
  );
}
