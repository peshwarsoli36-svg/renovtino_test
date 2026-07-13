import type { LucideIcon } from "lucide-react";

/** A single entry in the primary site navigation. */
export interface NavItem {
  label: string;
  href: string;
}

/** A service offered by the salon. */
export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  icon: LucideIcon;
}

/** A single option shown in the booking form's service picker. */
export interface ServiceOption {
  value: string;
  label: string;
  price: number;
  duration: string;
}

/** A team member / barber. */
export interface StaffMember {
  id: string;
  name: string;
  role: string;
  image: string;
  initials: string;
}

/** A static demo review for the marketing site (not persisted). */
export interface DemoReview {
  id: string;
  name: string;
  location: string;
  service: string;
  text: string;
  initials: string;
}

/** A photo shown in the gallery grid. */
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  /** Masonry tile proportions — varied heights create a natural grid. */
  aspect?: "portrait" | "landscape" | "square";
}

/** A row in the opening-hours card. `weekday` maps to `Date.getDay()`. */
export interface OpeningHour {
  days: string;
  hours: string;
  closed?: boolean;
  weekdays: number[];
}

/** A short "why choose us" highlight in the About section. */
export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Status shared by appointments and bookings in the admin panel. */
export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

/** An upcoming booking shown in the admin table. */
export interface Booking {
  id: string;
  customer: string;
  phone?: string;
  service: string;
  staff?: string;
  date: string;
  dateKey?: string;
  time: string;
  status: BookingStatus;
}

/** An appointment scheduled for the current day (admin panel). */
export interface Appointment {
  id: string;
  customer: string;
  phone?: string;
  service: string;
  staff?: string;
  time: string;
  status: BookingStatus;
  initials: string;
}

/** A KPI card in the admin dashboard. */
export interface Stat {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

/** A navigation entry in the admin sidebar. */
export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
}

/** A single cell in the admin month calendar. */
export interface CalendarDay {
  date: number;
  inMonth: boolean;
  isToday: boolean;
  events: number;
}

/** Minimal appointment row for availability calculations. */
export interface AppointmentSlotRow {
  booking_time: string;
  staff_id: string | null;
}
