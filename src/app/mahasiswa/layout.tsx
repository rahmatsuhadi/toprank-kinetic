import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { StudentDashboardLayout } from "@/components/templates/StudentDashboardLayout";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();

  if (!session) redirect("/login");
  if (session.user.role === "admin") redirect("/admin/dashboard");

  return (
    <StudentDashboardLayout
      userName={session.user.name}
      userPoints={session.user.totalPoints ?? 0}
    >
      {children}
    </StudentDashboardLayout>
  );
}
