import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/organisms/RegisterForm";

export const metadata: Metadata = {
  title: "Daftar — Kinetic Academy",
  description: "Daftar akun baru di Universitas Amikom Yogyakarta",
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-headline-md text-[var(--on-surface)] mb-6">
        Buat Akun Baru
      </h1>
      <RegisterForm />
      <p className="text-sm text-[var(--on-surface-variant)] text-center mt-6">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="text-[var(--primary-container)] font-semibold hover:underline"
        >
          Masuk
        </Link>
      </p>
    </div>
  );
}
