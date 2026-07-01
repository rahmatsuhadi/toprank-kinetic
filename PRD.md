# Product Requirements Document (PRD) - Universitas Amikom Yogyakarta

## 1. Executive Summary

- **Problem Statement**: Perguruan tinggi sulit memetakan dan memanfaatkan kompetensi mahasiswa karena data tersebar, tidak terdokumentasi, serta mahasiswa kurang termotivasi untuk mendokumentasikan keahlian non-akademik mereka secara terstruktur.
- **Proposed Solution**: Membangun Universitas Amikom Yogyakarta sebagai MVP platform digital berbasis gamifikasi. Mahasiswa dapat mengajukan portofolio/sertifikat untuk diverifikasi admin demi mendapatkan poin, bersaing di leaderboard, menukar reward, dan menerima rekomendasi kolaborasi bertenaga Gemini API (Flash).
- **Success Criteria**:
  - **Uptime & Performance**: Kecepatan load dashboard admin dan mahasiswa < 1.5 detik.
  - **Engagement**: Minimal 70% mahasiswa terdaftar aktif memperbarui profil & portofolio.
  - **Verification Speed**: Proses review admin selesai dalam waktu maks 48 jam per pengajuan.
  - **AI Relevance**: Hasil rekomendasi AI (Gemini) mencapai akurasi relevansi >= 80% berdasarkan feedback mahasiswa.

---

## 2. User Experience & Functionality

### User Personas
- **Mahasiswa**: Ingin mendokumentasikan keahlian, bersaing secara sehat lewat gamifikasi, dan mendapatkan peluang kerja/kolaborasi.
- **Administrator (Admin)**: Perwakilan universitas yang mengelola data talenta, memverifikasi portofolio, dan menyediakan reward/opportunity.

### User Stories & Acceptance Criteria

#### Role: Administrator
1. **Login & Logout**
   - *Story*: Sebagai Admin, aku ingin login menggunakan email & password agar bisa mengakses dashboard manajemen.
   - *Acceptance Criteria*:
     - Validasi email berformat benar dan password terenkripsi (bcrypt).
     - Session management aman (JWT/Cookie berbasis HTTP-only).
2. **Dashboard Statistik**
   - *Story*: Sebagai Admin, aku ingin melihat statistik umum agar dapat memantau aktivitas ekosistem mahasiswa secara cepat.
   - *Acceptance Criteria*:
     - Menampilkan total mahasiswa, total skill terdaftar, total proyek mahasiswa, dan jumlah pending verifikasi.
3. **Data Mahasiswa & Search**
   - *Story*: Sebagai Admin, aku ingin mencari mahasiswa berdasarkan skill dan filter poin agar mudah menemukan talenta spesifik.
   - *Acceptance Criteria*:
     - Pencarian responsif dengan delay < 300ms.
     - Filter berdasarkan minimal poin dan kategori keahlian.
4. **Verifikasi Skill & Portfolio**
   - *Story*: Sebagai Admin, aku ingin menyetujui atau menolak pengajuan skill/sertifikat/portofolio agar data yang masuk valid dan memberikan poin sesuai ketentuan.
   - *Acceptance Criteria*:
     - Pengajuan status: `Pending`, `Approved`, `Rejected`.
     - Admin wajib mengisi alasan penolakan jika status `Rejected`.
     - Poin bertambah secara otomatis ke akun mahasiswa setelah status diubah ke `Approved` berdasarkan tipe pengajuan.
5. **Reward Management**
   - *Story*: Sebagai Admin, aku ingin membuat, mengedit, dan menghapus reward katalog agar mahasiswa bisa menukarkan poin mereka.
   - *Acceptance Criteria*:
     - Input field: Judul reward, deskripsi, stok, dan jumlah poin yang dibutuhkan.
6. **Posting Opportunity**
   - *Story*: Sebagai Admin, aku ingin mempublikasikan opportunity (lomba, proyek internal, freelance) agar mahasiswa bisa mendaftar.
   - *Acceptance Criteria*:
     - Input field: Judul, deskripsi proyek, kebutuhan skill, dan deadline.

#### Role: Mahasiswa
1. **Login & Logout**
   - *Story*: Sebagai Mahasiswa, aku ingin login menggunakan NIM (format: `XX.XX.XXXX`) atau Email beserta password agar bisa mengakses profil.
   - *Acceptance Criteria*:
     - Input NIM divalidasi dengan regex pola NIM kampus atau email terdaftar.
2. **Talent Profile**
   - *Story*: Sebagai Mahasiswa, aku ingin melengkapi profil agar portofolio ku terlihat profesional bagi pencari talenta.
   - *Acceptance Criteria*:
     - Input field: Foto profil, bio, link sosial media/github, dan total akumulasi poin saat ini.
3. **Skill & Portfolio Management**
   - *Story*: Sebagai Mahasiswa, aku ingin mengunggah sertifikat/proyek portofolio agar bisa ditinjau oleh admin untuk mendapatkan poin.
   - *Acceptance Criteria*:
     - Upload bukti berupa link URL atau file PDF/Gambar (maksimal 5MB).
     - Menentukan jenis tingkat sertifikat (Lokal, Regional, Nasional, Internasional) atau portofolio (Personal, Freelance, Industri).
4. **Leaderboard**
   - *Story*: Sebagai Mahasiswa, aku ingin melihat peringkat berdasarkan poin tertinggi agar termotivasi meningkatkan portofolio.
   - *Acceptance Criteria*:
     - Menampilkan daftar 50 besar mahasiswa dengan poin tertinggi.
     - Posisi peringkat diri sendiri (jika di luar 50 besar) harus tetap terlihat di bagian bawah.
5. **Reward Catalog & Claim**
   - *Story*: Sebagai Mahasiswa, aku ingin menukarkan poin dengan voucher/reward yang tersedia.
   - *Acceptance Criteria*:
     - Poin terpotong otomatis saat claim sukses.
     - Validasi stok reward (tidak bisa di-claim jika stok 0 atau poin kurang).
6. **AI Recommendation (Gemini API - Flash)**
   - *Story*: Sebagai Mahasiswa, aku ingin mendapatkan rekomendasi proyek atau opportunity berdasarkan skill set di profilku.
   - *Acceptance Criteria*:
     - Tombol "Generate Rekomendasi" memicu request ke Gemini Flash.
     - Output menampilkan daftar opportunity terposting yang paling cocok beserta alasannya.

### Non-Goals
- Tidak menangani pembayaran cash untuk claim reward (sistem hanya melayani potong poin).
- Tidak memproses pembuatan sertifikat secara otomatis di dalam platform.

---

## 3. AI System Requirements

### Tool Requirements
- **LLM Engine**: Gemini 1.5 Flash (via `@google/generative-ai` SDK).
- **Inputs**: Data skill mahasiswa, detail portofolio terverifikasi, dan daftar active opportunities.
- **System Prompt**: Terstruktur untuk mengembalikan output format JSON (opportunity ID, matching score, dan penjelasan rekomendasi singkat).

### Evaluation Strategy
- Menguji output AI menggunakan 20 skenario profil mahasiswa berbeda untuk memastikan tidak ada rekomendasi opportunity yang menyimpang jauh dari skill set (Akurasi kecocokan >= 80%).

---

## 4. Technical Specifications

### Architecture Overview
- **Framework**: Next.js (App Router)
- **Database**: PostgreSQL (dijalankan via Docker Compose)
- **ORM**: Drizzle ORM
- **State & Action**: Server Actions untuk transaksi data & verifikasi.

```text
Mahasiswa / Admin (Browser)
       │ (Next.js Server Actions)
       ▼
Next.js Server
 ├── Auth (Better Auth)
 ├── Drizzle ORM <──> PostgreSQL (Docker)
 └── Gemini API (Flash) ──> Rekomendasi Opportunity
```

### Folder Structure (Hybrid Feature-Based & Atomic Design)
Struktur direktori project diatur sebagai berikut untuk memisahkan logic, UI murni, serta membagi komponen kompleks berdasarkan fitur/domain bisnis menggunakan custom Vanilla CSS:

```text
src/
├── app/                         # Next.js App Router (Routing & Server-side Data Fetching)
│   ├── (auth)/                  # Route Group untuk Autentikasi
│   │   ├── login/
│   │   │   └── page.tsx         # Mengimpor Template/Organism Login
│   │   └── register/
│   │       └── page.tsx
│   ├── admin/                   # Dashboard Administrator
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── verifikasi/
│   │       └── page.tsx         # Mengambil data antrean submisi, pass ke Organism
│   ├── mahasiswa/               # Dashboard Mahasiswa
│   │   ├── profil/
│   │   │   └── page.tsx
│   │   └── leaderboard/
│   │       └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/                  # UI Components (Atomic Design Pattern Murni)
│   ├── atoms/                   # Komponen fundamental/terkecil (tanpa dependensi luar)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Badge.tsx
│   ├── molecules/               # Gabungan beberapa atoms (reusable, stateless)
│   │   ├── FormField.tsx        # Gabungan Label + Input + Error Message
│   │   └── StatCard.tsx         # Card untuk menampilkan statistik dashboard
│   ├── organisms/               # Komponen kompleks yang memegang state / berinteraksi dengan API
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── SubmissionTable.tsx  # Tabel antrean verifikasi untuk admin
│   │   ├── LeaderboardTable.tsx # Tabel peringkat mahasiswa
│   │   ├── RewardGrid.tsx       # Grid untuk katalog reward mahasiswa
│   │   └── RecommendationList.tsx # Komponen rekomendasi AI Gemini
│   └── templates/               # Struktur tata letak halaman global (jika diperlukan spesifik per-role)
│       ├── AdminDashboardLayout.tsx
│       └── StudentDashboardLayout.tsx
├── config/                      # Pengaturan statis & aturan bisnis aplikasi
│   └── point-rules.ts           # Defisini poin dinamis (LOCAL, NATIONAL, dll)
├── db/                          # Drizzle ORM Configuration
│   ├── index.ts                 # Klien koneksi PostgreSQL Pool
│   └── schema.ts                # Single-table Submissions & Ledger Schema
├── hooks/                       # Custom React Hooks untuk client-side state/fetching
│   └── use-opportunity.ts
├── lib/                         # Inisialisasi pihak ketiga & utilitas global
│   ├── auth.ts                  # Server-side Better Auth setup
│   ├── auth-client.ts           # Client-side Better Auth client
│   └── gemini.ts                # Gemini API Client & Embedding Helpers
└── actions/                     # SERVER ACTIONS (Data Access Layer / Logika Bisnis Utama)
    ├── auth.ts                  # Logika register/logout manual jika diperlukan
    ├── submissions.ts           # CRUD pengajuan mahasiswa & verifikasi admin (Ledger Transaction)
    ├── rewards.ts               # Logika penambahan reward & claim voucher
    └── ai.ts                    # Server action untuk trigger Gemini vector search
```

### Integration Points
- **Database**: Port `5432` postgres container.
- **Gemini API**: Endpoint resmi Google AI menggunakan API Key dari `.env.local`.

### Database Schema (Drizzle ORM)
Berikut adalah rancangan tabel database relasional menggunakan Drizzle ORM yang terintegrasi dengan Better Auth:

```typescript
import { pgTable, serial, text, integer, timestamp, pgEnum, boolean } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'mahasiswa']);
export const submissionStatusEnum = pgEnum('submission_status', ['pending', 'approved', 'rejected']);
export const submissionTypeEnum = pgEnum('submission_type', ['skill', 'portfolio', 'certificate']);
export const claimStatusEnum = pgEnum('claim_status', ['pending', 'claimed']);

// Better Auth - User Table (dengan Custom Fields)
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  // Custom Fields untuk Universitas Amikom Yogyakarta
  nim: text('nim').unique(), // NULL untuk admin
  role: roleEnum('role').default('mahasiswa').notNull(),
  bio: text('bio'),
  totalPoints: integer('total_points').default(0).notNull(),
});

// Better Auth - Session Table
export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id)
});

// Better Auth - Account Table
export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  expiresAt: timestamp('expires_at'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

// Better Auth - Verification Table
export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at')
});

// App / Business Tables
export const submissions = pgTable('submissions', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => user.id).notNull(),
  type: submissionTypeEnum('type').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  proofUrl: text('proof_url').notNull(),
  status: submissionStatusEnum('status').default('pending').notNull(),
  rejectionReason: text('rejection_reason'),
  pointsAwarded: integer('points_awarded').default(0).notNull(),
  verifiedBy: text('verified_by').references(() => user.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const rewards = pgTable('rewards', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  pointsCost: integer('points_cost').notNull(),
  stock: integer('stock').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const claims = pgTable('claims', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => user.id).notNull(),
  rewardId: integer('reward_id').references(() => rewards.id).notNull(),
  pointsSpent: integer('points_spent').notNull(),
  status: claimStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const opportunities = pgTable('opportunities', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  requiredSkills: text('required_skills').notNull(), // Menyimpan comma-separated skill set
  createdAt: timestamp('created_at').defaultNow().notNull()
});
```

### Security & Privacy
- Password wajib di-hash menggunakan Argon2id atau bcrypt sebelum masuk database.
- Database access credential disimpan aman di `.env` file (tidak masuk git repository).

---

## 5. Risks & Roadmap

### Phased Rollout
- **Phase 1 (MVP)**: Auth, Manajemen Profil, Pengajuan Skill & Portofolio, Verifikasi Admin, Leaderboard manual.
- **Phase 2 (v1.1)**: Reward Catalog, Claim Reward, dan integrasi Gemini API Flash untuk rekomendasi.
- **Phase 3 (v2.0)**: Notifikasi email, integrasi API SSO Universitas asli.

### Technical Risks
- **Gemini API Rate Limits**: Solusi dengan mekanisme caching hasil rekomendasi mahasiswa selama 24 jam agar tidak trigger API berulang kali.
- **Docker Volume Data Loss**: Wajib menyertakan persistent volume mounting untuk PostgreSQL di `docker-compose.yml`.
