import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

const SIZES = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[0.95rem]",
} as const;

interface BookButtonProps {
  href?: string;
  label?: string;
  size?: keyof typeof SIZES;
  className?: string;
}

/** The primary gold call-to-action, reused across the site. */
export function BookButton({
  href = "#book",
  label = "Book Appointment",
  size = "lg",
  className,
}: BookButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "default" }),
        "group/book rounded-full font-semibold tracking-wide shadow-[0_10px_40px_-12px_rgba(200,169,106,0.55)] transition-all duration-300 hover:shadow-[0_16px_50px_-12px_rgba(200,169,106,0.7)]",
        SIZES[size],
        className
      )}
    >
      {label}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover/book:translate-x-0.5" />
    </Link>
  );
}
