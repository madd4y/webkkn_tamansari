import { apiGet, withFallbackData } from "@/lib/api";
import {
  dokumentasiMock,
  pendudukMock,
  profilMock,
  umkmMock,
  videoMock,
} from "@/lib/mock-data";
import type { Dokumentasi, Penduduk, ProfilPadukuhan, UMKM, VideoProfil } from "@/types";
import { getDokumentasi } from "./dokumentasi.service";
import { calculatePendudukTotals, getPenduduk } from "./penduduk.service";
import { getProfil } from "./profil.service";
import { getUMKM } from "./umkm.service";
import { getVideoProfil } from "./video.service";

export interface SiteData {
  profil: ProfilPadukuhan;
  penduduk: Penduduk;
  umkm: UMKM[];
  dokumentasi: Dokumentasi[];
  video: VideoProfil;
}

const siteFallback: SiteData = {
  profil: profilMock,
  penduduk: pendudukMock,
  umkm: umkmMock,
  dokumentasi: dokumentasiMock,
  video: videoMock,
};

function normalizeSiteData(data: Partial<SiteData> | null | undefined): SiteData {
  const penduduk = calculatePendudukTotals({
    ...pendudukMock,
    ...(data?.penduduk ?? {}),
  });

  return {
    profil: {
      ...profilMock,
      ...(data?.profil ?? {}),
    },
    penduduk,
    umkm: Array.isArray(data?.umkm) ? data.umkm : umkmMock,
    dokumentasi: Array.isArray(data?.dokumentasi)
      ? data.dokumentasi
      : dokumentasiMock,
    video: {
      ...videoMock,
      ...(data?.video ?? {}),
    },
  };
}

export async function getSiteData() {
  const response = await apiGet<Partial<SiteData>>("site", siteFallback);

  if (!response.success) {
    const [profil, penduduk, umkm, dokumentasi, video] = await Promise.all([
      getProfil(),
      getPenduduk(),
      getUMKM(),
      getDokumentasi(),
      getVideoProfil(),
    ]);

    return {
      ...response,
      data: {
        profil: profil.data,
        penduduk: penduduk.data,
        umkm: umkm.data,
        dokumentasi: dokumentasi.data,
        video: video.data,
      },
    };
  }

  const normalized = withFallbackData(response, siteFallback);

  return {
    ...normalized,
    data: normalizeSiteData(normalized.data),
  };
}
