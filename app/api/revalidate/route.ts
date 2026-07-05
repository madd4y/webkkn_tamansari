import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const allowedResources = new Set([
  "umkm",
  "dokumentasi",
  "profil",
  "penduduk",
  "video",
  "kontak",
  "site",
]);

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const resource =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>).resource
      : null;

  if (typeof resource !== "string" || !allowedResources.has(resource)) {
    return NextResponse.json(
      {
        success: false,
        message: "Resource tidak valid.",
      },
      { status: 400 },
    );
  }

  revalidateTag(`content:${resource}`, "max");
  if (resource !== "site") {
    revalidateTag("content:site", "max");
  }

  return NextResponse.json({
    success: true,
    message: "Cache berhasil direvalidasi.",
  });
}
