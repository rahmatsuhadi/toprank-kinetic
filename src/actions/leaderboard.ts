"use server";

import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { submissions, user } from "@/db/schema";
import { getCurrentUser } from "./auth";

export async function getLeaderboard() {
  // Query top students and compute their verified skills count
  const top50 = await db
    .select({
      id: user.id,
      name: user.name,
      nim: user.nim,
      image: user.image,
      totalPoints: user.totalPoints,
      verifiedSkillsCount: sql<number>`coalesce(count(${submissions.id}) filter (where ${submissions.status} = 'approved' and ${submissions.type} in ('skill', 'certificate')), 0)::integer`,
    })
    .from(user)
    .leftJoin(submissions, eq(user.id, submissions.userId))
    .where(sql`${user.role} = 'mahasiswa'`)
    .groupBy(user.id, user.name, user.nim, user.image, user.totalPoints)
    .orderBy(desc(user.totalPoints))
    .limit(50);

  // Add rank
  const ranked = top50.map((u, i) => ({ ...u, rank: i + 1 }));

  // Check if current user is in top 50
  const session = await getCurrentUser();
  if (session && session.user.role === "mahasiswa") {
    const isInTop50 = ranked.some((u) => u.id === session.user.id);

    if (!isInTop50) {
      // Count how many students have more points
      const [result] = await db
        .select({ count: sql<number>`count(*)` })
        .from(user)
        .where(
          sql`${user.role} = 'mahasiswa' AND ${user.totalPoints} > ${session.user.totalPoints}`,
        );
      const myRank = (result?.count ?? 0) + 1;

      // Fetch user's own verified skills count
      const [userSkillCount] = await db
        .select({
          count: sql<number>`coalesce(count(${submissions.id}) filter (where ${submissions.status} = 'approved' and ${submissions.type} in ('skill', 'certificate')), 0)::integer`,
        })
        .from(submissions)
        .where(sql`${submissions.userId} = ${session.user.id}`);

      return {
        leaderboard: ranked,
        currentUser: {
          id: session.user.id,
          name: session.user.name,
          nim: session.user.nim,
          image: session.user.image,
          totalPoints: session.user.totalPoints ?? 0,
          rank: myRank,
          verifiedSkillsCount: userSkillCount?.count ?? 0,
        },
      };
    }
  }

  return { leaderboard: ranked, currentUser: null };
}
