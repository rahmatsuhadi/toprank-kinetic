import type { Metadata } from "next";
import { getMySubmissions } from "@/actions/submissions";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import { SubmissionsListContent } from "@/components/organisms/SubmissionsListContent";

export const metadata: Metadata = {
  title: "Pengajuanku — Kinetic Academy",
};

export default async function SubmissionsPage() {
  const session = await getCurrentUser();
  if (!session) redirect("/login");

  const subs = await getMySubmissions();

  return (
    <SubmissionsListContent
      initialSubmissions={subs.map((s) => ({
        id: s.id,
        title: s.title,
        type: s.type,
        status: s.status,
        pointsAwarded: s.pointsAwarded,
        createdAt: s.createdAt.toISOString(),
        description: s.description,
        proofUrl: s.proofUrl,
        rejectionReason: s.rejectionReason,
        certificateName: s.certificateName,
      }))}
      totalPoints={session.user.totalPoints ?? 0}
    />
  );
}
