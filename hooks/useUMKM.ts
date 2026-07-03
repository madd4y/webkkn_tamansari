"use client";

import { useQuery } from "@tanstack/react-query";
import { getUMKM } from "@/services/umkm.service";

export function useUMKM() {
  return useQuery({
    queryKey: ["umkm"],
    queryFn: getUMKM,
  });
}
