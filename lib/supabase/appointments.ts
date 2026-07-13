import type { SupabaseClient } from "@supabase/supabase-js";

import type { AppointmentSlotRow } from "@/types";
import type { Database, DbAppointment } from "@/lib/supabase/database.types";
import { isMissingColumnError } from "@/lib/supabase/errors";

export type AppointmentSchemaMode = "staff" | "legacy";

let cachedSchemaMode: AppointmentSchemaMode | null = null;

/** Detects whether staff columns exist on the appointments table. */
export async function getAppointmentSchemaMode(
  supabase: SupabaseClient<Database>
): Promise<AppointmentSchemaMode> {
  if (cachedSchemaMode) return cachedSchemaMode;

  const { error } = await supabase
    .from("appointments")
    .select("staff_id")
    .limit(1);

  if (!error) {
    cachedSchemaMode = "staff";
    return cachedSchemaMode;
  }

  if (isMissingColumnError(error)) {
    cachedSchemaMode = "legacy";
    return cachedSchemaMode;
  }

  throw error;
}

/** Loads booked slot rows for a date, with legacy fallback when staff columns are missing. */
export async function fetchAppointmentSlotRows(
  supabase: SupabaseClient<Database>,
  date: string
): Promise<{ rows: AppointmentSlotRow[]; mode: AppointmentSchemaMode }> {
  const mode = await getAppointmentSchemaMode(supabase);

  if (mode === "staff") {
    const { data, error } = await supabase
      .from("appointments")
      .select("booking_time, staff_id")
      .eq("booking_date", date)
      .neq("status", "cancelled");

    if (error) throw error;

    return { rows: (data ?? []) as AppointmentSlotRow[], mode };
  }

  const { data, error } = await supabase
    .from("appointments")
    .select("booking_time")
    .eq("booking_date", date)
    .neq("status", "cancelled");

  if (error) throw error;

  return {
    rows: (data ?? []).map((row) => ({
      booking_time: row.booking_time,
      staff_id: null,
    })),
    mode,
  };
}

export type AppointmentInsertInput = {
  customer_name: string;
  phone_number: string;
  email: string | null;
  service: string;
  service_price: number;
  staff_id: string;
  staff_name: string;
  booking_date: string;
  booking_time: string;
};

/** Inserts an appointment, falling back to legacy columns when migration is pending. */
export async function insertAppointment(
  supabase: SupabaseClient<Database>,
  input: AppointmentInsertInput
) {
  const mode = await getAppointmentSchemaMode(supabase);

  if (mode === "staff") {
    return supabase
      .from("appointments")
      .insert({
        customer_name: input.customer_name,
        phone_number: input.phone_number,
        email: input.email,
        service: input.service,
        service_price: input.service_price,
        staff_id: input.staff_id,
        staff_name: input.staff_name,
        booking_date: input.booking_date,
        booking_time: input.booking_time,
        status: "pending",
      })
      .select()
      .single();
  }

  return supabase
    .from("appointments")
    .insert({
      customer_name: input.customer_name,
      phone_number: input.phone_number,
      service: input.service,
      booking_date: input.booking_date,
      booking_time: input.booking_time,
      status: "pending",
    })
    .select()
    .single();
}

export function isLegacyAppointmentRow(row: DbAppointment): boolean {
  return !row.staff_id;
}
