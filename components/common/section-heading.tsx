import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/common/reveal";

interface SectionHeadingProps {
  overline?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/** Reusable section header: small gold overline, title, and lede. */
export function SectionHeading({
  overline,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {overline ? <span className="overline">{overline}</span> : null}

      <h2 className="max-w-3xl font-heading text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
