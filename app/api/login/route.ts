import { NextResponse } from "next/server";
import { createSession, getAdminCredentials } from "@/lib/auth";

type LoginPayload = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as LoginPayload;
  const { email: adminEmail, password: adminPassword } = getAdminCredentials();

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { message: "ADMIN_EMAIL dan ADMIN_PASSWORD belum dikonfigurasi." },
      { status: 500 },
    );
  }

  if (body.email !== adminEmail || body.password !== adminPassword) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await createSession(adminEmail);

  return NextResponse.json({
    success: true,
    message: "Login berhasil.",
  });
}
