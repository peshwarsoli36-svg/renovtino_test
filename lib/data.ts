import { Award, Baby, Crown, Scissors, Sparkles, Timer, Wind } from "lucide-react";

import type {
  Feature,
  GalleryImage,
  OpeningHour,
  Service,
  ServiceOption,
} from "@/types";
import { unsplash } from "@/lib/images";

/** Services offered — intentionally without pricing. */
export const SERVICES: Service[] = [
  {
    id: "haircut",
    name: "Haircut",
    description:
      "A precision cut shaped to your hair, features and daily routine.",
    duration: "45 min",
    icon: Scissors,
  },
  {
    id: "beard-trim",
    name: "Beard Trim",
    description: "Clean lines and careful shaping, finished with a hot towel.",
    duration: "30 min",
    icon: Sparkles,
  },
  {
    id: "hair-beard",
    name: "Hair & Beard",
    description: "The complete service — a full cut paired with a beard sculpt.",
    duration: "60 min",
    icon: Crown,
  },
  {
    id: "kids-haircut",
    name: "Kids Haircut",
    description: "Patient, relaxed cuts for the youngest gentlemen.",
    duration: "30 min",
    icon: Baby,
  },
  {
    id: "styling",
    name: "Styling",
    description: "Wash, product and a polished finish for any occasion.",
    duration: "25 min",
    icon: Wind,
  },
];

/** Six placeholder gallery photographs. */
export const GALLERY: GalleryImage[] = [
  {
    id: "cut-clippers",
    src: unsplash("photo-1770253980732-dfed1cfdfa43", 800),
    alt: "Barber cutting a client's hair with clippers",
  },
  {
    id: "razor-shave",
    src: unsplash("photo-1503951914875-452162b0f3f1", 800),
    alt: "Straight-razor beard shave in progress",
  },
  {
    id: "skin-fade",
    src: unsplash("photo-1599351431202-1e0f0137899a", 800),
    alt: "Detailed skin fade and line-up",
  },
  {
    id: "styling",
    src: unsplash("photo-1605497788044-5a32c7078486", 800),
    alt: "Barber styling and finishing a haircut",
  },
  {
    id: "textured-cut",
    src: unsplash("photo-1567894340315-735d7c361db0", 800),
    alt: "Barber shaping textured hair",
  },
  {
    id: "kids-cut",
    src: unsplash("photo-1521490683712-35a1cb235d1c", 800),
    alt: "A young boy getting a fresh haircut",
  },
];

/** Opening hours. `weekdays` uses Date.getDay() values (0 = Sunday). */
export const OPENING_HOURS: OpeningHour[] = [
  { days: "Monday – Friday", hours: "09:00 – 18:00", weekdays: [1, 2, 3, 4, 5] },
  { days: "Saturday", hours: "09:00 – 16:00", weekdays: [6] },
  { days: "Sunday", hours: "Closed", closed: true, weekdays: [0] },
];

/** "Why SAM" highlights for the About section. */
export const FEATURES: Feature[] = [
  {
    title: "Master barbers",
    description: "Seasoned hands with an eye for detail and proportion.",
    icon: Award,
  },
  {
    title: "Timeless craft",
    description: "Classic technique, refined for the modern gentleman.",
    icon: Scissors,
  },
  {
    title: "On your schedule",
    description: "Effortless booking and a chair that's ready when you are.",
    icon: Timer,
  },
];

/** Options for the booking form's service picker. */
export const SERVICE_OPTIONS: ServiceOption[] = SERVICES.map((service) => ({
  value: service.id,
  label: service.name,
}));
