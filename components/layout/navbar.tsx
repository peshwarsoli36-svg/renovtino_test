"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { NAV_ITEMS, SECTION_IDS } from "@/lib/config";
import { useScrolled } from "@/hooks/use-scrolled";
import { useActiveSection } from "@/hooks/use-active-section";
import { Logo } from "@/components/common/logo";
import { BookButton } from "@/components/common/book-button";
import { MobileNav } from "@/components/layout/mobile-nav";

const NAV_LINKS = NAV_ITEMS.filter((item) => item.href !== "#book");

/** Fixed, scroll-aware top navigation with a mobile drawer. */
export function Navbar() {
  const scrolled = useScrolled(16);
  const active = useActiveSection(SECTION_IDS);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-black/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-white"
                      : "text-muted-foreground hover:text-white"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 -bottom-px h-px origin-left bg-gold transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <BookButton size="md" className="hidden md:inline-flex" />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
