"use client";

import { useQuery } from "@tanstack/react-query";
import { getPenduduk } from "@/services/penduduk.service";

export function usePenduduk() {
  return useQuery({
    queryKey: ["penduduk"],
    queryFn: getPenduduk,
  });
}
