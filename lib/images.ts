/**
 * Helper for building Unsplash source URLs at a given width.
 * Placeholder photography — swap these for your own assets before launch.
 */
export function unsplash(id: string, width = 1200): string {
  return `https://images.unsplash.com/${id}?q=80&w=${width}&auto=format&fit=crop`;
}

/** Hero and About feature imagery. */
export const IMAGES = {
  hero: unsplash("photo-1585747860715-2ba37e788b70", 2000),
  about: unsplash("photo-1512690459411-b9245aed614b", 1400),
} as const;
