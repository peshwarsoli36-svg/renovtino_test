/** Business hours — 45-minute appointment slots. */

import { OPENING_HOURS } from "@/lib/salon/data";
import { SITE } from "@/lib/salon/config";

export const SLOT_DURATION_MINUTES = 45;

const WEEKDAY_HOURS = OPENING_HOURS.find((h) => h.weekdays.includes(1))!;
const SATURDAY_HOURS = OPENING_HOURS.find((h) => h.weekdays.includes(6))!;

const WEEKDAY_SLOTS = generateSlotsFromHours(WEEKDAY_HOURS.hours, SLOT_DURATION_MINUTES);
const SATURDAY_SLOTS = generateSlotsFromHours(SATURDAY_HOURS.hours, SLOT_DURATION_MINUTES);

export type SlotStatus = "available" | "booked" | "past";

export interface TimeSlot {
  time: string;
  status: SlotStatus;
}

function parseHoursRange(hours: string): { start: string; end: string } | null {
  const match = hours.match(/(\d{2}:\d{2})\s*[–-]\s*(\d{2}:\d{2})/);
  if (!match) return null;
  return { start: match[1], end: match[2] };
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Last bookable slot start so appointment fits within closing time. */
function lastSlotStart(closeTime: string, intervalMinutes: number): string {
  const closeMinutes = toMinutes(closeTime);
  const lastStart = closeMinutes - intervalMinutes;
  const h = Math.floor(lastStart / 60);
  const m = lastStart % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function generateSlotsFromHours(
  hours: string,
  intervalMinutes: number
): string[] {
  const range = parseHoursRange(hours);
  if (!range) return [];
  const end = lastSlotStart(range.end, intervalMinutes);
  return generateSlots(range.start, end, intervalMinutes);
}

function generateSlots(
  start: string,
  end: string,
  intervalMinutes: number
): string[] {
  const slots: string[] = [];
  let [h, m] = start.split(":").map(Number);
  const endMinutes = toMinutes(end);

  while (h * 60 + m <= endMinutes) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += intervalMinutes;
    if (m >= 60) {
      h += Math.floor(m / 60);
      m %= 60;
    }
  }

  return slots;
}

/** Returns 0 = Sunday … 6 = Saturday. */
export function getWeekday(dateStr: string): number {
  const [y, mo, d] = dateStr.split("-").map(Number);
  return new Date(y, mo - 1, d).getDay();
}

function isShopClosed(dateStr: string): boolean {
  const weekday = getWeekday(dateStr);
  return OPENING_HOURS.some((h) => h.closed && h.weekdays.includes(weekday));
}

function isPastDate(dateStr: string): boolean {
  const today = formatDateKey(new Date());
  return dateStr < today;
}

export function isDateSelectable(dateStr: string): boolean {
  return !isPastDate(dateStr) && !isShopClosed(dateStr);
}

/** All slot start times for a given date (empty array if closed or past). */
export function getSlotsForDate(dateStr: string): string[] {
  if (!isDateSelectable(dateStr)) return [];

  const weekday = getWeekday(dateStr);
  if (weekday === 6) return SATURDAY_SLOTS;
  return WEEKDAY_SLOTS;
}

/** Supabase may return "HH:MM:SS" — normalize to slot format "HH:MM". */
export function normalizeBookedTime(time: string): string {
  return time.trim().slice(0, 5);
}

/** Every slot for the day with availability status (booked slots stay visible). */
export function getDaySlots(dateStr: string, bookedTimes: string[]): TimeSlot[] {
  const all = getSlotsForDate(dateStr);
  const booked = new Set(bookedTimes.map(normalizeBookedTime));
  const today = formatDateKey(new Date());
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();

  return all.map((slot) => {
    if (booked.has(slot)) {
      return { time: slot, status: "booked" as const };
    }
    if (dateStr === today) {
      const [h, m] = slot.split(":").map(Number);
      if (h * 60 + m <= nowMinutes) {
        return { time: slot, status: "past" as const };
      }
    }
    return { time: slot, status: "available" as const };
  });
}

/** Available slots only — used by server validation and conflict checks. */
export function getAvailableSlots(
  dateStr: string,
  bookedTimes: string[]
): string[] {
  return getDaySlots(dateStr, bookedTimes)
    .filter((slot) => slot.status === "available")
    .map((slot) => slot.time);
}

/** Display time without seconds for admin UI. */
export function formatDisplayTime(time: string): string {
  return normalizeBookedTime(time);
}

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDisplayDate(dateStr: string): string {
  const [y, mo, d] = dateStr.split("-").map(Number);
  return new Date(y, mo - 1, d).toLocaleDateString(SITE.locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeDate(dateStr: string): string {
  const today = formatDateKey(new Date());
  const tomorrow = formatDateKey(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );

  if (dateStr === today) return "Vandaag";
  if (dateStr === tomorrow) return "Morgen";
  return formatDisplayDate(dateStr);
}
