import type { Metadata } from "next";
import { LoginForm } from "@/components/organisms/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login — Kinetic Academy",
  description: "Masuk ke University Talent Hub",
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-headline-md text-[var(--on-surface)] mb-6">
        Masuk ke Akun
      </h1>
      <LoginForm />
      <p className="text-sm text-[var(--on-surface-variant)] text-center mt-6">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="text-[var(--primary-container)] font-semibold hover:underline"
        >
          Daftar Sekarang
        </Link>
      </p>
    </div>
  );
}
