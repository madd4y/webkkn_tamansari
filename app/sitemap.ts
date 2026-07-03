import type { MetadataRoute } from "next";

const baseUrl = "https://gedangsari.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/profil",
    "/penduduk",
    "/umkm",
    "/dokumentasi",
    "/video",
    "/kontak",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
