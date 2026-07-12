import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";
import { getSupabaseServerKey, getSupabaseUrl } from "@/lib/supabase/env";

/** Server client for API routes — uses service role when configured. */
export function createServiceClient() {
  return createSupabaseClient<Database>(
    getSupabaseUrl(),
    getSupabaseServerKey()
  );
}
