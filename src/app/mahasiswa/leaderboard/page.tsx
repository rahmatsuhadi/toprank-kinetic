import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { getLeaderboard } from "@/actions/leaderboard";
import { LeaderboardTable } from "@/components/organisms/LeaderboardTable";

export const metadata: Metadata = {
  title: "Papan Peringkat — Kinetic Academy",
};

export default async function LeaderboardPage() {
  const session = await getCurrentUser();
  if (!session) redirect("/login");

  const data = await getLeaderboard();

  return (
    <div className="flex flex-col gap-6">
      <LeaderboardTable
        leaderboard={data.leaderboard}
        currentUser={data.currentUser}
        sessionUser={{
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          nim: (session.user.nim as string) ?? null,
          totalPoints: session.user.totalPoints ?? 0,
        }}
      />
    </div>
  );
}
