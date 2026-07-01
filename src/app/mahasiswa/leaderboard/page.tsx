import type { Metadata } from "next";
import { getLeaderboard } from "@/actions/leaderboard";
import { LeaderboardTable } from "@/components/organisms/LeaderboardTable";

export const metadata: Metadata = {
  title: "Leaderboard — Kinetic Academy",
};

export default async function LeaderboardPage() {
  const data = await getLeaderboard();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-headline-lg">Leaderboard</h1>
        <p className="text-body-md text-[var(--on-surface-variant)] mt-1">
          Top 50 mahasiswa dengan poin tertinggi.
        </p>
      </div>
      <LeaderboardTable
        leaderboard={data.leaderboard}
        currentUser={data.currentUser}
      />
    </div>
  );
}
