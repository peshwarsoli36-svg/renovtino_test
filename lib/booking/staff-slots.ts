import { STAFF, NO_PREFERENCE_STAFF_ID } from "@/lib/salon/data";
import {
  getDaySlots,
  getSlotsForDate,
  normalizeBookedTime,
  type TimeSlot,
} from "@/lib/booking/slots";
import type { AppointmentSlotRow } from "@/types";

export function isValidStaffId(staffId: string): boolean {
  return (
    staffId === NO_PREFERENCE_STAFF_ID ||
    STAFF.some((member) => member.id === staffId)
  );
}

/** Times when every active staff member is booked (for "no preference" mode). */
export function getFullyBookedTimes(rows: AppointmentSlotRow[]): string[] {
  const hasStaffData = rows.some((row) => row.staff_id);

  if (!hasStaffData) {
    return Array.from(
      new Set(rows.map((row) => normalizeBookedTime(row.booking_time)))
    );
  }

  const allSlots = new Set<string>();
  const staffIds = STAFF.map((s) => s.id);

  rows.forEach((row) => allSlots.add(normalizeBookedTime(row.booking_time)));

  return Array.from(allSlots).filter((time) =>
    staffIds.every((staffId) =>
      rows.some(
        (row) =>
          row.staff_id === staffId &&
          normalizeBookedTime(row.booking_time) === time
      )
    )
  );
}

/** Booked times for a specific staff member. */
export function getBookedTimesForStaff(
  rows: AppointmentSlotRow[],
  staffId: string
): string[] {
  const hasStaffData = rows.some((row) => row.staff_id);

  if (!hasStaffData) {
    return Array.from(
      new Set(rows.map((row) => normalizeBookedTime(row.booking_time)))
    );
  }

  return rows
    .filter((row) => row.staff_id === staffId)
    .map((row) => normalizeBookedTime(row.booking_time));
}

export function getDaySlotsForStaff(
  dateStr: string,
  rows: AppointmentSlotRow[],
  staffId: string
): TimeSlot[] {
  const bookedTimes =
    staffId === NO_PREFERENCE_STAFF_ID
      ? getFullyBookedTimes(rows)
      : getBookedTimesForStaff(rows, staffId);

  return getDaySlots(dateStr, bookedTimes);
}

/** Pick the first available staff member for a slot. */
export function pickAvailableStaff(
  dateStr: string,
  time: string,
  rows: AppointmentSlotRow[]
): string | null {
  for (const member of STAFF) {
    const booked = getBookedTimesForStaff(rows, member.id);
    const slot = getDaySlots(dateStr, booked).find((s) => s.time === time);
    if (slot?.status === "available") {
      return member.id;
    }
  }
  return null;
}

export function isStaffAvailableAt(
  dateStr: string,
  time: string,
  staffId: string,
  rows: AppointmentSlotRow[]
): boolean {
  const booked = getBookedTimesForStaff(rows, staffId);
  const slot = getDaySlots(dateStr, booked).find((s) => s.time === time);
  return slot?.status === "available";
}

export function isAnyStaffAvailableAt(
  dateStr: string,
  time: string,
  rows: AppointmentSlotRow[]
): boolean {
  return STAFF.some((member) =>
    isStaffAvailableAt(dateStr, time, member.id, rows)
  );
}

export function getAllSlotTimes(dateStr: string): string[] {
  return getSlotsForDate(dateStr);
}
