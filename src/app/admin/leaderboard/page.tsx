import type { Metadata } from "next";
import { getLeaderboard } from "@/actions/leaderboard";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import { LeaderboardTable } from "@/components/organisms/LeaderboardTable";

export const metadata: Metadata = {
  title: "Leaderboard Mahasiswa — Kinetic Academy",
};

export default async function AdminLeaderboardPage() {
  const session = await getCurrentUser();
  if (!session || session.user.role !== "admin") redirect("/login");

  const data = await getLeaderboard();

  return (
    <div className="flex flex-col gap-6">
      <LeaderboardTable
        leaderboard={data.leaderboard}
        isAdmin={true}
      />
    </div>
  );
}
