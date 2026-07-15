import type { Metadata } from "next";
import { StaticArticlePage } from "@/components/articles/static-article-page";
import { kelompokTaniArticle } from "@/lib/static-articles";

export const metadata: Metadata = {
  title: kelompokTaniArticle.title,
  description: kelompokTaniArticle.excerpt,
};

export default function KelompokTaniArticlePage() {
  return (
    <StaticArticlePage
      article={kelompokTaniArticle}
      asideTitle="Kelompok Tani Tamansari"
      asideDescription="Artikel ini menyoroti peran kelompok tani sebagai ruang koordinasi, pelatihan, dan gotong royong warga dalam menjaga ketahanan pangan."
    />
  );
}
