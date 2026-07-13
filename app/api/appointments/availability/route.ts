import { NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { fetchAppointmentSlotRows } from "@/lib/supabase/appointments";
import { formatSupabaseError } from "@/lib/supabase/errors";
import {
  getAvailableSlots,
  isDateSelectable,
} from "@/lib/booking/slots";
import { getDaySlotsForStaff, isValidStaffId } from "@/lib/booking/staff-slots";
import { NO_PREFERENCE_STAFF_ID } from "@/lib/salon/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const staffId = searchParams.get("staffId") ?? NO_PREFERENCE_STAFF_ID;

  if (!date) {
    return NextResponse.json(
      { error: "Date parameter is required." },
      { status: 400 }
    );
  }

  if (!isValidStaffId(staffId)) {
    return NextResponse.json(
      { error: "Invalid staff selection." },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 }
    );
  }

  if (!isDateSelectable(date)) {
    return NextResponse.json({ bookedTimes: [], slots: [], availableSlots: [] });
  }

  try {
    const supabase = createServiceClient();
    const { rows, mode } = await fetchAppointmentSlotRows(supabase, date);
    const slots = getDaySlotsForStaff(date, rows, staffId);
    const availableSlots = getAvailableSlots(
      date,
      slots.filter((s) => s.status === "booked").map((s) => s.time)
    );

    return NextResponse.json({
      bookedTimes: slots.filter((s) => s.status === "booked").map((s) => s.time),
      slots,
      availableSlots,
      schemaMode: mode,
    });
  } catch (err) {
    return NextResponse.json(
      { error: formatSupabaseError(err) },
      { status: 500 }
    );
  }
}
