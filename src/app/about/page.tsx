import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Leah Farmer",
  description:
    "Leah Farmer is a professionally certified coach and former tech executive who helps senior leaders recover from burnout and build sustainable careers.",
  openGraph: {
    title: "About Leah Farmer | The 13th Stage",
    description:
      "Former tech executive turned burnout recovery coach. 20+ years in product and technology leadership.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Dark header band */}
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
            About
          </p>
          <h1 className="font-display text-4xl sm:text-5xl leading-tight" style={{ color: "#fef3c7" }}>
            I burned out. Then I built something
            <br />
            <span style={{ color: "#ea580c" }}>from what I learned.</span>
          </h1>
        </div>
      </div>

      <article className="px-5 py-12 sm:py-16 bg-warm-white">
        <div className="max-w-lg mx-auto space-y-8">
          <div className="w-10 h-px bg-ember" />

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            I&apos;m Leah Farmer. I spent more than twenty years in technology
            leadership &mdash; building products, shipping software, leading
            engineering and product teams through every kind of pressure the
            industry can throw at you. I loved the work. And the work nearly
            broke me.
          </p>

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            In 2022, I burned out. Not the I-need-a-vacation kind. The kind
            where your body makes the decision your mind won&apos;t &mdash;
            where every system screams at you to stop and you finally listen.
            I walked away from a senior executive role because staying would
            have cost me more than any job is worth.
          </p>

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            What followed was the hardest and most important work I&apos;ve
            done. I had to learn how to sleep again. How to eat. How to move
            my body without it feeling like a performance metric. I had to sit
            with grief, and shame, and the unsettling question of who I was
            when I wasn&apos;t producing.
          </p>

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            That process &mdash; that slow, deliberate return to myself &mdash;
            is what became The 13th Stage. Not a book I read. Not a theory I
            studied. A framework I lived, and then refined by coaching dozens
            of other senior leaders through their own versions of it.
          </p>

          <h2 className="font-display text-2xl sm:text-3xl text-charcoal pt-4">
            What I do now
          </h2>
          <div className="w-10 h-px bg-ember" />

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            I&apos;m a Professional Certified Coach (PCC) through the
            International Coaching Federation. I work with people who are
            burned out, recovering from burnout, or trying to build careers
            and lives that don&apos;t require burning out in the first place.
            Many of my clients are senior leaders and executives in technology,
            but burnout doesn&apos;t check your title or your industry. If
            you&apos;re here, you&apos;re in the right place.
          </p>

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            I also run burnout awareness and recovery sessions for
            organizations. I&apos;ve worked with teams at companies including
            EA, Moderna, and Style School &mdash; bringing this framework into
            workplaces where the culture of overwork often goes unexamined.
          </p>

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            My coaching draws on twenty years of lived experience in the rooms
            where burnout happens &mdash; the reorgs, the impossible deadlines,
            the leaders who confuse intensity with excellence, the cultures that
            reward self-sacrifice and punish boundaries. I know what it feels
            like to be the person holding everything together while quietly
            falling apart. And I know the way out, because I walked it.
          </p>

          <h2 className="font-display text-2xl sm:text-3xl text-charcoal pt-4">
            Why the 13th Stage
          </h2>
          <div className="w-10 h-px bg-ember" />

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            The Freudenberger and North framework maps 12 stages of burnout.
            It&apos;s been the standard for fifty years. But it ends at
            collapse. It describes the problem without offering the path out.
          </p>

          <p className="text-text-dark text-base sm:text-lg leading-[1.85]">
            The 13th Stage is that path. It&apos;s a three-phase recovery
            framework &mdash; Stabilize, Resource, Reimagine &mdash; built from
            what actually works when you&apos;re rebuilding from the ground up.
            It&apos;s informed by neuroscience, somatic practice, and the
            patterns I&apos;ve seen across dozens of coaching engagements.
            It&apos;s not theory. It&apos;s what I wish someone had handed me
            in 2022.
          </p>

          <div className="flex flex-wrap gap-4 pt-6 pb-8">
            <Link
              href="/coaching"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-charcoal text-warm-white rounded-full font-medium text-base hover:bg-deep transition-colors"
            >
              Work with me
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-line text-text-medium rounded-full font-medium text-base hover:border-charcoal hover:text-charcoal transition-colors"
            >
              Take the Assessment
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
