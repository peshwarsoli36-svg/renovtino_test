import type { NavItem } from "@/types";

/**
 * White-label salon configuration.
 * To rebrand for a new client, update this file and lib/salon/data.ts.
 */
export const SITE = {
  name: "Hair SixtyOne",
  legalName: "Hair SixtyOne Dames, Heren & Kinderen",
  tagline: "Dames, Heren & Kinderen",
  established: "Sinds 2021",
  location: "Haarlem",
  country: "Nederland",
  locale: "nl-NL",
  language: "nl",
  currency: "EUR",
  description:
    "Een premium kapsalon in Haarlem voor dames, heren en kinderen. Vakkundig knippen, moderne stijlen en een warme, luxe sfeer.",
  phone: "+31 6 55963530",
  phoneHref: "tel:+31655963530",
  email: "info@hairsixtyone.nl",
  emailHref: "mailto:info@hairsixtyone.nl",
  website: "https://hairsixtyone.nl",
  address: "Menton Passage 5, 2037 AB Haarlem",
  addressLines: ["Menton Passage 5", "2037 AB Haarlem", "Nederland"],
  whatsapp: "https://wa.me/31655963530",
  maps: "https://maps.google.com/?q=Menton+Passage+5,+2037+AB+Haarlem,+Netherlands",
  mapsEmbed:
    "https://maps.google.com/maps?q=Menton+Passage+5,+2037+AB+Haarlem,+Netherlands&output=embed",
  instagram: "https://instagram.com/hairsixtyone",
  facebook: "https://facebook.com/hairsixtyone",
  tiktok: "https://tiktok.com/@hairsixtyone",
  admin: {
    ownerName: "Hair SixtyOne",
    ownerInitials: "H6",
    ownerRole: "Beheerder",
  },
  seo: {
    metadataBase: "https://hairsixtyone.nl",
    title: "Hair SixtyOne — Kapsalon Haarlem",
    titleTemplate: "%s — Hair SixtyOne",
    description:
      "Hair SixtyOne in Haarlem: premium kapsalon voor dames, heren en kinderen. Boek online uw knipbeurt, fade, baard trim of styling bij Dervis B. of Emir.",
    keywords: [
      "kapsalon Haarlem",
      "kapper Haarlem",
      "heren knippen",
      "dames knippen",
      "kinderen knippen",
      "baard trimmen",
      "fade",
      "Hair SixtyOne",
      "online afspraak",
    ],
    openGraph: {
      title: "Hair SixtyOne — Kapsalon Haarlem",
      description:
        "Premium kapsalon voor dames, heren en kinderen. Boek uw afspraak online.",
      type: "website" as const,
      locale: "nl_NL",
    },
  },
  cta: {
    book: "Afspraak maken",
    bookShort: "Boeken",
  },
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Over ons", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Diensten", href: "#services" },
  { label: "Galerij", href: "#gallery" },
  { label: "Boeken", href: "#book" },
  { label: "Contact", href: "#contact" },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace("#", ""));
