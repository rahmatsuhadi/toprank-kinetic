import type { Metadata } from "next";
import { getRewards } from "@/actions/rewards";
import { RewardManager } from "@/components/organisms/RewardManager";

export const metadata: Metadata = {
  title: "Reward Management — Kinetic Academy",
};

export default async function AdminRewardsPage() {
  const rewards = await getRewards();
  return (
    <div className="flex flex-col gap-6">
      <RewardManager rewards={rewards} />
    </div>
  );
}
