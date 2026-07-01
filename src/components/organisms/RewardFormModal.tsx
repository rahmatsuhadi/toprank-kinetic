"use client";

import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { X } from "lucide-react";

interface RewardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAction: (formData: FormData) => void;
  isPending: boolean;
  error: string | null;
  initialData?: {
    title: string;
    description: string;
    pointsCost: number;
    stock: number;
  } | null;
}

export function RewardFormModal({
  isOpen,
  onClose,
  onSubmitAction,
  isPending,
  error,
  initialData,
}: RewardFormModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#091524]/60 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[var(--surface-container-low)] border border-[var(--outline-variant)] w-full max-w-md rounded-[var(--rounded-xl)] shadow-2xl flex flex-col z-10 animate-fade-in max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-[var(--outline-variant)]">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-extrabold text-[var(--on-surface)]">
              {initialData ? "Edit Reward" : "Tambah Reward Baru"}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] transition-all cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitAction(new FormData(e.currentTarget));
          }}
          className="flex flex-col flex-1 overflow-y-auto p-6 gap-5"
        >
          <div className="flex flex-col gap-4">
            <FormField
              label="Nama Reward"
              id="title"
              required
              className="group"
              inputProps={{
                name: "title",
                defaultValue: initialData?.title || "",
                placeholder: "Masukkan nama reward (misal: Voucher Kantin)",
                className: "bg-[var(--surface-container-lowest)] focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]",
              }}
            />

            <FormField
              label="Deskripsi"
              id="description"
              required
              type="textarea"
              textareaProps={{
                name: "description",
                defaultValue: initialData?.description || "",
                placeholder: "Jelaskan detail reward dan syarat klaimnya...",
                rows: 3,
                className: "bg-[var(--surface-container-lowest)] focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]",
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Poin Dibutuhkan"
                id="pointsCost"
                required
                inputProps={{
                  name: "pointsCost",
                  type: "number",
                  min: 1,
                  defaultValue: initialData?.pointsCost ?? "",
                  placeholder: "10",
                  className: "bg-[var(--surface-container-lowest)] focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]",
                }}
              />
              <FormField
                label="Jumlah Stok"
                id="stock"
                required
                inputProps={{
                  name: "stock",
                  type: "number",
                  min: 0,
                  defaultValue: initialData !== undefined && initialData !== null ? initialData.stock : "",
                  placeholder: "50",
                  className: "bg-[var(--surface-container-lowest)] focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]",
                }}
              />
            </div>
          </div>

          {error && (
            <p className="text-xs font-semibold text-[var(--error)] bg-red-500/10 p-3 rounded-lg border border-red-500/25 animate-fade-in">
              ⚠️ {error}
            </p>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--outline-variant)] mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-[var(--rounded-md)] border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] hover:bg-[var(--surface-container-high)] text-[var(--on-surface)] text-xs font-bold py-2.5 px-4 cursor-pointer transition-all duration-200 disabled:opacity-50"
            >
              Batal
            </button>
            <Button
              type="submit"
              isLoading={isPending}
              className="!bg-[#4F46E5] hover:!bg-[#4338CA] text-white font-bold shrink-0 shadow-md border-0"
            >
              Simpan Reward
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
