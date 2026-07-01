"use server";

import { desc, eq, sql } from "drizzle-orm";
import type { CertificateLevel, PortfolioLevel } from "@/config/point-rules";
import { resolvePoints } from "@/config/point-rules";
import { db } from "@/db";
import { submissions, user } from "@/db/schema";
import { getCurrentUser } from "./auth";

export async function createSubmission(formData: FormData) {
  const session = await getCurrentUser();
  if (!session) return { error: "Unauthorized" };

  const type = formData.get("type") as "skill" | "portfolio" | "certificate";
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const proofUrl = formData.get("proofUrl") as string;
  const certificateLevel = formData.get(
    "certificateLevel",
  ) as CertificateLevel | null;
  const portfolioLevel = formData.get(
    "portfolioLevel",
  ) as PortfolioLevel | null;
  const certificateName = formData.get("certificateName") as string | null;

  if (!type || !title || !proofUrl) {
    return { error: "Tipe, judul, dan bukti wajib diisi." };
  }

  try {
    await db.insert(submissions).values({
      userId: session.user.id,
      type,
      title,
      description: description || null,
      proofUrl,
      certificateLevel: certificateLevel || null,
      portfolioLevel: portfolioLevel || null,
      certificateName: certificateName || null,
    });
    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal submit.";
    return { error: message };
  }
}

export async function approveSubmission(submissionId: number) {
  const session = await getCurrentUser();
  if (!session || session.user.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const [submission] = await db
    .select()
    .from(submissions)
    .where(eq(submissions.id, submissionId))
    .limit(1);

  if (!submission) return { error: "Pengajuan tidak ditemukan." };
  if (submission.status !== "pending")
    return { error: "Pengajuan sudah diproses." };

  const points = resolvePoints(
    submission.type,
    submission.certificateLevel as CertificateLevel | null,
    submission.portfolioLevel as PortfolioLevel | null,
    submission.title,
  );

  // Transaction: update submission + add points to user
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(submissions)
        .set({
          status: "approved",
          pointsAwarded: points,
          verifiedBy: session.user.id,
          updatedAt: new Date(),
        })
        .where(eq(submissions.id, submissionId));

      await tx
        .update(user)
        .set({
          totalPoints: sql`${user.totalPoints} + ${points}`,
        })
        .where(eq(user.id, submission.userId));
    });
    return { success: true, pointsAwarded: points };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal approve.";
    return { error: message };
  }
}

export async function rejectSubmission(submissionId: number, reason: string) {
  const session = await getCurrentUser();
  if (!session || session.user.role !== "admin") {
    return { error: "Unauthorized" };
  }

  if (!reason.trim()) {
    return { error: "Alasan penolakan wajib diisi." };
  }

  try {
    await db
      .update(submissions)
      .set({
        status: "rejected",
        rejectionReason: reason,
        verifiedBy: session.user.id,
        updatedAt: new Date(),
      })
      .where(eq(submissions.id, submissionId));
    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal reject.";
    return { error: message };
  }
}

export async function getPendingSubmissions() {
  const session = await getCurrentUser();
  if (!session || session.user.role !== "admin") return [];

  return db
    .select({
      id: submissions.id,
      title: submissions.title,
      type: submissions.type,
      description: submissions.description,
      proofUrl: submissions.proofUrl,
      certificateLevel: submissions.certificateLevel,
      portfolioLevel: submissions.portfolioLevel,
      certificateName: submissions.certificateName,
      status: submissions.status,
      createdAt: submissions.createdAt,
      userName: user.name,
      userNim: user.nim,
    })
    .from(submissions)
    .innerJoin(user, eq(submissions.userId, user.id))
    .where(eq(submissions.status, "pending"))
    .orderBy(desc(submissions.createdAt));
}

export async function getMySubmissions() {
  const session = await getCurrentUser();
  if (!session) return [];

  return db
    .select()
    .from(submissions)
    .where(eq(submissions.userId, session.user.id))
    .orderBy(desc(submissions.createdAt));
}
