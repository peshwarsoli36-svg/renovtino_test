import { NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getAppointmentSchemaMode } from "@/lib/supabase/appointments";
import { MIGRATION_HINT } from "@/lib/supabase/errors";

/** Verifies Supabase connectivity and appointments table access. */
export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.",
      },
      { status: 503 }
    );
  }

  try {
    const supabase = createServiceClient();
    const { error: readError } = await supabase
      .from("appointments")
      .select("id")
      .limit(1);

    if (readError) throw readError;

    const schemaMode = await getAppointmentSchemaMode(supabase);

    return NextResponse.json({
      ok: true,
      schemaMode,
      migrationRequired: schemaMode === "legacy",
      migrationHint: schemaMode === "legacy" ? MIGRATION_HINT : null,
      message:
        schemaMode === "legacy"
          ? "Connected to Supabase. Legacy schema detected — run migration for per-staff booking."
          : "Connected to Supabase. Appointments table is readable.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Supabase connection failed.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
