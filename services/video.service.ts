import { apiGet, apiSend } from "@/lib/api";
import { videoMock } from "@/lib/mock-data";
import type { VideoProfil } from "@/types";

export function getVideoProfil() {
  return apiGet<VideoProfil>("/api/video", videoMock);
}

export function updateVideoProfil(payload: VideoProfil) {
  return apiSend<VideoProfil, VideoProfil>("/api/video", "PUT", payload);
}
