"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const NIM_REGEX = /^\d{2}\.\d{2}\.\d{4}$/;

export async function registerStudent(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nim = formData.get("nim") as string;

  if (!name || !email || !password || !nim) {
    return { error: "Semua field wajib diisi." };
  }

  if (!NIM_REGEX.test(nim)) {
    return { error: "Format NIM tidak valid. Gunakan format XX.XX.XXXX" };
  }

  if (password.length < 8) {
    return { error: "Password minimal 8 karakter." };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        nim,
        role: "mahasiswa",
      },
    });
    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Registrasi gagal.";
    return { error: message };
  }
}

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  return session;
}
