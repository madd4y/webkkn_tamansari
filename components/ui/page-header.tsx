import { Container } from "@/components/ui/container";

const headerImages: Record<string, string> = {
  "Data Penduduk":
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85",
  Dokumentasi:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=85",
  UMKM:
    "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?auto=format&fit=crop&w=1400&q=85",
  Kontak:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=85",
};

const fallbackImage =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  const image = eyebrow === "Video Profil" ? undefined : headerImages[eyebrow] ?? fallbackImage;

  return (
    <section className="relative flex min-h-[360px] items-center overflow-hidden border-b border-[#e5ded3] bg-[#f7f3ec] pb-20 pt-32 shadow-[0_14px_35px_rgba(139,115,85,0.08)]">
      {image ? (
        <div
          className="absolute inset-y-0 right-0 hidden w-[70%] bg-cover bg-center opacity-100 lg:block"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(139,115,85,0.12),transparent_30%),linear-gradient(115deg,#f7f3ec_0%,#f7f3ec_46%,rgba(247,243,236,0.55)_72%,rgba(247,243,236,0.08)_100%)]" />
      {image ? (
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#f7f3ec] via-[#f7f3ec]/82 via-46% to-transparent lg:block" />
      ) : null}
      <div className="absolute -bottom-24 left-[-6%] size-72 rounded-full bg-white/60 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent via-[#f7f3ec]/78 to-[#f7f3ec]" />
      <Container>
        <div className="relative">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-[#e5ded3] bg-white/75 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[#8b7355] shadow-sm backdrop-blur">
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-normal text-[#1f2937] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-[#6b7280] sm:text-lg">
              {description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
