"use client";

import { useRef, useState } from "react";

export default function ConfirmButton({
  formAction,
  name,
  value,
  label,
}: {
  formAction: (formData: FormData) => Promise<void>;
  name: string;
  value: string;
  label: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="inline-flex">
      {confirming ? (
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setConfirming(false)}
            className="text-caption text-on-surface-variant hover:text-on-surface transition-colors">
            İptal
          </button>
          <button type="button" onClick={() => {
            const fd = new FormData();
            fd.append(name, value);
            formAction(fd);
            setConfirming(false);
          }}
            className="text-caption text-error hover:text-error/80 transition-colors">
            Emin misin?
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => setConfirming(true)}
          className="text-caption text-error hover:text-error/80 transition-colors">
          {label}
        </button>
      )}
    </div>
  );
}
