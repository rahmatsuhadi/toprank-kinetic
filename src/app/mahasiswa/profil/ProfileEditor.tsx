"use client";

import { useActionState } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { PointChip } from "@/components/atoms/PointChip";
import { updateProfile } from "@/actions/students";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface ProfileEditorProps {
  name: string;
  email: string;
  nim: string;
  bio: string;
  socialLinks: Record<string, string>;
  totalPoints: number;
}

export function ProfileEditor({
  name,
  email,
  nim,
  bio,
  socialLinks,
  totalPoints,
}: ProfileEditorProps) {
  async function handleSave(_prev: string | null, formData: FormData) {
    const github = formData.get("github") as string;
    const linkedin = formData.get("linkedin") as string;
    const instagram = formData.get("instagram") as string;

    formData.set(
      "socialLinks",
      JSON.stringify({
        github: github || undefined,
        linkedin: linkedin || undefined,
        instagram: instagram || undefined,
      }),
    );

    const result = await updateProfile(formData);
    if (result.error) return result.error;
    toast.success("Profil berhasil diperbarui!");
    return null;
  }

  const [error, formAction, isPending] = useActionState(handleSave, null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile Card */}
      <div className="elevation-1 rounded-[var(--rounded-xl)] p-[var(--space-lg)] flex flex-col items-center text-center gap-4">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[var(--primary-container)] to-[var(--secondary-container)] flex items-center justify-center text-white text-3xl font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-sm text-[var(--on-surface-variant)]">{nim}</p>
          <p className="text-xs text-[var(--on-surface-variant)]">{email}</p>
        </div>
        <PointChip points={totalPoints} size="lg" />
      </div>

      {/* Edit Form */}
      <form
        action={formAction}
        className="elevation-1 rounded-[var(--rounded-xl)] p-[var(--space-lg)] lg:col-span-2 flex flex-col gap-5"
      >
        <h3 className="text-headline-md">Edit Profil</h3>

        <FormField
          label="Nama"
          id="name"
          inputProps={{ defaultValue: name }}
        />
        <FormField
          label="Bio"
          id="bio"
          type="textarea"
          textareaProps={{
            defaultValue: bio,
            placeholder: "Ceritakan tentang dirimu...",
          }}
        />

        <div className="border-t border-[var(--outline-variant)] pt-4">
          <p className="text-sm font-semibold mb-3">Social Links</p>
          <div className="flex flex-col gap-4">
            <FormField
              label="GitHub"
              id="github"
              inputProps={{
                defaultValue: socialLinks.github ?? "",
                placeholder: "https://github.com/username",
              }}
            />
            <FormField
              label="LinkedIn"
              id="linkedin"
              inputProps={{
                defaultValue: socialLinks.linkedin ?? "",
                placeholder: "https://linkedin.com/in/username",
              }}
            />
            <FormField
              label="Instagram"
              id="instagram"
              inputProps={{
                defaultValue: socialLinks.instagram ?? "",
                placeholder: "@username",
              }}
            />
          </div>
        </div>

        {error ? (
          <p className="text-sm text-[var(--error)]">{error}</p>
        ) : null}

        <Button type="submit" isLoading={isPending}>
          <Save className="h-4 w-4" />
          Simpan
        </Button>
      </form>
    </div>
  );
}
