/** Business hours — 30-minute appointment slots. */

const WEEKDAY_SLOTS = generateSlots("09:00", "17:30");
const SATURDAY_SLOTS = generateSlots("09:00", "15:30");

function generateSlots(start: string, end: string): string[] {
  const slots: string[] = [];
  let [h, m] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  const endMinutes = endH * 60 + endM;

  while (h * 60 + m <= endMinutes) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += 30;
    if (m >= 60) {
      h += 1;
      m -= 60;
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
  return getWeekday(dateStr) === 0;
}

function isPastDate(dateStr: string): boolean {
  const today = formatDateKey(new Date());
  return dateStr < today;
}

export function isDateSelectable(dateStr: string): boolean {
  return !isPastDate(dateStr) && !isShopClosed(dateStr);
}

/** All slots for a given date (empty array if closed or past). */
export function getSlotsForDate(dateStr: string): string[] {
  if (!isDateSelectable(dateStr)) return [];

  const weekday = getWeekday(dateStr);
  if (weekday === 6) return SATURDAY_SLOTS;
  return WEEKDAY_SLOTS;
}

/** Filters out booked times and past times when date is today. */
export function getAvailableSlots(
  dateStr: string,
  bookedTimes: string[]
): string[] {
  const all = getSlotsForDate(dateStr);
  const booked = new Set(bookedTimes);

  const today = formatDateKey(new Date());
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return all.filter((slot) => {
    if (booked.has(slot)) return false;
    if (dateStr === today) {
      const [h, m] = slot.split(":").map(Number);
      return h * 60 + m > nowMinutes;
    }
    return true;
  });
}

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDisplayDate(dateStr: string): string {
  const [y, mo, d] = dateStr.split("-").map(Number);
  return new Date(y, mo - 1, d).toLocaleDateString("en-US", {
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

  if (dateStr === today) return "Today";
  if (dateStr === tomorrow) return "Tomorrow";
  return formatDisplayDate(dateStr);
}
