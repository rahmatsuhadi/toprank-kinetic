import {
  Award,
  Briefcase,
  CheckCircle,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getDashboardStats } from "@/actions/students";
import { getPendingSubmissions } from "@/actions/submissions";
import { Badge } from "@/components/atoms/Badge";
import { StatCard } from "@/components/molecules/StatCard";

export const metadata: Metadata = {
  title: "Dashboard Admin — Kinetic Academy",
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const pending = await getPendingSubmissions();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-headline-lg">Dashboard</h1>
        <p className="text-body-md text-[var(--on-surface-variant)] mt-1">
          Pantau aktivitas ekosistem talenta mahasiswa.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-lg)]">
        <StatCard
          title="Total Mahasiswa"
          value={stats?.totalStudents ?? 0}
          icon={Users}
        />
        <StatCard
          title="Total Pengajuan"
          value={stats?.totalSubmissions ?? 0}
          icon={FileText}
        />
        <StatCard
          title="Menunggu Verifikasi"
          value={stats?.pendingVerifications ?? 0}
          icon={ShieldCheck}
        />
        <StatCard
          title="Total Disetujui"
          value={stats?.approvedSubmissions ?? 0}
          icon={CheckCircle}
        />
        <StatCard
          title="Skill Terverifikasi"
          value={stats?.verifiedSkills ?? 0}
          icon={Award}
        />
        <StatCard
          title="Proyek Terverifikasi"
          value={stats?.verifiedPortfolios ?? 0}
          icon={Briefcase}
        />
      </div>

      {/* Recent Pending */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-headline-md">Pengajuan Terbaru</h2>
          <Link
            href="/admin/verifikasi"
            className="text-sm text-[var(--primary-container)] font-semibold hover:underline"
          >
            Lihat Semua →
          </Link>
        </div>

        {pending.length === 0 ? (
          <div className="elevation-1 rounded-[var(--rounded-lg)] p-8 text-center">
            <p className="text-[var(--on-surface-variant)]">
              Semua pengajuan sudah diverifikasi. 🎉
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pending.slice(0, 5).map((sub) => (
              <div
                key={sub.id}
                className="elevation-1 rounded-[var(--rounded-lg)] p-[var(--space-md)] flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{sub.title}</p>
                  <p className="text-xs text-[var(--on-surface-variant)]">
                    {sub.userName} · {sub.type}
                  </p>
                </div>
                <Badge status="pending">Menunggu</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
