import { apiGet, apiSend, withFallbackData } from "@/lib/api";
import { pendudukMock } from "@/lib/mock-data";
import type { Penduduk } from "@/types";

export function getPenduduk() {
  return apiGet<Penduduk>("penduduk", pendudukMock).then((response) =>
    withFallbackData(response, pendudukMock),
  );
}

export function updatePenduduk(payload: Penduduk) {
  return apiSend<Penduduk, Penduduk>("penduduk", "PUT", payload);
}
