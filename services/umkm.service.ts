import { apiGet, apiSend, withFallbackData } from "@/lib/api";
import { umkmMock } from "@/lib/mock-data";
import type { UMKM } from "@/types";

export function getUMKM() {
  return apiGet<UMKM[]>("umkm", umkmMock).then((response) =>
    withFallbackData(response, umkmMock),
  );
}

export function createUMKM(payload: Omit<UMKM, "id" | "createdAt">) {
  return apiSend<typeof payload, UMKM>("umkm", "POST", payload);
}

export function updateUMKM(id: string, payload: UMKM) {
  return apiSend<UMKM, UMKM>("umkm", "PUT", payload, id);
}

export function deleteUMKM(id: string) {
  return apiSend<undefined, { id: string }>("umkm", "DELETE", undefined, id);
}
