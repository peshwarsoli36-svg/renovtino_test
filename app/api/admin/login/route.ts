import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  getAdminSessionCookie,
  isAdminAccessConfigured,
  verifyAccessCode,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminAccessConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured." },
      { status: 503 }
    );
  }

  let code = "";
  try {
    const body = await request.json();
    code = typeof body.code === "string" ? body.code : "";
  } catch {
    return NextResponse.json(
      { error: "Onjuiste toegangscode" },
      { status: 401 }
    );
  }

  if (!verifyAccessCode(code)) {
    return NextResponse.json(
      { error: "Onjuiste toegangscode" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(await getAdminSessionCookie());

  return NextResponse.json({ ok: true });
}
