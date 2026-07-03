import type { NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

export const sessionCookieName = "admin_session";
export const sessionMaxAge = 60 * 60 * 24 * 7;

type SessionPayload = {
  email: string;
};

function getSecretKey() {
  const secret = process.env.ADMIN_PASSWORD;

  if (!secret) {
    return null;
  }

  return new TextEncoder().encode(secret);
}

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };
}

export function isAdminCredentialsConfigured() {
  const { email, password } = getAdminCredentials();

  return Boolean(email && password);
}

export async function createSession(email: string) {
  const secretKey = getSecretKey();

  if (!secretKey) {
    throw new Error("ADMIN_PASSWORD belum dikonfigurasi.");
  }

  const expiresAt = new Date(Date.now() + sessionMaxAge * 1000);
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(secretKey);

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function verifySession(token?: string) {
  const secretKey = getSecretKey();

  if (!token || !secretKey) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);
    const email = payload.email;

    if (typeof email !== "string") {
      return null;
    }

    return { email } satisfies SessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentSession() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  return verifySession(token);
}

export async function verifyRequestSession(request: NextRequest) {
  const token = request.cookies.get(sessionCookieName)?.value;

  return verifySession(token);
}

export async function deleteSession() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  cookieStore.delete(sessionCookieName);
}
