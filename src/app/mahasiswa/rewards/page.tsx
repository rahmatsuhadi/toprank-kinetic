import type { Metadata } from "next";
import { getRewards } from "@/actions/rewards";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import { RewardGrid } from "@/components/organisms/RewardGrid";
import { PointChip } from "@/components/atoms/PointChip";

export const metadata: Metadata = {
  title: "Reward Catalog — Kinetic Academy",
};

export default async function StudentRewardsPage() {
  const session = await getCurrentUser();
  if (!session) redirect("/login");

  const rewards = await getRewards();
  const userPoints = session.user.totalPoints ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-headline-lg">Reward Catalog</h1>
          <p className="text-body-md text-[var(--on-surface-variant)] mt-1">
            Tukarkan poin-mu dengan reward menarik!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--on-surface-variant)]">Poin kamu:</span>
          <PointChip points={userPoints} size="lg" />
        </div>
      </div>
      <RewardGrid rewards={rewards} userPoints={userPoints} />
    </div>
  );
}
