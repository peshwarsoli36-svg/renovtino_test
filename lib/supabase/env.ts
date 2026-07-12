/**
 * Normalizes Supabase env vars.
 * Accepts the project URL only — not the REST endpoint (no /rest/v1 suffix).
 */
export function getSupabaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  return raw.replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
}

/** Supports both legacy anon key and new publishable key variable names. */
export function getSupabaseAnonKey(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    ""
  );
}

export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

/** Service role / secret key — bypasses RLS on server routes. */
export function getSupabaseServiceKey(): string {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    ""
  );
}

/** Key used by createServiceClient — prefers service role, falls back to anon. */
export function getSupabaseServerKey(): string {
  return getSupabaseServiceKey() || getSupabaseAnonKey();
}
