import type { PostgrestError } from "@supabase/supabase-js";

type SupabaseErrorDetails = {
  message: string;
  code: string | null;
  details: string | null;
  hint: string | null;
};

function isPostgrestError(err: unknown): err is PostgrestError {
  return Boolean(err && typeof err === "object" && "message" in err);
}

/** Extracts the exact Supabase/PostgREST error fields for API responses. */
export function toSupabaseErrorDetails(err: unknown): SupabaseErrorDetails {
  if (isPostgrestError(err)) {
    return {
      message: err.message,
      code: err.code ?? null,
      details: err.details ?? null,
      hint: err.hint ?? null,
    };
  }

  if (err instanceof Error) {
    return {
      message: err.message,
      code: null,
      details: null,
      hint: null,
    };
  }

  return {
    message: "An unexpected database error occurred.",
    code: null,
    details: null,
    hint: null,
  };
}

/** Maps Supabase/PostgREST errors to user-friendly API messages (non-booking routes). */
export function formatSupabaseError(err: unknown): string {
  const { message } = toSupabaseErrorDetails(err);

  if (message.includes("Invalid path specified")) {
    return "Invalid Supabase URL. Use your project URL only (https://xxx.supabase.co), not the /rest/v1 endpoint.";
  }

  return message;
}
