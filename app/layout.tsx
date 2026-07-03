import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/shared/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gedangsari.vercel.app"),
  title: {
    default: "Padukuhan Gedangsari",
    template: "%s | Padukuhan Gedangsari",
  },
  description:
    "Website profil Padukuhan Gedangsari untuk informasi penduduk, UMKM, dokumentasi kegiatan, video profil, dan kontak padukuhan.",
  openGraph: {
    title: "Padukuhan Gedangsari",
    description:
      "Media informasi digital Padukuhan Gedangsari yang bersih, modern, dan mudah dikelola.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Padukuhan Gedangsari",
    description:
      "Profil, data penduduk, UMKM, dokumentasi, video, dan kontak Padukuhan Gedangsari.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-white text-zinc-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
