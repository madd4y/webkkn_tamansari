import { apiGet, apiSend, withFallbackData } from "@/lib/api";
import { videoMock } from "@/lib/mock-data";
import type { VideoProfil } from "@/types";

export function getVideoProfil() {
  return apiGet<VideoProfil>("video", videoMock).then((response) =>
    withFallbackData(response, videoMock),
  );
}

export function updateVideoProfil(payload: VideoProfil) {
  return apiSend<VideoProfil, VideoProfil>("video", "PUT", payload, payload.id);
}
