import { createHash, timingSafeEqual } from "node:crypto";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export function fail(message: string, status: number, details?: unknown) {
  return NextResponse.json(
    details ? { message, details } : { message },
    { status },
  );
}

/**
 * Admin-only endpoints expect the header `x-admin-key: <ADMIN_API_KEY>`.
 * Returns a response to send back if the caller is NOT allowed, otherwise null.
 */
export function requireAdmin(request: NextRequest): NextResponse | null {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) return fail("Server is missing ADMIN_API_KEY", 500);

  const given = request.headers.get("x-admin-key") ?? "";
  // Hash both sides so lengths match, then compare in constant time.
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b) ? null : fail("Unauthorized", 401);
}

/** Parse a JSON object body, or return null if it's missing/invalid/not an object. */
export async function readJson(
  request: NextRequest,
): Promise<Record<string, unknown> | null> {
  try {
    const body: unknown = await request.json();
    if (body && typeof body === "object" && !Array.isArray(body)) {
      return body as Record<string, unknown>;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Copy only whitelisted keys, so callers can't set fields like _id or createdAt.
 * Values stay loosely typed on purpose: Mongoose casts and validates them.
 */
export function pick<K extends string>(
  body: Record<string, unknown>,
  keys: readonly K[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Partial<Record<K, any>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: Partial<Record<K, any>> = {};
  for (const key of keys) {
    if (body[key] !== undefined) out[key] = body[key];
  }
  return out;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Parse ?limit= and ?page= with sane bounds. */
export function pagination(params: URLSearchParams, defaultLimit = 50) {
  const limit = Math.min(Math.max(Number(params.get("limit")) || defaultLimit, 1), 100);
  const page = Math.max(Number(params.get("page")) || 1, 1);
  return { limit, skip: (page - 1) * limit, page };
}

/** Map Mongoose/Mongo errors to proper HTTP responses. */
export function handleError(label: string, error: unknown) {
  if (error instanceof mongoose.Error.ValidationError) {
    const details = Object.fromEntries(
      Object.entries(error.errors).map(([field, e]) => [field, e.message]),
    );
    return fail("Validation failed", 400, details);
  }
  if (error instanceof mongoose.Error.CastError) {
    return fail(`Invalid value for "${error.path}"`, 400);
  }
  if ((error as { code?: number })?.code === 11000) {
    return fail("A record with this value already exists", 409);
  }
  console.error(`${label}:`, error);
  return fail("Something went wrong", 500);
}
