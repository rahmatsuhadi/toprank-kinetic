import type { Metadata } from "next";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import { getMySubmissions } from "@/actions/submissions";
import { getLeaderboard } from "@/actions/leaderboard";
import { DashboardContent } from "./DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard — Kinetic Academy",
};

export default async function StudentDashboardPage() {
  const session = await getCurrentUser();
  if (!session) redirect("/login");

  const submissions = await getMySubmissions();
  const { leaderboard } = await getLeaderboard();

  const approvedSubs = submissions.filter((s) => s.status === "approved");
  const pendingSubs = submissions.filter((s) => s.status === "pending");
  const verifiedSkills = approvedSubs.filter((s) => s.type === "skill" || s.type === "certificate");
  const portfolioProjects = approvedSubs.filter((s) => s.type === "portfolio");

  // Find user rank
  const myRank = leaderboard.findIndex((u) => u.id === session.user.id) + 1;

  return (
    <DashboardContent
      userName={session.user.name}
      totalPoints={session.user.totalPoints ?? 0}
      verifiedSkillsCount={verifiedSkills.length}
      portfolioCount={portfolioProjects.length}
      leaderboardRank={myRank || 99}
      submissions={submissions.slice(0, 5).map((s) => ({
        id: s.id,
        title: s.title,
        type: s.type,
        status: s.status,
        pointsAwarded: s.pointsAwarded,
        createdAt: s.createdAt.toISOString(),
        certificateName: s.certificateName,
      }))}
      topSkills={verifiedSkills.slice(0, 4).map((s) => ({
        name: s.title,
        points: s.pointsAwarded,
      }))}
    />
  );
}
