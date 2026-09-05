import type { Metadata } from "next";
import Link from "next/link";
import {
  TAPPING_PAGE_PRICE,
  TAPPING_PAGE_STRUCK,
  TAPPING_DISPLAY_USD,
  TAPPING_REDUCED,
  TAPPING_REDUCED_END,
  TAPPING_BOOKING_URL,
} from "@/lib/tapping";

export const metadata: Metadata = {
  title: "A Tapping Session",
  description:
    "Sixty minutes, one to one, online. For the part of burnout that doesn't respond to knowing better.",
  openGraph: {
    title: "A Tapping Session | The 13th Stage",
    description:
      "Sixty minutes, one to one, online. For the part of burnout that doesn't respond to knowing better.",
  },
};

export default function TappingPage() {
  return (
    <div className="min-h-screen">
      {/* Header band */}
      <div
        className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-5"
        style={{
          background: "linear-gradient(180deg, #1c1917 0%, #292524 100%)",
        }}
      >
        <div className="max-w-lg mx-auto">
          <p
            className="text-[11px] uppercase tracking-[0.25em] font-medium mb-4"
            style={{ color: "#c2410c" }}
          >
            With Leah
          </p>
          <h1
            className="font-display text-4xl sm:text-5xl leading-tight"
            style={{ color: "#fef3c7" }}
          >
            A tapping session.
          </h1>
        </div>
      </div>

      <article className="px-5 py-12 sm:py-16 bg-warm-white">
        <div className="max-w-lg mx-auto space-y-8">
          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            You know what&apos;s wrong. You may even know what to do about it.
            Your body carries on as if none of that were true.
          </p>
          <p className="text-text-dark text-base sm:text-lg leading-[1.85] font-semibold">
            That&apos;s the gap this works on.
          </p>

          <h2 className="font-display text-2xl sm:text-3xl text-charcoal pt-4">
            What it is
          </h2>
          <div className="w-10 h-px bg-ember" />

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            EFT, usually called tapping, combines light tapping on acupressure
            points with focused attention on whatever is stuck. It works on the
            stress response directly rather than through talking about it, which
            is why people often feel something shift inside one session instead
            of after weeks of circling a problem.
          </p>
          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            It sounds odd until you&apos;ve done it.
          </p>

          <h2 className="font-display text-2xl sm:text-3xl text-charcoal pt-4">
            What people bring
          </h2>
          <div className="w-10 h-px bg-ember" />

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            Anxiety that shows up in the body rather than the head. Dread before
            a specific thing: a conversation, a presentation, going back to
            work. The wired exhaustion that comes with burnout. A pattern you
            can describe perfectly and still can&apos;t shift.
          </p>

          <h2 className="font-display text-2xl sm:text-3xl text-charcoal pt-4">
            How it runs
          </h2>
          <div className="w-10 h-px bg-ember" />

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            Sixty minutes, online. We talk for the first ten or so and find the
            specific thing worth working on. Then we tap together. I guide it,
            you follow along. Nothing to prepare and nothing to learn first.
          </p>
          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            Afterward I send you the sequence we used so you can repeat it on
            your own. It tends to hold better when people use it a few times
            that week.
          </p>

          {TAPPING_REDUCED && (
            <>
              <h2 className="font-display text-2xl sm:text-3xl text-charcoal pt-4">
                Why it&apos;s half price
              </h2>
              <div className="w-10 h-px bg-ember" />

              <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
                I&apos;m finishing the case study hours my EFT qualification
                requires. You get a full session at half price, I get the hours.
                That&apos;s the trade.
              </p>
              <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
                I&apos;m not new to sitting with people in the middle of this.
                Fifteen hundred hours of coaching says otherwise. Tapping is the
                newer tool.
              </p>
              <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
                Sessions are written up anonymously and never published.
                I&apos;ll ask you to confirm you&apos;re fine with that when you
                book.
              </p>
              <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
                Full price from {TAPPING_REDUCED_END}.
              </p>
            </>
          )}

          <h2 className="font-display text-2xl sm:text-3xl text-charcoal pt-4">
            Price
          </h2>
          <div className="w-10 h-px bg-ember" />

          {/* Pricing card */}
          <div className="bg-cream rounded-2xl p-6 sm:p-8 space-y-4">
            <p className="text-3xl font-display text-charcoal">
              {TAPPING_PAGE_STRUCK && (
                <span className="line-through text-text-light mr-3">
                  {TAPPING_PAGE_STRUCK}
                </span>
              )}
              {TAPPING_PAGE_PRICE}
              <span className="text-text-light text-base font-body ml-2">
                per session, about {TAPPING_DISPLAY_USD}
              </span>
            </p>
            <p className="text-text-medium text-sm leading-relaxed">
              Billed in pounds. International cards are fine, exchange rate
              calculated at payment.
            </p>
            <a
              href={TAPPING_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-7 py-3.5 rounded-full font-semibold text-base transition-colors"
              style={{ backgroundColor: "#c2410c", color: "#fef3c7" }}
            >
              Book a Session
            </a>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-line pt-8 mt-8">
            <p className="text-text-light text-sm leading-relaxed">
              EFT is a complementary self help technique. It is not therapy and
              it is not medical treatment. It works well alongside professional
              care and it is not a substitute for it. If you are in crisis, or
              working with something that needs clinical support, please speak
              with your doctor or a therapist first.
            </p>
          </div>

          {/* Cross-links */}
          <div className="border-t border-line pt-8 space-y-3">
            <p className="text-text-medium text-base leading-relaxed">
              Looking for something different?
            </p>
            <p className="text-text-medium text-sm leading-relaxed">
              The{" "}
              <Link
                href="/workbook"
                className="text-ember underline underline-offset-4 decoration-ember/30 hover:decoration-ember"
              >
                13th Stage Workbook
              </Link>{" "}
              is a self-guided recovery program. The{" "}
              <Link
                href="/coaching"
                className="text-ember underline underline-offset-4 decoration-ember/30 hover:decoration-ember"
              >
                coaching program
              </Link>{" "}
              is six weeks one to one. Or start with the{" "}
              <Link
                href="/"
                className="text-ember underline underline-offset-4 decoration-ember/30 hover:decoration-ember"
              >
                free assessment
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
