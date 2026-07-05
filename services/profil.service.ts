import { apiGet, apiSend, withFallbackData } from "@/lib/api";
import { profilMock } from "@/lib/mock-data";
import type { ProfilPadukuhan } from "@/types";

export function getProfil() {
  return apiGet<ProfilPadukuhan>("profil", profilMock).then((response) =>
    withFallbackData(response, profilMock),
  );
}

export function updateProfil(payload: ProfilPadukuhan) {
  return apiSend<ProfilPadukuhan, ProfilPadukuhan>(
    "profil",
    "PUT",
    payload,
    payload.id,
  );
}
