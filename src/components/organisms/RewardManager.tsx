"use client";

import { useActionState } from "react";
import { useState, useTransition } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { PointChip } from "@/components/atoms/PointChip";
import { createReward, updateReward, deleteReward } from "@/actions/rewards";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Reward {
  id: number;
  title: string;
  description: string;
  pointsCost: number;
  stock: number;
}

interface RewardManagerProps {
  rewards: Reward[];
}

export function RewardManager({ rewards: initial }: RewardManagerProps) {
  const [items, setItems] = useState(initial);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleCreate(_prev: string | null, formData: FormData) {
    const result = await createReward(formData);
    if (result.error) return result.error;
    toast.success("Reward berhasil ditambahkan!");
    setShowForm(false);
    router.refresh();
    return null;
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      const result = await deleteReward(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Reward dihapus.");
        setItems((prev) => prev.filter((r) => r.id !== id));
      }
    });
  }

  const [createError, createAction, isCreating] = useActionState(handleCreate, null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-headline-md">Kelola Reward</h2>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" />
          Tambah
        </Button>
      </div>

      {showForm ? (
        <form action={createAction} className="elevation-1 rounded-[var(--rounded-lg)] p-[var(--space-lg)] flex flex-col gap-4">
          <FormField label="Judul" id="title" required inputProps={{ placeholder: "Nama reward" }} />
          <FormField label="Deskripsi" id="description" required type="textarea" textareaProps={{ placeholder: "Deskripsi reward" }} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Poin Dibutuhkan" id="pointsCost" required inputProps={{ type: "number", min: 1 }} />
            <FormField label="Stok" id="stock" required inputProps={{ type: "number", min: 0 }} />
          </div>
          {createError ? <p className="text-sm text-[var(--error)]">{createError}</p> : null}
          <Button type="submit" isLoading={isCreating}>Simpan</Button>
        </form>
      ) : null}

      <div className="flex flex-col gap-3">
        {items.map((r) => (
          <div key={r.id} className="elevation-1 rounded-[var(--rounded-lg)] p-[var(--space-md)] flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{r.title}</p>
              <p className="text-xs text-[var(--on-surface-variant)] truncate">{r.description}</p>
            </div>
            <PointChip points={r.pointsCost} size="sm" />
            <span className="text-xs text-[var(--on-surface-variant)]">Stok: {r.stock}</span>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)} disabled={isPending}>
              <Trash2 className="h-4 w-4 text-[var(--error)]" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
