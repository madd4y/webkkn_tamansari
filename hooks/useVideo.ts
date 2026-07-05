"use client";

import { useQuery } from "@tanstack/react-query";
import { getVideoProfil } from "@/services/video.service";

export function useVideo() {
  return useQuery({
    queryKey: ["video"],
    queryFn: async () => {
      const response = await getVideoProfil();
      return response.data;
    },
  });
}
