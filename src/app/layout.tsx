import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://the13thstage.com"),
  title: {
    default: "The 13th Stage — Burnout Assessment & Recovery Framework",
    template: "%s | The 13th Stage",
  },
  description:
    "There are 12 identified stages of burnout. The most important one is the 13th. Take the free assessment to find where you are — and discover the path back to yourself.",
  keywords: [
    "burnout assessment",
    "burnout quiz",
    "burnout recovery",
    "burnout stages",
    "burnout framework",
    "Freudenberger burnout",
    "executive burnout",
    "tech burnout",
    "leadership burnout",
    "burnout coaching",
    "burnout workbook",
    "stress recovery",
    "the 13th stage",
  ],
  authors: [{ name: "Leah Farmer", url: "https://leahfarmer.com" }],
  creator: "Leah Farmer Coaching & Advisory",
  openGraph: {
    title: "The 13th Stage — Burnout Assessment & Recovery",
    description:
      "There are 12 identified stages of burnout. The most important one is the 13th. Take the free assessment.",
    url: "https://the13thstage.com",
    siteName: "The 13th Stage",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 13th Stage — Burnout Assessment",
    description:
      "There are 12 identified stages of burnout. The most important one is the 13th.",
    creator: "@leahfarmer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href="https://the13thstage.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The 13th Stage",
              url: "https://the13thstage.com",
              description:
                "Burnout assessment and recovery framework by Leah Farmer Coaching & Advisory.",
              founder: {
                "@type": "Person",
                name: "Leah Farmer",
                url: "https://leahfarmer.com",
                jobTitle: "Executive Coach",
              },
            }),
          }}
        />
      </head>
      <body className="relative">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
