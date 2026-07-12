import { GALLERY } from "@/lib/data";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { FrameImage } from "@/components/common/frame-image";

export function Gallery() {
  return (
    <Section id="gallery">
      <SectionHeading
        overline="Gallery"
        title="The work speaks"
        description="A look inside the shop and a few of the cuts we're proud of."
      />

      <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {GALLERY.map((image, index) => (
          <Reveal
            key={image.id}
            delay={(index % 3) * 90}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <FrameImage
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 30vw, 45vw"
              zoom
              className="h-full w-full rounded-2xl"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-ink/0 ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:bg-ink/15 group-hover:ring-gold/40" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
