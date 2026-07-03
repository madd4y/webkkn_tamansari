import Image from "next/image";
import {
  BookOpenText,
  Building2,
  Camera,
  ChevronRight,
  MapPin,
  PlayCircle,
  Users,
} from "lucide-react";
import { DokumentasiCard } from "@/components/cards/dokumentasi-card";
import { StatCard } from "@/components/cards/stat-card";
import { UmkmCard } from "@/components/cards/umkm-card";
import { PublicLayout } from "@/components/layout/public-layout";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { getDokumentasi } from "@/services/dokumentasi.service";
import { getPenduduk } from "@/services/penduduk.service";
import { getProfil } from "@/services/profil.service";
import { getUMKM } from "@/services/umkm.service";
import { getVideoProfil } from "@/services/video.service";

export default async function Home() {
  const [profil, penduduk, umkm, dokumentasi, video] = await Promise.all([
    getProfil(),
    getPenduduk(),
    getUMKM(),
    getDokumentasi(),
    getVideoProfil(),
  ]);

  return (
    <PublicLayout>
      <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-zinc-950 pb-16 pt-32 text-white">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=85"
          alt="Lanskap persawahan dan perbukitan sebagai gambaran suasana Padukuhan Gedangsari"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-zinc-950/10" />
        <Container className="relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-white/12 px-3 py-2 text-sm font-semibold backdrop-blur">
              <MapPin size={17} aria-hidden="true" />
              Gedangsari, Gunungkidul
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-normal sm:text-6xl">
              Padukuhan Gedangsari
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-100">
              Media informasi digital untuk profil padukuhan, data penduduk,
              potensi UMKM, dokumentasi kegiatan, dan kontak pelayanan warga.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/profil" size="lg">
                Lihat Profil
                <ChevronRight size={18} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/umkm" variant="secondary" size="lg">
                Jelajahi UMKM
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Jumlah Penduduk" value={penduduk.jumlahPenduduk} icon={Users} />
            <StatCard label="Jumlah KK" value={penduduk.kk} icon={BookOpenText} tone="blue" />
            <StatCard label="Jumlah UMKM" value={umkm.length} icon={Building2} tone="amber" />
            <StatCard
              label="Dokumentasi"
              value={dokumentasi.length}
              icon={Camera}
              tone="zinc"
            />
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50 py-16">
        <Container>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionTitle
              eyebrow="Potensi Lokal"
              title="UMKM terbaru"
              description="Produk dan layanan masyarakat yang dapat dihubungi langsung oleh pengunjung."
            />
            <ButtonLink href="/umkm" variant="secondary">
              Lihat Semua UMKM
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {umkm.slice(0, 3).map((item) => (
              <UmkmCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionTitle
              eyebrow="Kegiatan"
              title="Dokumentasi terbaru"
              description="Arsip kegiatan padukuhan dan program KKN yang dapat diperbarui dari dashboard admin."
            />
            <ButtonLink href="/dokumentasi" variant="secondary">
              Lihat Semua Dokumentasi
            </ButtonLink>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dokumentasi.slice(0, 3).map((item) => (
              <DokumentasiCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-green-700 py-16 text-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-green-100">
                Video Profil
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-normal text-white sm:text-3xl">
                {video.judul}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-green-50">
                {video.deskripsi}
              </p>
              <ButtonLink href="/video" variant="secondary" className="mt-7">
                <PlayCircle size={18} aria-hidden="true" />
                Tonton Video Profil
              </ButtonLink>
            </div>
            <div className="rounded-md bg-white/10 p-3 shadow-2xl">
              <div className="aspect-video rounded-md bg-zinc-950 surface-grid" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="rounded-md border border-green-100 bg-green-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-zinc-950">Sekilas Padukuhan</h2>
            <p className="mt-3 max-w-4xl text-base leading-7 text-zinc-700">
              {profil.sejarah}
            </p>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
