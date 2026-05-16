import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The 13th Stage Workbook — Self-Guided Burnout Recovery",
  description:
    "A 6-week self-guided burnout recovery workbook with exercises, somatic practices, and a framework for building a life that doesn't burn you out again. $27.",
  openGraph: {
    title: "The 13th Stage Workbook | Burnout Recovery",
    description:
      "A self-guided burnout recovery program. Exercises, somatic practices, and a framework for what comes after. $27.",
  },
};

export default function WorkbookPage() {
  return (
    <div className="min-h-screen">
      {/* Amber/gold header band */}
      <div
        className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-5"
        style={{
          background: "linear-gradient(180deg, #92400e 0%, #b45309 100%)",
        }}
      >
        <div className="max-w-lg mx-auto">
          <p
            className="text-[11px] uppercase tracking-[0.25em] font-medium mb-4"
            style={{ color: "#fde68a" }}
          >
            Workbook
          </p>
          <h1 className="font-display text-4xl sm:text-5xl leading-tight" style={{ color: "#fef3c7" }}>
            The work after
            <br />
            <span style={{ color: "#fde68a" }}>the burnout.</span>
          </h1>
        </div>
      </div>

      <article className="px-5 py-12 sm:py-16 bg-warm-white">
        <div className="max-w-lg mx-auto space-y-8">

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            The 13th Stage Workbook is a self-guided recovery program designed
            to be worked through over six weeks. It&apos;s built on the same
            framework used in one-on-one coaching, adapted for people who want
            to work through it on their own time, at their own pace.
          </p>

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            It&apos;s not a book about burnout. You already know you&apos;re
            burned out. This is the part that comes after &mdash; the part
            nobody talks about.
          </p>

          <h2 className="font-display text-2xl sm:text-3xl text-charcoal pt-4">
            What&apos;s inside
          </h2>
          <div className="w-10 h-px bg-amber" />

          <div className="space-y-5 pt-2">
            <div className="flex gap-4">
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#d97706" }}
              />
              <div>
                <h3 className="text-charcoal font-semibold mb-1">
                  The 12 Stages — with context
                </h3>
                <p className="text-text-medium text-sm leading-relaxed">
                  Each stage described through how it shows up at work, at home,
                  and the trap that keeps you in it. With statistics, research,
                  and recognition exercises.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#d97706" }}
              />
              <div>
                <h3 className="text-charcoal font-semibold mb-1">
                  Phase 1: Stabilize
                </h3>
                <p className="text-text-medium text-sm leading-relaxed">
                  The neuroscience of burnout, the stress cycle, and the
                  executive function checklist &mdash; sleep, nutrition,
                  hydration, movement, sunlight, breath. Getting your foundation
                  back before trying to rebuild anything else.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#d97706" }}
              />
              <div>
                <h3 className="text-charcoal font-semibold mb-1">
                  Phase 2: Resource
                </h3>
                <p className="text-text-medium text-sm leading-relaxed">
                  Building your support map, doing the shame inventory, and
                  figuring out what you actually need &mdash; not what you think
                  you should need.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#d97706" }}
              />
              <div>
                <h3 className="text-charcoal font-semibold mb-1">
                  Phase 3: Reimagine
                </h3>
                <p className="text-text-medium text-sm leading-relaxed">
                  The burnout autopsy, the constraints map, values reclamation,
                  and building the architecture for what comes next. This is
                  where you stop recovering and start creating.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#d97706" }}
              />
              <div>
                <h3 className="text-charcoal font-semibold mb-1">
                  Somatic checkpoints throughout
                </h3>
                <p className="text-text-medium text-sm leading-relaxed">
                  Body scans, breathing exercises, vagus nerve resets, grounding
                  techniques. Because burnout lives in your body, not just your
                  mind.
                </p>
              </div>
            </div>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl text-charcoal pt-4">
            Format
          </h2>
          <div className="w-10 h-px bg-amber" />

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            Designed fillable PDF. Approximately 50 pages. You can type directly
            into it or print it and write by hand &mdash; whichever feels right.
            Delivered instantly after purchase.
          </p>

          {/* Pricing */}
          <div className="bg-cream rounded-2xl p-6 sm:p-8 space-y-4 mt-4">
            <p className="text-3xl font-display text-charcoal">
              $27
              <span className="text-text-light text-base font-body ml-2">
                USD
              </span>
            </p>
            <p className="text-text-medium text-sm leading-relaxed">
              One purchase, lifetime access. If you later decide to work with
              Leah in the coaching program, your workbook purchase is credited
              toward the coaching fee.
            </p>
            <a
              href="https://buy.stripe.com/14A6oHajI71Cdbc4oz6oo07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3.5 rounded-full font-semibold text-base transition-colors"
              style={{ backgroundColor: "#d97706", color: "#fef3c7" }}
            >
              Get the Workbook
            </a>
          </div>

          {/* Soft alternative */}
          <div className="border-t border-line pt-8 mt-8 space-y-3">
            <p className="text-text-medium text-base leading-relaxed">
              Want to go further?
            </p>
            <p className="text-text-medium text-sm leading-relaxed">
              The{" "}
              <Link
                href="/coaching"
                className="text-ember underline underline-offset-4 decoration-ember/30 hover:decoration-ember"
              >
                6-week coaching program
              </Link>{" "}
              uses this workbook as its foundation, with Leah guiding you
              through it one-on-one. Or start with the{" "}
              <Link
                href="/"
                className="text-ember underline underline-offset-4 decoration-ember/30 hover:decoration-ember"
              >
                free assessment
              </Link>{" "}
              to see where you are on the arc.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
