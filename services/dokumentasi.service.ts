import { apiGet, apiSend, withFallbackData } from "@/lib/api";
import { dokumentasiMock } from "@/lib/mock-data";
import type { Dokumentasi } from "@/types";

function getDokumentasiTimestamp(item: Dokumentasi) {
  const tanggal = Date.parse(item.tanggal);

  if (!Number.isNaN(tanggal)) {
    return tanggal;
  }

  const createdAt = Date.parse(item.createdAt);
  return Number.isNaN(createdAt) ? 0 : createdAt;
}

export function sortDokumentasiByLatest(items: Dokumentasi[]) {
  return [...items].sort(
    (first, second) =>
      getDokumentasiTimestamp(second) - getDokumentasiTimestamp(first),
  );
}

export function getDokumentasi() {
  return apiGet<Dokumentasi[]>("dokumentasi", dokumentasiMock).then((response) => {
    const normalized = withFallbackData(response, dokumentasiMock);

    return {
      ...normalized,
      data: sortDokumentasiByLatest(normalized.data),
    };
  });
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
