import type {
  Dokumentasi,
  KontakPadukuhan,
  Penduduk,
  ProfilPadukuhan,
  UMKM,
  VideoProfil,
} from "@/types";

const tamansariMapsEmbedUrl =
  "https://www.google.com/maps?q=-7.8045719,110.5831436&z=17&output=embed";

const tamansariMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=-7.8045719,110.5831436";

export const profilMock: ProfilPadukuhan = {
  id: "profil-tamansari",
  sejarah:
    "Padukuhan Tamansari tumbuh sebagai wilayah yang menjaga nilai gotong royong, pertanian, dan kehidupan sosial masyarakat pedesaan. Website ini menjadi ruang informasi bersama agar profil, potensi, dan kegiatan padukuhan dapat diakses lebih luas.",
  visi: "Terwujudnya Padukuhan Tamansari yang rukun, mandiri, tertata, dan terbuka terhadap perkembangan digital.",
  misi: [
    "Meningkatkan pelayanan informasi padukuhan secara mudah dan transparan.",
    "Mendukung promosi UMKM serta potensi lokal masyarakat.",
    "Mengarsipkan kegiatan padukuhan secara rapi dan berkelanjutan.",
    "Menjaga budaya gotong royong dan kepedulian antarwarga.",
  ],
  geografis:
    "Tamansari berada di Kalurahan Watugajah, Kapanewon Gedangsari, Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta, dengan lingkungan permukiman, lahan pertanian, dan akses jalan penghubung antarwilayah.",
  luas: "Data luas wilayah dapat diperbarui melalui dashboard admin.",
  ketinggian: "Data ketinggian dapat diperbarui melalui dashboard admin.",
  utara: "Wilayah padukuhan sekitar",
  selatan: "Wilayah padukuhan sekitar",
  timur: "Wilayah padukuhan sekitar",
  barat: "Wilayah padukuhan sekitar",
  maps: tamansariMapsEmbedUrl,
  struktur: [
    { jabatan: "Kepala Dukuh", nama: "Nama Kepala Dukuh" },
    { jabatan: "Sekretaris", nama: "Nama Sekretaris" },
    { jabatan: "Bendahara", nama: "Nama Bendahara" },
    { jabatan: "Ketua RT", nama: "Perwakilan RT" },
  ],
};

export const pendudukMock: Penduduk = {
  tahun: 2026,
  jumlahPenduduk: 1248,
  lakiLaki: 622,
  perempuan: 626,
  kk: 386,
  rt: 6,
  rw: 2,
  lakiLakiUsia0_19: 82,
  lakiLakiUsia20_59: 140,
  lakiLakiUsia60Plus: 58,
  perempuanUsia0_19: 57,
  perempuanUsia20_59: 124,
  perempuanUsia60Plus: 79,
};

export const videoMock: VideoProfil = {
  id: "video-profil",
  judul: "Video Profil Padukuhan Tamansari",
  youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  deskripsi:
    "Video profil resmi dapat diperbarui dari dashboard admin setelah tautan YouTube tersedia.",
  tanggalPublikasi: "2026-07-03",
};

export const kontakMock: KontakPadukuhan = {
  namaPadukuhan: "Padukuhan Tamansari",
  alamat: "Tamansari, Watugajah, Gedangsari, Gunungkidul, Daerah Istimewa Yogyakarta",
  telepon: "0274-000000",
  whatsapp: "081234567890",
  email: "kkntamansari@gmail.com",
  maps: tamansariMapsEmbedUrl,
  jamPelayanan: "Senin - Jumat, 08.00 - 15.00 WIB",
  mediaSosial: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
};

export const umkmMock: UMKM[] = [
  {
    id: "umkm-1",
    nama: "Keripik Singkong Sari Rasa",
    kategori: "Kuliner",
    pemilik: "Ibu Sari",
    deskripsi:
      "Olahan keripik singkong rumahan dengan beberapa varian rasa untuk oleh-oleh.",
    whatsapp: "081234567801",
    maps: tamansariMapsUrl,
    foto: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-06-28T08:00:00.000Z",
    jamBuka: "08.00 - 17.00 WIB",
  },
  {
    id: "umkm-2",
    nama: "Madu Tani Tamansari",
    kategori: "Agribisnis",
    pemilik: "Bapak Warto",
    deskripsi:
      "Madu lokal hasil budidaya lebah masyarakat dengan pengemasan sederhana.",
    whatsapp: "081234567802",
    maps: tamansariMapsUrl,
    foto: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-06-26T08:00:00.000Z",
    jamBuka: "08.00 - 16.00 WIB",
  },
  {
    id: "umkm-3",
    nama: "Batik Tulis Lestari",
    kategori: "Kerajinan",
    pemilik: "Ibu Rini",
    deskripsi:
      "Produk kain dan aksesori batik tulis dengan motif yang terinspirasi alam sekitar.",
    whatsapp: "081234567803",
    maps: tamansariMapsUrl,
    foto: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-06-22T08:00:00.000Z",
    jamBuka: "09.00 - 17.00 WIB",
  },
  {
    id: "umkm-4",
    nama: "Bibit Buah Makmur",
    kategori: "Pertanian",
    pemilik: "Bapak Danu",
    deskripsi:
      "Penyedia bibit buah dan tanaman pekarangan untuk kebutuhan warga sekitar.",
    whatsapp: "081234567804",
    maps: tamansariMapsUrl,
    foto: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-06-18T08:00:00.000Z",
    jamBuka: "07.00 - 16.00 WIB",
  },
];

export const dokumentasiMock: Dokumentasi[] = [
  {
    id: "doc-1",
    judul: "Kerja Bakti Lingkungan",
    tanggal: "2026-06-30",
    deskripsi:
      "Warga bersama-sama membersihkan lingkungan dan memperbaiki akses jalan kecil.",
    foto: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-06-30T08:00:00.000Z",
  },
  {
    id: "doc-2",
    judul: "Pendataan UMKM",
    tanggal: "2026-06-25",
    deskripsi:
      "Tim KKN melakukan pendataan potensi usaha masyarakat untuk profil digital padukuhan.",
    foto: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-06-25T08:00:00.000Z",
  },
  {
    id: "doc-3",
    judul: "Rapat Koordinasi Warga",
    tanggal: "2026-06-19",
    deskripsi:
      "Koordinasi perangkat padukuhan dan warga untuk menyusun agenda kegiatan.",
    foto: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    createdAt: "2026-06-19T08:00:00.000Z",
  },
];
