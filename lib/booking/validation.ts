import { isDateSelectable, getSlotsForDate } from "@/lib/booking/slots";
import { SERVICE_OPTIONS } from "@/lib/data";

interface BookingFormData {
  customerName: string;
  phoneNumber: string;
  service: string;
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

const VALID_SERVICES = new Set(SERVICE_OPTIONS.map((s) => s.label));

export function validateBooking(data: BookingFormData): string | null {
  if (!isValidName(data.customerName)) {
    return "Please enter your full name.";
  }

  if (!isValidPhone(data.phoneNumber)) {
    return "Please enter a valid phone number (7–15 digits).";
  }

  if (!data.service || !VALID_SERVICES.has(data.service)) {
    return "Please choose a service.";
  }

  if (!data.bookingDate) {
    return "Please select a date.";
  }

  if (!isDateSelectable(data.bookingDate)) {
    return "This date is not available. We're closed on Sundays and past dates cannot be booked.";
  }

  if (!data.bookingTime) {
    return "Please select a time.";
  }

  const validSlots = getSlotsForDate(data.bookingDate);
  if (!validSlots.includes(data.bookingTime)) {
    return "The selected time is not available.";
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
