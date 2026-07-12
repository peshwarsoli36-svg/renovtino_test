import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {
  /** Extra classes for the inner max-width container. */
  containerClassName?: string;
}

/**
 * Consistent page section: vertical rhythm, scroll offset for the fixed
 * navbar, and a centered max-width container.
 */
export function Section({
  id,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 sm:py-24 lg:py-32",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
