import { apiGet, apiSend } from "@/lib/api";
import { pendudukMock } from "@/lib/mock-data";
import type { Penduduk } from "@/types";

export function getPenduduk() {
  return apiGet<Penduduk>("/api/penduduk", pendudukMock);
}

export function updatePenduduk(payload: Penduduk) {
  return apiSend<Penduduk, Penduduk>("/api/penduduk", "PUT", payload);
}
