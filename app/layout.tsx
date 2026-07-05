import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "Padukuhan Tamansari",
    template: "%s | Padukuhan Tamansari",
  },
  description:
    "Website profil Padukuhan Tamansari, Watugajah, Gedangsari, Gunungkidul untuk informasi penduduk, UMKM, dokumentasi kegiatan, video profil, dan kontak padukuhan.",
  openGraph: {
    title: "Padukuhan Tamansari",
    description:
      "Media informasi digital Padukuhan Tamansari, Watugajah, Gedangsari, Gunungkidul yang bersih, modern, dan mudah dikelola.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Padukuhan Tamansari",
    description:
      "Profil, data penduduk, UMKM, dokumentasi, video, dan kontak Padukuhan Tamansari.",
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
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-white text-slate-950">
        {children}
      </body>
    </html>
  );
}
