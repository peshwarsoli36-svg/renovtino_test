const COOKIE_NAME = "sam_admin_session";
const SESSION_PAYLOAD = "sam-admin-authenticated";

export { COOKIE_NAME };

export function getAdminAccessCode(): string {
  return process.env.ADMIN_ACCESS_CODE?.trim() ?? "";
}

export function isAdminAccessConfigured(): boolean {
  return Boolean(getAdminAccessCode());
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function createSessionToken(secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(SESSION_PAYLOAD)
  );
  return bufferToHex(signature);
}

/** Validates the submitted access code against ADMIN_ACCESS_CODE (server-only). */
export function verifyAccessCode(code: string): boolean {
  const expected = getAdminAccessCode();
  if (!expected) return false;
  return timingSafeEqualString(expected, code.trim());
}

/** Validates the signed session cookie value. */
export async function verifyAdminSession(
  token: string | undefined
): Promise<boolean> {
  const secret = getAdminAccessCode();
  if (!secret || !token) return false;
  const expected = await createSessionToken(secret);
  return timingSafeEqualString(token, expected);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(COOKIE_NAME)?.value);
}

export async function getAdminSessionCookie(maxAge = 60 * 60 * 24 * 7) {
  const secret = getAdminAccessCode();
  const value = await createSessionToken(secret);

  return {
    name: COOKIE_NAME,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
