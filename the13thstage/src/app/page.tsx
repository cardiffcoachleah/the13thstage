"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Quiz } from "@/components/Quiz";
import { Results } from "@/components/Results";
import { FlameArc } from "@/components/Flame";
import type { QuizAnswers, QuizResult } from "@/lib/quiz-data";

export default function Home() {
  const [quizState, setQuizState] = useState<"idle" | "active" | "complete">(
    "idle"
  );
  const [result, setResult] = useState<QuizResult | null>(null);
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const quizRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setQuizState("active");
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleComplete = (answers: QuizAnswers, result: QuizResult) => {
    setAnswers(answers);
    setResult(result);
    setQuizState("complete");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetake = () => {
    setResult(null);
    setAnswers(null);
    setQuizState("active");
  };

  return (
    <div className="min-h-screen">
      {/* ─── Results View ─────────────────────────────────── */}
      {quizState === "complete" && result && answers && (
        <section className="px-5 pt-16 sm:pt-24 pb-12">
          <Results result={result} answers={answers} onRetake={handleRetake} />
        </section>
      )}

      {/* ─── Hero ─────────────────────────────────────────── */}
      {quizState !== "complete" && (
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-5 overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(180deg, #1a1a2e 0%, #16213e 40%, #1a1a2e 100%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center max-w-2xl mx-auto space-y-6"
          >
            {/* Flame arc */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <FlameArc highlightStage={13} />
            </motion.div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="w-24 h-px bg-amber mx-auto"
            />

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-amber text-sm tracking-[0.3em] uppercase mb-2">
                The
              </p>
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-warm-white font-bold leading-none">
                13th
              </h1>
              <p className="text-amber text-lg sm:text-xl tracking-[0.2em] uppercase mt-1">
                Stage
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="font-display text-peach/80 text-lg sm:text-xl italic max-w-md mx-auto"
            >
              The burnout framework has 12 stages.
              <br />
              This is the one after.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="pt-4"
            >
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-8 py-4 bg-ember text-warm-white rounded-full font-body font-semibold text-base sm:text-lg hover:bg-sienna transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Take the Assessment
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="ml-1"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <p className="text-text-light/50 text-sm mt-4">
                5 minutes &middot; 28 questions &middot; completely private
              </p>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#f4d58d"
                strokeWidth="1.5"
              >
                <path
                  d="M5 8L10 13L15 8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* ─── Quiz Section ─────────────────────────────────── */}
      {quizState === "active" && (
        <section
          ref={quizRef}
          className="px-5 py-16 sm:py-24 bg-warm-white min-h-[70vh] flex items-center"
        >
          <Quiz onComplete={handleComplete} />
        </section>
      )}

      {/* ─── Below-the-fold content (when idle) ───────────── */}
      {quizState === "idle" && (
        <>
          {/* What is this */}
          <section className="px-5 py-16 sm:py-24 bg-warm-white">
            <div className="max-w-xl mx-auto space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl text-charcoal text-center">
                Burnout has 12 stages.
                <br />
                <span className="text-ember">Recovery is the 13th.</span>
              </h2>
              <p className="text-text-medium text-base sm:text-lg leading-relaxed text-center">
                In 1974, psychologist Herbert Freudenberger identified 12 stages
                of burnout &mdash; from ambition to collapse. The framework
                stops at Stage 12. We added Stage 13: the active return to
                yourself.
              </p>
              <p className="text-text-medium text-base sm:text-lg leading-relaxed text-center">
                Take the assessment to find where you are on the arc. It takes
                five minutes, it&apos;s completely private, and it might be the
                most honest conversation you&apos;ve had with yourself in a
                while.
              </p>
              <div className="text-center pt-4">
                <button
                  onClick={handleStart}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-warm-white rounded-full font-body font-medium text-base hover:bg-navy transition-colors"
                >
                  Start the Assessment
                </button>
              </div>
            </div>
          </section>

          {/* About Leah */}
          <section className="px-5 py-16 sm:py-24 bg-cream">
            <div className="max-w-xl mx-auto space-y-6">
              <p className="text-ember text-xs uppercase tracking-[0.15em] font-medium text-center">
                About
              </p>
              <h2 className="font-display text-2xl sm:text-3xl text-charcoal text-center">
                Hi, I&apos;m Leah.
              </h2>
              <p className="text-text-medium text-base leading-relaxed">
                I spent 20+ years in tech leadership &mdash; most recently as
                Chief Product and Technology Officer at a travel startup during
                the pandemic. I burned out in 2022. The kind of burnout where
                your body screams at you to run before your mind catches up.
              </p>
              <p className="text-text-medium text-base leading-relaxed">
                Since then, I&apos;ve coached dozens of senior leaders through
                their own versions of this story. The 13th Stage is what I wish
                I&apos;d had when I was in the depths of it: a framework that
                doesn&apos;t stop at &ldquo;you&apos;re burned out&rdquo; but
                actually walks you through what comes next.
              </p>
              <div className="text-center pt-2">
                <a
                  href="https://leahfarmer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ember text-sm font-medium underline underline-offset-4 hover:text-sienna transition-colors"
                >
                  Learn more at leahfarmer.com &rarr;
                </a>
              </div>
            </div>
          </section>

          {/* Footer with disclaimer */}
          <footer className="px-5 py-8 bg-charcoal">
            <div className="max-w-xl mx-auto text-center space-y-4">
              <p className="text-peach/60 text-xs leading-relaxed">
                This assessment is for self-reflection purposes only. It is not
                a clinical diagnostic tool and does not constitute medical
                advice, diagnosis, or treatment. If you are experiencing a
                mental health crisis, please contact a healthcare professional
                or crisis service.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 text-xs text-peach/40">
                <span>988 Suicide &amp; Crisis Lifeline: Call or text 988</span>
                <span>Samaritans: 116 123</span>
              </div>
              <p className="text-peach/30 text-xs pt-4">
                &copy; 2026 Leah Farmer Coaching &amp; Advisory.
                the13thstage.com
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
