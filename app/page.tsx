import Image from "next/image";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Clock,
  Eye,
  Home,
  ImageIcon,
  Landmark,
  Mail,
  MapPin,
  MessageCircle,
  Mountain,
  Newspaper,
  Phone,
  Play,
  Store,
  Users,
  UsersRound,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { ButtonLink } from "@/components/ui/button";
import { staticArticles } from "@/lib/static-articles";
import { getWhatsAppUrl, getYouTubeEmbedUrl, formatNumber } from "@/lib/utils";
import { getKontak } from "@/services/kontak.service";
import { getSiteData } from "@/services/site.service";

const landscapeImage =
  "/images/tamansari/pemandangan-lembah.webp";

const heroImage = "/images/tamansari/senja-tamansari.webp";

function padukuhanShortName(fullName: string) {
  return fullName.replace(/^Padukuhan\s+/i, "").trim() || fullName;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-[672px] text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#e7d8c9] px-3 py-1 text-xs font-bold uppercase tracking-[1.2px] text-[#7c6a55]">
        <span className="size-1.5 rounded-full bg-[#7c6a55]" />
        {eyebrow}
      </div>
      <h2 className="mt-4 text-2xl font-extrabold leading-tight text-[#1f2937] sm:text-[40px]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6b7280] sm:text-base">
        {description}
      </p>
    </div>
  );
}

export default async function HomePage() {
  const [{ profil, penduduk, umkm, dokumentasi, video }, kontak] = await Promise.all([
    getSiteData().then((response) => response.data),
    getKontak().then((response) => response.data),
  ]);
  const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);
  const name = padukuhanShortName(kontak.namaPadukuhan);
  const malePercent = penduduk.jumlahPenduduk
    ? Math.round((penduduk.lakiLaki / penduduk.jumlahPenduduk) * 100)
    : 0;
  const femalePercent = penduduk.jumlahPenduduk
    ? Math.round((penduduk.perempuan / penduduk.jumlahPenduduk) * 100)
    : 0;
  const featuredUmkm = umkm.slice(0, 6);
  const featuredDokumentasi = dokumentasi.slice(0, 3);

  return (
    <PublicLayout>
      <section
        className="relative min-h-[620px] overflow-hidden bg-cover bg-center pt-20 text-white sm:min-h-[700px] lg:min-h-[760px] lg:pt-[104px]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/34" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#241f18]/78 via-[#241f18]/32 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#241f18]/78 to-transparent" />

        <div className="relative mx-auto flex min-h-[540px] max-w-[1550px] items-center px-5 sm:min-h-[620px] sm:px-8 lg:min-h-[656px] xl:px-12">
          <div className="max-w-[690px]">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#e3d0b0]/45 bg-[#5e4e38]/70 px-3 py-2 text-xs font-extrabold text-[#ead8b8] shadow-sm backdrop-blur sm:gap-3 sm:px-4 sm:text-base">
              <Landmark size={15} aria-hidden="true" />
              Padukuhan Tamansari • Gunungkidul, DIY
            </div>
            <h1 className="mt-8 text-[42px] font-extrabold leading-[1.08] tracking-normal sm:mt-10 sm:text-[68px] lg:text-[74px]">
              Padukuhan
              <br />
              <span className="text-[#ead8b8]">{name}</span>
            </h1>
            <p className="mt-5 max-w-[690px] text-base font-semibold leading-7 text-white/82 sm:mt-6 sm:text-xl sm:leading-[1.55]">
              Padukuhan dengan semangat gotong royong, kearifan lokal, dan
              potensi budaya yang kaya di kawasan Gedangsari, Gunungkidul.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/profil" size="lg" className="h-11 rounded-2xl px-5 text-sm sm:h-12 sm:px-6 sm:text-base">
                Lihat Profil
                <ArrowRight size={19} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href="/umkm"
                variant="ghost"
                size="lg"
                className="h-11 rounded-2xl border border-white/40 bg-white/10 px-5 text-sm text-white backdrop-blur hover:bg-white/20 hover:text-white sm:h-12 sm:px-6 sm:text-base"
              >
                Lihat UMKM
                <Store size={19} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white py-12">
        <div className="mx-auto grid max-w-[1550px] gap-4 px-5 sm:grid-cols-2 sm:gap-6 sm:px-8 lg:grid-cols-4 xl:px-12">
          {[
            {
              icon: UsersRound,
              value: formatNumber(penduduk.jumlahPenduduk),
              label: "Jumlah Penduduk",
            },
            {
              icon: Home,
              value: formatNumber(penduduk.kk),
              label: "Kepala Keluarga",
            },
            {
              icon: Store,
              value: formatNumber(umkm.length),
              label: "Usaha UMKM",
            },
            {
              icon: ImageIcon,
              value: formatNumber(dokumentasi.length),
              label: "Dokumentasi",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex min-h-[104px] items-center gap-4 rounded-3xl border border-[#e5e0d8] bg-white p-5 shadow-[0_8px_22px_rgba(31,41,55,0.1)] sm:min-h-[126px] sm:gap-5 sm:p-6"
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#f3f0ed] text-[#9a7b55]">
                <item.icon size={26} aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-extrabold leading-none text-[#1f2937] sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1.5 text-sm font-bold leading-5 text-[#6b7280] sm:text-base">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f8f5f0] py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1550px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 xl:px-12">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#9a7b55]">
              Tentang Kami
            </p>
            <h2 className="mt-4 max-w-3xl text-2xl font-extrabold leading-tight text-[#1f2937] sm:text-3xl">
              Mengenal {kontak.namaPadukuhan}
            </h2>
            <p className="mt-5 max-w-[640px] text-sm font-semibold leading-7 text-[#6b7280]">
              {kontak.namaPadukuhan} adalah padukuhan yang terletak di
              Kalurahan Watugajah, Kapanewon Gedangsari, Kabupaten Gunungkidul,
              Daerah Istimewa Yogyakarta.
            </p>

            <div className="mt-9 grid gap-5">
              {[
                {
                  icon: Mountain,
                  text: `${profil.ketinggian} dengan udara sejuk dan pemandangan alam yang asri`,
                },
                {
                  icon: UsersRound,
                  text: "Masyarakat yang guyub dan aktif dalam kegiatan gotong royong serta budaya lokal.",
                },
                {
                  icon: Store,
                  text: "Memiliki berbagai potensi UMKM mulai dari kerajinan, kuliner, hingga pertanian lokal.",
                },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#f0ebe4] text-[#9a7b55]">
                    <item.icon size={18} aria-hidden="true" />
                  </div>
                  <p className="max-w-3xl text-sm font-semibold leading-6 text-[#6b7280]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <ButtonLink
              href="/profil"
              variant="secondary"
              size="lg"
              className="mt-10 h-12 rounded-2xl border border-[#d8c7ad] bg-white px-6 text-sm"
            >
              Selengkapnya
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="relative">
            <div className="relative aspect-[1.35] overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(31,41,55,0.16)]">
              <Image
                src={landscapeImage}
                alt={`Pemandangan ${kontak.namaPadukuhan}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute bottom-4 left-4 rounded-3xl bg-white px-5 py-4 shadow-[0_14px_34px_rgba(31,41,55,0.18)] sm:-bottom-8 sm:-left-8 sm:px-6 sm:py-5">
              <p className="text-sm font-bold text-[#6b7280] sm:text-base">Berdiri sejak</p>
              <p className="mt-1 text-3xl font-extrabold leading-none text-[#8a7358] sm:text-4xl">
                1945
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1143px] px-5 sm:px-8">
          <SectionHeader
            eyebrow="Video Profil"
            title="Mengenal Lebih Dekat"
            description="Saksikan keindahan dan kehidupan warga melalui video profil resmi padukuhan."
          />
          <div className="mx-auto mt-10 max-w-[972px] overflow-hidden rounded-2xl border border-[#e5e0d8] bg-white shadow-[0_10px_25px_rgba(31,41,55,0.08)]">
            <div className="relative aspect-video overflow-hidden bg-[#1f2937]">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={video.judul}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="h-full w-full"
                />
              ) : (
                <>
                  <Image
                    src={landscapeImage}
                    alt={video.judul}
                    fill
                    sizes="(min-width: 1024px) 972px, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-white text-[#7c6a55] shadow-xl">
                      <Play size={24} fill="currentColor" aria-hidden="true" />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center justify-between gap-6 p-5">
              <div>
                <h3 className="text-sm font-extrabold text-[#1f2937]">{video.judul}</h3>
                <p className="mt-1 max-w-xl text-xs leading-5 text-[#6b7280]">{video.deskripsi}</p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-extrabold text-[#7c6a55]">2.4K+</p>
                <p className="text-xs text-[#6b7280]">penonton</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f5f0] py-14 sm:py-20">
        <div className="mx-auto max-w-[1143px] px-5 sm:px-8">
          <SectionHeader
            eyebrow="Data Penduduk"
            title="Statistik Kependudukan"
            description="Data penduduk diperbarui secara berkala untuk kebutuhan informasi dan administrasi warga."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Total Penduduk", formatNumber(penduduk.jumlahPenduduk), Users],
                ["Kepala Keluarga", `${formatNumber(penduduk.kk)} KK`, Home],
                ["Jumlah RT", `${penduduk.rt} RT`, MapPin],
                ["Jumlah RW", `${penduduk.rw} RW`, BookOpenText],
              ].map(([label, value, Icon]) => (
                <div key={String(label)} className="rounded-2xl border border-[#e5e0d8] bg-white p-5 shadow-sm">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#f3eee8] text-[#7c6a55]">
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-2xl font-extrabold text-[#1f2937]">{String(value)}</p>
                  <p className="text-xs font-semibold text-[#6b7280]">{String(label)}</p>
                </div>
              ))}
              <div className="rounded-2xl bg-[#7c6a55] p-5 text-white shadow-sm sm:col-span-2">
                <div className="flex items-center justify-between text-xs">
                  <span>Kepadatan Penduduk</span>
                  <span>{profil.luas}</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/30">
                  <div className="h-2 w-4/5 rounded-full bg-white" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-[#e5e0d8] bg-white p-6 shadow-sm">
              <h3 className="text-sm font-extrabold text-[#1f2937]">Komposisi Penduduk</h3>
              <div className="mt-6 grid gap-5">
                <div>
                  <div className="mb-2 flex justify-between text-xs font-semibold text-[#6b7280]">
                    <span>Laki-laki</span>
                    <span>{formatNumber(penduduk.lakiLaki)} jiwa</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#f3eee8]">
                    <div className="h-2 rounded-full bg-[#7c6a55]" style={{ width: `${malePercent}%` }} />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-xs font-semibold text-[#6b7280]">
                    <span>Perempuan</span>
                    <span>{formatNumber(penduduk.perempuan)} jiwa</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#f3eee8]">
                    <div className="h-2 rounded-full bg-[#b8a38a]" style={{ width: `${femalePercent}%` }} />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <div className="flex size-32 items-center justify-center rounded-full border-[14px] border-[#e7d8c9] bg-white text-center shadow-inner">
                  <div>
                    <p className="text-xl font-extrabold text-[#1f2937]">
                      {formatNumber(penduduk.jumlahPenduduk)}
                    </p>
                    <p className="text-xs text-[#6b7280]">jiwa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1143px] px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#9a7b55]">
                Potensi Lokal
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1f2937] sm:text-4xl">
                UMKM Unggulan
              </h2>
              <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-[#6b7280]">
                Produk dan usaha milik warga yang siap melayani kebutuhan Anda.
              </p>
            </div>
            <ButtonLink
              href="/umkm"
              variant="secondary"
              size="lg"
              className="h-12 rounded-2xl border border-[#d8c7ad] bg-white px-6 text-sm"
            >
              Lihat Semua
              <ArrowRight size={17} aria-hidden="true" />
            </ButtonLink>
          </div>

          <div
            className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 scroll-smooth sm:mx-0 sm:mt-14 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
            aria-label="UMKM unggulan"
          >
            {featuredUmkm.map((item) => (
              <article
                key={item.id}
                className="w-[82vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#e5e0d8] bg-white shadow-[0_8px_22px_rgba(31,41,55,0.10)] sm:w-full sm:max-w-none"
              >
                <div className="relative aspect-[341/213] bg-[#f3eee8]">
                  <Image
                    src={item.foto}
                    alt={`Foto ${item.nama}`}
                    fill
                    sizes="(min-width: 1024px) 350px, (min-width: 640px) 350px, 100vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-[#f0c96c] bg-[#fff7df] px-3 py-1 text-xs font-extrabold text-[#d97706]">
                    {item.kategori}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-extrabold leading-tight text-[#1f2937]">
                    {item.nama}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#6b7280]">
                    <Users size={13} aria-hidden="true" />
                    {item.pemilik}
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-[#6b7280]">
                    {item.deskripsi}
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <a
                      href={getWhatsAppUrl(item.whatsapp, `Halo, saya ingin bertanya tentang ${item.nama}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#8a7358] px-4 text-xs font-extrabold text-white"
                    >
                      <MessageCircle size={15} aria-hidden="true" />
                      WhatsApp
                    </a>
                    <ButtonLink
                      href={`/umkm/${encodeURIComponent(item.id)}`}
                      variant="secondary"
                      size="sm"
                      className="h-10 rounded-xl border border-[#e5e0d8] bg-white text-xs font-extrabold"
                    >
                      <Eye size={15} aria-hidden="true" />
                      Detail
                    </ButtonLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ec] py-14 sm:py-20">
        <div className="mx-auto max-w-[1143px] px-5 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#9a7b55]">
                Galeri Kegiatan
              </p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1f2937] sm:text-4xl">
                Dokumentasi Terbaru
              </h2>
            </div>
            <ButtonLink
              href="/dokumentasi"
              variant="secondary"
              size="lg"
              className="h-12 w-fit rounded-2xl border border-[#d8c7ad] bg-white px-6 text-sm"
            >
              Lihat Semua
              <ArrowRight size={17} aria-hidden="true" />
            </ButtonLink>
          </div>

          <div
            className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 scroll-smooth sm:mx-0 sm:mt-14 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
            aria-label="Dokumentasi terbaru"
          >
            {featuredDokumentasi.map((item) => (
              <article
                key={item.id}
                className="flex h-full w-[82vw] max-w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#e5e0d8] bg-white shadow-[0_8px_22px_rgba(31,41,55,0.10)] sm:w-auto sm:max-w-none"
              >
                <div className="relative aspect-[341/213] bg-[#f3eee8]">
                  <Image
                    src={item.foto}
                    alt={`Dokumentasi ${item.judul}`}
                    fill
                    sizes="(min-width: 1024px) 343px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#6b7280]">
                    <CalendarDays size={14} aria-hidden="true" />
                    {formatDate(item.tanggal)}
                  </div>
                  <h3 className="mt-3 text-base font-extrabold leading-tight text-[#1f2937]">
                    {item.judul}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm font-semibold leading-6 text-[#6b7280]">
                    {item.deskripsi}
                  </p>
                  <ButtonLink
                    href={`/dokumentasi/${encodeURIComponent(item.id)}`}
                    variant="secondary"
                    size="sm"
                    className="mt-5 w-fit"
                  >
                    <Eye size={15} aria-hidden="true" />
                    Detail
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1143px] px-5 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#e7d8c9] px-3 py-1 text-xs font-extrabold uppercase tracking-[1.2px] text-[#7c6a55]">
                <Newspaper size={13} aria-hidden="true" />
                Berita Padukuhan
              </div>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1f2937] sm:text-4xl">
                Cerita dari Tamansari
              </h2>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#6b7280]">
                Catatan kegiatan, budaya, dan kehidupan warga Padukuhan Tamansari.
              </p>
            </div>
          </div>

          <div
            className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 scroll-smooth sm:mx-0 sm:mt-12 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0"
            aria-label="Berita Padukuhan"
          >
            {staticArticles.map((article) => (
              <article
                key={article.slug}
                className="w-[82vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-3xl border border-[#e5e0d8] bg-[#f8f5f0] shadow-[0_14px_34px_rgba(31,41,55,0.08)] sm:w-auto sm:max-w-none"
              >
                <div className="relative aspect-[16/9] bg-[#e7d8c9]">
                  <Image
                    src={article.image}
                    alt={`Ilustrasi ${article.title}`}
                    fill
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-[#7c6a55] backdrop-blur">
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-extrabold leading-tight text-[#1f2937]">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-[#6b7280]">
                    {article.excerpt}
                  </p>
                  <ButtonLink
                    href={`/berita/${article.slug}`}
                    size="sm"
                    className="mt-6 h-10 rounded-xl px-4 text-xs"
                  >
                    Baca Artikel
                    <ArrowRight size={15} aria-hidden="true" />
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1143px] px-5 sm:px-8">
          <SectionHeader
            eyebrow="Kontak"
            title="Hubungi Kami"
            description="Kami siap melayani kebutuhan informasi dan administrasi warga."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-[412px_1fr]">
            <div className="grid gap-4">
              {[
                [MapPin, "Alamat", kontak.alamat],
                [Phone, "Telepon", kontak.telepon],
                [MessageCircle, "WhatsApp", kontak.whatsapp],
                [Mail, "Email", kontak.email],
                [Clock, "Jam Pelayanan", kontak.jamPelayanan],
              ].map(([Icon, label, value]) => (
                <div key={String(label)} className="flex gap-4 rounded-2xl border border-[#e5e0d8] bg-[#f8f5f0] p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e7d8c9] text-[#7c6a55]">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#b8a38a]">{String(label)}</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-[#1f2937]">{String(value)}</p>
                  </div>
                </div>
              ))}
              <a
                href={getWhatsAppUrl(kontak.whatsapp, `Halo ${kontak.namaPadukuhan}, saya ingin bertanya.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#7c6a55] text-sm font-semibold text-white"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Hubungi via WhatsApp
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#e5e0d8] bg-[#f3eee8] shadow-[0_10px_25px_rgba(31,41,55,0.08)]">
              <iframe
                src={kontak.maps || profil.maps}
                title={`Peta lokasi ${kontak.namaPadukuhan}`}
                className="h-[360px] w-full border-0 sm:h-[505px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
