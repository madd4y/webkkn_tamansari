import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { getKontak } from "@/services/kontak.service";

export async function PublicLayout({ children }: { children: React.ReactNode }) {
  const kontak = await getKontak();

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer kontak={kontak} />
    </>
  );
}
