import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { SITE } from "@/lib/salon/config";
import { COPY } from "@/lib/salon/content";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-svh min-h-[640px] items-center overflow-hidden"
    >
      {/* Full-screen background with Ken Burns zoom */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="hero-ken-burns relative h-full w-full">
            <Image
              src={IMAGES.hero}
              alt={`${SITE.legalName} — premium kapsalon in Haarlem`}
              fill
              priority
              sizes="100vw"
              quality={85}
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Premium dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/68" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/30"
          aria-hidden
        />
      </div>

      {/* Content — left aligned */}
      <div className="relative mx-auto w-full max-w-6xl px-6 pt-28 pb-20 lg:px-8">
        <div className="flex max-w-2xl flex-col items-start gap-6 lg:max-w-3xl">
          <div className="animate-enter">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white/85 backdrop-blur-sm sm:text-xs">
              <span className="size-1.5 rounded-full bg-gold" />
              {COPY.hero.badge}
            </span>
          </div>

          <div className="animate-enter" style={{ animationDelay: "100ms" }}>
            <h1 className="font-heading text-[2.75rem] font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {COPY.hero.headline.replace(".", "")}
              <span className="text-gradient-gold">.</span>
            </h1>
          </div>

          <div
            className="animate-enter flex flex-col gap-4"
            style={{ animationDelay: "200ms" }}
          >
            <p className="text-xl font-medium tracking-wide text-gold sm:text-2xl">
              {COPY.hero.subheadline}
            </p>
            <p className="max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
              {COPY.hero.description}
            </p>
          </div>

          <div
            className="animate-enter mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            style={{ animationDelay: "320ms" }}
          >
            <Link
              href="#book"
              className={cn(
                buttonVariants({ variant: "default" }),
                "group/hero h-12 rounded-full px-7 text-[0.95rem] font-semibold tracking-wide shadow-[0_10px_40px_-12px_rgba(200,169,106,0.55)] transition-all duration-300 hover:shadow-[0_16px_50px_-12px_rgba(200,169,106,0.7)]"
              )}
            >
              {COPY.hero.ctaPrimary}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/hero:translate-x-0.5" />
            </Link>
            <Link
              href="#services"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-full border-white/20 bg-white/5 px-7 text-[0.95rem] font-semibold tracking-wide text-white backdrop-blur-sm transition-colors hover:border-gold/40 hover:bg-white/10 hover:text-white"
              )}
            >
              {COPY.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">
          {COPY.hero.scroll}
        </span>
        <ChevronDown className="size-4 animate-bounce" />
      </div>
    </section>
  );
}
