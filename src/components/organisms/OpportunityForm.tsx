"use client";

import { useActionState } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { createOpportunity } from "@/actions/opportunities";
import { toast } from "sonner";
import { Megaphone } from "lucide-react";

export function OpportunityForm() {
  async function handleSubmit(_prev: string | null, formData: FormData) {
    const result = await createOpportunity(formData);
    if (result.error) return result.error;
    toast.success("Opportunity berhasil diposting!");
    return null;
  }

  const [error, formAction, isPending] = useActionState(handleSubmit, null);

  return (
    <form action={formAction} className="elevation-1 rounded-[var(--rounded-lg)] p-[var(--space-lg)] flex flex-col gap-5">
      <h3 className="text-headline-md">Posting Opportunity</h3>
      <FormField label="Judul" id="title" required inputProps={{ placeholder: "Judul opportunity" }} />
      <FormField label="Deskripsi" id="description" required type="textarea" textareaProps={{ placeholder: "Detail opportunity..." }} />
      <FormField label="Skill yang Dibutuhkan" id="requiredSkills" required inputProps={{ placeholder: "Contoh: React, Node.js, Figma (pisahkan koma)" }} />
      <FormField label="Deadline" id="deadline" inputProps={{ type: "date" }} />
      {error ? <p className="text-sm text-[var(--error)]">{error}</p> : null}
      <Button type="submit" isLoading={isPending}>
        <Megaphone className="h-4 w-4" />
        Posting
      </Button>
    </form>
  );
}
