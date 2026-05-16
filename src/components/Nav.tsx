"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function LogoIcon({ light }: { light?: boolean }) {
  const color = light ? "#fbbf24" : "#d97706";
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block -mt-0.5"
    >
      {/* Sunrise glow */}
      <circle cx="11" cy="13" r="8" fill={color} opacity="0.15" />
      <circle cx="11" cy="13" r="5" fill={color} opacity="0.3" />
      <circle cx="11" cy="13" r="2.5" fill={color} opacity="0.6" />
      {/* Horizon */}
      <line x1="2" y1="15" x2="20" y2="15" stroke={color} strokeWidth="0.75" opacity="0.5" />
      {/* Rays */}
      <line x1="11" y1="13" x2="11" y2="4" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="11" y1="13" x2="5" y2="6" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="11" y1="13" x2="17" y2="6" stroke={color} strokeWidth="0.5" opacity="0.3" />
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

  const isHome = pathname === "/";

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-5 py-5 flex items-center justify-between max-w-3xl mx-auto">
      <Link
        href="/"
        className={`flex items-center gap-2 font-display text-lg tracking-tight ${
          isHome
            ? "text-dawn-glow/80 hover:text-dawn-glow"
            : "text-charcoal hover:text-ember"
        } transition-colors`}
      >
        <LogoIcon light={isHome} />
        The 13th Stage
      </Link>
      <div className="flex items-center gap-5 sm:gap-7">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm transition-colors ${
              pathname === link.href
                ? isHome
                  ? "text-dawn-glow font-medium"
                  : "text-ember font-medium"
                : isHome
                  ? "text-dawn-glow/50 hover:text-dawn-glow/80"
                  : "text-text-light hover:text-text-dark"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
