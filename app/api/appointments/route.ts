import { NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  formatSupabaseError,
  toSupabaseErrorDetails,
} from "@/lib/supabase/errors";
import {
  validateBooking,
  resolveServiceLabel,
  resolveStaffName,
  getDaySlotsForStaff,
} from "@/lib/booking/validation";
import { normalizeBookedTime } from "@/lib/booking/slots";
import {
  pickAvailableStaff,
  isStaffAvailableAt,
} from "@/lib/booking/staff-slots";
import {
  NO_PREFERENCE_STAFF_ID,
  getServiceById,
  getStaffById,
} from "@/lib/salon/data";
import type { AppointmentSlotRow } from "@/types";
import type { DbAppointment } from "@/lib/supabase/database.types";

function supabaseErrorResponse(err: unknown, status = 500) {
  const details = toSupabaseErrorDetails(err);
  return NextResponse.json(
    {
      error: details.message,
      supabase: {
        code: details.code,
        details: details.details,
        hint: details.hint,
      },
    },
    { status }
  );
}

/** List all appointments (admin). */
export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured. Add your environment variables." },
      { status: 503 }
    );
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("booking_date", { ascending: true })
      .order("booking_time", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ appointments: data as DbAppointment[] });
  } catch (err) {
    return NextResponse.json(
      { error: formatSupabaseError(err) },
      { status: 500 }
    );
  }
}

/** Create a new appointment (public booking form). */
export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured. Add your environment variables." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const formData = {
      customerName: String(body.customerName ?? "").trim(),
      phoneNumber: String(body.phoneNumber ?? "").trim(),
      email: String(body.email ?? "").trim(),
      service: String(body.service ?? "").trim(),
      staffId: String(body.staffId ?? NO_PREFERENCE_STAFF_ID).trim(),
      bookingDate: String(body.bookingDate ?? "").trim(),
      bookingTime: String(body.bookingTime ?? "").trim(),
    };

    const supabase = createServiceClient();

    const { data: existingRows } = await supabase
      .from("appointments")
      .select("booking_time, staff_id")
      .eq("booking_date", formData.bookingDate)
      .neq("status", "cancelled");

    const rows = (existingRows ?? []) as AppointmentSlotRow[];

    const bookedTimes = getDaySlotsForStaff(
      formData.bookingDate,
      rows,
      formData.staffId
    )
      .filter((s) => s.status === "booked")
      .map((s) => s.time);

    const validationError = validateBooking(formData, bookedTimes);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const normalizedTime = normalizeBookedTime(formData.bookingTime);
    const service = getServiceById(formData.service);

    if (!service) {
      return NextResponse.json({ error: "Invalid service." }, { status: 400 });
    }

    let assignedStaffId = formData.staffId;

    if (assignedStaffId === NO_PREFERENCE_STAFF_ID) {
      const picked = pickAvailableStaff(
        formData.bookingDate,
        normalizedTime,
        rows
      );
      if (!picked) {
        return NextResponse.json(
          { error: "This time slot has just been booked. Please choose another." },
          { status: 409 }
        );
      }
      assignedStaffId = picked;
    } else {
      const available = isStaffAvailableAt(
        formData.bookingDate,
        normalizedTime,
        assignedStaffId,
        rows
      );
      if (!available) {
        return NextResponse.json(
          { error: "This time slot has just been booked. Please choose another." },
          { status: 409 }
        );
      }
    }

    const staffMember = getStaffById(assignedStaffId);
    const staffName = staffMember?.name ?? resolveStaffName(assignedStaffId);

    const { data, error } = await supabase
      .from("appointments")
      .insert({
        customer_name: formData.customerName,
        phone_number: formData.phoneNumber,
        email: formData.email || null,
        service: resolveServiceLabel(formData.service),
        service_price: service.price,
        staff_id: assignedStaffId,
        staff_name: staffName,
        booking_date: formData.bookingDate,
        booking_time: normalizedTime,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This time slot has just been booked. Please choose another." },
          { status: 409 }
        );
      }
      return supabaseErrorResponse(error);
    }

    return NextResponse.json({ appointment: data }, { status: 201 });
  } catch (err) {
    return supabaseErrorResponse(err);
  }
}
