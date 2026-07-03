import { apiGet, apiSend } from "@/lib/api";
import { profilMock } from "@/lib/mock-data";
import type { ProfilPadukuhan } from "@/types";

export function getProfil() {
  return apiGet<ProfilPadukuhan>("/api/profil", profilMock);
}

export function updateProfil(payload: ProfilPadukuhan) {
  return apiSend<ProfilPadukuhan, ProfilPadukuhan>("/api/profil", "PUT", payload);
}
