"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/atoms/Button";
import { PointChip } from "@/components/atoms/PointChip";
import { createReward, deleteReward, updateReward } from "@/actions/rewards";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Gift, Edit } from "lucide-react";
import { RewardFormModal } from "./RewardFormModal";
import { ConfirmationDialog } from "@/components/molecules/ConfirmationDialog";

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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rewardToDelete, setRewardToDelete] = useState<Reward | null>(null);
  const [rewardToEdit, setRewardToEdit] = useState<Reward | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isCreating, startCreateTransition] = useTransition();
  const [isUpdating, startUpdateTransition] = useTransition();
  const router = useRouter();

  function handleCreate(formData: FormData) {
    setFormError(null);
    startCreateTransition(async () => {
      const result = await createReward(formData);
      if (result.error) {
        setFormError(result.error);
        return;
      }
      toast.success("Reward berhasil ditambahkan!");
      setIsFormOpen(false);
      router.refresh();
      window.location.reload();
    });
  }

  function handleUpdate(formData: FormData) {
    if (!rewardToEdit) return;
    setFormError(null);
    startUpdateTransition(async () => {
      const result = await updateReward(rewardToEdit.id, formData);
      if (result.error) {
        setFormError(result.error);
        return;
      }
      toast.success("Reward berhasil diperbarui!");
      setRewardToEdit(null);
      router.refresh();
      window.location.reload();
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      const result = await deleteReward(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Reward berhasil dihapus.");
        setItems((prev) => prev.filter((r) => r.id !== id));
        setRewardToDelete(null);
      }
    });
  }

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Inner animated layout block (keeps position: fixed modals outside CSS transforms) */}
      <div className="flex flex-col gap-6 animate-fade-in">
        {/* Header Panel */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-[var(--outline-variant)]">
          <div>
            <h1 className="text-headline-lg font-bold text-[var(--on-surface)]">
              Kelola Voucher & Reward
            </h1>
            <p className="text-xs text-[var(--on-surface-variant)] mt-1">
              Tambah reward baru atau hapus voucher penukaran poin mahasiswa.
            </p>
          </div>
          <Button
            onClick={() => {
              setFormError(null);
              setIsFormOpen(true);
            }}
            className="!bg-[#4F46E5] hover:!bg-[#4338CA] text-white font-bold shrink-0 shadow-sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Tambah Reward
          </Button>
        </div>

        {/* Rewards Grid */}
        {items.length === 0 ? (
          <div className="border border-dashed border-[var(--outline-variant)] rounded-[var(--rounded-xl)] p-12 text-center flex flex-col items-center justify-center gap-3">
            <div className="rounded-full bg-slate-100 p-4 text-slate-400">
              <Gift className="h-8 w-8" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--on-surface)]">Belum Ada Reward</h4>
              <p className="text-xs text-[var(--on-surface-variant)] mt-1">
                Silakan tambahkan reward baru untuk ditukarkan oleh mahasiswa.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {items.map((r) => (
              <div
                key={r.id}
                className="elevation-1 rounded-[var(--rounded-xl)] p-5 bg-[var(--surface-container-low)] border border-[var(--outline-variant)] flex flex-col justify-between gap-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-extrabold text-[var(--on-surface)] truncate">
                      {r.title}
                    </h3>
                    <p className="text-xs text-[var(--on-surface-variant)] mt-1.5 line-clamp-2 leading-relaxed font-medium">
                      {r.description}
                    </p>
                  </div>
                  <PointChip points={r.pointsCost} size="sm" className="shrink-0 font-bold" />
                </div>

                <div className="flex items-center justify-between border-t border-[var(--outline-variant)]/60 pt-3.5 mt-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--on-surface-variant)]">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${r.stock > 0 ? 'bg-green-500 shadow-sm' : 'bg-red-500'}`} />
                    <span>Stok Tersedia:</span>
                    <span className="text-[var(--on-surface)] font-extrabold font-mono">{r.stock} unit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setFormError(null);
                        setRewardToEdit(r);
                      }}
                      className="inline-flex items-center justify-center p-2 rounded-full hover:bg-indigo-50 text-slate-400 hover:text-[#4F46E5] transition-all duration-200 cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setRewardToDelete(r)}
                      className="inline-flex items-center justify-center p-2 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all duration-200 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reward Create Form Modal */}
      <RewardFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmitAction={handleCreate}
        isPending={isCreating}
        error={formError}
      />

      {/* Reward Edit Form Modal */}
      <RewardFormModal
        isOpen={rewardToEdit !== null}
        onClose={() => setRewardToEdit(null)}
        onSubmitAction={handleUpdate}
        isPending={isUpdating}
        error={formError}
        initialData={rewardToEdit}
      />

      {/* Confirmation Dialog Delete (Outside of transform container to prevent backdrop clipping) */}
      <ConfirmationDialog
        isOpen={rewardToDelete !== null}
        onClose={() => setRewardToDelete(null)}
        onConfirm={() => {
          if (rewardToDelete) {
            handleDelete(rewardToDelete.id);
          }
        }}
        title="Hapus Reward"
        message={
          <div className="flex flex-col gap-2">
            <p>Apakah Anda yakin ingin menghapus reward ini secara permanen?</p>
            <div className="bg-[var(--surface-container-high)] p-3 rounded-[var(--rounded-md)] border border-[var(--outline-variant)] text-xs font-bold text-[var(--on-surface)]">
              {rewardToDelete?.title} ({rewardToDelete?.pointsCost} Poin)
            </div>
          </div>
        }
        confirmLabel="Ya, Hapus"
        cancelLabel="Batal"
        type="danger"
        isLoading={isPending}
      />
    </div>
  );
}
