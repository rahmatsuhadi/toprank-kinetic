"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { registerStudent } from "@/actions/auth";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();

  async function handleRegister(_prev: string | null, formData: FormData) {
    const result = await registerStudent(formData);

    if (result.error) {
      return result.error;
    }

    toast.success("Registrasi berhasil! Silakan login.");
    router.push("/login");
    return null;
  }

  const [error, formAction, isPending] = useActionState(handleRegister, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormField
        label="Nama Lengkap"
        id="name"
        required
        inputProps={{ placeholder: "Masukkan nama lengkap" }}
      />
      <FormField
        label="NIM"
        id="nim"
        required
        inputProps={{ placeholder: "XX.XX.XXXX" }}
      />
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
        inputProps={{
          type: "password",
          placeholder: "Minimal 8 karakter",
          minLength: 8,
        }}
      />

      {error ? (
        <p className="text-sm text-[var(--error)] bg-[var(--error-container)] rounded-[var(--rounded)] px-3 py-2">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" isLoading={isPending} className="w-full">
        <UserPlus className="h-4 w-4" />
        Daftar
      </Button>
    </form>
  );
}
