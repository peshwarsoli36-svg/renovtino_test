import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  Droplets,
  Scissors,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { COPY } from "@/lib/salon/content";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button-variants";

const FEATURE_ICONS: LucideIcon[] = [
  Scissors,
  Droplets,
  Award,
  ShieldCheck,
  Sparkles,
  CalendarCheck,
];

function CraftFeatureCard({
  title,
  description,
  icon: Icon,
  delay,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/35 p-5",
          "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] transition-all duration-300",
          "hover:-translate-y-0.5 hover:border-gold/30 hover:bg-surface/70",
          "hover:shadow-[0_16px_48px_-12px_rgba(200,169,106,0.14)]"
        )}
      >
        <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold/60 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
        <div className="flex gap-3.5">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold transition-colors duration-300 group-hover:border-gold/40 group-hover:bg-gold group-hover:text-ink">
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <h3 className="font-heading text-sm font-semibold text-white transition-colors duration-300 group-hover:text-gold sm:text-base">
              {title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function OurCraft() {
  return (
    <Section
      id="our-craft"
      className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,169,106,0.06),transparent_55%)]"
        aria-hidden
      />

      <div className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
        {/* Image — left on desktop, top on mobile */}
        <Reveal className="order-1">
          <div className="group/image relative mx-auto w-full max-w-lg lg:max-w-none">
            <div
              className={cn(
                "relative aspect-[4/5] w-full overflow-hidden rounded-[24px]",
                "border border-gold/25 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.65),0_0_0_1px_rgba(200,169,106,0.08)]",
                "transition-shadow duration-500 group-hover/image:shadow-[0_28px_72px_-16px_rgba(200,169,106,0.16)]"
              )}
            >
              <div className="hero-ken-burns relative h-full w-full">
                <Image
                  src={IMAGES.ourCraft}
                  alt="Professional barber tools at Hair SixtyOne"
                  fill
                  sizes="(min-width: 1024px) 44vw, 90vw"
                  className="object-cover object-center"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-black/10"
                aria-hidden
              />
            </div>
            <div
              className="pointer-events-none absolute -inset-px -z-10 rounded-[26px] bg-gold/10 blur-2xl"
              aria-hidden
            />
          </div>
        </Reveal>

        {/* Content — right on desktop */}
        <div className="order-2 flex flex-col gap-10">
          <Reveal className="flex flex-col gap-5">
            <span className="overline">{COPY.ourCraft.overline}</span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              {COPY.ourCraft.title.replace(".", "")}
              <span className="text-gradient-gold">.</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {COPY.ourCraft.body}
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {COPY.ourCraft.features.map((feature, index) => (
              <CraftFeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={FEATURE_ICONS[index] ?? Scissors}
                delay={100 + index * 60}
              />
            ))}
          </div>

          <Reveal delay={460}>
            <div className="rounded-2xl border border-gold/20 bg-gold/[0.06] px-6 py-5 shadow-[inset_0_1px_0_rgba(200,169,106,0.12)]">
              <p className="font-heading text-base italic leading-relaxed text-white/90 sm:text-lg">
                &ldquo;{COPY.ourCraft.quote}&rdquo;
              </p>
            </div>
          </Reveal>

          <Reveal delay={540}>
            <Link
              href="#book"
              className={cn(
                buttonVariants({ variant: "default" }),
                "group/craft h-12 w-fit rounded-full px-7 text-[0.95rem] font-semibold tracking-wide shadow-[0_10px_40px_-12px_rgba(200,169,106,0.55)] transition-all duration-300 hover:shadow-[0_16px_50px_-12px_rgba(200,169,106,0.7)]"
              )}
            >
              {COPY.ourCraft.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/craft:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
