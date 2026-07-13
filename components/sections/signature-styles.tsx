import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Scissors, Wind, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { COPY } from "@/lib/salon/content";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button-variants";

const FEATURE_ICONS: LucideIcon[] = [Zap, Layers, Scissors, Wind];

function StyleFeatureCard({
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
          "hover:-translate-y-0.5 hover:border-gold/30 hover:bg-surface/80",
          "hover:shadow-[0_16px_48px_-12px_rgba(200,169,106,0.15)]"
        )}
      >
        <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold/80 via-gold/40 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
        <div className="flex flex-col gap-3">
          <span className="inline-flex size-10 w-fit items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold transition-colors duration-300 group-hover:border-gold/40 group-hover:bg-gold group-hover:text-ink">
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
          <div>
            <h3 className="font-heading text-base font-semibold text-white transition-colors duration-300 group-hover:text-gold">
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

export function SignatureStyles() {
  return (
    <Section
      id="signature-styles"
      className="relative overflow-hidden bg-[#080808] py-24 sm:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,169,106,0.05),transparent_50%)]"
        aria-hidden
      />

      <div className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
        {/* Text — left on desktop, top on mobile */}
        <div className="order-1 flex flex-col gap-10">
          <Reveal className="flex flex-col gap-5">
            <span className="overline">{COPY.signatureStyles.overline}</span>
            <h2 className="font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              {COPY.signatureStyles.titleLine1}
              <br />
              <span className="text-gradient-gold">
                {COPY.signatureStyles.titleLine2.replace(".", "")}
              </span>
              <span className="text-gradient-gold">.</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {COPY.signatureStyles.body}
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {COPY.signatureStyles.features.map((feature, index) => (
              <StyleFeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={FEATURE_ICONS[index] ?? Scissors}
                delay={120 + index * 70}
              />
            ))}
          </div>

          <Reveal delay={420}>
            <p className="max-w-lg font-heading text-lg text-white/80 sm:text-xl">
              {COPY.signatureStyles.statement}
            </p>
          </Reveal>

          <Reveal delay={500}>
            <Link
              href="#book"
              className={cn(
                buttonVariants({ variant: "default" }),
                "group/style h-12 w-fit rounded-full px-7 text-[0.95rem] font-semibold tracking-wide shadow-[0_10px_40px_-12px_rgba(200,169,106,0.55)] transition-all duration-300 hover:shadow-[0_16px_50px_-12px_rgba(200,169,106,0.7)]"
              )}
            >
              {COPY.signatureStyles.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/style:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Image — right on desktop, below text on mobile */}
        <Reveal className="order-2" delay={80}>
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none lg:ml-auto">
            <div
              className={cn(
                "relative aspect-[4/5] w-full overflow-hidden rounded-[24px]",
                "border border-gold/25 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.65),0_0_0_1px_rgba(200,169,106,0.08)]"
              )}
            >
              <div className="hero-ken-burns relative h-full w-full">
                <Image
                  src={IMAGES.signatureStyles}
                  alt="Precision fade haircut at Hair SixtyOne"
                  fill
                  sizes="(min-width: 1024px) 44vw, 90vw"
                  className="object-cover object-center"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/25"
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
    </Section>
  );
}
