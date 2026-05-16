import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coaching — 6-Week Burnout Recovery Program",
  description:
    "Work one-on-one with Leah Farmer through a 6-week coaching program built around The 13th Stage framework. For senior leaders recovering from burnout.",
  openGraph: {
    title: "Burnout Recovery Coaching | The 13th Stage",
    description:
      "A 6-week one-on-one coaching program for senior leaders recovering from burnout. Built around The 13th Stage framework.",
  },
};

export default function CoachingPage() {
  return (
    <div className="min-h-screen bg-warm-white pt-24 sm:pt-32">
      <article className="px-5 pb-20 sm:pb-28">
        <div className="max-w-lg mx-auto space-y-8">
          <p
            className="text-[11px] uppercase tracking-[0.25em] font-medium"
            style={{ color: "#c2410c" }}
          >
            Coaching
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-charcoal leading-tight">
            You don&apos;t have to
            <br />
            <span className="text-ember">figure this out alone.</span>
          </h1>
          <div className="w-10 h-px bg-ember" />

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            The 13th Stage coaching program is six weeks of one-on-one work
            built around the recovery framework. We meet weekly or biweekly
            &mdash; whatever pace fits where you are right now &mdash; and walk
            through Stabilize, Resource, and Reimagine together, tailored to
            your specific situation.
          </p>

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            This isn&apos;t therapy and it isn&apos;t mentoring. It&apos;s
            coaching: structured, forward-facing work with someone who has been
            in the rooms where burnout happens and knows the way out. I ask
            hard questions. I hold space. I don&apos;t let you off the hook.
          </p>

          <h2 className="font-display text-2xl sm:text-3xl text-charcoal pt-4">
            What&apos;s included
          </h2>
          <div className="w-10 h-px bg-ember" />

          <div className="space-y-5 pt-2">
            <div className="flex gap-4">
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#c2410c" }}
              />
              <div>
                <h3 className="text-charcoal font-semibold mb-1">
                  6 coaching sessions
                </h3>
                <p className="text-text-medium text-sm leading-relaxed">
                  50 minutes each, via video. Weekly or biweekly &mdash; we
                  decide together based on what you need.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#c2410c" }}
              />
              <div>
                <h3 className="text-charcoal font-semibold mb-1">
                  The 13th Stage Workbook
                </h3>
                <p className="text-text-medium text-sm leading-relaxed">
                  Included in the program. If you&apos;ve already purchased it,
                  the cost is credited toward coaching.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#c2410c" }}
              />
              <div>
                <h3 className="text-charcoal font-semibold mb-1">
                  Voice note support
                </h3>
                <p className="text-text-medium text-sm leading-relaxed">
                  Between sessions, you can send voice notes when something
                  comes up. I respond within 24 hours. This is where some of
                  the most important work happens.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div
                className="w-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#c2410c" }}
              />
              <div>
                <h3 className="text-charcoal font-semibold mb-1">
                  Structured framework
                </h3>
                <p className="text-text-medium text-sm leading-relaxed">
                  We follow the three-phase 13th Stage recovery path &mdash;
                  Stabilize, Resource, Reimagine &mdash; adapted to where you
                  are and what you need.
                </p>
              </div>
            </div>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl text-charcoal pt-4">
            Who this is for
          </h2>
          <div className="w-10 h-px bg-ember" />

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            This program is designed for senior leaders and executives &mdash;
            particularly in technology &mdash; who are burned out, recovering
            from burnout, or trying to rebuild after burnout. It&apos;s for
            people who are used to being the one who holds it together, and who
            need a space where they don&apos;t have to.
          </p>

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            You don&apos;t need to have taken the assessment first, though
            it helps. You don&apos;t need to be in crisis. You just need to be
            ready to do the work.
          </p>

          {/* Pricing */}
          <div className="bg-cream rounded-2xl p-6 sm:p-8 space-y-4 mt-4">
            <h3 className="font-display text-xl text-charcoal">Investment</h3>
            <p className="text-3xl font-display text-charcoal">
              $895
              <span className="text-text-light text-base font-body ml-2">
                USD
              </span>
            </p>
            <p className="text-text-medium text-sm leading-relaxed">
              Payment plans are available. Sliding scale is available for those
              who need it &mdash; money should never be the reason you
              don&apos;t get help. Reach out and we&apos;ll figure it out.
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-4 pt-4">
            <a
              href="https://leahfarmer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-7 py-4 rounded-full font-semibold text-base transition-colors"
              style={{ backgroundColor: "#c2410c", color: "#fef3c7" }}
            >
              Book a Free Discovery Call
            </a>
            <p className="text-text-light text-sm text-center">
              30 minutes, no commitment. Let&apos;s talk about where you are
              and whether this is the right fit.
            </p>
          </div>

          {/* Soft alternative */}
          <div className="border-t border-line pt-8 mt-8 space-y-3">
            <p className="text-text-medium text-base leading-relaxed">
              Not ready for coaching? That&apos;s okay.
            </p>
            <p className="text-text-medium text-sm leading-relaxed">
              The{" "}
              <Link
                href="/workbook"
                className="text-ember underline underline-offset-4 decoration-ember/30 hover:decoration-ember"
              >
                13th Stage Workbook
              </Link>{" "}
              walks you through the same framework on your own. And the{" "}
              <Link
                href="/"
                className="text-ember underline underline-offset-4 decoration-ember/30 hover:decoration-ember"
              >
                free assessment
              </Link>{" "}
              is always there when you&apos;re ready to start.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
