import type { Metadata } from "next";
import { getCurrentUser } from "@/actions/auth";
import { getMySubmissions } from "@/actions/submissions";
import { redirect } from "next/navigation";
import { PortfolioContent } from "@/components/organisms/PortfolioContent";
import { db } from "@/db";
import { user } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Portofolio Saya — Kinetic Academy",
};

export default async function ProfilPage() {
  const session = await getCurrentUser();
  if (!session) redirect("/login");

  const u = session.user;
  const submissions = await getMySubmissions();

  const socialLinks = u.socialLinks
    ? (() => {
        try {
          return JSON.parse(u.socialLinks as string);
        } catch {
          return {};
        }
      })()
    : {};

  // Calculate rank dynamically based on totalPoints
  const [rankCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(user)
    .where(
      and(
        eq(user.role, "mahasiswa"),
        sql`${user.totalPoints} > ${u.totalPoints ?? 0}`
      )
    );
  const rank = Number(rankCount?.count ?? 0) + 1;

  return (
    <PortfolioContent
      user={{
        id: u.id,
        name: u.name,
        email: u.email,
        nim: (u.nim as string) ?? null,
        bio: (u.bio as string) ?? null,
        prodi: (u.prodi as string) ?? null,
        angkatan: (u.angkatan as string) ?? null,
        socialLinks: socialLinks,
        totalPoints: u.totalPoints ?? 0,
        rank: rank,
      }}
      submissions={submissions.map((s) => ({
        id: s.id,
        title: s.title,
        type: s.type,
        status: s.status,
        pointsAwarded: s.pointsAwarded,
        createdAt: s.createdAt.toISOString(),
        description: s.description,
        proofUrl: s.proofUrl,
      }))}
    />
  );
}
