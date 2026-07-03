import { apiGet, apiSend } from "@/lib/api";
import { dokumentasiMock } from "@/lib/mock-data";
import type { Dokumentasi } from "@/types";

export function getDokumentasi() {
  return apiGet<Dokumentasi[]>("/api/dokumentasi", dokumentasiMock);
}

export function createDokumentasi(payload: Omit<Dokumentasi, "id" | "createdAt">) {
  return apiSend<typeof payload, Dokumentasi>("/api/dokumentasi", "POST", payload);
}

export function updateDokumentasi(id: string, payload: Dokumentasi) {
  return apiSend<Dokumentasi, Dokumentasi>(
    `/api/dokumentasi/${id}`,
    "PUT",
    payload,
  );
}

export function deleteDokumentasi(id: string) {
  return apiSend<undefined, { id: string }>(
    `/api/dokumentasi/${id}`,
    "DELETE",
  );
}
