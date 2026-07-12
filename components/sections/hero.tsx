import { ChevronDown } from "lucide-react";

import { SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import { FrameImage } from "@/components/common/frame-image";
import { BookButton } from "@/components/common/book-button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* Background photograph + cinematic overlays */}
      <div className="absolute inset-0 -z-10">
        <FrameImage
          src={IMAGES.hero}
          alt="Interior of the SAM barbershop"
          fill
          priority
          sizes="100vw"
          className="h-full w-full rounded-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-24 lg:px-8">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <div className="animate-enter">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-gold" />
              {SITE.established} · {SITE.location}
            </span>
          </div>

          <div className="animate-enter" style={{ animationDelay: "90ms" }}>
            <h1 className="font-heading text-[24vw] font-bold leading-[0.82] tracking-tighter text-white sm:text-[18vw] lg:text-[12rem]">
              SAM<span className="text-gradient-gold">.</span>
            </h1>
          </div>

          <div
            className="flex animate-enter flex-col gap-4"
            style={{ animationDelay: "180ms" }}
          >
            <p className="text-xl font-medium text-white sm:text-2xl">
              {SITE.tagline}
            </p>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Precision cuts, honest craft and a calm, considered space — in the
              heart of {SITE.location}.
            </p>
          </div>

          <div
            className="mt-2 animate-enter"
            style={{ animationDelay: "260ms" }}
          >
            <BookButton size="lg" />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/45 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="size-4 animate-bounce" />
      </div>
    </section>
  );
}
