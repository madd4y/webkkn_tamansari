import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Leaf, MapPin, UsersRound } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import type { StaticArticle } from "@/lib/static-articles";

interface StaticArticlePageProps {
  article: StaticArticle;
  asideTitle?: string;
  asideDescription?: string;
}

function renderFirstParagraph(paragraph: string) {
  const location = "Tamansari, Gunungkidul";

  if (!paragraph.startsWith(location)) {
    return paragraph;
  }

  return (
    <>
      <strong>{location}</strong>
      {paragraph.replace(location, "")}
    </>
  );
}

export function StaticArticlePage({
  article,
  asideTitle = article.title,
  asideDescription = "Artikel ini menyoroti kehidupan warga Tamansari melalui cerita lokal, budaya, dan semangat gotong royong yang terus dijaga.",
}: StaticArticlePageProps) {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden border-b border-[#e5e0d8] bg-[#f7f3ec] pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="absolute inset-y-0 right-0 hidden w-[58%] md:block">
          <Image
            src={article.image}
            alt={`Ilustrasi ${article.title}`}
            fill
            priority
            sizes="58vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f3ec] via-[#f7f3ec]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7f3ec]/20 via-transparent to-[#f7f3ec]" />
        </div>

        <div className="relative mx-auto max-w-[1143px] px-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#7c6a55] transition hover:text-[#1f2937]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Kembali ke Beranda
          </Link>

          <div className="mt-9 max-w-3xl">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e7d8c9] px-3 py-1 text-xs font-extrabold uppercase tracking-[1.2px] text-[#7c6a55]">
                <Leaf size={13} aria-hidden="true" />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d8c7ad] bg-white/70 px-3 py-1 text-xs font-bold text-[#7c6a55] backdrop-blur">
                <MapPin size={13} aria-hidden="true" />
                {article.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d8c7ad] bg-white/70 px-3 py-1 text-xs font-bold text-[#7c6a55] backdrop-blur">
                <CalendarDays size={13} aria-hidden="true" />
                {article.publishedLabel}
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-extrabold leading-tight text-[#1f2937] sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-[#6b7280]">
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-[1143px] gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,760px)_1fr] lg:gap-10">
          <article className="rounded-3xl border border-[#e5e0d8] bg-white p-5 shadow-[0_12px_30px_rgba(31,41,55,0.08)] sm:p-9">
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-[#f3eee8] md:hidden">
              <Image
                src={article.image}
                alt={`Ilustrasi ${article.title}`}
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            <div className="space-y-6 text-justify text-base font-normal leading-8 text-[#4b5563]">
              {article.content.map((paragraph, index) => (
                <p key={`${article.slug}-${index}`}>
                  {index === 0 ? renderFirstParagraph(paragraph) : paragraph}
                </p>
              ))}
            </div>
          </article>

          <aside className="h-fit rounded-3xl border border-[#e5e0d8] bg-[#f8f5f0] p-6">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e7d8c9] text-[#7c6a55]">
              <UsersRound size={22} aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-extrabold text-[#1f2937]">
              {asideTitle}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#6b7280]">
              {asideDescription}
            </p>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}
