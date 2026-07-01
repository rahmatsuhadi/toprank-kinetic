"use client";

import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { Check, AlertTriangle, AlertCircle, Info } from "lucide-react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: "info" | "success" | "warning" | "danger";
  isLoading?: boolean;
}

const typeConfig = {
  info: {
    icon: Info,
    iconBg: "bg-[#006591]/10 text-[#006591]",
    confirmBtnClass: "!bg-[#006591] hover:!bg-[#004e70]",
  },
  success: {
    icon: Check,
    iconBg: "bg-[#10B981]/15 text-[#10B981]",
    confirmBtnClass: "!bg-[#10B981] hover:!bg-[#059669]",
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-[#F59E0B]/15 text-[#D97706]",
    confirmBtnClass: "!bg-[#F59E0B] hover:!bg-[#D97706]",
  },
  danger: {
    icon: AlertCircle,
    iconBg: "bg-[#EF4444]/15 text-[#EF4444]",
    confirmBtnClass: "!bg-[#EF4444] hover:!bg-[#DC2626]",
  },
};

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Ya, Lanjutkan",
  cancelLabel = "Batal",
  type = "info",
  isLoading = false,
}: ConfirmationDialogProps) {
  // Prevent background scrolling when open
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

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0b1c30]/40 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Dialog container */}
      <div className="relative bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] w-full max-w-md rounded-[var(--rounded-xl)] shadow-2xl p-6 flex flex-col gap-5 z-10 animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-[var(--rounded-lg)] shrink-0 ${config.iconBg}`}>
            <IconComponent className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-md font-extrabold text-[var(--on-surface)] leading-snug">
              {title}
            </h3>
            <div className="text-xs text-[var(--on-surface-variant)] mt-2 leading-relaxed font-medium">
              {message}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--outline-variant)]">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-[var(--rounded-md)] border border-[var(--outline-variant)] bg-transparent hover:bg-[var(--surface-container-high)] text-[var(--on-surface)] text-xs font-bold py-2.5 px-4 cursor-pointer transition-all duration-200 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <Button
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
            className={`font-bold text-white shrink-0 shadow-sm ${config.confirmBtnClass}`}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
