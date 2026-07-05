import { apiGet, apiSend, withFallbackData } from "@/lib/api";
import { kontakMock } from "@/lib/mock-data";
import type { KontakPadukuhan } from "@/types";

export function getKontak() {
  return apiGet<KontakPadukuhan>("kontak", kontakMock).then((response) =>
    withFallbackData(response, {
      ...kontakMock,
      mediaSosial: {
        ...kontakMock.mediaSosial,
        ...(response.data?.mediaSosial ?? {}),
      },
    }),
  );
}

export function updateKontak(payload: KontakPadukuhan) {
  return apiSend<KontakPadukuhan, KontakPadukuhan>("kontak", "PUT", payload);
}
