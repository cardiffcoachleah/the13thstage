import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The 13th Stage — Burnout Assessment & Recovery",
  description:
    "The burnout framework has 12 stages. This is the one after. Take the free assessment to find where you are on the arc — and discover the path back to yourself.",
  openGraph: {
    title: "The 13th Stage — Burnout Assessment",
    description:
      "The burnout framework has 12 stages. This is the one after. Take the free assessment.",
    url: "https://the13thstage.com",
    siteName: "The 13th Stage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 13th Stage — Burnout Assessment",
    description:
      "The burnout framework has 12 stages. This is the one after.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
