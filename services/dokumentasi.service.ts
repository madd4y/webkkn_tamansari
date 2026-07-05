import { apiGet, apiSend, withFallbackData } from "@/lib/api";
import { dokumentasiMock } from "@/lib/mock-data";
import type { Dokumentasi } from "@/types";

export function getDokumentasi() {
  return apiGet<Dokumentasi[]>("dokumentasi", dokumentasiMock).then((response) =>
    withFallbackData(response, dokumentasiMock),
  );
}

export function createDokumentasi(payload: Omit<Dokumentasi, "id" | "createdAt">) {
  return apiSend<typeof payload, Dokumentasi>("dokumentasi", "POST", payload);
}

export function updateDokumentasi(id: string, payload: Dokumentasi) {
  return apiSend<Dokumentasi, Dokumentasi>(
    "dokumentasi",
    "PUT",
    payload,
    id,
  );
}

export function deleteDokumentasi(id: string) {
  return apiSend<undefined, { id: string }>(
    "dokumentasi",
    "DELETE",
    undefined,
    id,
  );
}
