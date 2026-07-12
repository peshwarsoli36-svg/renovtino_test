import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

interface FrameImageProps extends Omit<ImageProps, "className"> {
  /** Classes for the wrapping frame. */
  className?: string;
  /** Classes applied to the image element itself. */
  imageClassName?: string;
  /** Adds a bottom-up dark gradient for text legibility. */
  overlay?: boolean;
  /** Enables a subtle zoom when a parent `.group` is hovered. */
  zoom?: boolean;
}

/**
 * An image inside a rounded frame with a graceful gradient backdrop,
 * so layouts stay elegant while photos load (or if they fail to).
 */
export function FrameImage({
  className,
  imageClassName,
  overlay = false,
  zoom = false,
  alt,
  ...props
}: FrameImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-surface-2 to-ink",
        className
      )}
    >
      <Image
        alt={alt}
        className={cn(
          "h-full w-full object-cover",
          zoom &&
            "transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]",
          imageClassName
        )}
        {...props}
      />

      {overlay ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
      ) : null}
    </div>
  );
}
