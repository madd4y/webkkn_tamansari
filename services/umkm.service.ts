import { apiGet, apiSend } from "@/lib/api";
import { umkmMock } from "@/lib/mock-data";
import type { UMKM } from "@/types";

export function getUMKM() {
  return apiGet<UMKM[]>("/api/umkm", umkmMock);
}

export function createUMKM(payload: Omit<UMKM, "id" | "createdAt">) {
  return apiSend<typeof payload, UMKM>("/api/umkm", "POST", payload);
}

export function updateUMKM(id: string, payload: UMKM) {
  return apiSend<UMKM, UMKM>(`/api/umkm/${id}`, "PUT", payload);
}

export function deleteUMKM(id: string) {
  return apiSend<undefined, { id: string }>(`/api/umkm/${id}`, "DELETE");
}
