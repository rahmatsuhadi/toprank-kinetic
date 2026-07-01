"use server";

import { db } from "@/db";
import { rewards, claims, user } from "@/db/schema";
import { getCurrentUser } from "./auth";
import { eq, desc, and, sql } from "drizzle-orm";

export async function createReward(formData: FormData) {
  const session = await getCurrentUser();
  if (!session || session.user.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const pointsCost = Number(formData.get("pointsCost"));
  const stock = Number(formData.get("stock"));

  if (!title || !description || !pointsCost) {
    return { error: "Semua field wajib diisi." };
  }

  try {
    await db.insert(rewards).values({ title, description, pointsCost, stock });
    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal buat reward.";
    return { error: message };
  }
}

export async function updateReward(
  rewardId: number,
  formData: FormData,
) {
  const session = await getCurrentUser();
  if (!session || session.user.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const pointsCost = Number(formData.get("pointsCost"));
  const stock = Number(formData.get("stock"));

  try {
    await db
      .update(rewards)
      .set({ title, description, pointsCost, stock })
      .where(eq(rewards.id, rewardId));
    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal update reward.";
    return { error: message };
  }
}

export async function deleteReward(rewardId: number) {
  const session = await getCurrentUser();
  if (!session || session.user.role !== "admin") {
    return { error: "Unauthorized" };
  }

  try {
    await db.delete(rewards).where(eq(rewards.id, rewardId));
    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal hapus reward.";
    return { error: message };
  }
}

export async function claimReward(rewardId: number) {
  const session = await getCurrentUser();
  if (!session) return { error: "Unauthorized" };

  const [reward] = await db
    .select()
    .from(rewards)
    .where(eq(rewards.id, rewardId))
    .limit(1);

  if (!reward) return { error: "Reward tidak ditemukan." };
  if (reward.stock <= 0) return { error: "Stok reward habis." };

  const userPoints = session.user.totalPoints ?? 0;
  if (userPoints < reward.pointsCost) {
    return { error: "Poin tidak cukup." };
  }

  // Transaction: deduct points + reduce stock + create claim
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(user)
        .set({
          totalPoints: sql`${user.totalPoints} - ${reward.pointsCost}`,
        })
        .where(eq(user.id, session.user.id));

      await tx
        .update(rewards)
        .set({
          stock: sql`${rewards.stock} - 1`,
        })
        .where(eq(rewards.id, rewardId));

      await tx.insert(claims).values({
        userId: session.user.id,
        rewardId,
        pointsSpent: reward.pointsCost,
        status: "claimed",
      });
    });
    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal klaim reward.";
    return { error: message };
  }
}

export async function getRewards() {
  return db.select().from(rewards).orderBy(desc(rewards.createdAt));
}

export async function getMyClaims() {
  const session = await getCurrentUser();
  if (!session) return [];

  return db
    .select({
      id: claims.id,
      pointsSpent: claims.pointsSpent,
      status: claims.status,
      createdAt: claims.createdAt,
      rewardTitle: rewards.title,
    })
    .from(claims)
    .innerJoin(rewards, eq(claims.rewardId, rewards.id))
    .where(eq(claims.userId, session.user.id))
    .orderBy(desc(claims.createdAt));
}
