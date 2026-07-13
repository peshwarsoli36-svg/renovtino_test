import {
  Award,
  Baby,
  Crown,
  Droplets,
  Scissors,
  Sparkles,
  Timer,
  Wind,
  Zap,
} from "lucide-react";

import type {
  Feature,
  GalleryImage,
  OpeningHour,
  Service,
  ServiceOption,
  StaffMember,
} from "@/types";
import { IMAGES, unsplash } from "@/lib/images";

export const NO_PREFERENCE_STAFF_ID = "any";

export const STAFF: StaffMember[] = [
  {
    id: "dervis",
    name: "Dervis B.",
    role: "Hoofdkapper (Senior Barber)",
    image: unsplash("photo-1507003211169-0a1dd7228f2d", 600),
    initials: "DB",
  },
  {
    id: "emir",
    name: "Emir",
    role: "Barber",
    image: unsplash("photo-1472099645785-5658abf4ff4e", 600),
    initials: "EM",
  },
];

export const SERVICES: Service[] = [
  {
    id: "men-haircut",
    name: "Heren Knippen",
    description: "Precisieknipbeurt afgestemd op uw haar, gezicht en dagelijkse routine.",
    duration: "45 min",
    price: 35,
    icon: Scissors,
  },
  {
    id: "kids-haircut",
    name: "Kinderen Knippen",
    description: "Geduldig en ontspannen knippen voor de jongste klanten.",
    duration: "30 min",
    price: 25,
    icon: Baby,
  },
  {
    id: "beard-trim",
    name: "Baard Trimmen",
    description: "Strakke lijnen en zorgvuldige vormgeving, afgewerkt met warme handdoek.",
    duration: "30 min",
    price: 20,
    icon: Sparkles,
  },
  {
    id: "haircut-beard",
    name: "Knippen + Baard",
    description: "Het complete pakket — een volledige knipbeurt met baardverzorging.",
    duration: "60 min",
    price: 50,
    icon: Crown,
  },
  {
    id: "hair-wash",
    name: "Haar Wassen",
    description: "Verfrissende wasbeurt met premium producten.",
    duration: "15 min",
    price: 12,
    icon: Droplets,
  },
  {
    id: "fade",
    name: "Fade",
    description: "Naadloze overgangen en scherpe lijnen voor een moderne look.",
    duration: "45 min",
    price: 40,
    icon: Zap,
  },
  {
    id: "buzz-cut",
    name: "Buzz Cut",
    description: "Strak en eenvoudig — gelijkmatig kort geschoren.",
    duration: "20 min",
    price: 22,
    icon: Scissors,
  },
  {
    id: "styling",
    name: "Styling",
    description: "Wassen, product en een verzorgde finish voor elke gelegenheid.",
    duration: "25 min",
    price: 25,
    icon: Wind,
  },
];

/** Marketing showcase services (display only — booking uses SERVICES above). */
export const SHOWCASE_SERVICES = [
  {
    id: "showcase-men",
    name: "Men's Haircut",
    description:
      "Precision cuts shaped to your hair, features and everyday style.",
    icon: Scissors,
  },
  {
    id: "showcase-women",
    name: "Women's Haircut",
    description:
      "Tailored cuts and layers designed to complement your natural beauty.",
    icon: Sparkles,
  },
  {
    id: "showcase-kids",
    name: "Kids Haircut",
    description:
      "Patient, relaxed cuts in a welcoming environment for young clients.",
    icon: Baby,
  },
  {
    id: "showcase-beard",
    name: "Beard Trim",
    description:
      "Clean lines and careful shaping for a polished, refined finish.",
    icon: Crown,
  },
  {
    id: "showcase-styling",
    name: "Hair Styling",
    description:
      "Wash, product and a flawless finish for any occasion.",
    icon: Wind,
  },
] as const;

export function formatPrice(price: number, currency = "EUR"): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export const SERVICE_OPTIONS: ServiceOption[] = SERVICES.map((service) => ({
  value: service.id,
  label: `${service.name} — ${formatPrice(service.price)}`,
  price: service.price,
  duration: service.duration,
}));

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getStaffById(id: string): StaffMember | undefined {
  return STAFF.find((s) => s.id === id);
}

export const GALLERY: GalleryImage[] = [
  {
    id: "salon-hero",
    src: IMAGES.hero,
    alt: "Hair SixtyOne luxury salon interior",
    aspect: "portrait",
  },
  {
    id: "salon-about",
    src: IMAGES.about,
    alt: "Premium styling experience at Hair SixtyOne",
    aspect: "landscape",
  },
  {
    id: "services",
    src: IMAGES.services,
    alt: "Professional hair services at Hair SixtyOne",
    aspect: "portrait",
  },
  {
    id: "beard-grooming",
    src: IMAGES.beardGrooming,
    alt: "Traditional beard grooming and straight razor care",
    aspect: "square",
  },
  {
    id: "signature-styles",
    src: IMAGES.signatureStyles,
    alt: "Signature hairstyles crafted at Hair SixtyOne",
    aspect: "portrait",
  },
  {
    id: "our-craft",
    src: IMAGES.ourCraft,
    alt: "Precision craftsmanship and attention to detail",
    aspect: "landscape",
  },
  {
    id: "experience",
    src: IMAGES.experience,
    alt: "Professional barber tools and premium salon atmosphere",
    aspect: "portrait",
  },
];

export const OPENING_HOURS: OpeningHour[] = [
  { days: "Maandag – Vrijdag", hours: "09:00 – 18:00", weekdays: [1, 2, 3, 4, 5] },
  { days: "Zaterdag", hours: "09:00 – 16:00", weekdays: [6] },
  { days: "Zondag", hours: "Gesloten", closed: true, weekdays: [0] },
];

export const FEATURES: Feature[] = [
  {
    title: "Vakkundige kappers",
    description: "Ervaren stylisten met oog voor detail en proportie.",
    icon: Award,
  },
  {
    title: "Tijdloos vakmanschap",
    description: "Klassieke techniek, verfijnd voor de moderne klant.",
    icon: Scissors,
  },
  {
    title: "Op uw tempo",
    description: "Moeiteloos online boeken en een stoel die klaarstaat.",
    icon: Timer,
  },
];

export const BOOKING_PERKS = [
  {
    title: "Directe bevestiging",
    description: "Uw stoel is gereserveerd zodra u boekt.",
  },
  {
    title: "Eenvoudig verzetten",
    description: "Plannen gewijzigd? Verplaats uw afspraak snel.",
  },
  {
    title: "Vriendelijke herinnering",
    description: "Een SMS de dag vóór uw bezoek.",
  },
];
