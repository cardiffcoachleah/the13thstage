"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
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

    // Save to Supabase (fire and forget — don't block the UI)
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
      // Don't break the experience if Supabase is down
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
        <section className="px-5 pt-16 sm:pt-24 pb-12">
          <Results result={result} answers={answers} onRetake={handleRetake} />
        </section>
      )}

      {/* ─── Hero ─────────────────────────────────────────── */}
      {quizState !== "complete" && (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-5 overflow-hidden">
          {/* Background — warm black, not blue */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, #292524 0%, #1c1917 70%)",
            }}
          />

          {/* Very subtle warm noise texture */}
          <div
            className="absolute inset-0 -z-[5] opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Warm horizon glow at bottom */}
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
            {/* Flame arc */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <FlameArc highlightStage={13} />
            </motion.div>

            {/* Title lockup */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="mt-10 mb-6"
            >
              <p className="text-amber/70 text-[11px] tracking-[0.4em] uppercase mb-3 font-light">
                The
              </p>
              <h1
                className="font-display text-6xl sm:text-8xl md:text-[110px] leading-[0.85] tracking-tight"
                style={{
                  color: "#fef3c7",
                }}
              >
                13th Stage
              </h1>
            </motion.div>

            {/* Thin rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.8, ease: "easeInOut" }}
              className="w-16 h-px mx-auto mb-6"
              style={{ backgroundColor: "#c2410c" }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="font-display italic text-lg sm:text-xl max-w-sm mx-auto leading-relaxed mb-10"
              style={{ color: "#a8a29e" }}
            >
              The burnout framework has 12&nbsp;stages.
              <br />
              This is the one after.
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
                style={{
                  backgroundColor: "#c2410c",
                  color: "#fef3c7",
                }}
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

              <p
                className="text-sm mt-5 tracking-wide"
                style={{ color: "#78716c" }}
              >
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
          <section className="px-5 py-20 sm:py-28 bg-warm-white">
            <div className="max-w-lg mx-auto space-y-8">
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal leading-snug">
                Burnout has 12&nbsp;stages.
                <br />
                <span className="text-ember">Recovery is the&nbsp;13th.</span>
              </h2>
              <div className="w-10 h-px bg-ember" />
              <p className="text-text-medium text-base sm:text-lg leading-relaxed">
                In 1974, psychologist Herbert Freudenberger identified 12 stages
                of burnout &mdash; from compulsion to collapse. The framework
                has been used for fifty years. It stops at Stage&nbsp;12.
              </p>
              <p className="text-text-medium text-base sm:text-lg leading-relaxed">
                We added Stage&nbsp;13: the active return to yourself. Not just
                rest. Not just time. A structured process of stabilizing,
                resourcing, and reimagining &mdash; so you don&apos;t just
                survive burnout, you build something different on the other side.
              </p>
              <p className="text-text-medium text-base sm:text-lg leading-relaxed">
                Take the assessment to find where you are on the arc. Five
                minutes, completely private, and it might be the most honest
                conversation you&apos;ve had with yourself in a while.
              </p>
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-charcoal text-warm-white rounded-full font-medium text-base hover:bg-deep transition-colors"
              >
                Start the Assessment
              </button>
            </div>
          </section>

          {/* About Leah */}
          <section className="px-5 py-20 sm:py-28 bg-cream">
            <div className="max-w-lg mx-auto space-y-6">
              <p
                className="text-[11px] uppercase tracking-[0.25em] font-medium"
                style={{ color: "#c2410c" }}
              >
                About
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
                Hi, I&apos;m Leah.
              </h2>
              <div className="w-10 h-px bg-ember" />
              <p className="text-text-medium text-base leading-[1.8]">
                I spent 20+ years in tech leadership &mdash; most recently as
                Chief Product and Technology Officer at a travel startup during
                the pandemic. I burned out in 2022. The kind of burnout where
                your body screams at you to run before your mind catches up.
              </p>
              <p className="text-text-medium text-base leading-[1.8]">
                Since then, I&apos;ve coached dozens of senior leaders through
                their own versions of this story. The 13th Stage is what I wish
                I&apos;d had when I was in the depths of it: a framework that
                doesn&apos;t stop at &ldquo;you&apos;re burned&nbsp;out&rdquo;
                but actually walks you through what comes next.
              </p>
              <a
                href="https://leahfarmer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-ember text-sm font-medium underline underline-offset-4 decoration-ember/30 hover:decoration-ember transition-colors pt-2"
              >
                leahfarmer.com &rarr;
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="px-5 py-10 bg-charcoal">
            <div className="max-w-lg mx-auto text-center space-y-5">
              <p className="text-xs leading-relaxed" style={{ color: "#78716c" }}>
                This assessment is for self-reflection purposes only. It is not
                a clinical diagnostic tool and does not constitute medical
                advice, diagnosis, or treatment. If you are experiencing a
                mental health crisis, please contact a healthcare professional
                or crisis service.
              </p>
              <div
                className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 text-xs"
                style={{ color: "#57534e" }}
              >
                <span>
                  988 Suicide &amp; Crisis Lifeline: Call or text 988
                </span>
                <span>Samaritans: 116 123</span>
              </div>
              <div
                className="w-8 h-px mx-auto"
                style={{ backgroundColor: "#292524" }}
              />
              <p className="text-xs" style={{ color: "#44403c" }}>
                &copy; 2026 Leah Farmer Coaching &amp; Advisory
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
