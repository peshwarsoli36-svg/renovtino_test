import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, Flame, Scissors } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { COPY } from "@/lib/salon/content";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button-variants";

const FEATURE_ICONS: LucideIcon[] = [Scissors, Flame, Crown];

function GroomingFeatureCard({
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
          "group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/40 p-5",
          "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] transition-all duration-300",
          "hover:border-gold/25 hover:bg-surface/80 hover:shadow-[0_16px_48px_-12px_rgba(200,169,106,0.12)]"
        )}
      >
        <div className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-gold transition-transform duration-300 group-hover:scale-y-100" />
        <div className="flex gap-4">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold transition-colors duration-300 group-hover:border-gold/40 group-hover:bg-gold group-hover:text-ink">
            <Icon className="size-5" strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-base font-semibold text-white transition-colors group-hover:text-gold">
              {title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function BeardGrooming() {
  return (
    <Section
      id="beard-grooming"
      className="relative overflow-hidden bg-[#0a0a0a]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,169,106,0.06),transparent_55%)]"
        aria-hidden
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* Image — left on desktop, top on mobile */}
        <Reveal className="order-1">
          <div className="group/image relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className={cn(
                "relative aspect-[3/4] w-full overflow-hidden rounded-[24px]",
                "border border-gold/25 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.65),0_0_0_1px_rgba(200,169,106,0.08)]",
                "transition-shadow duration-500 group-hover/image:shadow-[0_28px_72px_-16px_rgba(200,169,106,0.18)]",
                "sm:aspect-[4/5]"
              )}
            >
              <Image
                src={IMAGES.beardGrooming}
                alt="Traditional straight razor beard grooming at Hair SixtyOne"
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover/image:scale-[1.03]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-black/15"
                aria-hidden
              />
            </div>
            <div
              className="pointer-events-none absolute -inset-px -z-10 rounded-[26px] bg-gold/10 blur-2xl transition-opacity duration-500 group-hover/image:opacity-100"
              aria-hidden
            />
          </div>
        </Reveal>

        {/* Content — right on desktop */}
        <div className="order-2 flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <span className="overline">{COPY.beardGrooming.overline}</span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
              {COPY.beardGrooming.title.replace(".", "")}
              <span className="text-gradient-gold">.</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {COPY.beardGrooming.body}
            </p>
          </Reveal>

          <div className="flex flex-col gap-3">
            {COPY.beardGrooming.features.map((feature, index) => (
              <GroomingFeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={FEATURE_ICONS[index] ?? Scissors}
                delay={100 + index * 80}
              />
            ))}
          </div>

          <Reveal delay={360}>
            <blockquote className="relative border-l-2 border-gold/40 py-1 pl-5">
              <p className="font-heading text-lg italic leading-relaxed text-white/85 sm:text-xl">
                &ldquo;{COPY.beardGrooming.quote}&rdquo;
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={440}>
            <Link
              href="#book"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group/beard h-12 w-fit rounded-full border-gold/35 bg-transparent px-7 text-[0.95rem] font-semibold tracking-wide text-gold transition-all hover:border-gold/55 hover:bg-gold/5 hover:text-gold"
              )}
            >
              {COPY.beardGrooming.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/beard:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
