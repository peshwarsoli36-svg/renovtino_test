import { NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  formatSupabaseError,
  toSupabaseErrorDetails,
} from "@/lib/supabase/errors";
import { validateBooking } from "@/lib/booking/validation";
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
      service: String(body.service ?? "").trim(),
      bookingDate: String(body.bookingDate ?? "").trim(),
      bookingTime: String(body.bookingTime ?? "").trim(),
    };

    const validationError = validateBooking(formData);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const supabase = createServiceClient();

    const { data: existing } = await supabase
      .from("appointments")
      .select("id")
      .eq("booking_date", formData.bookingDate)
      .eq("booking_time", formData.bookingTime)
      .neq("status", "cancelled")
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "This time slot has just been booked. Please choose another." },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("appointments")
      .insert({
        customer_name: formData.customerName,
        phone_number: formData.phoneNumber,
        service: formData.service,
        booking_date: formData.bookingDate,
        booking_time: formData.bookingTime,
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
