import { z } from "zod";

const requiredText = (label: string) => z.string().trim().min(1, `${label} wajib diisi.`);
const optionalUrlText = (label: string) =>
  z.string().trim().min(1, `${label} wajib diisi.`);
const nonNegativeNumber = (label: string) =>
  z.number().int(`${label} harus berupa angka bulat.`).min(0, `${label} tidak boleh negatif.`);

export const umkmSchema = z.object({
  nama: requiredText("Nama UMKM"),
  kategori: requiredText("Kategori"),
  pemilik: requiredText("Nama pemilik"),
  whatsapp: requiredText("Nomor WhatsApp"),
  maps: optionalUrlText("Link Google Maps"),
  foto: optionalUrlText("Foto"),
  deskripsi: requiredText("Deskripsi"),
  jamBuka: requiredText("Jam buka"),
});

export const dokumentasiSchema = z.object({
  judul: requiredText("Judul"),
  tanggal: requiredText("Tanggal"),
  foto: optionalUrlText("Foto"),
  deskripsi: requiredText("Deskripsi"),
});

export const profilSchema = z.object({
  sejarah: requiredText("Sejarah"),
  visi: requiredText("Visi"),
  misi: requiredText("Misi"),
  geografis: requiredText("Letak geografis"),
  luas: requiredText("Luas wilayah"),
  ketinggian: requiredText("Ketinggian"),
  maps: optionalUrlText("Embed Google Maps"),
  struktur: z
    .array(
      z.object({
        jabatan: requiredText("Jabatan"),
        nama: requiredText("Nama pengurus"),
      }),
    )
    .length(10, "Struktur organisasi harus berisi 10 pengurus."),
});

export const pendudukSchema = z.object({
  tahun: nonNegativeNumber("Tahun"),
  jumlahPenduduk: nonNegativeNumber("Jumlah penduduk"),
  lakiLaki: nonNegativeNumber("Laki-laki"),
  perempuan: nonNegativeNumber("Perempuan"),
  kk: nonNegativeNumber("Jumlah Kartu Keluarga"),
  rt: nonNegativeNumber("Jumlah RT"),
  rw: nonNegativeNumber("Jumlah RW"),
  lakiLakiUsia0_19: nonNegativeNumber("Laki-laki usia 0-19"),
  lakiLakiUsia20_59: nonNegativeNumber("Laki-laki usia 20-59"),
  lakiLakiUsia60Plus: nonNegativeNumber("Laki-laki usia 60+"),
  perempuanUsia0_19: nonNegativeNumber("Perempuan usia 0-19"),
  perempuanUsia20_59: nonNegativeNumber("Perempuan usia 20-59"),
  perempuanUsia60Plus: nonNegativeNumber("Perempuan usia 60+"),
});

export const videoSchema = z.object({
  judul: requiredText("Judul video"),
  youtubeUrl: requiredText("URL YouTube"),
  deskripsi: requiredText("Deskripsi"),
});

export const kontakSchema = z.object({
  namaPadukuhan: requiredText("Nama padukuhan"),
  alamat: requiredText("Alamat"),
  telepon: requiredText("Telepon"),
  whatsapp: requiredText("WhatsApp"),
  email: z.string().trim().email("Email tidak valid."),
  maps: optionalUrlText("Embed Google Maps"),
  jamPelayanan: requiredText("Jam pelayanan"),
});

export type UMKMFormValues = z.infer<typeof umkmSchema>;
export type DokumentasiFormValues = z.infer<typeof dokumentasiSchema>;
export type ProfilFormValues = z.infer<typeof profilSchema>;
export type PendudukFormValues = z.infer<typeof pendudukSchema>;
export type VideoFormValues = z.infer<typeof videoSchema>;
export type KontakFormValues = z.infer<typeof kontakSchema>;
