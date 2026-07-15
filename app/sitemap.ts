import type { MetadataRoute } from "next";
import { staticArticles } from "@/lib/static-articles";

const baseUrl = "https://gedangsari.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/profil",
    "/penduduk",
    "/umkm",
    "/dokumentasi",
    "/video",
    "/kontak",
  ];
  const articlePaths = staticArticles.map((article) => `/berita/${article.slug}`);

  return [...staticPaths, ...articlePaths].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
