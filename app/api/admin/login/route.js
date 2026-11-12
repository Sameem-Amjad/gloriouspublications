import { NextResponse } from "next/server";

import { ADMIN_COOKIE, cookieOptions, makeToken, passcodeMatches } from "@/lib/admin";

export async function POST(req) {
  const { passcode } = (await req.json().catch(() => ({}))) || {};
  if (!passcodeMatches(passcode)) {
    return NextResponse.json({ error: "That passcode isn't right" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeToken(), cookieOptions);
  return res;
}
