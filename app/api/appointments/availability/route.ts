import { NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { formatSupabaseError } from "@/lib/supabase/errors";
import { getAvailableSlots, isDateSelectable } from "@/lib/booking/slots";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Date parameter is required." },
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
    return NextResponse.json({ bookedTimes: [], availableSlots: [] });
  }

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("appointments")
      .select("booking_time")
      .eq("booking_date", date)
      .neq("status", "cancelled");

    if (error) throw error;

    const bookedTimes = (data ?? []).map((row) => row.booking_time);
    const availableSlots = getAvailableSlots(date, bookedTimes);

    return NextResponse.json({ bookedTimes, availableSlots });
  } catch (err) {
    return NextResponse.json(
      { error: formatSupabaseError(err) },
      { status: 500 }
    );
  }
}
