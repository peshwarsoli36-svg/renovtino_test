import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Crown,
  MessageCircle,
  Scissors,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { COPY } from "@/lib/salon/content";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button-variants";

const STEP_ICONS: LucideIcon[] = [
  MessageCircle,
  Scissors,
  Sparkles,
  Crown,
];

function TimelineStep({
  step,
  title,
  description,
  icon: Icon,
  delay,
  isLast,
}: {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  delay: number;
  isLast: boolean;
}) {
  return (
    <Reveal delay={delay}>
      <div className="relative flex gap-5 pb-10 last:pb-0">
        {!isLast ? (
          <div
            className="absolute left-[1.6875rem] top-14 bottom-0 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-gold/10"
            aria-hidden
          />
        ) : null}

        <div className="relative z-10 flex size-14 shrink-0 flex-col items-center justify-center rounded-[20px] border border-gold/25 bg-surface shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]">
          <Icon className="size-5 text-gold" strokeWidth={1.75} />
          <span className="mt-0.5 text-[0.6rem] font-semibold tabular-nums tracking-wider text-gold/80">
            {step}
          </span>
        </div>

        <div
          className={cn(
            "group flex-1 rounded-[20px] border border-white/10 bg-surface/40 p-5",
            "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] transition-all duration-300",
            "hover:border-gold/25 hover:bg-surface/70 hover:shadow-[0_16px_48px_-12px_rgba(200,169,106,0.12)]"
          )}
        >
          <h3 className="font-heading text-lg font-semibold text-white transition-colors group-hover:text-gold">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      className="relative overflow-hidden bg-[#080808] py-24 sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,106,0.04),transparent_70%)]"
        aria-hidden
      />

      <div className="relative flex flex-col gap-14 lg:gap-16">
        <Reveal className="mx-auto flex max-w-3xl flex-col gap-4 text-center lg:mx-0 lg:text-left">
          <span className="overline">{COPY.experience.overline}</span>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
            {COPY.experience.title.replace(".", "")}
            <span className="text-gradient-gold">.</span>
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {COPY.experience.subtitle}
          </p>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Timeline */}
          <div className="order-2 lg:order-1">
            {COPY.experience.steps.map((item, index) => (
              <TimelineStep
                key={item.step}
                step={item.step}
                title={item.title}
                description={item.description}
                icon={STEP_ICONS[index] ?? Scissors}
                delay={100 + index * 80}
                isLast={index === COPY.experience.steps.length - 1}
              />
            ))}
          </div>

          {/* Featured image */}
          <Reveal className="order-1 lg:order-2 lg:sticky lg:top-28" delay={60}>
            <div className="group/image relative mx-auto w-full max-w-md lg:max-w-none">
              <div
                className={cn(
                  "relative aspect-[4/5] w-full overflow-hidden rounded-[24px]",
                  "border border-gold/25 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.65),0_0_0_1px_rgba(200,169,106,0.08)]",
                  "transition-shadow duration-500 group-hover/image:shadow-[0_28px_72px_-16px_rgba(200,169,106,0.16)]"
                )}
              >
                <div className="hero-ken-burns relative h-full w-full">
                  <Image
                    src={IMAGES.experience}
                    alt="Professional barber tools at Hair SixtyOne"
                    fill
                    sizes="(min-width: 1024px) 44vw, 90vw"
                    className="object-cover object-center"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-black/10"
                  aria-hidden
                />
              </div>
              <div
                className="pointer-events-none absolute -inset-px -z-10 rounded-[26px] bg-gold/10 blur-2xl"
                aria-hidden
              />
            </div>
          </Reveal>
        </div>

        {/* Bottom CTA */}
        <Reveal delay={200}>
          <div className="flex flex-col items-center gap-6 rounded-[24px] border border-white/10 bg-surface/30 px-6 py-12 text-center shadow-[0_16px_48px_-16px_rgba(0,0,0,0.5)] sm:px-10 sm:py-14">
            <h3 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
              {COPY.experience.ctaHeadline}
            </h3>
            <Link
              href="#book"
              className={cn(
                buttonVariants({ variant: "default" }),
                "group/exp h-12 rounded-full px-8 text-[0.95rem] font-semibold tracking-wide shadow-[0_10px_40px_-12px_rgba(200,169,106,0.55)] transition-all duration-300 hover:shadow-[0_16px_50px_-12px_rgba(200,169,106,0.7)]"
              )}
            >
              {COPY.experience.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/exp:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
