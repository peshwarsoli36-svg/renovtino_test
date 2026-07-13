"use client";

import * as React from "react";
import Image from "next/image";

import { GALLERY } from "@/lib/salon/data";
import { COPY } from "@/lib/salon/content";
import type { GalleryImage } from "@/types";
import { cn } from "@/lib/utils";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";

const ASPECT_CLASS: Record<
  NonNullable<GalleryImage["aspect"]>,
  string
> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
};

function GalleryTile({
  image,
  index,
  onOpen,
}: {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
}) {
  const aspect = image.aspect ?? "portrait";

  return (
    <Reveal delay={index * 90} className="mb-4 break-inside-avoid sm:mb-5">
      <button
        type="button"
        onClick={() => onOpen(index)}
        className={cn(
          "group relative block w-full cursor-zoom-in overflow-hidden rounded-[20px]",
          "border border-white/10 bg-surface shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55)]",
          "transition-all duration-500",
          "hover:border-gold/50 hover:shadow-[0_16px_48px_-12px_rgba(200,169,106,0.18)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        )}
        aria-label={`View ${image.alt}`}
      >
        <div className={cn("relative w-full", ASPECT_CLASS[aspect])}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={cn(
              "object-cover transition-transform duration-700 ease-out",
              "group-hover:scale-[1.06]"
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500",
              "group-hover:bg-ink/10"
            )}
            aria-hidden
          />
        </div>
      </button>
    </Reveal>
  );
}

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(
    null
  );

  const closeLightbox = React.useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return (
    <>
      <Section
        id="gallery"
        className="relative overflow-hidden bg-[#080808] py-24 sm:py-28 lg:py-32"
        containerClassName="max-w-7xl"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,169,106,0.05),transparent_55%)]"
          aria-hidden
        />

        <div className="relative flex flex-col gap-14 lg:gap-16">
          <SectionHeading
            overline={COPY.gallery.overline}
            title={
              <>
                {COPY.gallery.title.replace(".", "")}
                <span className="text-gradient-gold">.</span>
              </>
            }
            description={COPY.gallery.body}
          />

          <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 lg:gap-6">
            {GALLERY.map((image, index) => (
              <GalleryTile
                key={image.id}
                image={image}
                index={index}
                onOpen={setLightboxIndex}
              />
            ))}
          </div>
        </div>
      </Section>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          images={GALLERY}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </>
  );
}
