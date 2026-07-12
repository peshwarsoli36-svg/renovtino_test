import Link from "next/link";

import { cn } from "@/lib/utils";
import { SITE } from "@/lib/config";

interface LogoProps {
  href?: string;
  className?: string;
}

/** The SAM wordmark with a gold accent dot. */
export function Logo({ href = "#home", className }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={`${SITE.name} — home`}
      className={cn(
        "group inline-flex items-baseline font-heading text-xl font-bold tracking-tight text-white",
        className
      )}
    >
      <span>{SITE.name}</span>
      <span className="ml-0.5 inline-block text-gold transition-transform duration-300 group-hover:-translate-y-0.5">
        .
      </span>
    </Link>
  );
}
