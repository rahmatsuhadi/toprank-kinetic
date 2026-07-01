"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

export function LoginForm() {
  const router = useRouter();

  async function handleLogin(_prev: string | null, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return "Email/NIM dan password wajib diisi.";
    }

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        return error.message ?? "Login gagal.";
      }

      toast.success("Login berhasil!");

      // Fetch session to determine role-based redirect
      const { data: session } = await authClient.getSession();
      const role = (session?.user as Record<string, unknown> | undefined)?.role;
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/mahasiswa/dashboard");
      }

      return null;
    } catch {
      return "Login gagal. Periksa email dan password.";
    }
  }

  const [error, formAction, isPending] = useActionState(handleLogin, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormField
        label="Email"
        id="email"
        required
        inputProps={{ type: "email", placeholder: "nama@email.com" }}
      />
      <FormField
        label="Password"
        id="password"
        required
        inputProps={{ type: "password", placeholder: "Minimal 8 karakter" }}
      />

      {error ? (
        <p className="text-sm text-[var(--error)] bg-[var(--error-container)] rounded-[var(--rounded)] px-3 py-2">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" isLoading={isPending} className="w-full">
        <LogIn className="h-4 w-4" />
        Masuk
      </Button>
    </form>
  );
}
