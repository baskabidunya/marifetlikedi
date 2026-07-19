"use client";

import { useState } from "react";
import type { FunTest } from "@/lib/fun-tests";

export default function TestQuiz({ test }: { test: FunTest }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

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
          <p className="text-on-surface-variant leading-relaxed mb-6 max-w-lg mx-auto">
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
            Puan: {totalScore} / {test.maxScore}
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 bg-tertiary text-on-tertiary px-6 py-3 rounded-xl font-semibold hover:bg-tertiary/90 transition-colors"
          >
            Testi Tekrarla
          </button>
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