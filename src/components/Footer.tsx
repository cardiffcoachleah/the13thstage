import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-5 py-10 bg-charcoal">
      <div className="max-w-lg mx-auto text-center space-y-5">
        {/* Site links */}
        <div className="flex justify-center gap-6 text-xs" style={{ color: "#78716c" }}>
          <Link href="/about" className="hover:text-peach transition-colors">
            About
          </Link>
          <Link href="/coaching" className="hover:text-peach transition-colors">
            Coaching
          </Link>
          <Link href="/workbook" className="hover:text-peach transition-colors">
            Workbook
          </Link>
          <a
            href="https://leahfarmer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-peach transition-colors"
          >
            leahfarmer.com
          </a>
        </div>

        <div className="w-8 h-px mx-auto" style={{ backgroundColor: "#292524" }} />

        {/* Disclaimer */}
        <p className="text-xs leading-relaxed" style={{ color: "#57534e" }}>
          This assessment is for self-reflection purposes only. It is not a
          clinical diagnostic tool and does not constitute medical advice,
          diagnosis, or treatment. If you are experiencing a mental health
          crisis, please contact a healthcare professional or crisis service.
        </p>
        <div
          className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 text-xs"
          style={{ color: "#57534e" }}
        >
          <span>988 Suicide &amp; Crisis Lifeline: Call or text 988</span>
          <span>Samaritans: 116 123</span>
        </div>

        <div className="w-8 h-px mx-auto" style={{ backgroundColor: "#292524" }} />

        <p className="text-xs" style={{ color: "#44403c" }}>
          &copy; 2026 Leah Farmer Coaching &amp; Advisory.{" "}
          <a
            href="https://leahfarmer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-peach transition-colors"
          >
            leahfarmer.com
          </a>
        </p>
      </div>
    </footer>
  );
}
