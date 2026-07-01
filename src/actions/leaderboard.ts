"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { getCurrentUser } from "./auth";
import { desc, sql } from "drizzle-orm";

export async function getLeaderboard() {
  const top50 = await db
    .select({
      id: user.id,
      name: user.name,
      nim: user.nim,
      image: user.image,
      totalPoints: user.totalPoints,
    })
    .from(user)
    .where(sql`${user.role} = 'mahasiswa'`)
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

      return {
        leaderboard: ranked,
        currentUser: {
          id: session.user.id,
          name: session.user.name,
          nim: session.user.nim,
          image: session.user.image,
          totalPoints: session.user.totalPoints ?? 0,
          rank: myRank,
        },
      };
    }
  }

  return { leaderboard: ranked, currentUser: null };
}
