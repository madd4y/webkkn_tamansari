import {
  BookOpenText,
  Check,
  Landmark,
  MapPin,
  MapPinned,
  Mountain,
  Ruler,
  UsersRound,
  Award,
  Globe2,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { getKontak } from "@/services/kontak.service";
import { getProfil } from "@/services/profil.service";
import type { OrganizationMember } from "@/types";

export const metadata = {
  title: "Profil Padukuhan",
};

const defaultMembers: OrganizationMember[] = [
  { jabatan: "Dukuh", nama: "Bapak Supriyanto" },
  { jabatan: "Ketua RW", nama: "Bapak Wahyudi" },
  { jabatan: "Ketua RT 01", nama: "Pak Agus" },
  { jabatan: "Ketua RT 02", nama: "Pak Bambang" },
  { jabatan: "Ketua RT 03", nama: "Pak Cipto" },
  { jabatan: "Ketua RT 04", nama: "Pak Darwanto" },
  { jabatan: "Ketua RT 05", nama: "Pak Eko" },
  { jabatan: "Ketua RT 06", nama: "Pak Fauzi" },
  { jabatan: "Ketua RT 07", nama: "Ibu Ginarsih" },
  { jabatan: "Ketua RT 08", nama: "Pak Hartono" },
];

const fallbackVisi =
  "Terwujudnya Padukuhan Tamansari yang rukun, mandiri, tertata, dan terbuka terhadap perkembangan digital.";

function normalizeMembers(members: OrganizationMember[]) {
  return defaultMembers.map((fallback, index) => {
    const member = members[index];

    if (!member) {
      return fallback;
    }

    return {
      jabatan: fallback.jabatan,
      nama: member.nama?.trim() || fallback.nama,
    };
  });
}

function normalizeOrganizationTitle(title: string) {
  const normalizedTitle = title.trim();

  return /^Ketua RW(?:\s+0?1)?$/i.test(normalizedTitle)
    ? "Ketua RW"
    : normalizedTitle;
}

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-[#e5ded3] bg-white shadow-[0_1px_3px_rgba(31,41,55,0.10)] ${className}`}
    >
      {children}
    </section>
  );
}

function IconTitle({
  icon: Icon,
  title,
  dark = false,
}: {
  icon: typeof BookOpenText;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex size-10 items-center justify-center rounded-2xl ${
          dark ? "bg-white/20 text-white" : "bg-[#8b7355]/10 text-[#8b7355]"
        }`}
      >
        <Icon size={18} aria-hidden="true" />
      </span>
      <h2 className={`text-xl font-extrabold leading-7 ${dark ? "text-white" : "text-[#1f2937]"}`}>
        {title}
      </h2>
    </div>
  );
}

function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#e5ded3] bg-white p-4 shadow-[0_1px_3px_rgba(31,41,55,0.10)]">
      <p className="text-xs leading-4 text-[#6b7280]">{label}</p>
      <p className="mt-1 text-sm font-extrabold leading-5 text-[#1f2937]">{value}</p>
    </div>
  );
}

function OrgNode({
  member,
  primary = false,
}: {
  member: OrganizationMember;
  primary?: boolean;
}) {
  return (
    <div
      className={`mx-auto text-center shadow-sm ${
        primary
          ? "min-w-[150px] rounded-xl bg-[#8b7355] px-6 py-3 text-white"
          : "w-full rounded-xl border border-[#e5ded3] bg-[#f7f3ec] px-5 py-3 text-[#1f2937]"
      }`}
    >
      <p className="text-sm font-extrabold leading-5">
        {normalizeOrganizationTitle(member.jabatan)}
      </p>
      <p className={`text-sm leading-5 ${primary ? "text-white/80" : "text-[#6b7280]"}`}>
        {member.nama}
      </p>
    </div>
  );
}

export default async function ProfilPage() {
  const [profil, kontak] = await Promise.all([
    getProfil().then((response) => response.data),
    getKontak().then((response) => response.data),
  ]);
  const members = normalizeMembers(profil.struktur);
  const [dukuh, ketuaRw, ...rtMembers] = members;
  const visi = profil.visi?.trim() || fallbackVisi;

  return (
    <PublicLayout>
      <section className="relative flex min-h-[300px] items-center overflow-hidden border-b border-[#e5ded3] bg-[#f7f3ec] pb-14 pt-28 shadow-[0_14px_35px_rgba(139,115,85,0.08)] sm:min-h-[360px] sm:pb-20 sm:pt-32">
        <div
          className="absolute inset-y-0 right-0 hidden w-[70%] bg-cover bg-center lg:block"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(139,115,85,0.12),transparent_30%),linear-gradient(120deg,#f7f3ec_0%,#f7f3ec_46%,rgba(247,243,236,0.55)_72%,rgba(247,243,236,0.08)_100%)]" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#f7f3ec] via-[#f7f3ec]/82 via-46% to-transparent lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent via-[#f7f3ec]/78 to-[#f7f3ec]" />
        <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-[#e5ded3] bg-white/75 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[#8b7355] shadow-sm backdrop-blur sm:text-sm sm:tracking-[0.18em]">
              Tentang Kami
            </p>
            <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight text-[#1f2937] sm:text-5xl">
              Profil {kontak.namaPadukuhan}
            </h1>
            <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-[#6b7280] sm:text-base sm:leading-8">
              Informasi resmi tentang sejarah, visi, misi, dan struktur organisasi{" "}
              {kontak.namaPadukuhan}.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto grid max-w-[1143px] gap-6 px-5 sm:gap-8 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_338px]">
            <SectionCard className="p-5 sm:p-8">
              <IconTitle icon={BookOpenText} title="Sejarah Padukuhan" />
              <div className="mt-5 space-y-4 text-sm leading-7 text-[#6b7280]">
                {profil.sejarah
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
              </div>
            </SectionCard>

            <aside className="grid content-start gap-4">
              <FactCard label="Tahun Berdiri" value="1945" />
              <FactCard label="Kapanewon" value="Gedangsari" />
              <FactCard label="Kalurahan" value="Watugajah" />
              <FactCard label="Kabupaten" value="Gunungkidul" />
            </aside>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard className="min-h-[220px] !bg-[#8b7355] p-5 sm:min-h-[242px] sm:p-8">
              <IconTitle icon={Globe2} title="Visi" dark />
              <p className="mt-5 text-sm leading-[22.75px] text-white/90">
                {visi}
              </p>
            </SectionCard>

            <SectionCard className="min-h-[220px] p-5 sm:min-h-[242px] sm:p-8">
              <IconTitle icon={Award} title="Misi" />
              <ul className="mt-5 grid gap-3">
                {profil.misi.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[#6b7280]">
                    <Check className="mt-1 shrink-0 text-[#8b7355]" size={15} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          <SectionCard className="p-5 sm:p-8">
            <IconTitle icon={UsersRound} title="Struktur Organisasi" />
            <div className="mt-12 flex flex-col items-center">
              <OrgNode member={dukuh} primary />
              {ketuaRw && (
                <>
                  <div className="h-8 w-px bg-[#e5ded3]" />
                  <OrgNode member={ketuaRw} primary />
                </>
              )}
              {rtMembers.length > 0 && (
                <>
                  <div className="h-8 w-px bg-[#e5ded3]" />
                  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {rtMembers.map((member) => (
                      <OrgNode key={`${member.jabatan}-${member.nama}`} member={member} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </SectionCard>

          <SectionCard className="p-5 sm:p-8">
            <IconTitle icon={MapPinned} title="Letak Geografis" />
            <p className="mt-5 text-sm leading-7 text-[#6b7280]">{profil.geografis}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between gap-4 rounded-xl bg-[#f3eee8] px-4 py-3">
                <span className="flex items-center gap-2 text-xs text-[#6b7280]">
                  <Ruler size={13} aria-hidden="true" />
                  Luas Wilayah
                </span>
                <span className="text-xs font-extrabold text-[#1f2937]">{profil.luas}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl bg-[#f3eee8] px-4 py-3">
                <span className="flex items-center gap-2 text-xs text-[#6b7280]">
                  <Mountain size={13} aria-hidden="true" />
                  Ketinggian
                </span>
                <span className="text-xs font-extrabold text-[#1f2937]">{profil.ketinggian}</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard className="overflow-hidden">
            <div className="flex items-center gap-3 border-b border-[#e5ded3] bg-white p-5 sm:p-6">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-[#8b7355]/10 text-[#8b7355]">
                <Landmark size={18} aria-hidden="true" />
              </span>
              <h2 className="text-xl font-extrabold text-[#1f2937]">Peta Lokasi</h2>
            </div>
            <div className="relative h-[260px] bg-[#e8dfd2] sm:h-[300px]">
              {profil.maps ? (
                <iframe
                  src={profil.maps}
                  title={`Peta lokasi ${kontak.namaPadukuhan}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center text-[#6b7280]">
                  <MapPin size={28} className="text-[#8b7355]" aria-hidden="true" />
                  <p className="mt-3 max-w-xs text-sm leading-6">{kontak.alamat}</p>
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      </section>
    </PublicLayout>
  );
}
