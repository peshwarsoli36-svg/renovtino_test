import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SHOWCASE_SERVICES } from "@/lib/salon/data";
import { COPY } from "@/lib/salon/content";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { buttonVariants } from "@/components/ui/button-variants";

function ShowcaseServiceCard({
  name,
  description,
  icon: Icon,
  delay,
}: {
  name: string;
  description: string;
  icon: LucideIcon;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <Link
        href="#book"
        className={cn(
          "group flex gap-4 rounded-2xl border border-white/10 bg-surface/50 p-5",
          "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] transition-all duration-300",
          "hover:-translate-y-0.5 hover:border-gold/35 hover:bg-surface hover:shadow-[0_16px_48px_-12px_rgba(200,169,106,0.15)]"
        )}
      >
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold transition-colors duration-300 group-hover:border-gold/40 group-hover:bg-gold group-hover:text-ink">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-base font-semibold text-white transition-colors group-hover:text-gold">
              {name}
            </h3>
            <span className="shrink-0 text-sm font-medium tabular-nums text-gold/70">
              €--
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

export function Services() {
  return (
    <Section id="services" className="overflow-hidden bg-[#0d0d0d]">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* Image — left on desktop, top on mobile */}
        <Reveal className="order-1">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className={cn(
                "relative aspect-[3/4] w-full overflow-hidden rounded-[24px]",
                "border border-gold/25 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.65),0_0_0_1px_rgba(200,169,106,0.08)]",
                "sm:aspect-[4/5]"
              )}
            >
              <Image
                src={IMAGES.services}
                alt="Professional precision haircut at Hair SixtyOne"
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-black/20"
                aria-hidden
              />
            </div>
            <div
              className="pointer-events-none absolute -inset-px -z-10 rounded-[26px] bg-gold/10 blur-2xl"
              aria-hidden
            />
          </div>
        </Reveal>

        {/* Services — right on desktop */}
        <div className="order-2 flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <span className="overline">{COPY.services.overline}</span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
              {COPY.services.title}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {COPY.services.body}
            </p>
          </Reveal>

          <div className="flex flex-col gap-3">
            {SHOWCASE_SERVICES.map((service, index) => (
              <ShowcaseServiceCard
                key={service.id}
                name={service.name}
                description={service.description}
                icon={service.icon}
                delay={80 + index * 60}
              />
            ))}
          </div>

          <Reveal delay={420}>
            <Link
              href="#book"
              className={cn(
                buttonVariants({ variant: "default" }),
                "group/services h-12 w-fit rounded-full px-7 text-[0.95rem] font-semibold tracking-wide shadow-[0_10px_40px_-12px_rgba(200,169,106,0.55)] transition-all duration-300 hover:shadow-[0_16px_50px_-12px_rgba(200,169,106,0.7)]"
              )}
            >
              {COPY.services.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/services:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
