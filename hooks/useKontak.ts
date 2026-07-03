"use client";

import { useQuery } from "@tanstack/react-query";
import { getKontak } from "@/services/kontak.service";

export function useKontak() {
  return useQuery({
    queryKey: ["kontak"],
    queryFn: getKontak,
  });
}
