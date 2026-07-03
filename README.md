# 🌾 Website Profil Padukuhan Gedangsari

Website Profil Padukuhan merupakan proyek KKN Universitas Atma Jaya Yogyakarta (UAJY) yang bertujuan untuk menyediakan media informasi digital bagi masyarakat, perangkat padukuhan, wisatawan, serta pelaku UMKM.

Website ini dirancang agar mudah digunakan, mudah dikelola setelah program KKN selesai, dan tidak memerlukan biaya operasional server maupun database.

---

# 📌 Tujuan Proyek

Website digunakan untuk:

* Menampilkan profil padukuhan
* Menampilkan data statistik penduduk
* Menampilkan video profil desa/padukuhan
* Menampilkan dokumentasi kegiatan
* Menampilkan informasi UMKM
* Menyediakan informasi kontak padukuhan
* Memudahkan perangkat padukuhan memperbarui informasi tanpa mengubah kode website

---

# 🎯 Target Pengguna

### Pengunjung Umum

Dapat:

* Melihat profil padukuhan
* Melihat statistik penduduk
* Melihat UMKM
* Melihat dokumentasi kegiatan
* Menonton video profil
* Menghubungi padukuhan

Tidak dapat:

* Mengubah data
* Menambah data
* Menghapus data

---

### Admin

Admin merupakan perangkat padukuhan atau tim KKN yang memiliki akses pengelolaan data.

Admin dapat:

* Login menggunakan akun Google
* Menambah UMKM
* Mengubah UMKM
* Menghapus UMKM
* Menambah dokumentasi
* Mengubah dokumentasi
* Menghapus dokumentasi
* Mengubah data penduduk
* Mengubah video profil
* Mengubah informasi kontak

---

# 🔐 Akun Admin

Hanya akun Google berikut yang boleh mengakses dashboard admin:

```text
kknuajygedangsari@gmail.com
```

Apabila email login tidak sesuai:

```text
Akses Ditolak
Anda tidak memiliki izin untuk mengakses halaman admin.
```

---

# 🏗 Arsitektur Sistem

Website tidak menggunakan database.

Seluruh data disimpan menggunakan Google Sheets.

```text
                    Website Next.js
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
   Pengunjung                            Admin
        │                                     │
        │                               Login Google
        │                                     │
        │                            Dashboard Admin
        │                                     │
        ▼                                     ▼
 Menampilkan Data                     Kelola Data
        │                                     │
        └──────────────┬──────────────────────┘
                       ▼
              Google Apps Script API
                       ▼
                 Google Sheets
```

---

# 🚫 Database

Jangan menggunakan:

* MySQL
* PostgreSQL
* MongoDB
* Firebase
* Supabase
* Prisma
* SQLite

Seluruh data harus menggunakan:

* Google Sheets
* Google Apps Script

---

# 🛠 Tech Stack

Framework:

* Next.js 15+
* App Router
* TypeScript

Styling:

* Tailwind CSS

Authentication:

* Email + Password Admin
* HTTP Only Cookie Session
* JWT dengan jose

Hosting:

* Vercel

Storage:

* Google Sheets

API:

* Google Apps Script

Maps:

* Google Maps Embed

Video:

* YouTube Embed

Icons:

* Lucide React

---

# 🎨 Desain Website

Tema visual:

* Modern
* Bersih
* Profesional
* Mudah digunakan perangkat desa

Warna utama:

```css
Primary:
#16A34A

Secondary:
#22C55E

Background:
#FFFFFF

Gray:
#F5F5F5
```

---

# 📱 Responsiveness

Website wajib mendukung:

* Mobile
* Tablet
* Desktop

Pendekatan:

```text
Mobile First
```

---

# 🏠 Halaman Beranda

Tujuan:

Memberikan gambaran singkat mengenai padukuhan.

Komponen:

## Hero Section

Berisi:

* Nama Padukuhan
* Foto utama
* Tagline
* Tombol lihat profil

---

## Statistik Singkat

Menampilkan:

* Jumlah Penduduk
* Jumlah KK
* Jumlah UMKM
* Jumlah Dokumentasi

---

## Preview UMKM

Menampilkan 3 sampai 6 UMKM terbaru.

Tombol:

```text
Lihat Semua UMKM
```

---

## Preview Dokumentasi

Menampilkan dokumentasi terbaru.

Tombol:

```text
Lihat Semua Dokumentasi
```

---

## Video Profil

Preview video profil.

Tombol:

```text
Tonton Video Profil
```

---

# 👥 Halaman Profil Padukuhan

Menampilkan:

## Sejarah

Deskripsi sejarah padukuhan.

---

## Visi

Visi padukuhan.

---

## Misi

Daftar misi padukuhan.

---

## Struktur Organisasi

Menampilkan:

* Kepala Dukuh
* Sekretaris
* Bendahara
* Struktur lainnya

---

## Geografis

Menampilkan:

* Luas wilayah
* Ketinggian
* Letak geografis

---

## Batas Wilayah

Menampilkan:

* Utara
* Selatan
* Timur
* Barat

---

## Lokasi

Menampilkan Google Maps Embed.

---

# 📊 Halaman Data Penduduk

Menampilkan data statistik.

Jangan menampilkan data pribadi warga.

Data yang ditampilkan:

* Jumlah Penduduk
* Laki-laki
* Perempuan
* Jumlah KK
* Jumlah RT
* Jumlah RW

Data diambil dari Google Sheets.

Tampilkan menggunakan:

* Statistic Cards
* Progress Visualization
* Ringkasan Penduduk

---

# 🎥 Halaman Video Profil

Menampilkan:

* Video YouTube
* Judul
* Deskripsi
* Tanggal publikasi

Video berasal dari Google Sheets.

---

# 📞 Halaman Kontak

Menampilkan:

* Alamat
* Telepon
* WhatsApp
* Email
* Jam Pelayanan
* Google Maps

Tambahkan tombol:

```text
Hubungi via WhatsApp
```

yang langsung membuka WhatsApp.


# 🔐 Dashboard Admin

Dashboard Admin digunakan oleh perangkat padukuhan atau tim KKN untuk mengelola seluruh data website.

Dashboard hanya dapat diakses setelah login menggunakan email dan password admin yang disimpan pada Environment Variables.

## URL

```text
/admin
```

---

# Authentication

Gunakan login sederhana menggunakan **Email + Password**.

Email dan password admin disimpan pada file `.env.local`.

Contoh:

```env
ADMIN_EMAIL=kknuajygedangsari@gmail.com
ADMIN_PASSWORD=passwordku
```

Apabila email atau password tidak sesuai:

* Tolak proses login
* Return Unauthorized
* Tetap berada di halaman `/admin/login`
* Tampilkan pesan:

```text
Email atau password salah.
```

---

# Dashboard Menu

Sidebar Dashboard terdiri dari:

```text
Dashboard

Profil Padukuhan

Data Penduduk

Video Profil

UMKM

Dokumentasi

Kontak

Logout
```

Dashboard menggunakan layout terpisah dari halaman publik.

---

# Dashboard Home

Tampilkan ringkasan informasi:

* Total UMKM
* Total Dokumentasi
* Jumlah Penduduk
* Jumlah KK
* Video Profil Aktif
* Terakhir diperbarui

---

# Manajemen Profil Padukuhan

Admin dapat mengubah:

* Sejarah
* Visi
* Misi
* Letak Geografis
* Luas Wilayah
* Batas Wilayah
* Struktur Organisasi
* Embed Google Maps

Semua data disimpan pada Google Sheets.

---

# Manajemen Data Penduduk

Form:

* Tahun
* Jumlah Penduduk
* Laki-laki
* Perempuan
* Jumlah KK
* Jumlah RT
* Jumlah RW

Tombol:

```text
Simpan Perubahan
```

Website mengirim data ke Google Apps Script menggunakan metode POST atau PUT.

---

# Manajemen Video Profil

Field:

* Judul Video
* URL YouTube
* Deskripsi

Website harus melakukan validasi bahwa URL berasal dari YouTube.

Video ditampilkan menggunakan YouTube Embed.

---

# Manajemen Kontak

Field:

* Nama Padukuhan
* Alamat
* Telepon
* WhatsApp
* Email
* Jam Pelayanan
* Embed Google Maps

---

# Manajemen UMKM

Halaman menampilkan tabel.

Kolom:

* Foto
* Nama
* Kategori
* Pemilik
* WhatsApp
* Aksi

Aksi:

* Tambah
* Edit
* Hapus

---

# Form Tambah UMKM

Field:

* Nama UMKM
* Kategori
* Nama Pemilik
* Deskripsi
* Nomor WhatsApp
* Link Google Maps
* Upload Foto

Validasi:

* Semua field wajib diisi.
* Nomor WhatsApp harus valid.
* Link Google Maps harus berupa URL.

---

# Manajemen Dokumentasi

Tabel:

* Foto
* Judul
* Tanggal
* Deskripsi
* Aksi

Aksi:

* Tambah
* Edit
* Hapus

---

# Form Dokumentasi

Field:

* Judul
* Tanggal
* Deskripsi
* Upload Foto

---

# Upload Gambar

Gunakan Google Drive sebagai penyimpanan gambar.

Alur:

```text
Admin
    │
Upload Gambar
    │
Google Apps Script
    │
Google Drive
    │
Link Gambar
    │
Google Sheets
    │
Website
```

Website hanya menyimpan URL gambar yang berasal dari Google Drive.

---

# Google Sheets

Gunakan satu Spreadsheet dengan beberapa Sheet.

---

## Sheet Profil

| id | sejarah | visi | misi | geografis | luas | utara | selatan | timur | barat | maps |

---

## Sheet Penduduk

| tahun | jumlah_penduduk | laki_laki | perempuan | kk | rt | rw |

---

## Sheet Video

| id | judul | youtube_url | deskripsi |

---

## Sheet Kontak

| nama_padukuhan | alamat | telepon | whatsapp | email | maps | jam_pelayanan |

---

## Sheet UMKM

| id | nama | kategori | pemilik | deskripsi | whatsapp | maps | foto | created_at |

---

## Sheet Dokumentasi

| id | judul | tanggal | deskripsi | foto | created_at |

---

# Google Apps Script

Google Apps Script berfungsi sebagai REST API.

Semua komunikasi website dilakukan melalui Apps Script.

---

# Endpoint

## GET Profil

```text
GET /api/profil
```

---

## GET Penduduk

```text
GET /api/penduduk
```

---

## GET Video

```text
GET /api/video
```

---

## GET Kontak

```text
GET /api/kontak
```

---

## GET UMKM

```text
GET /api/umkm
```

---

## GET Dokumentasi

```text
GET /api/dokumentasi
```

---

## POST UMKM

```text
POST /api/umkm
```

---

## PUT UMKM

```text
PUT /api/umkm/:id
```

---

## DELETE UMKM

```text
DELETE /api/umkm/:id
```

---

## POST Dokumentasi

```text
POST /api/dokumentasi
```

---

## PUT Dokumentasi

```text
PUT /api/dokumentasi/:id
```

---

## DELETE Dokumentasi

```text
DELETE /api/dokumentasi/:id
```

---

## PUT Penduduk

```text
PUT /api/penduduk
```

---

## PUT Profil

```text
PUT /api/profil
```

---

## PUT Kontak

```text
PUT /api/kontak
```

---

## PUT Video

```text
PUT /api/video
```

---

# Format Response API

Semua endpoint mengembalikan JSON.

Contoh:

```json
{
  "success": true,
  "message": "Data berhasil diperbarui",
  "data": {}
}
```

---

# Struktur Folder

```text
app/
│
├── (public)
│   ├── page.tsx
│   ├── profil
│   ├── penduduk
│   ├── umkm
│   ├── dokumentasi
│   ├── video
│   └── kontak
│
├── admin
│   ├── dashboard
│   ├── profil
│   ├── penduduk
│   ├── umkm
│   ├── dokumentasi
│   ├── video
│   └── kontak
│
components/
│
├── ui
├── layout
├── cards
├── tables
├── forms
├── charts
└── shared
│
services/
│
├── profil.service.ts
├── penduduk.service.ts
├── umkm.service.ts
├── dokumentasi.service.ts
├── video.service.ts
└── kontak.service.ts
│
hooks/
│
├── useProfil.ts
├── useUMKM.ts
├── usePenduduk.ts
└── useDokumentasi.ts
│
types/
│
├── profil.ts
├── umkm.ts
├── dokumentasi.ts
├── penduduk.ts
├── video.ts
└── kontak.ts
│
lib/
│
├── auth.ts
├── api.ts
└── utils.ts
│
public/
│
styles/
```

---

# Coding Standard

Seluruh kode harus:

* Menggunakan TypeScript
* Menggunakan reusable components
* Tidak melakukan fetch langsung di komponen
* Semua request API dipisahkan pada folder `services`
* Menggunakan Server Components jika memungkinkan
* Menggunakan Client Components hanya jika diperlukan
* Menggunakan validasi form
* Menggunakan loading state
* Menggunakan error handling
* Menggunakan empty state
* Menggunakan responsive design
* Mudah dipahami oleh mahasiswa yang akan melakukan maintenance setelah proyek KKN selesai.

# 🚀 Deployment

Website akan di-host menggunakan **Vercel**.

## Environment Variables

Buat file `.env.local`

```env
ADMIN_EMAIL=kknuajygedangsari@gmail.com
ADMIN_PASSWORD=passwordku

NEXT_PUBLIC_API_URL=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

# Hosting

Gunakan:

* Vercel

Repository:

GitHub

Deployment harus berjalan otomatis menggunakan GitHub Actions bawaan Vercel.

---

# UI / UX

Website harus memiliki tampilan modern.

Karakteristik:

* Clean
* Minimalis
* Professional
* Responsive
* Fast
* Mudah dipahami masyarakat

---

# Layout

Gunakan layout berikut:

```text
Navbar

Hero

Content

Footer
```

---

# Navbar

Menu:

Beranda

Profil

Penduduk

UMKM

Dokumentasi

Video

Kontak

---

Navbar harus:

* Sticky
* Transparan saat di Hero
* Berubah warna ketika scroll

---

# Hero

Hero berisi:

Foto Padukuhan

Nama Padukuhan

Tagline

Button

"Lihat Profil"

---

# Footer

Footer berisi:

Nama Padukuhan

Alamat

Kontak

Media Sosial

Copyright

---

# Komponen

Semua komponen harus reusable.

Misalnya:

Button

Card

Section Title

Container

Input

Textarea

Select

Modal

Alert

Toast

Loading

Empty State

Pagination

Search Bar

---

# Loading State

Semua request API harus memiliki loading.

Contoh:

Skeleton Card

Skeleton Table

Skeleton Detail

---

# Empty State

Apabila data kosong tampilkan ilustrasi.

Contoh:

Belum ada data UMKM.

Belum ada dokumentasi.

Belum ada video.

---

# Error Handling

Apabila API gagal:

Tampilkan:

"Koneksi gagal.

Silakan coba beberapa saat lagi."

---

# Search

UMKM

Cari berdasarkan:

Nama

Kategori

Pemilik

---

Dokumentasi

Cari berdasarkan:

Judul

Tanggal

---

# Filter

UMKM

Filter:

Kategori

---

Dokumentasi

Filter:

Tahun

---

# Pagination

Gunakan:

Load More

atau

Infinite Scroll

---

# Performance

Optimasi:

* Next Image
* Lazy Loading
* Dynamic Import
* Code Splitting

---

# SEO

Tambahkan:

Metadata

Title

Description

Open Graph

Twitter Card

robots.txt

sitemap.xml

favicon

---

# Accessibility

Gunakan:

Semantic HTML

Alt Image

Aria Label

Keyboard Navigation

Focus State

---

# Security

Jangan pernah expose:

Google Secret

Cloudinary Secret

Admin Email List

Semua disimpan pada Environment Variable.

---

# Google Apps Script

Gunakan pola:

Controller

Service

Helper

Pisahkan fungsi agar mudah dikembangkan.

---

# Struktur Google Drive / Cloudinary

Folder:

```text
Padukuhan/

├── umkm/

├── dokumentasi/

├── profil/
```

---

# Penamaan Gambar

Gunakan UUID.

Contoh:

```text
a81df7a1.jpg
```

---

# Validasi Form

Semua form wajib memiliki validasi.

Contoh:

Nama wajib diisi.

Nomor WhatsApp valid.

URL Maps valid.

URL YouTube valid.

Gambar maksimal 5 MB.

Format gambar:

jpg

jpeg

png

webp

---

# Dashboard

Dashboard Admin memiliki tampilan modern.

Sidebar kiri.

Navbar atas.

Content kanan.

---

Dashboard menampilkan:

Jumlah UMKM

Jumlah Dokumentasi

Jumlah Penduduk

Jumlah KK

Terakhir Update

---

# Activity Log

Tampilkan aktivitas sederhana.

Contoh:

Hari ini:

Tambah UMKM

Edit Penduduk

Tambah Dokumentasi

(Log hanya berasal dari data terbaru Google Sheets, tidak perlu sistem audit lengkap.)

---

# Library

Gunakan:

Tailwind CSS

Auth.js

React Hook Form

Zod

Lucide React

TanStack Query

Framer Motion

React Hot Toast

date-fns

clsx

---

# Coding Convention

Gunakan:

camelCase

PascalCase

kebab-case untuk route

---

Hindari:

any

hardcode

duplicate code

long component

---

# Component Rules

Maksimal satu file component sekitar 200–300 baris.

Apabila lebih:

Pisahkan menjadi component baru.

---

# API Rules

Semua API dipanggil melalui folder:

```text
/services
```

Contoh:

```text
services/

umkm.service.ts

penduduk.service.ts

profil.service.ts

video.service.ts

kontak.service.ts

dokumentasi.service.ts
```

---

# Types

Gunakan TypeScript Interface.

Jangan menggunakan any.

---

# State Management

Gunakan:

TanStack Query

untuk seluruh request API.

---

# Dokumentasi

Setiap folder memiliki README singkat apabila diperlukan.

Berikan komentar hanya pada bagian yang kompleks.

Hindari komentar berlebihan.

---

# Git Convention

Gunakan Conventional Commit.

Contoh:

feat:

fix:

refactor:

style:

docs:

chore:

---

# Roadmap Pengerjaan

Tahap 1

* Setup Next.js
* Tailwind
* Auth
* Layout

Tahap 2

* Halaman Publik

Tahap 3

* Dashboard Admin

Tahap 4

* Google Apps Script

Tahap 5

* Google Sheets

Tahap 6

* Cloudinary Upload

Tahap 7

* Testing

Tahap 8

* Deployment Vercel

---

# Acceptance Criteria

Project dianggap selesai apabila:

✅ Responsive

✅ Berjalan di Vercel

✅ Login Admin berhasil

✅ Hanya akun:

[kknuajygedangsari@gmail.com](mailto:kknuajygedangsari@gmail.com)

yang dapat mengakses dashboard.

✅ Semua data berasal dari Google Sheets.

✅ Semua perubahan admin tersimpan ke Google Sheets.

✅ Website otomatis memperbarui data.

✅ Tidak menggunakan database.

✅ Tidak menggunakan Firebase.

✅ Tidak menggunakan Supabase.

✅ Tidak menggunakan MySQL.

✅ Tidak menggunakan PostgreSQL.

✅ Tidak menggunakan Prisma.

---

# Instruksi untuk Codex

Bertindak sebagai **Senior Full Stack Engineer** yang membangun aplikasi production-ready.

Selalu:

* Menggunakan clean architecture.
* Menggunakan reusable components.
* Menggunakan best practices Next.js 15.
* Menulis kode yang mudah dipahami mahasiswa.
* Menjelaskan keputusan teknis penting.
* Menghindari duplikasi kode.
* Mengutamakan maintainability.
* Menghasilkan kode yang siap di-deploy ke Vercel.

Jika implementasi terlalu besar, kerjakan secara bertahap (milestone), dimulai dari fondasi proyek, kemudian fitur publik, dashboard admin, integrasi Google Apps Script, dan terakhir optimasi serta deployment.
