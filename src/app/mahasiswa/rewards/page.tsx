import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { getMyClaims, getRewards } from "@/actions/rewards";
import { PointChip } from "@/components/atoms/PointChip";
import { ClaimedRewardsList } from "@/components/organisms/ClaimedRewardsList";
import { RewardGrid } from "@/components/organisms/RewardGrid";

export const metadata: Metadata = {
  title: "Reward Catalog — Kinetic Academy",
};

export default async function StudentRewardsPage() {
  const session = await getCurrentUser();
  if (!session) redirect("/login");

  const rewards = await getRewards();
  const myClaims = await getMyClaims();
  const userPoints = session.user.totalPoints ?? 0;

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-headline-lg">Reward Catalog</h1>
          <p className="text-body-md text-[var(--on-surface-variant)] mt-1">
            Tukarkan poin-mu dengan reward menarik!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--on-surface-variant)]">
            Poin kamu:
          </span>
          <PointChip points={userPoints} size="lg" />
        </div>
      </div>
      <RewardGrid rewards={rewards} userPoints={userPoints} />

      {/* Claimed Rewards Section */}
      <div className="border-t border-[var(--outline-variant)]/60 pt-8 mt-4 flex flex-col gap-4">
        <div>
          <h2 className="text-title-lg font-bold text-[var(--on-surface)]">
            Riwayat Klaim Reward
          </h2>
          <p className="text-xs text-[var(--on-surface-variant)] mt-1">
            Daftar voucher dan reward yang sudah berhasil kamu klaim.
          </p>
        </div>
        <ClaimedRewardsList claims={myClaims} />
      </div>
    </div>
  );
}
