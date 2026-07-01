"use client";

import { useState, useEffect } from "react";
import { PointChip } from "@/components/atoms/PointChip";
import { Gift, Calendar, X, Eye } from "lucide-react";

interface ClaimedReward {
  id: number;
  pointsSpent: number;
  status: string;
  createdAt: Date;
  rewardTitle: string;
  rewardDescription: string;
}

interface ClaimedRewardsListProps {
  claims: ClaimedReward[];
}

export function ClaimedRewardsList({ claims }: ClaimedRewardsListProps) {
  const [selectedClaim, setSelectedClaim] = useState<ClaimedReward | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedClaim) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedClaim]);

  if (claims.length === 0) {
    return (
      <div className="elevation-1 border border-dashed border-[var(--outline-variant)] rounded-[var(--rounded-xl)] p-8 text-center bg-[var(--surface-container-low)]">
        <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-3 w-12 h-12 flex items-center justify-center mx-auto text-slate-400 mb-3">
          <Gift className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold text-[var(--on-surface)]">Belum ada reward yang diklaim</p>
        <p className="text-xs text-[var(--on-surface-variant)] mt-1">
          Kumpulkan poin dari tugas/sertifikat dan tukarkan di katalog atas!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-lg)]">
        {claims.map((claim) => (
          <div
            key={claim.id}
            className="elevation-1 rounded-[var(--rounded-xl)] p-[var(--space-lg)] bg-[var(--surface-container-low)] border border-[var(--outline-variant)] flex flex-col justify-between gap-4 hover:shadow-[var(--shadow-hover)] transition-all duration-200 animate-fade-in"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/25">
                    SUCCESS
                  </span>
                  <span className="text-[10px] font-mono text-[var(--on-surface-variant)]">
                    ID: #{claim.id}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[var(--on-surface)] truncate">
                  {claim.rewardTitle}
                </h4>
                <p className="text-xs text-[var(--on-surface-variant)] mt-1.5 line-clamp-2 leading-relaxed">
                  {claim.rewardDescription}
                </p>
              </div>
              <div className="rounded-[var(--rounded-md)] bg-[var(--tertiary-fixed)] p-2 shrink-0">
                <Gift className="h-4.5 w-4.5 text-[var(--tertiary-container)]" />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--outline-variant)]/60 pt-3 mt-1">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-[var(--on-surface-variant)] flex items-center gap-1 font-medium">
                  <Calendar className="h-3 w-3" />
                  {new Date(claim.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="text-[10px] font-bold text-[var(--tertiary)]">
                  -{claim.pointsSpent} Poin
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedClaim(claim)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#4F46E5] hover:underline cursor-pointer transition-all"
              >
                <Eye className="h-3.5 w-3.5" />
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Claim Detail Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#091524]/60 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
            onClick={() => setSelectedClaim(null)}
          />

          {/* Modal Container */}
          <div className="relative bg-[var(--surface-container-low)] border border-[var(--outline-variant)] w-full max-w-md rounded-[var(--rounded-xl)] shadow-2xl flex flex-col z-10 animate-fade-in max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-[var(--outline-variant)]">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-extrabold text-[var(--on-surface)] flex items-center gap-2">
                  <Gift className="h-5 w-5 text-[var(--tertiary)]" />
                  Detail Klaim Reward
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedClaim(null)}
                  className="p-1.5 rounded-full hover:bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] transition-all cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col flex-1 overflow-y-auto p-6 gap-5">
              <div className="flex flex-col gap-4">
                {/* Reward Name & Status */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xs font-extrabold tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/25">
                      KLAIM BERHASIL
                    </span>
                    <span className="text-xs font-mono text-[var(--on-surface-variant)]">
                      Klaim ID: #{selectedClaim.id}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-[var(--on-surface)]">
                    {selectedClaim.rewardTitle}
                  </h4>
                </div>

                {/* Description */}
                <div className="bg-[var(--surface-container-lowest)] p-4 rounded-[var(--rounded-lg)] border border-[var(--outline-variant)]">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--on-surface-variant)] block mb-1">
                    Deskripsi Reward:
                  </span>
                  <p className="text-xs text-[var(--on-surface)] leading-relaxed font-medium">
                    {selectedClaim.rewardDescription}
                  </p>
                </div>

                {/* Details list */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[var(--surface-container-lowest)] p-3 rounded-[var(--rounded-lg)] border border-[var(--outline-variant)] flex flex-col gap-1">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-[var(--on-surface-variant)]">
                      Poin Ditukarkan
                    </span>
                    <div>
                      <PointChip points={selectedClaim.pointsSpent} size="sm" />
                    </div>
                  </div>

                  <div className="bg-[var(--surface-container-lowest)] p-3 rounded-[var(--rounded-lg)] border border-[var(--outline-variant)] flex flex-col gap-1">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-[var(--on-surface-variant)]">
                      Tanggal Klaim
                    </span>
                    <span className="text-xs font-bold text-[var(--on-surface)] flex items-center gap-1 mt-1 font-mono">
                      <Calendar className="h-3.5 w-3.5 text-[var(--on-surface-variant)]" />
                      {new Date(selectedClaim.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Voucher code simulation or info */}
                <div className="border border-dashed border-[var(--tertiary)]/40 bg-[var(--tertiary-fixed)]/5 p-4 rounded-[var(--rounded-lg)] text-center flex flex-col gap-2.5">
                  <span className="text-[10px] font-extrabold text-[var(--tertiary)] uppercase tracking-wider">
                    KODE VOUCHER / KUPON
                  </span>
                  <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] py-2.5 px-4 rounded font-mono text-sm font-black tracking-widest text-[var(--on-surface)] select-all cursor-pointer hover:bg-[var(--surface-container-low)] transition-colors">
                    TR-{selectedClaim.id.toString().padStart(4, "0")}-{Math.random().toString(36).substring(2, 6).toUpperCase()}
                  </div>
                  <p className="text-[10px] text-[var(--on-surface-variant)] font-medium">
                    Tunjukkan kode voucher di atas kepada Admin Kampus untuk penukaran fisik.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end pt-4 border-t border-[var(--outline-variant)] mt-2">
                <button
                  type="button"
                  onClick={() => setSelectedClaim(null)}
                  className="inline-flex items-center justify-center rounded-[var(--rounded-md)] border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] hover:bg-[var(--surface-container-high)] text-[var(--on-surface)] text-xs font-bold py-2.5 px-5 cursor-pointer transition-all duration-200"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
