"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  contextQuestions,
  quizQuestions,
  likertOptions,
  calculateResults,
  type QuizAnswers,
  type QuizResult,
} from "@/lib/quiz-data";

interface QuizProps {
  onComplete: (answers: QuizAnswers, result: QuizResult) => void;
}

type Phase = "intro" | "context" | "assessment" | "email";

export function Quiz({ onComplete }: QuizProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [contextIndex, setContextIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [contextAnswers, setContextAnswers] = useState<
    Record<string, string | string[]>
  >({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [direction, setDirection] = useState(1);

  const totalSteps =
    contextQuestions.length + quizQuestions.length;
  const currentStep =
    phase === "context"
      ? contextIndex
      : phase === "assessment"
        ? contextQuestions.length + questionIndex
        : 0;
  const progress = phase === "intro" ? 0 : (currentStep / totalSteps) * 100;

  // ─── Handlers ──────────────────────────────────────────────────

  const handleContextAnswer = useCallback(
    (value: string) => {
      const question = contextQuestions[contextIndex];

      if (question.multiSelect) {
        const current = (contextAnswers[question.id] as string[]) || [];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        setContextAnswers((prev) => ({ ...prev, [question.id]: updated }));
        return; // Don't auto-advance for multi-select
      }

      setDirection(1);
      setContextAnswers((prev) => ({ ...prev, [question.id]: value }));

      if (contextIndex < contextQuestions.length - 1) {
        setContextIndex((i) => i + 1);
      } else {
        setPhase("assessment");
      }
    },
    [contextIndex, contextAnswers]
  );

  const handleMultiSelectContinue = useCallback(() => {
    setDirection(1);
    if (contextIndex < contextQuestions.length - 1) {
      setContextIndex((i) => i + 1);
    } else {
      setPhase("assessment");
    }
  }, [contextIndex]);

  const handleScore = useCallback(
    (value: number) => {
      const question = quizQuestions[questionIndex];
      setDirection(1);
      setScores((prev) => ({ ...prev, [question.id]: value }));

      if (questionIndex < quizQuestions.length - 1) {
        setQuestionIndex((i) => i + 1);
      } else {
        setPhase("email");
      }
    },
    [questionIndex]
  );

  const handleBack = useCallback(() => {
    setDirection(-1);
    if (phase === "assessment" && questionIndex > 0) {
      setQuestionIndex((i) => i - 1);
    } else if (phase === "assessment" && questionIndex === 0) {
      setPhase("context");
      setContextIndex(contextQuestions.length - 1);
    } else if (phase === "context" && contextIndex > 0) {
      setContextIndex((i) => i - 1);
    }
  }, [phase, questionIndex, contextIndex]);

  const handleSubmit = useCallback(() => {
    const answers: QuizAnswers = { context: contextAnswers, scores };
    const result = calculateResults(answers);
    onComplete(answers, result);
  }, [contextAnswers, scores, onComplete]);

  // ─── Animation variants ────────────────────────────────────────

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  // ─── Render ────────────────────────────────────────────────────

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress bar */}
      {phase !== "intro" && (
        <div className="w-full h-1 bg-cream rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #f4d58d, #e8a838, #d4622a)",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        {/* ─── Intro ─────────────────────────────────────── */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <h2 className="font-display text-2xl sm:text-3xl text-charcoal">
              The Burnout Assessment
            </h2>
            <p className="text-text-medium text-base sm:text-lg leading-relaxed max-w-md mx-auto">
              28 questions. About 5 minutes. There are no right or wrong
              answers. Be honest with yourself.
            </p>
            <p className="text-text-light text-sm max-w-md mx-auto">
              Your answers are private. We don&apos;t share individual results.
            </p>
            <button
              onClick={() => setPhase("context")}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-warm-white rounded-full font-body font-medium text-base hover:bg-navy transition-colors duration-200"
            >
              Begin
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="ml-1"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <p className="text-text-light text-xs max-w-sm mx-auto pt-2">
              This assessment is for self-reflection purposes only. It is not a
              clinical diagnostic tool and does not constitute medical advice.
            </p>
          </motion.div>
        )}

        {/* ─── Context Questions ──────────────────────────── */}
        {phase === "context" && (
          <motion.div
            key={`context-${contextIndex}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Back button */}
            {contextIndex > 0 && (
              <button
                onClick={handleBack}
                className="text-text-light text-sm flex items-center gap-1 hover:text-text-medium transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M10 3L5 8L10 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back
              </button>
            )}

            <p className="text-text-light text-xs uppercase tracking-widest">
              Getting to know you
            </p>
            <h3 className="font-display text-xl sm:text-2xl text-charcoal leading-snug">
              {contextQuestions[contextIndex].question}
            </h3>

            <div className="space-y-3 pt-2">
              {contextQuestions[contextIndex].options.map((option) => {
                const isMulti =
                  contextQuestions[contextIndex].multiSelect;
                const currentVal = contextAnswers[
                  contextQuestions[contextIndex].id
                ] as string | string[] | undefined;
                const isSelected = isMulti
                  ? (currentVal as string[] | undefined)?.includes(option.value)
                  : currentVal === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleContextAnswer(option.value)}
                    className={`w-full text-left px-5 py-3.5 rounded-xl border transition-all duration-150 text-sm sm:text-base ${
                      isSelected
                        ? "border-amber bg-light-amber text-charcoal"
                        : "border-line bg-white text-text-dark hover:border-amber hover:bg-cream"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            {/* Continue button for multi-select */}
            {contextQuestions[contextIndex].multiSelect && (
              <button
                onClick={handleMultiSelectContinue}
                disabled={
                  !(
                    contextAnswers[contextQuestions[contextIndex].id] as
                      | string[]
                      | undefined
                  )?.length
                }
                className="w-full py-3 rounded-full bg-charcoal text-warm-white font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-navy transition-colors"
              >
                Continue
              </button>
            )}
          </motion.div>
        )}

        {/* ─── Assessment Questions ───────────────────────── */}
        {phase === "assessment" && (
          <motion.div
            key={`q-${questionIndex}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Back button */}
            <button
              onClick={handleBack}
              className="text-text-light text-sm flex items-center gap-1 hover:text-text-medium transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 3L5 8L10 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back
            </button>

            <p className="font-display text-lg sm:text-xl text-charcoal leading-relaxed">
              &ldquo;{quizQuestions[questionIndex].statement}&rdquo;
            </p>

            <div className="flex justify-between gap-2 pt-4">
              {likertOptions.map((option) => {
                const isSelected =
                  scores[quizQuestions[questionIndex].id] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleScore(option.value)}
                    className="flex-1 flex flex-col items-center gap-2 group"
                  >
                    <div
                      className={`w-full aspect-square max-w-[56px] rounded-xl flex items-center justify-center text-lg font-semibold transition-all duration-150 ${
                        isSelected
                          ? "bg-ember text-warm-white scale-110 shadow-lg"
                          : "bg-cream text-text-medium group-hover:bg-light-amber group-hover:text-charcoal"
                      }`}
                    >
                      {option.value}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs transition-colors ${
                        isSelected ? "text-ember font-medium" : "text-text-light"
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-center text-text-light text-xs pt-2">
              {questionIndex + 1} of {quizQuestions.length}
            </p>
          </motion.div>
        )}

        {/* ─── Email Capture ──────────────────────────────── */}
        {phase === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <h2 className="font-display text-2xl sm:text-3xl text-charcoal">
              Your results are ready.
            </h2>
            <p className="text-text-medium text-base leading-relaxed max-w-md mx-auto">
              Enter your email to see your full results and get a free copy of
              <span className="italic"> The 13th Stage Guide</span> — our
              framework for burnout recovery.
            </p>

            <div className="space-y-4 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-5 py-3.5 rounded-xl border border-line bg-white text-text-dark placeholder:text-text-light focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 text-base"
              />

              <label className="flex items-start gap-3 text-left cursor-pointer">
                <input
                  type="checkbox"
                  checked={newsletterOptIn}
                  onChange={(e) => setNewsletterOptIn(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-line text-amber focus:ring-amber accent-amber"
                />
                <span className="text-sm text-text-medium leading-snug">
                  I&apos;d also like occasional insights on burnout, recovery,
                  and leadership from Leah Farmer.
                </span>
              </label>

              <button
                onClick={handleSubmit}
                disabled={!email.includes("@")}
                className="w-full py-3.5 rounded-full bg-charcoal text-warm-white font-medium text-base disabled:opacity-30 disabled:cursor-not-allowed hover:bg-navy transition-colors"
              >
                See My Results
              </button>

              <button
                onClick={handleSubmit}
                className="text-text-light text-sm underline underline-offset-2 hover:text-text-medium transition-colors"
              >
                Skip — just show my results
              </button>
            </div>

            <p className="text-text-light text-xs max-w-sm mx-auto pt-2">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
