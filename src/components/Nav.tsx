"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function LogoIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block -mt-0.5"
    >
      <circle cx="11" cy="13" r="8" fill="#fbbf24" opacity="0.15" />
      <circle cx="11" cy="13" r="5" fill="#fbbf24" opacity="0.3" />
      <circle cx="11" cy="13" r="2.5" fill="#fbbf24" opacity="0.6" />
      <line x1="2" y1="15" x2="20" y2="15" stroke="#fbbf24" strokeWidth="0.75" opacity="0.5" />
      <line x1="11" y1="13" x2="11" y2="4" stroke="#fbbf24" strokeWidth="0.5" opacity="0.4" />
      <line x1="11" y1="13" x2="5" y2="6" stroke="#fbbf24" strokeWidth="0.5" opacity="0.3" />
      <line x1="11" y1="13" x2="17" y2="6" stroke="#fbbf24" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/workbook", label: "Workbook" },
    { href: "/coaching", label: "Coaching" },
    { href: "/about", label: "About" },
  ];

  // Every page has a dark or colored header band, so nav is always light
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-5 py-5 flex items-center justify-between max-w-3xl mx-auto">
      <Link
        href="/"
        className="flex items-center gap-2 font-display text-lg tracking-tight transition-colors"
        style={{ color: "rgba(254,243,199,0.85)" }}
      >
        <LogoIcon />
        The 13th Stage
      </Link>
      <div className="flex items-center gap-5 sm:gap-7">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm transition-colors"
            style={{
              color:
                pathname === link.href
                  ? "#fef3c7"
                  : "rgba(254,243,199,0.5)",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
