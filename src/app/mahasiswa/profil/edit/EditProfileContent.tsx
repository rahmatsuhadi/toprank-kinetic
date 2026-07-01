"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { updateProfile } from "@/actions/students";
import { toast } from "sonner";
import { User, Save, ArrowLeft } from "lucide-react";

interface EditProfileContentProps {
  user: {
    name: string;
    email: string;
    nim: string | null;
    bio: string | null;
    prodi: string | null;
    angkatan: string | null;
    socialLinks: Record<string, string>;
  };
}

export function EditProfileContent({ user }: EditProfileContentProps) {
  const router = useRouter();
  const userLocation = user.socialLinks.location ?? "Jakarta, Indonesia";
  const userProdi = user.prodi ?? "";
  const userAngkatan = user.angkatan ?? "";

  async function handleSave(_prev: string | null, formData: FormData) {
    const github = formData.get("github") as string;
    const linkedin = formData.get("linkedin") as string;
    const location = formData.get("location") as string;

    formData.set(
      "socialLinks",
      JSON.stringify({
        github: github || undefined,
        linkedin: linkedin || undefined,
        location: location || "Jakarta, Indonesia",
      })
    );

    const result = await updateProfile(formData);
    if (result.error) return result.error;
    toast.success("Profil berhasil diperbarui!");
    router.push("/mahasiswa/profil");
    router.refresh();
    return null;
  }

  const [error, formAction, isPending] = useActionState(handleSave, null);

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto animate-fade-in pb-12">
      {/* Back to Profile */}
      <button
        onClick={() => router.push("/mahasiswa/profil")}
        className="flex items-center gap-1.5 text-xs font-bold text-[var(--on-surface-variant)] hover:text-[#4F46E5] self-start transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Portofolio
      </button>

      {/* Header */}
      <div>
        <h1 className="text-headline-lg text-[var(--on-surface)] flex items-center gap-2">
          <User className="h-6 w-6 text-[#4F46E5]" />
          Edit Profil Talenta
        </h1>
        <p className="text-body-md text-[var(--on-surface-variant)] mt-1">
          Perbarui informasi profil, program studi, angkatan, dan tautan media sosial kamu agar menarik bagi pencari talenta.
        </p>
      </div>

      {/* Flat Form (Not wrapped in a card container) */}
      <form
        action={formAction}
        className="flex flex-col gap-6 w-full bg-transparent p-0 border-0 shadow-none"
      >
        <FormField
          label="Nama Lengkap"
          id="name"
          required
          inputProps={{ defaultValue: user.name }}
        />

        {/* Academic Details: Prodi & Angkatan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Program Studi (Prodi)"
            id="prodi"
            inputProps={{
              defaultValue: userProdi,
              placeholder: "Contoh: Teknik Informatika",
            }}
          />
          <FormField
            label="Angkatan"
            id="angkatan"
            inputProps={{
              defaultValue: userAngkatan,
              placeholder: "Contoh: 2023",
              type: "text",
            }}
          />
        </div>

        <FormField
          label="Bio Singkat"
          id="bio"
          type="textarea"
          textareaProps={{
            defaultValue: user.bio ?? "",
            placeholder: "Ceritakan keahlian, minat, atau bidang studi kamu...",
            rows: 4,
          }}
        />

        <FormField
          label="Lokasi"
          id="location"
          inputProps={{
            defaultValue: userLocation,
            placeholder: "Contoh: Jakarta, Indonesia",
          }}
        />

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[var(--outline-variant)] pt-6">
          <FormField
            label="Link GitHub"
            id="github"
            inputProps={{
              defaultValue: user.socialLinks.github ?? "",
              placeholder: "https://github.com/username",
            }}
          />
          <FormField
            label="Link LinkedIn"
            id="linkedin"
            inputProps={{
              defaultValue: user.socialLinks.linkedin ?? "",
              placeholder: "https://linkedin.com/in/username",
            }}
          />
        </div>

        {error && (
          <p className="text-xs text-[var(--error)] bg-[var(--error-container)] p-3 rounded-[var(--rounded-md)]">
            {error}
          </p>
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-3 border-t border-[var(--outline-variant)] pt-6">
          <button
            type="button"
            onClick={() => router.push("/mahasiswa/profil")}
            className="px-4 py-2 border border-[var(--outline-variant)] rounded-[var(--rounded-md)] text-xs font-semibold hover:bg-[var(--surface-container-high)] text-[var(--on-surface)]"
          >
            Batal
          </button>
          <Button type="submit" isLoading={isPending} className="!bg-[#4F46E5] hover:!bg-[#4338CA] text-white">
            <Save className="h-4 w-4" />
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  );
}
