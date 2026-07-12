import { Star } from "lucide-react";

import { FEATURES } from "@/lib/data";
import { IMAGES } from "@/lib/images";
import { Section } from "@/components/common/section";
import { FrameImage } from "@/components/common/frame-image";
import { Reveal } from "@/components/common/reveal";

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <Reveal className="order-2 lg:order-1">
          <div className="group relative">
            <FrameImage
              src={IMAGES.about}
              alt="A classic leather barber chair at SAM"
              fill
              sizes="(min-width: 1024px) 42vw, 90vw"
              zoom
              className="aspect-[4/5] w-full rounded-3xl sm:aspect-[3/4]"
            />
            <div className="absolute -bottom-6 -right-3 rounded-2xl border border-white/10 bg-surface/90 px-5 py-4 shadow-2xl backdrop-blur-sm sm:-right-6">
              <p className="flex items-center gap-1.5 font-heading text-2xl font-semibold text-white">
                4.9
                <Star className="size-5 fill-gold text-gold" />
              </p>
              <p className="text-xs text-muted-foreground">1,200+ reviews</p>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <Reveal className="flex flex-col gap-4">
            <span className="overline">About</span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
              A refined take on the classic barbershop
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              At SAM we pair traditional technique with a modern, minimal space.
              Every visit is unhurried and precise — just you, the chair and a
              cut done properly.
            </p>
          </Reveal>

          <Reveal delay={120} className="grid gap-6">
            {FEATURES.map(({ title, description, icon: Icon }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                  <Icon className="size-5" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
