import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Crown,
  Droplets,
  Scissors,
} from "lucide-react";

import { COPY } from "@/lib/salon/content";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button-variants";

const FEATURE_ICONS = [Scissors, Crown, Droplets, CalendarCheck] as const;

export function About() {
  return (
    <Section id="about" className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* Image — above text on mobile, right on desktop */}
        <Reveal className="order-1 lg:order-2">
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div
              className={cn(
                "relative aspect-[4/5] w-full overflow-hidden rounded-[24px]",
                "border border-gold/25 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.65),0_0_0_1px_rgba(200,169,106,0.08)]",
                "sm:aspect-[3/4]"
              )}
            >
              <Image
                src={IMAGES.about}
                alt="Premium salon interior at Hair SixtyOne, Haarlem"
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
                aria-hidden
              />
            </div>
            <div
              className="pointer-events-none absolute -inset-px -z-10 rounded-[26px] bg-gold/10 blur-2xl"
              aria-hidden
            />
          </div>
        </Reveal>

        {/* Copy — below image on mobile, left on desktop */}
        <div className="order-2 flex flex-col gap-8 lg:order-1">
          <Reveal className="flex flex-col gap-4">
            <span className="overline">{COPY.about.overline}</span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              {COPY.about.title.replace(".", "")}
              <span className="text-gradient-gold">.</span>
            </h2>
            <p className="text-lg font-medium text-gold/90 sm:text-xl">
              {COPY.about.subtitle}
            </p>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {COPY.about.body}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-3 sm:grid-cols-2">
              {COPY.about.features.map(({ title }, index) => {
                const Icon = FEATURE_ICONS[index] ?? Check;
                return (
                  <div
                    key={title}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-surface/60 px-4 py-3.5 transition-colors hover:border-gold/20 hover:bg-surface"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <span className="flex items-center gap-2 text-sm font-medium text-white">
                      <Check className="size-3.5 shrink-0 text-gold/80" />
                      {title}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={220}>
            <Link
              href="#services"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group/about h-12 w-fit rounded-full border-gold/35 bg-transparent px-7 text-[0.95rem] font-semibold tracking-wide text-gold transition-all hover:border-gold/55 hover:bg-gold/5 hover:text-gold"
              )}
            >
              {COPY.about.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/about:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
