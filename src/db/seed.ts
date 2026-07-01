import { config } from "dotenv";

config({ path: ".env.local" });

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import {
  account,
  claims,
  opportunities,
  rewards,
  session,
  submissions,
  user,
  verification,
} from "./schema";

const dummyStudents = [
  {
    name: "Budi Santoso",
    email: "budi.santoso@student.ac.id",
    password: "password123",
    nim: "22.11.4561",
    prodi: "Teknik Informatika",
    angkatan: "2022",
    bio: "Web Developer yang suka ngulik React, Next.js, dan Node.js. Punya mimpi bikin startup sendiri. ✨",
    socialLinks: JSON.stringify({
      github: "github.com/budis",
      linkedin: "linkedin.com/in/budis",
    }),
    submissions: [
      {
        type: "skill" as const,
        title: "Frontend Development",
        description:
          "Menguasai pembuatan website interaktif menggunakan React dan Tailwind CSS.",
        proofUrl: "https://github.com/budis/portfolio",
        pointsAwarded: 15,
      },
      {
        type: "portfolio" as const,
        title: "Portal Pengumuman Kampus",
        description:
          "Membangun sistem informasi mading online kampus menggunakan Next.js App Router.",
        proofUrl: "https://github.com/budis/portal-kampus",
        portfolioLevel: "personal" as const,
        pointsAwarded: 25,
      },
      {
        type: "certificate" as const,
        title: "Web Developer Expert",
        description:
          "Sertifikasi keahlian pengembangan aplikasi web dari Dicoding.",
        proofUrl: "https://dicoding.com/certificates/budis",
        certificateName: "Dicoding Certified Web Expert",
        certificateLevel: "nasional" as const,
        pointsAwarded: 30,
      },
    ],
  },
  {
    name: "Clara Wijaya",
    email: "clara.wijaya@student.ac.id",
    password: "password123",
    nim: "22.11.4562",
    prodi: "Sistem Informasi",
    angkatan: "2022",
    bio: "UI/UX Designer yang berfokus pada kemudahan aksesibilitas pengguna. Suka bikin design system di Figma. 🎨",
    socialLinks: JSON.stringify({
      linkedin: "linkedin.com/in/claraw",
      behance: "behance.net/claraw",
    }),
    submissions: [
      {
        type: "skill" as const,
        title: "UI/UX Design",
        description:
          "Mahir merancang wireframe, user flow, dan high-fidelity mockup di Figma.",
        proofUrl: "https://figma.com/@claraw",
        pointsAwarded: 20,
      },
      {
        type: "portfolio" as const,
        title: "Redesign App Perpustakaan Kampus",
        description:
          "Merancang ulang antarmuka aplikasi mobile perpustakaan agar lebih ramah bagi mahasiswa baru.",
        proofUrl: "https://behance.net/gallery/claraw-perpus",
        portfolioLevel: "freelance" as const,
        pointsAwarded: 35,
      },
      {
        type: "certificate" as const,
        title: "Google UX Design Professional",
        description:
          "Program sertifikasi profesional Google UX Design di Coursera.",
        proofUrl: "https://coursera.org/verify/claraw-ux",
        certificateName: "Google UX Design Professional Certificate",
        certificateLevel: "internasional" as const,
        pointsAwarded: 50,
      },
    ],
  },
  {
    name: "Farhan Ramadhan",
    email: "farhan.ramadhan@student.ac.id",
    password: "password123",
    nim: "23.11.5120",
    prodi: "Teknik Informatika",
    angkatan: "2023",
    bio: "Penggemar Python dan pengolahan data. Senang bereksperimen dengan model machine learning sederhana. 🐍",
    socialLinks: JSON.stringify({
      github: "github.com/farhanr",
      linkedin: "linkedin.com/in/farhanr",
    }),
    submissions: [
      {
        type: "skill" as const,
        title: "Python Data Analysis",
        description:
          "Menganalisis dataset menggunakan library Pandas, Numpy, dan Matplotlib.",
        proofUrl: "https://github.com/farhanr/data-analysis",
        pointsAwarded: 15,
      },
      {
        type: "portfolio" as const,
        title: "Prediksi Harga Rumah",
        description:
          "Membuat model regresi linear untuk memprediksi harga rumah berdasarkan luas tanah dan lokasi.",
        proofUrl: "https://github.com/farhanr/house-pricing",
        portfolioLevel: "personal" as const,
        pointsAwarded: 20,
      },
    ],
  },
  {
    name: "Gita Lestari",
    email: "gita.lestari@student.ac.id",
    password: "password123",
    nim: "21.11.3910",
    prodi: "Ilmu Komunikasi",
    angkatan: "2021",
    bio: "Content Writer yang suka menulis esai, artikel teknologi, dan SEO copywriting. ✍️",
    socialLinks: JSON.stringify({
      linkedin: "linkedin.com/in/gitalestari",
      medium: "medium.com/@gitalestari",
    }),
    submissions: [
      {
        type: "skill" as const,
        title: "SEO Copywriting",
        description:
          "Menulis artikel berkualitas tinggi yang dioptimalkan untuk mesin pencari.",
        proofUrl: "https://medium.com/@gitalestari",
        pointsAwarded: 15,
      },
      {
        type: "certificate" as const,
        title: "Sertifikasi Hubspot Inbound Marketing",
        description:
          "Sertifikasi Inbound Marketing resmi dari Hubspot Academy.",
        proofUrl: "https://academy.hubspot.com/certificates/gita",
        certificateName: "Hubspot Inbound Marketing Certified",
        certificateLevel: "internasional" as const,
        pointsAwarded: 40,
      },
    ],
  },
  {
    name: "Hendra Wijaya",
    email: "hendra.wijaya@student.ac.id",
    password: "password123",
    nim: "22.12.4901",
    prodi: "Desain Komunikasi Visual",
    angkatan: "2022",
    bio: "Video Editor & Motion Designer. Bikin konten kreatif dan sinematik adalah jalan ninjaku. 🎬",
    socialLinks: JSON.stringify({
      instagram: "instagram.com/hendraw",
      youtube: "youtube.com/hendraw",
    }),
    submissions: [
      {
        type: "skill" as const,
        title: "Video Editing",
        description:
          "Editing video menggunakan Adobe Premiere Pro dan After Effects.",
        proofUrl: "https://youtube.com/hendraw/portfolio",
        pointsAwarded: 20,
      },
      {
        type: "portfolio" as const,
        title: "Video Profil Jurusan DKV",
        description:
          "Memproduksi video cinematic promosi jurusan DKV untuk kebutuhan pendaftaran mahasiswa baru.",
        proofUrl: "https://youtube.com/watch?v=dkv-profile",
        portfolioLevel: "industri" as const,
        pointsAwarded: 40,
      },
    ],
  },
  {
    name: "Indah Permata",
    email: "indah.permata@student.ac.id",
    password: "password123",
    nim: "23.12.5002",
    prodi: "Sistem Informasi",
    angkatan: "2023",
    bio: "Tertarik dengan Product Management dan Data Analytics. Senang belajar insight bisnis dari data. 📊",
    socialLinks: JSON.stringify({ linkedin: "linkedin.com/in/indahp" }),
    submissions: [
      {
        type: "skill" as const,
        title: "Data Visualization",
        description:
          "Membuat dashboard interaktif menggunakan Tableau dan Google Looker Studio.",
        proofUrl: "https://public.tableau.com/profile/indahp",
        pointsAwarded: 15,
      },
      {
        type: "certificate" as const,
        title: "Junior Data Analyst",
        description: "Sertifikasi profesi analisis data tingkat nasional.",
        proofUrl: "https://bnsp.go.id/cert/indahp",
        certificateName: "Sertifikasi BNSP Junior Data Analyst",
        certificateLevel: "nasional" as const,
        pointsAwarded: 35,
      },
    ],
  },
  {
    name: "Kevin Sanjaya",
    email: "kevin.sanjaya@student.ac.id",
    password: "password123",
    nim: "22.11.4570",
    prodi: "Teknik Informatika",
    angkatan: "2022",
    bio: "Mobile App Developer dengan kecintaan khusus pada Flutter. Suka ngoprek state management Bloc dan Riverpod. 📱",
    socialLinks: JSON.stringify({
      github: "github.com/kevins",
      linkedin: "linkedin.com/in/kevins",
    }),
    submissions: [
      {
        type: "skill" as const,
        title: "Flutter Development",
        description:
          "Mengembangkan aplikasi cross-platform Android & iOS dengan Flutter.",
        proofUrl: "https://github.com/kevins/flutter-apps",
        pointsAwarded: 20,
      },
      {
        type: "portfolio" as const,
        title: "Aplikasi Kasirku",
        description:
          "Membangun aplikasi POS (Point of Sales) offline-first untuk UMKM lokal.",
        proofUrl: "https://github.com/kevins/kasirku-app",
        portfolioLevel: "freelance" as const,
        pointsAwarded: 30,
      },
    ],
  },
  {
    name: "Larasati Putri",
    email: "larasati.putri@student.ac.id",
    password: "password123",
    nim: "23.11.5135",
    prodi: "Teknik Informatika",
    angkatan: "2023",
    bio: "Keamanan siber adalah passion saya. Senang belajar ethical hacking dan konfigurasi jaringan Cisco. 🛡️",
    socialLinks: JSON.stringify({
      github: "github.com/larasputri",
      linkedin: "linkedin.com/in/larasputri",
    }),
    submissions: [
      {
        type: "skill" as const,
        title: "Network Configuration",
        description:
          "Konfigurasi routing, switching, dan firewall pada jaringan lokal.",
        proofUrl: "https://github.com/larasputri/networking",
        pointsAwarded: 15,
      },
      {
        type: "certificate" as const,
        title: "CCNA: Introduction to Networks",
        description: "Sertifikasi dasar jaringan komputer resmi dari Cisco.",
        proofUrl: "https://netacad.com/verify/laras-ccna",
        certificateName: "Cisco Certified Network Associate (CCNA)",
        certificateLevel: "internasional" as const,
        pointsAwarded: 45,
      },
    ],
  },
  {
    name: "Muhammad Rizky",
    email: "rizky.m@student.ac.id",
    password: "password123",
    nim: "22.11.4588",
    prodi: "Teknik Informatika",
    angkatan: "2022",
    bio: "Backend Engineer yang senang mendesain API bersih, performan, dan aman. Docker & Go adalah andalan. ⚙️",
    socialLinks: JSON.stringify({
      github: "github.com/rizkym",
      linkedin: "linkedin.com/in/rizkym",
    }),
    submissions: [
      {
        type: "skill" as const,
        title: "Backend API Development",
        description:
          "Membuat RESTful API dengan Go Fiber, Gorm, dan database PostgreSQL.",
        proofUrl: "https://github.com/rizkym/go-api",
        pointsAwarded: 20,
      },
      {
        type: "portfolio" as const,
        title: "Sistem Antrean Klinik",
        description:
          "Microservice backend antrean klinik terintegrasi dengan redis cache.",
        proofUrl: "https://github.com/rizkym/klinik-service",
        portfolioLevel: "industri" as const,
        pointsAwarded: 40,
      },
    ],
  },
  {
    name: "Nadine Amelia",
    email: "nadine.amelia@student.ac.id",
    password: "password123",
    nim: "21.12.3999",
    prodi: "Desain Komunikasi Visual",
    angkatan: "2021",
    bio: "Illustrator 2D dan desainer grafis. Suka menceritakan kisah lewat ilustrasi warna-warni hangat. 🌸",
    socialLinks: JSON.stringify({
      instagram: "instagram.com/nadineart",
      behance: "behance.net/nadineart",
    }),
    submissions: [
      {
        type: "skill" as const,
        title: "Vector Illustration",
        description:
          "Menggambar ilustrasi flat art dan vector menggunakan Adobe Illustrator.",
        proofUrl: "https://behance.net/nadineart/illustrations",
        pointsAwarded: 15,
      },
      {
        type: "portfolio" as const,
        title: "Desain Maskot Dies Natalis",
        description:
          "Menciptakan desain karakter dan maskot resmi untuk perayaan Dies Natalis Kampus ke-20.",
        proofUrl: "https://behance.net/gallery/diesnatalis-mascot",
        portfolioLevel: "personal" as const,
        pointsAwarded: 25,
      },
    ],
  },
];

async function seed() {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client, { schema });

  console.log("🌱 Checking if database needs seeding...");
  const existingUsers = await db.select().from(user).limit(1);
  if (existingUsers.length > 0) {
    console.log("🌱 Database already has users. Skipping seed.");
    await client.end();
    process.exit(0);
  }

  console.log("🌱 Seeding database...");

  // 0. Clear existing data
  console.log("  → Clearing existing data...");
  await db.delete(claims);
  await db.delete(submissions);
  await db.delete(session);
  await db.delete(account);
  await db.delete(verification);
  await db.delete(user);
  await db.delete(rewards);
  await db.delete(opportunities);
  console.log("  ✓ Database cleared");

  // 1. Create admin user via Better Auth API
  console.log("  → Creating admin user...");
  const { auth } = await import("../lib/auth");
  try {
    const ctx = await auth.api.signUpEmail({
      body: {
        name: "Admin Kinetic",
        email: "admin@kinetic.ac.id",
        password: "admin123",
        role: "admin",
      },
    });
    console.log("  ✓ Admin created:", ctx.user.email);
  } catch (e) {
    console.log("  ⚠ Admin creation error:", e);
  }

  // 2. Seed dummy students
  console.log("  → Seeding dummy students...");
  for (const s of dummyStudents) {
    let userId = "";
    try {
      // Create user via Better Auth API first to handle password hashing
      const ctx = await auth.api.signUpEmail({
        body: {
          name: s.name,
          email: s.email,
          password: s.password,
          role: "mahasiswa",
        },
      });
      userId = ctx.user.id;
      console.log(`  ✓ Student created via Better Auth: ${s.email}`);
    } catch (_e) {
      // If student already exists in Better Auth, find their ID
      const existingUser = await db.query.user.findFirst({
        where: eq(user.email, s.email),
      });
      if (existingUser) {
        userId = existingUser.id;
        console.log(`  ⚠ Student already exists, updating profile: ${s.email}`);
      }
    }

    if (userId) {
      // Calculate total points from submissions
      const totalPoints = s.submissions.reduce(
        (acc, curr) => acc + curr.pointsAwarded,
        0,
      );

      // Update custom fields with Drizzle
      await db
        .update(user)
        .set({
          nim: s.nim,
          bio: s.bio,
          prodi: s.prodi,
          angkatan: s.angkatan,
          socialLinks: s.socialLinks,
          totalPoints: totalPoints,
        })
        .where(eq(user.id, userId));

      // Clean existing submissions for this user to avoid duplicates on re-seed
      await db.delete(submissions).where(eq(submissions.userId, userId));

      // Insert submissions
      for (const sub of s.submissions) {
        await db.insert(submissions).values({
          userId: userId,
          type: sub.type,
          title: sub.title,
          description: sub.description,
          proofUrl: sub.proofUrl,
          status: "approved",
          pointsAwarded: sub.pointsAwarded,
          certificateName: (sub as any).certificateName || null,
          certificateLevel: (sub as any).certificateLevel || null,
          portfolioLevel: (sub as any).portfolioLevel || null,
        });
      }
      console.log(
        `    → Seeded ${s.submissions.length} submissions for ${s.name} (Total Points: ${totalPoints})`,
      );
    }
  }

  // 3. Seed sample rewards
  console.log("  → Seeding rewards...");
  try {
    await db.insert(rewards).values([
      {
        title: "Voucher Kantin Rp 25.000",
        description: "Voucher makan di kantin kampus senilai Rp 25.000",
        pointsCost: 10,
        stock: 50,
      },
      {
        title: "Kaos Kinetic Academy",
        description: "Kaos eksklusif Kinetic Academy edisi terbatas",
        pointsCost: 25,
        stock: 20,
      },
      {
        title: "Sertifikat Digital Premium",
        description: "Sertifikat digital dengan frame eksklusif untuk LinkedIn",
        pointsCost: 15,
        stock: 100,
      },
      {
        title: "Flash Drive 32GB",
        description: "Flash drive berlogo kampus kapasitas 32GB",
        pointsCost: 30,
        stock: 15,
      },
    ]);
    console.log("  ✓ 4 rewards created");
  } catch (e) {
    console.error("  ⚠ Failed seeding rewards:", e);
  }

  // 4. Seed sample opportunities
  console.log("  → Seeding opportunities...");
  try {
    await db.insert(opportunities).values([
      {
        title: "Web Developer untuk Portal Kampus",
        description:
          "Dicari mahasiswa yang bisa membantu mengembangkan portal baru kampus menggunakan Next.js dan PostgreSQL.",
        requiredSkills: "React, Next.js, PostgreSQL, Tailwind CSS",
        deadline: new Date("2025-02-28"),
      },
      {
        title: "UI/UX Designer - Aplikasi Mobile Perpustakaan",
        description:
          "Proyek redesign aplikasi mobile perpustakaan kampus. Butuh mahasiswa berpengalaman di Figma.",
        requiredSkills: "Figma, UI/UX Design, Prototyping",
        deadline: new Date("2025-03-15"),
      },
    ]);
    console.log("  ✓ 2 opportunities created");
  } catch (e) {
    console.error("  ⚠ Failed seeding opportunities:", e);
  }

  console.log("✅ Seeding complete!");
  await client.end();
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
