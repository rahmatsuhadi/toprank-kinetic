"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { approveSubmission, rejectSubmission } from "@/actions/submissions";
import { toast } from "sonner";
import { Check, X, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface Submission {
  id: number;
  title: string;
  type: "skill" | "portfolio" | "certificate";
  description: string | null;
  proofUrl: string;
  certificateLevel: string | null;
  portfolioLevel: string | null;
  status: string;
  createdAt: Date;
  userName: string;
  userNim: string | null;
}

interface SubmissionTableProps {
  submissions: Submission[];
}

const typeLabels: Record<string, string> = {
  skill: "Skill",
  portfolio: "Portfolio",
  certificate: "Sertifikat",
};

export function SubmissionTable({
  submissions: initialSubmissions,
}: SubmissionTableProps) {
  const [items, setItems] = useState(initialSubmissions);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleApprove(id: number) {
    startTransition(async () => {
      const result = await approveSubmission(id);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(`Disetujui! +${result.pointsAwarded} poin diberikan.`);
      setItems((prev) => prev.filter((s) => s.id !== id));
    });
  }

  function handleReject(id: number) {
    if (!rejectReason.trim()) {
      toast.error("Alasan penolakan wajib diisi.");
      return;
    }
    startTransition(async () => {
      const result = await rejectSubmission(id, rejectReason);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Pengajuan ditolak.");
      setItems((prev) => prev.filter((s) => s.id !== id));
      setRejectingId(null);
      setRejectReason("");
    });
  }

  if (items.length === 0) {
    return (
      <div className="elevation-1 rounded-[var(--rounded-lg)] p-12 text-center">
        <p className="text-[var(--on-surface-variant)]">
          Tidak ada pengajuan yang menunggu verifikasi. 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((sub) => (
        <div
          key={sub.id}
          className="elevation-1 rounded-[var(--rounded-lg)] overflow-hidden animate-fade-in"
        >
          {/* Row */}
          <div className="p-[var(--space-md)] flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--on-surface)] truncate">
                {sub.title}
              </p>
              <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">
                {sub.userName} ({sub.userNim ?? "—"}) ·{" "}
                {typeLabels[sub.type] ?? sub.type}
                {sub.certificateLevel ? ` · ${sub.certificateLevel.toUpperCase()}` : ""}
                {sub.portfolioLevel ? ` · ${sub.portfolioLevel.toUpperCase()}` : ""}
              </p>
            </div>

            <a
              href={sub.proofUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary-container)] hover:underline text-xs flex items-center gap-1 shrink-0"
            >
              Bukti <ExternalLink className="h-3 w-3" />
            </a>

            <button
              type="button"
              onClick={() =>
                setExpandedId(expandedId === sub.id ? null : sub.id)
              }
              className="p-1 rounded hover:bg-[var(--surface-container)] transition-colors"
            >
              {expandedId === sub.id ? (
                <ChevronUp className="h-4 w-4 text-[var(--on-surface-variant)]" />
              ) : (
                <ChevronDown className="h-4 w-4 text-[var(--on-surface-variant)]" />
              )}
            </button>
          </div>

          {/* Expanded panel */}
          {expandedId === sub.id ? (
            <div className="border-t border-[var(--outline-variant)] px-[var(--space-md)] py-[var(--space-md)] bg-[var(--surface-container-low)]">
              {sub.description ? (
                <p className="text-sm text-[var(--on-surface-variant)] mb-4">
                  {sub.description}
                </p>
              ) : null}

              {rejectingId === sub.id ? (
                <div className="flex flex-col gap-3 mb-4">
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Tulis alasan penolakan..."
                    className="w-full rounded-[var(--rounded-md)] border border-[var(--outline-variant)] bg-white px-3 py-2 text-sm resize-none focus:outline-none focus:border-[var(--error)] focus:ring-2 focus:ring-[var(--error)]/20"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleReject(sub.id)}
                      isLoading={isPending}
                    >
                      Kirim Penolakan
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setRejectingId(null);
                        setRejectReason("");
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleApprove(sub.id)}
                    isLoading={isPending}
                  >
                    <Check className="h-3.5 w-3.5" />
                    Setujui
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setRejectingId(sub.id)}
                  >
                    <X className="h-3.5 w-3.5" />
                    Tolak
                  </Button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
