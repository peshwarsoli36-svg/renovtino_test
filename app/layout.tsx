import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { SITE } from "@/lib/salon/config";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.seo.metadataBase),
  title: {
    default: SITE.seo.title,
    template: SITE.seo.titleTemplate,
  },
  description: SITE.seo.description,
  keywords: [...SITE.seo.keywords],
  openGraph: {
    title: SITE.seo.openGraph.title,
    description: SITE.seo.openGraph.description,
    type: SITE.seo.openGraph.type,
    locale: SITE.seo.openGraph.locale,
    url: SITE.website,
    siteName: SITE.name,
  },
  alternates: {
    canonical: SITE.website,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE.language}
      className={`dark ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
