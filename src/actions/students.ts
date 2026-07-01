"use server";

import { db } from "@/db";
import { user, submissions } from "@/db/schema";
import { getCurrentUser } from "./auth";
import { eq, ilike, sql, and, desc, or } from "drizzle-orm";

export async function getDashboardStats() {
  const session = await getCurrentUser();
  if (!session || session.user.role !== "admin") return null;

  const [stats] = await db
    .select({
      totalStudents: sql<number>`count(*) filter (where ${user.role} = 'mahasiswa')`,
      totalSubmissions: sql<number>`0`, // placeholder, computed below
    })
    .from(user);

  const [subStats] = await db
    .select({
      total: sql<number>`count(*)`,
      pending: sql<number>`count(*) filter (where ${submissions.status} = 'pending')`,
      approved: sql<number>`count(*) filter (where ${submissions.status} = 'approved')`,
    })
    .from(submissions);

  return {
    totalStudents: stats?.totalStudents ?? 0,
    totalSubmissions: subStats?.total ?? 0,
    pendingVerifications: subStats?.pending ?? 0,
    approvedSubmissions: subStats?.approved ?? 0,
  };
}

export async function searchStudents(query?: string, minPoints?: number) {
  const conditions = [sql`${user.role} = 'mahasiswa'`];

  if (query && query.trim()) {
    conditions.push(
      or(
        ilike(user.name, `%${query}%`),
        ilike(user.nim, `%${query}%`),
        ilike(user.email, `%${query}%`),
      )!,
    );
  }

  if (minPoints && minPoints > 0) {
    conditions.push(sql`${user.totalPoints} >= ${minPoints}`);
  }

  return db
    .select({
      id: user.id,
      name: user.name,
      nim: user.nim,
      email: user.email,
      image: user.image,
      bio: user.bio,
      totalPoints: user.totalPoints,
    })
    .from(user)
    .where(and(...conditions))
    .orderBy(desc(user.totalPoints))
    .limit(50);
}

export async function updateProfile(formData: FormData) {
  const session = await getCurrentUser();
  if (!session) return { error: "Unauthorized" };

  const bio = formData.get("bio") as string;
  const socialLinks = formData.get("socialLinks") as string;
  const name = formData.get("name") as string;

  try {
    const updates: Record<string, string> = {};
    if (bio !== null) updates.bio = bio;
    if (socialLinks !== null) updates.socialLinks = socialLinks;
    if (name) updates.name = name;

    await db.update(user).set(updates).where(eq(user.id, session.user.id));
    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal update profil.";
    return { error: message };
  }
}
