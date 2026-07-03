import { Compass, MapPinned, UsersRound } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionTitle } from "@/components/ui/section-title";
import { getProfil } from "@/services/profil.service";

export const metadata = {
  title: "Profil Padukuhan",
};

export default async function ProfilPage() {
  const profil = await getProfil();

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Profil"
        title="Mengenal Padukuhan Gedangsari"
        description="Sejarah, visi, misi, struktur organisasi, kondisi geografis, dan lokasi padukuhan."
      />
      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div>
                <SectionTitle title="Sejarah" />
                <p className="mt-4 leading-8 text-zinc-700">{profil.sejarah}</p>
              </div>
              <div className="rounded-md border border-green-100 bg-green-50 p-6">
                <h2 className="text-xl font-bold text-zinc-950">Visi</h2>
                <p className="mt-3 leading-7 text-zinc-700">{profil.visi}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-950">Misi</h2>
                <ul className="mt-4 grid gap-3">
                  {profil.misi.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-zinc-200 bg-white p-4 text-zinc-700 shadow-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <aside className="space-y-6">
              <div className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <UsersRound className="text-green-700" size={24} aria-hidden="true" />
                  <h2 className="text-xl font-bold text-zinc-950">Struktur Organisasi</h2>
                </div>
                <div className="mt-5 divide-y divide-zinc-100">
                  {profil.struktur.map((member) => (
                    <div key={member.jabatan} className="flex justify-between gap-4 py-3">
                      <span className="font-medium text-zinc-600">{member.jabatan}</span>
                      <span className="text-right font-semibold text-zinc-950">
                        {member.nama}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Compass className="text-green-700" size={24} aria-hidden="true" />
                  <h2 className="text-xl font-bold text-zinc-950">Geografis</h2>
                </div>
                <p className="mt-4 leading-7 text-zinc-700">{profil.geografis}</p>
                <dl className="mt-5 grid gap-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-zinc-500">Luas wilayah</dt>
                    <dd className="font-semibold text-zinc-950">{profil.luas}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-zinc-500">Ketinggian</dt>
                    <dd className="font-semibold text-zinc-950">{profil.ketinggian}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </section>
      <section className="bg-zinc-50 py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionTitle eyebrow="Wilayah" title="Batas dan lokasi" />
              <div className="mt-6 grid gap-3">
                {[
                  ["Utara", profil.utara],
                  ["Selatan", profil.selatan],
                  ["Timur", profil.timur],
                  ["Barat", profil.barat],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-md border border-zinc-200 bg-white p-4"
                  >
                    <span className="font-medium text-zinc-500">{label}</span>
                    <span className="text-right font-semibold text-zinc-950">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 font-semibold">
                <MapPinned size={18} className="text-green-700" aria-hidden="true" />
                Lokasi Padukuhan
              </div>
              <iframe
                src={profil.maps}
                title="Peta lokasi Padukuhan Gedangsari"
                className="h-[420px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </section>
    </PublicLayout>
  );
}
