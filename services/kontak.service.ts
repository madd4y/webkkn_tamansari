import { apiGet, apiSend } from "@/lib/api";
import { kontakMock } from "@/lib/mock-data";
import type { KontakPadukuhan } from "@/types";

export function getKontak() {
  return apiGet<KontakPadukuhan>("/api/kontak", kontakMock);
}

export function updateKontak(payload: KontakPadukuhan) {
  return apiSend<KontakPadukuhan, KontakPadukuhan>("/api/kontak", "PUT", payload);
}
