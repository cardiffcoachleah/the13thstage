"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Quiz } from "@/components/Quiz";
import { Results } from "@/components/Results";
import { FlameArc } from "@/components/Flame";
import { getSupabase } from "@/lib/supabase";
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

  const handleComplete = async (
    answers: QuizAnswers,
    result: QuizResult,
    email: string,
    newsletterOptIn: boolean
  ) => {
    setAnswers(answers);
    setResult(result);
    setQuizState("complete");
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const supabase = getSupabase();
      if (supabase) {
        await supabase.from("quiz_results").insert({
          email: email || null,
          newsletter_opt_in: newsletterOptIn,
          context_answers: answers.context,
          scores: answers.scores,
          total_score: result.totalScore,
          band: result.band.id,
          flagged_stages: result.flaggedStages,
          highest_flagged_stage: result.highestFlaggedStage,
          has_cluster_override: result.hasClusterOverride,
        });
      }
    } catch (err) {
      console.error("Failed to save quiz results:", err);
    }
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
        <section className="px-5 pt-24 sm:pt-32 pb-12">
          <Results result={result} answers={answers} onRetake={handleRetake} />
        </section>
      )}

      {/* ─── Hero ─────────────────────────────────────────── */}
      {quizState !== "complete" && (
        <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-5 overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, #292524 0%, #1c1917 70%)",
            }}
          />
          <div
            className="absolute inset-0 -z-[5] opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 -z-[4]"
            style={{
              background:
                "linear-gradient(0deg, rgba(194,65,12,0.06) 0%, transparent 100%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Flame arc — bigger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <FlameArc highlightStage={13} />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="mt-12 mb-6"
            >
              <h1
                className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-[120px] leading-[0.85] tracking-tight px-2"
                style={{ color: "#fef3c7" }}
              >
                The 13th Stage
              </h1>
            </motion.div>

            {/* Thin rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.8, ease: "easeInOut" }}
              className="w-16 h-px mx-auto mb-8"
              style={{ backgroundColor: "#c2410c" }}
            />

            {/* Subtitle — reworked */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="font-display text-base sm:text-lg md:text-xl lg:text-2xl max-w-sm mx-auto leading-relaxed mb-10 px-2"
              style={{ color: "#a8a29e" }}
            >
              There are 12 identified stages of burnout.
              <br />
              <span className="italic" style={{ color: "#d6d3d1" }}>
                The most important one is the&nbsp;13th.
              </span>
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
            >
              <button
                onClick={handleStart}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: "#c2410c", color: "#fef3c7" }}
              >
                Take the Assessment
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="ml-1 group-hover:translate-x-0.5 transition-transform"
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

              <p className="text-sm mt-5 tracking-wide" style={{ color: "#78716c" }}>
                5 minutes &middot; 28 questions &middot; completely private
              </p>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 3 }}
            className="absolute bottom-8"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#78716c"
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

      {/* ─── Quiz ─────────────────────────────────────────── */}
      {quizState === "active" && (
        <section
          ref={quizRef}
          className="px-5 py-16 sm:py-24 bg-warm-white min-h-[70vh] flex items-center"
        >
          <Quiz onComplete={handleComplete} />
        </section>
      )}

      {/* ─── Below-the-fold (when idle) ───────────────────── */}
      {quizState === "idle" && (
        <>
          {/* The Framework */}
          <section className="px-5 py-20 sm:py-28 bg-warm-white">
            <div className="max-w-lg mx-auto space-y-8">
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal leading-snug">
                Burnout has a shape.
                <br />
                <span className="text-ember">It also has an exit.</span>
              </h2>
              <div className="w-10 h-px bg-ember" />
              <p className="text-text-medium text-base sm:text-lg leading-relaxed">
                In 1974, psychologists Herbert Freudenberger and Gail North
                mapped 12 stages of burnout &mdash; from the compulsion to prove
                yourself, through withdrawal and depersonalization, to full
                collapse. The framework has been used for fifty years. It stops
                at Stage&nbsp;12.
              </p>
              <p className="text-text-medium text-base sm:text-lg leading-relaxed">
                We added a 13th: the active return to yourself. Not just rest.
                Not just time off. A structured process of stabilizing your
                nervous system, gathering your resources, and reimagining what
                comes next &mdash; so you don&apos;t just survive burnout, you
                build something different on the other side.
              </p>
              <p className="text-text-medium text-base sm:text-lg leading-relaxed">
                The assessment takes five minutes. It&apos;s completely private.
                And it might be the most honest conversation you&apos;ve had
                with yourself in a while.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={handleStart}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-charcoal text-warm-white rounded-full font-medium text-base hover:bg-deep transition-colors"
                >
                  Start the Assessment
                </button>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 px-7 py-3.5 border border-line text-text-medium rounded-full font-medium text-base hover:border-charcoal hover:text-charcoal transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </section>

          {/* Three paths — as cards */}
          <section className="px-5 py-20 sm:py-28 bg-cream">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="max-w-lg">
                <p
                  className="text-[11px] uppercase tracking-[0.25em] font-medium"
                  style={{ color: "#c2410c" }}
                >
                  Three ways in
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-charcoal mt-3">
                  However deep you want to go.
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                {/* Free Guide */}
                <div className="bg-warm-white rounded-2xl p-6 flex flex-col" style={{ borderTop: "3px solid #c2410c" }}>
                  <p
                    className="text-[11px] uppercase tracking-[0.2em] font-medium mb-3"
                    style={{ color: "#c2410c" }}
                  >
                    Free
                  </p>
                  <h3 className="font-display text-xl text-charcoal mb-2">
                    The Guide
                  </h3>
                  <p className="text-text-medium text-sm leading-relaxed flex-1">
                    A short overview of the 13th Stage framework. The 12 stages,
                    why recovery is the 13th, and the three phases of coming back
                    to yourself.
                  </p>
                  <button
                    onClick={handleStart}
                    className="mt-5 w-full py-2.5 rounded-full text-sm font-medium transition-colors"
                    style={{ backgroundColor: "#c2410c", color: "#fef3c7" }}
                  >
                    Take the Assessment
                  </button>
                </div>

                {/* Workbook */}
                <div className="bg-warm-white rounded-2xl p-6 flex flex-col" style={{ borderTop: "3px solid #d97706" }}>
                  <div className="flex items-center justify-between mb-3">
                    <p
                      className="text-[11px] uppercase tracking-[0.2em] font-medium"
                      style={{ color: "#d97706" }}
                    >
                      Self-guided
                    </p>
                    <p className="text-charcoal text-sm font-semibold">$27</p>
                  </div>
                  <h3 className="font-display text-xl text-charcoal mb-2">
                    The Workbook
                  </h3>
                  <p className="text-text-medium text-sm leading-relaxed flex-1">
                    A 6-week recovery program with exercises, somatic practices,
                    and a framework for building a life that doesn&apos;t burn
                    you out again.
                  </p>
                  <Link
                    href="/workbook"
                    className="mt-5 block w-full text-center py-2.5 rounded-full text-sm font-medium transition-colors"
                    style={{ backgroundColor: "#d97706", color: "#fef3c7" }}
                  >
                    Learn More
                  </Link>
                </div>

                {/* Coaching */}
                <div className="bg-warm-white rounded-2xl p-6 flex flex-col" style={{ borderTop: "3px solid #9a3412" }}>
                  <p
                    className="text-[11px] uppercase tracking-[0.2em] font-medium mb-3"
                    style={{ color: "#9a3412" }}
                  >
                    With Leah
                  </p>
                  <h3 className="font-display text-xl text-charcoal mb-2">
                    Coaching
                  </h3>
                  <p className="text-text-medium text-sm leading-relaxed flex-1">
                    6 weeks one-on-one, built around the workbook, tailored to
                    your situation. For when you don&apos;t want to do this
                    alone.
                  </p>
                  <Link
                    href="/coaching"
                    className="mt-5 block w-full text-center py-2.5 rounded-full text-sm font-medium transition-colors"
                    style={{ backgroundColor: "#9a3412", color: "#fef3c7" }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
