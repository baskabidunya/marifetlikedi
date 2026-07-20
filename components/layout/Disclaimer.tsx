export default function Disclaimer({ variant = "inline" }: { variant?: "inline" | "box" }) {
  if (variant === "box") {
    return (
      <div className="rounded-2xl border border-white/10 bg-surface-container/50 p-4 text-caption text-outline leading-relaxed">
        <span className="material-symbols-outlined text-tertiary text-sm align-middle mr-1">
          info
        </span>
        Bu sayfadaki burç yorumları, tarot ve uyum analizleri{" "}
        <span className="text-on-surface-variant">yalnızca eğlence amaçlıdır</span> ve
        profesyonel danışmanlık yerine geçmez. Kararların sorumluluğu size aittir.
      </div>
    );
  }
  return (
    <p className="text-caption text-outline/70 leading-relaxed">
      <span className="text-on-surface-variant">Eğlence amaçlıdır:</span> İçeriklerimiz
      profesyonel astroloji, psikolojik, tıbbi veya hukuki tavsiye yerine geçmez.
    </p>
  );
}
