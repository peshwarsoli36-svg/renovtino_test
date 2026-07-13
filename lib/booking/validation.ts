import { isDateSelectable, getDaySlots } from "@/lib/booking/slots";
import { getDaySlotsForStaff } from "@/lib/booking/staff-slots";
import {
  NO_PREFERENCE_STAFF_ID,
  getServiceById,
  getStaffById,
} from "@/lib/salon/data";
import { COPY } from "@/lib/salon/content";
import { isValidStaffId } from "@/lib/booking/staff-slots";

interface BookingFormData {
  customerName: string;
  phoneNumber: string;
  email?: string;
  service: string;
  staffId: string;
  bookingDate: string;
  bookingTime: string;
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

function isValidEmail(email: string): boolean {
  if (!email.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateBooking(
  data: BookingFormData,
  bookedTimes: string[] = []
): string | null {
  if (!isValidName(data.customerName)) {
    return COPY.validation.name;
  }

  if (!isValidPhone(data.phoneNumber)) {
    return COPY.validation.phone;
  }

  if (!isValidEmail(data.email ?? "")) {
    return COPY.validation.email;
  }

  if (!data.staffId || !isValidStaffId(data.staffId)) {
    return COPY.validation.staff;
  }

  if (!data.service || !getServiceById(data.service)) {
    return COPY.validation.service;
  }

  if (!data.bookingDate) {
    return COPY.validation.date;
  }

  if (!isDateSelectable(data.bookingDate)) {
    return COPY.validation.dateClosed;
  }

  if (!data.bookingTime) {
    return COPY.validation.time;
  }

  const slot = getDaySlots(data.bookingDate, bookedTimes).find(
    (s) => s.time === data.bookingTime
  );

  if (!slot) {
    return COPY.validation.timeInvalid;
  }

  if (slot.status === "booked") {
    return COPY.validation.timeBooked;
  }

  if (slot.status === "past") {
    return COPY.validation.timePast;
  }

  return null;
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function resolveStaffName(staffId: string): string {
  if (staffId === NO_PREFERENCE_STAFF_ID) {
    return COPY.booking.staffAny;
  }
  return getStaffById(staffId)?.name ?? staffId;
}

export function resolveServiceLabel(serviceId: string): string {
  return getServiceById(serviceId)?.name ?? serviceId;
}

export { getDaySlotsForStaff };
