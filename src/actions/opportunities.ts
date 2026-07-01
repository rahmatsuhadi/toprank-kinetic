"use server";

import { db } from "@/db";
import { opportunities } from "@/db/schema";
import { getCurrentUser } from "./auth";
import { desc } from "drizzle-orm";

export async function createOpportunity(formData: FormData) {
  const session = await getCurrentUser();
  if (!session || session.user.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const requiredSkills = formData.get("requiredSkills") as string;
  const deadlineStr = formData.get("deadline") as string;

  if (!title || !description || !requiredSkills) {
    return { error: "Judul, deskripsi, dan kebutuhan skill wajib diisi." };
  }

  try {
    await db.insert(opportunities).values({
      title,
      description,
      requiredSkills,
      deadline: deadlineStr ? new Date(deadlineStr) : null,
    });
    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Gagal posting.";
    return { error: message };
  }
}

export async function getOpportunities() {
  return db
    .select()
    .from(opportunities)
    .orderBy(desc(opportunities.createdAt));
}
