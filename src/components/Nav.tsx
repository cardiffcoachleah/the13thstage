"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/coaching", label: "Coaching" },
    { href: "/workbook", label: "Workbook" },
  ];

  // On home page with dark hero, nav should be light
  const isHome = pathname === "/";

  return (
    <nav
      className={`absolute top-0 left-0 right-0 z-50 px-5 py-5 flex items-center justify-between max-w-3xl mx-auto ${
        isHome ? "" : ""
      }`}
    >
      <Link
        href="/"
        className={`font-display text-lg tracking-tight ${
          isHome ? "text-dawn-glow/80 hover:text-dawn-glow" : "text-charcoal hover:text-ember"
        } transition-colors`}
      >
        The 13th Stage
      </Link>
      <div className="flex items-center gap-5 sm:gap-7">
        {links.slice(1).map((link) => (
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
