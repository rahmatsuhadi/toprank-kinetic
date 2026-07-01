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
    })
    .from(user);

  const [subStats] = await db
    .select({
      total: sql<number>`count(*)`,
      pending: sql<number>`count(*) filter (where ${submissions.status} = 'pending')`,
      approved: sql<number>`count(*) filter (where ${submissions.status} = 'approved')`,
      skills: sql<number>`count(*) filter (where ${submissions.type} = 'skill' and ${submissions.status} = 'approved')`,
      portfolios: sql<number>`count(*) filter (where ${submissions.type} = 'portfolio' and ${submissions.status} = 'approved')`,
    })
    .from(submissions);

  return {
    totalStudents: stats?.totalStudents ?? 0,
    totalSubmissions: subStats?.total ?? 0,
    pendingVerifications: subStats?.pending ?? 0,
    approvedSubmissions: subStats?.approved ?? 0,
    verifiedSkills: subStats?.skills ?? 0,
    verifiedPortfolios: subStats?.portfolios ?? 0,
  };
}

export async function searchStudents(query?: string, minPoints?: number) {
  const conditions = [sql`${user.role} = 'mahasiswa'`];

  if (minPoints && minPoints > 0) {
    conditions.push(sql`${user.totalPoints} >= ${minPoints}`);
  }

  if (query && query.trim()) {
    const studentSubquery = db
      .select({ userId: submissions.userId })
      .from(submissions)
      .where(
        and(
          eq(submissions.status, "approved"),
          or(
            ilike(submissions.title, `%${query}%`),
            ilike(submissions.description, `%${query}%`),
          )
        )
      );

    conditions.push(
      or(
        ilike(user.name, `%${query}%`),
        ilike(user.nim, `%${query}%`),
        ilike(user.email, `%${query}%`),
        sql`${user.id} in (${studentSubquery})`
      )!
    );
  }

  // 1. Fetch matching students
  const students = await db
    .select({
      id: user.id,
      name: user.name,
      nim: user.nim,
      email: user.email,
      image: user.image,
      bio: user.bio,
      prodi: user.prodi,
      angkatan: user.angkatan,
      totalPoints: user.totalPoints,
      socialLinks: user.socialLinks,
    })
    .from(user)
    .where(and(...conditions))
    .orderBy(desc(user.totalPoints))
    .limit(50);

  // 2. Fetch all submissions matching these students that are approved
  const studentIds = students.map((s) => s.id);
  
  let approvedSubs: any[] = [];
  if (studentIds.length > 0) {
    const { inArray } = await import("drizzle-orm");
    approvedSubs = await db
      .select({
        id: submissions.id,
        userId: submissions.userId,
        title: submissions.title,
        type: submissions.type,
        certificateLevel: submissions.certificateLevel,
        portfolioLevel: submissions.portfolioLevel,
        status: submissions.status,
        pointsAwarded: submissions.pointsAwarded,
        description: submissions.description,
        proofUrl: submissions.proofUrl,
        certificateName: submissions.certificateName,
        createdAt: submissions.createdAt,
      })
      .from(submissions)
      .where(
        and(
          inArray(submissions.userId, studentIds),
          eq(submissions.status, "approved")
        )
      );
  }

  // 3. Resolve ranks for these students
  const rankedStudents = await Promise.all(
    students.map(async (student) => {
      const [rankCount] = await db
        .select({ count: sql<number>`count(*)` })
        .from(user)
        .where(
          and(
            eq(user.role, "mahasiswa"),
            sql`${user.totalPoints} > ${student.totalPoints}`
          )
        );
      
      const rank = Number(rankCount?.count ?? 0) + 1;
      const studentSubs = approvedSubs
        .filter((sub) => sub.userId === student.id)
        .map((sub) => ({
          ...sub,
          createdAt: sub.createdAt ? sub.createdAt.toISOString() : new Date().toISOString(),
        }));

      // Parse social links
      let parsedLinks: Record<string, string> = {};
      try {
        if (student.socialLinks) {
          parsedLinks = JSON.parse(student.socialLinks);
        }
      } catch (e) {}

      return {
        id: student.id,
        name: student.name,
        nim: student.nim,
        email: student.email,
        image: student.image,
        bio: student.bio,
        prodi: student.prodi,
        angkatan: student.angkatan,
        totalPoints: student.totalPoints,
        rank,
        socialLinks: parsedLinks,
        submissions: studentSubs,
      };
    })
  );

  return rankedStudents;
}

export async function updateProfile(formData: FormData) {
  const session = await getCurrentUser();
  if (!session) return { error: "Unauthorized" };

  const bio = formData.get("bio") as string;
  const socialLinks = formData.get("socialLinks") as string;
  const name = formData.get("name") as string;
  const prodi = formData.get("prodi") as string;
  const angkatan = formData.get("angkatan") as string;

  try {
    const updates: Record<string, string> = {};
    if (bio !== null) updates.bio = bio;
    if (socialLinks !== null) updates.socialLinks = socialLinks;
    if (name) updates.name = name;
    if (prodi !== null) updates.prodi = prodi;
    if (angkatan !== null) updates.angkatan = angkatan;

    await db.update(user).set(updates).where(eq(user.id, session.user.id));
    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal update profil.";
    return { error: message };
  }
}
