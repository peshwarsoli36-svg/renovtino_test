import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sam-barber.example.com"),
  title: {
    default: "SAM — Modern Men's Barber",
    template: "%s — SAM",
  },
  description:
    "SAM is a modern men's barbershop offering precision haircuts, beard grooming and classic styling in a refined, minimal space. Book your appointment today.",
  keywords: [
    "barber",
    "barbershop",
    "men's haircut",
    "beard trim",
    "grooming",
    "SAM",
  ],
  openGraph: {
    title: "SAM — Modern Men's Barber",
    description:
      "Precision haircuts, beard grooming and classic styling in a refined, minimal space.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${manrope.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
