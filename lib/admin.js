import crypto from "node:crypto";

import { cookies } from "next/headers";

/**
 * Admin sign-in: one passcode (ADMIN_PASSCODE) exchanged for an HMAC-signed,
 * http-only cookie that lasts eight hours.
 */
export const ADMIN_COOKIE = "gp_admin";
const TTL_MS = 8 * 3600 * 1000;

const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSCODE || "";
const hmac = (s) => crypto.createHmac("sha256", secret()).update(s).digest("base64url");

export function passcodeMatches(input) {
  const expected = process.env.ADMIN_PASSCODE || "";
  if (!expected || typeof input !== "string") return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function makeToken() {
  const payload = `admin.${Date.now() + TTL_MS}`;
  return `${payload}.${hmac(payload)}`;
}

export function tokenIsValid(token) {
  if (!token || !secret()) return false;
  const [role, exp, sig] = token.split(".");
  if (role !== "admin" || !exp || !sig) return false;
  const expected = hmac(`${role}.${exp}`);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  return Number(exp) > Date.now();
}

export function isAdmin() {
  return tokenIsValid(cookies().get(ADMIN_COOKIE)?.value);
}

export const cookieOptions = { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: TTL_MS / 1000 };

/** Demo mode: seeded titles can't be deleted, and the shop says no payment is taken. */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
