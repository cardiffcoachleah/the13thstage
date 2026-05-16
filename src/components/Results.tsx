"use client";

import { motion } from "framer-motion";
import { FlameArc } from "./Flame";
import {
  type QuizResult,
  type QuizAnswers,
  stageNames,
  crisisResources,
} from "@/lib/quiz-data";

interface ResultsProps {
  result: QuizResult;
  answers: QuizAnswers;
  onRetake: () => void;
}

export function Results({ result, answers, onRetake }: ResultsProps) {
  const { band, totalScore, highestFlaggedStage, hasClusterOverride, stageScores } =
    result;

  // Determine which stage to highlight on the arc
  // Map total score to approximate stage position
  const approximateStage = Math.min(12, Math.max(1, Math.round((totalScore / 120) * 12)));

  // Build personalized context paragraph
  const contextNarrative = buildContextNarrative(answers.context);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto space-y-10"
    >
      {/* Score headline */}
      <div className="text-center space-y-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-ember text-xs uppercase tracking-[0.2em] font-medium"
        >
          Your Results
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-2xl sm:text-3xl md:text-4xl text-charcoal leading-snug"
        >
          {band.headline}
        </motion.h2>
      </div>

      {/* The Arc */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="py-6"
      >
        <FlameArc highlightStage={approximateStage} />
        <div className="text-center mt-4">
          <span className="text-sm text-text-light">
            Your signals are concentrated in the{" "}
            <span className="text-ember font-medium">{band.label}</span> range
          </span>
        </div>
      </motion.div>

      {/* Band description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-cream rounded-2xl p-6 sm:p-8"
      >
        <p className="text-text-dark text-base leading-relaxed">
          {band.description}
        </p>
      </motion.div>

      {/* Cluster override callout */}
      {hasClusterOverride && highestFlaggedStage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="border-l-4 border-ember bg-light-amber rounded-r-xl p-6"
        >
          <p className="text-sm font-semibold text-ember mb-2">
            Something to pay attention to
          </p>
          <p className="text-text-dark text-sm leading-relaxed">
            While your overall pattern falls in the {band.label} range,
            you&apos;re showing strong signals at Stage {highestFlaggedStage}{" "}
            &mdash; {stageNames[highestFlaggedStage]}. Even if the rest of your
            scores feel manageable, this area needs attention.
          </p>
        </motion.div>
      )}

      {/* Personalized context */}
      {contextNarrative && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <p className="text-text-medium text-base leading-relaxed italic">
            {contextNarrative}
          </p>
        </motion.div>
      )}

      {/* The 13th Stage introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-charcoal text-warm-white rounded-2xl p-6 sm:p-8 space-y-4"
      >
        <p className="text-amber text-xs uppercase tracking-[0.15em] font-medium">
          There&apos;s a stage after burnout
        </p>
        <h3 className="font-display text-xl sm:text-2xl text-gold">
          The 13th Stage
        </h3>
        <p className="text-peach/90 text-sm sm:text-base leading-relaxed">
          The burnout framework has 12 stages. They end in collapse. We added a
          13th &mdash; because there&apos;s a stage after burnout, and it&apos;s
          the one that matters most. It&apos;s the active return to yourself. Not
          just rest. Not just time off. A structured process of stabilizing your
          body, gathering your resources, and reimagining what comes next &mdash;
          so you don&apos;t just recover, you build something different.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="space-y-4"
      >
        <p className="text-text-dark text-base leading-relaxed">
          {band.ctaPrimary}
        </p>

        {/* Primary action - free guide */}
        <a
          href="#guide"
          className="block w-full text-center py-3.5 rounded-full bg-ember text-warm-white font-medium text-base hover:bg-sienna transition-colors"
        >
          Get the Free 13th Stage Guide
        </a>

        {band.ctaSecondary && (
          <p className="text-text-medium text-sm leading-relaxed pt-2">
            {band.ctaSecondary}
          </p>
        )}

        {/* Workbook CTA */}
        <a
          href="#workbook"
          className="block w-full text-center py-3.5 rounded-full border border-charcoal text-charcoal font-medium text-base hover:bg-charcoal hover:text-warm-white transition-colors"
        >
          Get the Workbook &mdash; $27
        </a>

        {band.ctaTertiary && (
          <p className="text-text-medium text-sm leading-relaxed pt-2">
            {band.ctaTertiary}
          </p>
        )}

        {/* Coaching CTA - only for middle+ */}
        {(band.id === "middle" ||
          band.id === "serious" ||
          band.id === "crisis") && (
          <a
            href="https://leahfarmer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-3 text-ember font-medium text-sm underline underline-offset-4 hover:text-sienna transition-colors"
          >
            Learn about the 6-week coaching program
          </a>
        )}
      </motion.div>

      {/* Crisis resources */}
      {band.showCrisisResources && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="bg-cream rounded-2xl p-6 space-y-3"
        >
          <p className="text-sm font-semibold text-charcoal">
            If you need to talk to someone right now:
          </p>
          {crisisResources.map((resource) => (
            <div key={resource.name} className="flex justify-between text-sm">
              <span className="text-text-dark font-medium">
                {resource.name}
              </span>
              <span className="text-text-medium">
                {resource.detail}{" "}
                <span className="text-text-light">({resource.region})</span>
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Share + retake */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="flex justify-center gap-6 pt-4 pb-8"
      >
        <button
          onClick={onRetake}
          className="text-text-light text-sm underline underline-offset-2 hover:text-text-medium transition-colors"
        >
          Retake the assessment
        </button>
      </motion.div>

      {/* Disclaimer */}
      <div className="text-center pb-12">
        <p className="text-text-light text-xs max-w-md mx-auto leading-relaxed">
          This assessment is for self-reflection purposes only and does not
          constitute medical advice, diagnosis, or treatment. If you are
          experiencing a mental health crisis, please contact a healthcare
          professional or crisis service immediately.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Context narrative builder ─────────────────────────────────────

function buildContextNarrative(
  context: Record<string, string | string[]>
): string {
  const parts: string[] = [];

  // Duration
  const duration = context.duration as string;
  if (duration === "over_year") {
    parts.push("You\u2019ve been sitting with this for a long time.");
  } else if (duration === "half_year") {
    parts.push(
      "This has been building for months \u2014 long enough to become the water you\u2019re swimming in."
    );
  } else if (duration === "unsure") {
    parts.push(
      "The fact that it crept up on you is itself a signal \u2014 burnout is rarely a single dramatic event."
    );
  }

  // History
  const history = context.history as string;
  if (history === "yes") {
    parts.push(
      "And this isn\u2019t the first time. You know where this road leads. The question is whether you\u2019re ready to take a different exit this time."
    );
  } else if (history === "maybe") {
    parts.push(
      "You\u2019ve been through something like this before, even if you didn\u2019t have the language for it. Naming it is the first step toward doing something different."
    );
  } else if (history === "no") {
    parts.push(
      "This is new territory for you, which can feel disorienting. But it also means you can build good recovery habits from the start."
    );
  }

  // Role context
  const role = context.role as string;
  if (role === "executive" || role === "director") {
    parts.push(
      "In your position, you\u2019re likely absorbing your team\u2019s stress on top of your own \u2014 and the expectation that you should be able to handle it all makes it harder to ask for help."
    );
  } else if (role === "between") {
    parts.push(
      "Being between roles adds its own layer of stress and identity disruption. But it also means you have space right now to do recovery work that\u2019s hard to do while you\u2019re still in the thick of it."
    );
  }

  return parts.join(" ");
}
