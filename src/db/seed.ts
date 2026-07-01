import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user, rewards, opportunities } from "./schema";
import { auth } from "../lib/auth";
import { config } from "dotenv";
config({ path: ".env.local" });


async function seed() {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client);

  console.log("🌱 Seeding database...");

  // 1. Create admin user via Better Auth API
  console.log("  → Creating admin user...");
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
    console.log(e)
    console.log("  ⚠ Admin may already exist, skipping.");
  }

  // 2. Seed sample rewards
  console.log("  → Seeding rewards...");
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

  // 3. Seed sample opportunities
  console.log("  → Seeding opportunities...");
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

  console.log("✅ Seeding complete!");
  await client.end();
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
