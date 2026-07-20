import { apiGet, apiSend, withFallbackData } from "@/lib/api";
import { pendudukMock } from "@/lib/mock-data";
import type { Penduduk } from "@/types";

export function calculatePendudukTotals(data: Penduduk): Penduduk {
  const lakiLaki =
    data.lakiLakiUsia0_19 +
    data.lakiLakiUsia20_59 +
    data.lakiLakiUsia60Plus;
  const perempuan =
    data.perempuanUsia0_19 +
    data.perempuanUsia20_59 +
    data.perempuanUsia60Plus;

  return {
    ...data,
    jumlahPenduduk: lakiLaki + perempuan,
    lakiLaki,
    perempuan,
  };
}

export function getPenduduk() {
  return apiGet<Penduduk>("penduduk", pendudukMock).then((response) => {
    const normalized = withFallbackData(response, pendudukMock);

    return {
      ...normalized,
      data: calculatePendudukTotals(normalized.data),
    };
  });
}

export function updatePenduduk(payload: Penduduk) {
  const calculatedPayload = calculatePendudukTotals(payload);

  return apiSend<Penduduk, Penduduk>(
    "penduduk",
    "PUT",
    calculatedPayload,
  ).then((response) => ({
    ...response,
    data: response.success
      ? calculatePendudukTotals(response.data)
      : response.data,
  }));
}
