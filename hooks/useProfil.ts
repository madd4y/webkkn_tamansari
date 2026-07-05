"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfil } from "@/services/profil.service";

export function useProfil() {
  return useQuery({
    queryKey: ["profil"],
    queryFn: async () => {
      const response = await getProfil();
      return response.data;
    },
  });
}
