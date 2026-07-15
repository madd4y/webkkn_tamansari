import type { Metadata } from "next";
import { StaticArticlePage } from "@/components/articles/static-article-page";
import { tirakatanSuronanArticle } from "@/lib/static-articles";

export const metadata: Metadata = {
  title: tirakatanSuronanArticle.title,
  description: tirakatanSuronanArticle.excerpt,
};

export default function TirakatanSuronanArticlePage() {
  return (
    <StaticArticlePage
      article={tirakatanSuronanArticle}
      asideTitle="Tirakatan Suronan"
      asideDescription="Artikel ini mengangkat tradisi syukur warga Tamansari saat Malam Suro sebagai ruang kebersamaan, doa, dan pelestarian budaya lokal."
    />
  );
}
