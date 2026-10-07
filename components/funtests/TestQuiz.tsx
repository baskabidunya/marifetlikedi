"use client";

import { useState } from "react";
import Link from "next/link";
import type { FunTest } from "@/lib/fun-tests";
import { computeMaxScore } from "@/lib/fun-tests";

export default function TestQuiz({
  test,
  related = [],
}: {
  test: FunTest;
  related?: FunTest[];
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const total = test.questions.length;

  function handleAnswer(score: number) {
    const next = [...answers, score];
    setAnswers(next);

    if (next.length >= total) {
      setShowResult(true);
    } else {
      setCurrent((c) => c + 1);
    }
  }

  function handleBack() {
    if (current === 0) return;
    setAnswers((a) => a.slice(0, -1));
    setCurrent((c) => c - 1);
  }

  function handleRestart() {
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
  }

  if (showResult) {
    const totalScore = answers.reduce((a, b) => a + b, 0);
    const result = test.results.find(
      (r) => totalScore >= r.scoreRange[0] && totalScore <= r.scoreRange[1]
    ) || test.results[0];

    const percentage = Math.round(
      ((totalScore - test.results[0].scoreRange[0]) /
        (test.results[test.results.length - 1].scoreRange[1] -
          test.results[0].scoreRange[0])) *
        100
    );

    const emojis = ["🟢", "🔵", "🟡", "🔴"];
    const level =
      percentage < 25 ? 0 : percentage < 50 ? 1 : percentage < 75 ? 2 : 3;

    const shareText = `Sonucum: "${result.title}" — ${test.title}. Sen de Marifetli Kedi'de dene!`;

    async function handleCopy() {
      try {
        await navigator.clipboard.writeText(
          `${shareText} ${window.location.href}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
      }
    }

    async function handleShare() {
      if (typeof navigator !== "undefined" && navigator.share) {
        try {
          await navigator.share({
            title: test.title,
            text: shareText,
            url: window.location.href,
          });
          return;
        } catch {
          // kullanıcı iptal ettiyse sessizce geç
        }
      }
      await handleCopy();
    }

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-surface/60 border border-outline/20 rounded-2xl p-8 md:p-10 text-center">
          <div className="text-8xl mb-6">{test.icon}</div>
          <div className="inline-block px-4 py-1 rounded-full bg-tertiary/10 text-tertiary text-sm font-medium mb-4">
            {test.title}
          </div>
          <h2 className="text-3xl font-bold text-on-surface mb-2">
            {result.title}
          </h2>
          <p className="text-on-surface-variant leading-relaxed whitespace-pre-line mb-6 max-w-2xl mx-auto text-left">
            {result.description}
          </p>

          <div className="flex items-center justify-center gap-2 mb-6">
            {emojis.map((e, i) => (
              <span
                key={e}
                className={`text-xl transition-all duration-300 ${
                  i === level ? "scale-150" : "opacity-30"
                }`}
              >
                {e}
              </span>
            ))}
          </div>

          <div className="bg-surface-dim/50 rounded-xl p-5 mb-6 text-left">
            <h3 className="text-sm font-semibold text-tertiary uppercase tracking-wider mb-2">
              Öneri
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {result.advice}
            </p>
          </div>

          <div className="w-full bg-surface-dim rounded-full h-2 mb-6">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-outline/40 mb-6">
            Puan: {totalScore} / {computeMaxScore(test)}
          </p>

          <div className="text-left border-t border-outline/20 pt-6 mb-6">
            <h3 className="text-sm font-semibold text-tertiary uppercase tracking-wider mb-2">
              Sonucunu Paylaş
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-3">
              &ldquo;{result.title}&rdquo; çıktın! Sonucunu arkadaşlarınla
              paylaş, onlar da kendi kozmik sonuçlarını öğrensin.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/30 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Paylaş
              </button>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 bg-surface-dim/60 border border-outline/20 text-on-surface px-4 py-2 rounded-lg text-sm font-semibold hover:border-tertiary/40 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copied ? "Kopyalandı!" : "Linki Kopyala"}
              </button>
            </div>
          </div>

          {related.length > 0 && (
            <div className="text-left border-t border-outline/20 pt-6 mb-6">
              <h3 className="text-sm font-semibold text-tertiary uppercase tracking-wider mb-2">
                Keşfetmeye Devam Et
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-3">
                Bir başka merak sorun mu var? Daha fazla test çöz, kozmik
                haritanın diğer katmanlarını da keşfet.
              </p>
              <div className="flex flex-wrap gap-2">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/eglenceli-testler/${r.id}`}
                    className="inline-flex items-center gap-1.5 bg-surface-dim/50 border border-outline/10 px-3 py-1.5 rounded-lg text-xs text-on-surface-variant hover:border-tertiary/40 hover:text-on-surface transition-colors"
                  >
                    <span>{r.icon}</span>
                    {r.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 bg-tertiary text-on-tertiary px-6 py-3 rounded-xl font-semibold hover:bg-tertiary/90 transition-colors"
            >
              Testi Tekrarla
            </button>
            <Link
              href="/eglenceli-testler"
              className="inline-flex items-center gap-2 bg-surface-dim/60 border border-outline/20 text-on-surface px-6 py-3 rounded-xl font-semibold hover:bg-surface-dim hover:border-tertiary/40 transition-colors"
            >
              Tüm Testler
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const question = test.questions[current];
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={current === 0}
          className="text-sm text-on-surface-variant hover:text-on-surface disabled:opacity-30 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Geri
        </button>
        <span className="text-sm text-outline/40">
          {current + 1} / {total}
        </span>
      </div>

      <div className="w-full bg-surface-dim rounded-full h-1.5 mb-8">
        <div
          className="h-full rounded-full bg-tertiary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-surface/60 border border-outline/20 rounded-2xl p-8 md:p-10">
        <div className="text-5xl mb-6">{test.icon}</div>
        <h2 className="text-xl md:text-2xl font-semibold text-on-surface mb-8 leading-relaxed">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option.score)}
              className="w-full text-left p-4 rounded-xl bg-surface-dim/50 border border-outline/10 hover:bg-surface-dim hover:border-tertiary/40 transition-all duration-200 text-on-surface-variant hover:text-on-surface"
            >
              <span className="text-sm font-medium opacity-50 mr-3">
                {String.fromCharCode(65 + i)}
              </span>
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}