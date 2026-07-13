"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { DEMO_REVIEWS } from "@/lib/salon/reviews";
import { COPY } from "@/lib/salon/content";
import type { DemoReview } from "@/types";
import { cn } from "@/lib/utils";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button-variants";

function GoldStars({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex gap-0.5", className)}
      aria-label="5 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="size-4 fill-gold text-gold"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  className,
}: {
  review: DemoReview;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-5 rounded-[20px] border border-white/10",
        "bg-white/[0.04] p-6 backdrop-blur-md",
        "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55)]",
        "transition-all duration-500",
        "hover:-translate-y-1 hover:border-gold/30 hover:bg-white/[0.06]",
        "hover:shadow-[0_16px_48px_-12px_rgba(200,169,106,0.16)]",
        className
      )}
    >
      <GoldStars />

      <blockquote className="flex-1 text-sm leading-relaxed text-white/90 sm:text-[0.95rem]">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3 border-t border-white/10 pt-5">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full",
            "border border-gold/30 bg-gradient-to-br from-gold/20 via-surface-2 to-ink",
            "font-heading text-sm font-semibold text-gold"
          )}
          aria-hidden
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-white">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.location}</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full border border-gold/20 bg-gold/10 px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-gold uppercase">
          {review.service}
        </span>
      </div>
    </article>
  );
}

export function Reviews() {
  return (
    <Section
      id="reviews"
      className="relative overflow-hidden bg-[#080808] py-24 sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,106,0.05),transparent_65%)]"
        aria-hidden
      />

      <div className="relative flex flex-col gap-14 lg:gap-16">
        <SectionHeading
          overline={COPY.reviews.overline}
          title={
            <>
              {COPY.reviews.title}
            </>
          }
          description={COPY.reviews.body}
        />

        {/* Mobile — swipeable carousel */}
        <div className="-mx-6 sm:-mx-0 md:hidden">
          <div
            className={cn(
              "flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2",
              "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            )}
          >
            {DEMO_REVIEWS.map((review, index) => (
              <Reveal
                key={review.id}
                delay={index * 80}
                className="w-[min(85vw,320px)] shrink-0 snap-center"
              >
                <ReviewCard review={review} className="min-h-[280px]" />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Desktop — responsive grid */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {DEMO_REVIEWS.map((review, index) => (
            <Reveal key={review.id} delay={index * 90}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>

        {/* Average rating + CTA */}
        <Reveal delay={200}>
          <div
            className={cn(
              "flex flex-col items-center gap-6 rounded-[20px] border border-white/10",
              "bg-white/[0.04] px-6 py-10 text-center backdrop-blur-md sm:px-10 sm:py-12",
              "shadow-[0_12px_40px_-16px_rgba(0,0,0,0.55)]"
            )}
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
              {COPY.reviews.averageLabel}
            </p>

            <div className="flex flex-col items-center gap-3">
              <GoldStars className="gap-1 [&_svg]:size-5" />
              <p className="font-heading text-3xl font-semibold text-white sm:text-4xl">
                {COPY.reviews.rating}
              </p>
              <p className="text-sm text-muted-foreground sm:text-base">
                &ldquo;{COPY.reviews.ratingNote}&rdquo;
              </p>
            </div>

            <Link
              href="#book"
              className={cn(
                buttonVariants({ variant: "default" }),
                "group/cta h-12 rounded-full px-8 text-[0.95rem] font-semibold tracking-wide",
                "shadow-[0_10px_40px_-12px_rgba(200,169,106,0.55)]",
                "transition-all duration-300 hover:shadow-[0_16px_50px_-12px_rgba(200,169,106,0.7)]"
              )}
            >
              {COPY.reviews.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
