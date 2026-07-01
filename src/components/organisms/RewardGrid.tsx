"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { claimReward } from "@/actions/rewards";
import { RewardCard } from "@/components/molecules/RewardCard";

interface Reward {
  id: number;
  title: string;
  description: string;
  pointsCost: number;
  stock: number;
}

interface RewardGridProps {
  rewards: Reward[];
  userPoints: number;
}

export function RewardGrid({ rewards, userPoints }: RewardGridProps) {
  const [claimingId, setClaimingId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClaim(id: number) {
    setClaimingId(id);
    startTransition(async () => {
      const result = await claimReward(id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Reward berhasil diklaim! 🎉");
        router.refresh();
      }
      setClaimingId(null);
    });
  }

  if (rewards.length === 0) {
    return (
      <div className="elevation-1 rounded-[var(--rounded-lg)] p-12 text-center">
        <p className="text-[var(--on-surface-variant)]">
          Belum ada reward tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-lg)]">
      {rewards.map((r) => (
        <RewardCard
          key={r.id}
          {...r}
          userPoints={userPoints}
          onClaim={handleClaim}
          isClaiming={isPending && claimingId === r.id}
        />
      ))}
    </div>
  );
}
