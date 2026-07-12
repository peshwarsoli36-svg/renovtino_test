import type { NavItem } from "@/types";

/**
 * Central place for business details and links.
 * Everything here is placeholder content for the template.
 */
export const SITE = {
  name: "SAM",
  tagline: "Modern Men's Barber",
  established: "Est. 2018",
  location: "SoHo, New York",
  description:
    "A refined take on the classic barbershop. Precision cuts, honest craft and a calm, considered space.",
  phone: "+1 (555) 012 3456",
  phoneHref: "tel:+15550123456",
  email: "hello@sambarber.co",
  emailHref: "mailto:hello@sambarber.co",
  address: "128 King Street, SoHo, New York, NY 10012",
  whatsapp: "https://wa.me/15550123456",
  maps: "https://maps.google.com/?q=128+King+Street+New+York",
  instagram: "https://instagram.com",
} as const;

/** Primary navigation — hrefs map to in-page section ids. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Book", href: "#book" },
  { label: "Contact", href: "#contact" },
];

/** Section ids used for scroll-spy in the navbar. */
export const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace("#", ""));
