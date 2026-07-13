"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { GalleryImage } from "@/types";
import { cn } from "@/lib/utils";

interface GalleryLightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const image = images[index];
  const total = images.length;

  const goPrev = React.useCallback(() => {
    onNavigate((index - 1 + total) % total);
  }, [index, onNavigate, total]);

  const goNext = React.useCallback(() => {
    onNavigate((index + 1) % total);
  }, [index, onNavigate, total]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [goNext, goPrev, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label="Close gallery"
      />

      <button
        type="button"
        onClick={onClose}
        className={cn(
          "absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full",
          "border border-white/15 bg-black/50 text-white/80 transition-colors",
          "hover:border-gold/40 hover:bg-black/70 hover:text-gold"
        )}
        aria-label="Close"
      >
        <X className="size-5" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          goPrev();
        }}
        className={cn(
          "absolute left-3 z-10 flex size-12 items-center justify-center rounded-full sm:left-6",
          "border border-white/15 bg-black/50 text-white/80 transition-colors",
          "hover:border-gold/40 hover:bg-black/70 hover:text-gold"
        )}
        aria-label="Previous image"
      >
        <ChevronLeft className="size-6" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          goNext();
        }}
        className={cn(
          "absolute right-3 z-10 flex size-12 items-center justify-center rounded-full sm:right-6",
          "border border-white/15 bg-black/50 text-white/80 transition-colors",
          "hover:border-gold/40 hover:bg-black/70 hover:text-gold"
        )}
        aria-label="Next image"
      >
        <ChevronRight className="size-6" strokeWidth={1.75} />
      </button>

      <div
        className="relative z-[1] mx-auto flex h-[min(85vh,900px)] w-[min(92vw,1200px)] flex-col items-center gap-4 px-14 sm:px-20"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-gold/20 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)]">
          <Image
            key={image.id}
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            priority
            className="object-contain"
          />
        </div>

        <p className="text-center text-sm text-white/60">
          <span className="font-medium text-gold">{index + 1}</span>
          <span className="mx-2 text-white/30">/</span>
          <span>{total}</span>
          <span className="mx-3 text-white/20">·</span>
          <span>{image.alt}</span>
        </p>
      </div>
    </div>
  );
}
