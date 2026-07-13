/**
 * Helper for building Unsplash source URLs at a given width.
 * Swap these for client-owned assets before launch.
 */
export function unsplash(id: string, width = 1200): string {
  return `https://images.unsplash.com/${id}?q=80&w=${width}&auto=format&fit=crop`;
}

/** Site imagery — swap paths when rebranding. */
export const IMAGES = {
  hero: "/images/hero.png",
  about: "/images/about.png",
  services: "/images/services.png",
  beardGrooming: "/images/beard-grooming.png",
  signatureStyles: "/images/signature-styles.png",
  ourCraft: "/images/our-craft.png",
  experience: "/images/experience.png",
} as const;
