import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { AdminDashboardLayout } from "@/components/templates/AdminDashboardLayout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();

  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/mahasiswa/dashboard");

  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
