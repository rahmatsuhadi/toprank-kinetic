# University Talent Hub 🚀

**University Talent Hub** adalah platform digital berbasis gamifikasi (MVP) yang dirancang untuk memetakan, mendokumentasikan, dan mempromosikan kompetensi akademik maupun non-akademik mahasiswa secara terstruktur. 

Mahasiswa dapat mengajukan portofolio, keahlian (*skill*), atau sertifikat untuk diverifikasi oleh Admin. Setiap pengajuan yang disetujui akan menghasilkan poin yang dapat meningkatkan peringkat mereka di *Leaderboard*, serta dapat ditukarkan dengan berbagai *reward* menarik di katalog.

---

## 🛠️ Tech Stack

Aplikasi ini dibangun menggunakan teknologi modern:
- **Framework**: [Next.js 16 (Turbopack, App Router)](https://nextjs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Autentikasi**: [Better Auth](https://www.better-auth.com/)
- **Styling**: Tailwind CSS & Custom Vanilla CSS (mengikuti pola *Atomic Design*: Atoms, Molecules, Organisms, Templates)
- **Linter & Formatter**: [Biome](https://biomejs.dev/)
- **Containerization**: [Docker & Docker Compose](https://www.docker.com/)

---

## ⚙️ Persyaratan Sistem

Pastikan perangkat kamu sudah terinstal:
- [Node.js v22+](https://nodejs.org/)
- [pnpm v10+](https://pnpm.io/)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)

---

## 🚀 Cara Menjalankan Aplikasi

Pilih salah satu metode di bawah ini untuk menjalankan aplikasi:

### Opsi A: Menjalankan via Docker & Docker Compose (Paling Mudah)

Metode ini akan menjalankan Next.js app dan PostgreSQL secara kontainerisasi penuh tanpa perlu menginstal Node/pnpm lokal.

1. **Salin Environment Variables**
   ```bash
   cp .env.example .env
   ```
   *Catatan: Nilai default di `.env.example` sudah disesuaikan agar bisa langsung terhubung antar kontainer Docker.*

2. **Jalankan Docker Compose**
   Jalankan seluruh layanan (Next.js, database, migrasi skema, dan seeding data awal) secara otomatis dalam satu perintah:
   ```bash
   docker compose up -d --build
   ```
   *Catatan: Pada saat startup pertama kali, kontainer `web` akan menunggu database siap, kemudian otomatis menjalankan `db:push` dan `db:seed`. Jika database sudah terisi di kemudian hari, seeding akan dilewati otomatis.*

3. **Akses Aplikasi**
   Buka [http://localhost:3000](http://localhost:3000) di browsermu.

---

### Opsi B: Menjalankan via pnpm (Pengembangan Lokal)

Metode ini cocok jika kamu ingin melakukan *live coding* atau pengembangan aktif secara lokal.

1. **Salin Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Buka file `.env.local` dan ubah host `postgres` di `DATABASE_URL` menjadi `localhost`:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/toprank
   ```

2. **Jalankan Database PostgreSQL saja via Docker**
   ```bash
   docker compose up postgres -d
   ```

3. **Instal Dependensi Lokal**
   ```bash
   pnpm install
   ```

4. **Migrasi & Seed Database**
   ```bash
   # Sinkronisasi skema database
   pnpm run db:push
   
   # Jalankan seeding data
   pnpm run db:seed
   ```

5. **Jalankan Development Server**
   ```bash
   pnpm run dev
   ```
   Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

---

## 🔑 Akun Demo untuk Pengujian

Gunakan akun berikut yang sudah disediakan oleh sistem *seeding* untuk mencoba fitur di dalam aplikasi (semua password bernilai `password123` kecuali Admin):

### 1. Administrator (Admin)
Akses penuh untuk memverifikasi submisi mahasiswa, mengelola reward, dan memposting opportunity baru.
- **Email**: `admin@kinetic.ac.id`
- **Password**: `admin123`

### 2. Mahasiswa (Student)
Bisa melengkapi profil, mengajukan sertifikat/portofolio, melihat leaderboard, dan menukar reward.
- **Akun 1 (Budi Santoso)**
  - **Email**: `budi.santoso@student.ac.id`
  - **NIM**: `22.11.4561`
  - **Password**: `password123`
- **Akun 2 (Clara Wijaya)**
  - **Email**: `clara.wijaya@student.ac.id`
  - **NIM**: `22.11.4562`
  - **Password**: `password123`
- **Akun 3 (Farhan Ramadhan)**
  - **Email**: `farhan.ramadhan@student.ac.id`
  - **NIM**: `23.11.5120`
  - **Password**: `password123`

---

## 📝 Perintah Tambahan

- **Format & Lint Code (Biome)**:
  ```bash
  pnpm run lint     # Cek kesalahan kode & format
  pnpm run format   # Tulis otomatis perbaikan format
  ```
- **Build Production Lokal**:
  ```bash
  pnpm run build
  pnpm run start
  ```
