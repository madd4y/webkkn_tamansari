"use client";

import { useQuery } from "@tanstack/react-query";
import { getDokumentasi } from "@/services/dokumentasi.service";

export function useDokumentasi() {
  return useQuery({
    queryKey: ["dokumentasi"],
    queryFn: async () => {
      const response = await getDokumentasi();
      return response.data;
    },
  });
}
