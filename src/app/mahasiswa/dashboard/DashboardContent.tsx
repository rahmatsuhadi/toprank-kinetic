"use client";

import { PointChip } from "@/components/atoms/PointChip";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import {
  Star,
  BadgeCheck,
  Briefcase,
  Trophy,
  ArrowRight,
  Sparkles,
  TrendingUp,
  FileText,
  Award,
  Plus,
  Zap,
} from "lucide-react";

interface DashboardContentProps {
  userName: string;
  totalPoints: number;
  verifiedSkillsCount: number;
  portfolioCount: number;
  leaderboardRank: number;
  submissions: {
    id: number;
    title: string;
    type: string;
    status: string;
    pointsAwarded: number;
    createdAt: string;
    certificateName?: string | null;
  }[];
  topSkills: { name: string; points: number }[];
}

const statusMap = {
  pending: "pending",
  approved: "verified",
  rejected: "rejected",
} as const;

const statusLabels: Record<string, string> = {
  pending: "Menunggu",
  approved: "Disetujui",
  rejected: "Ditolak",
};

const typeIcons: Record<string, React.ElementType> = {
  skill: Briefcase,
  portfolio: FileText,
  certificate: Award,
};

const activityColors: Record<string, string> = {
  approved: "bg-[var(--success-green)]",
  pending: "bg-[var(--status-pending)]",
  rejected: "bg-[var(--status-rejected)]",
};

export function DashboardContent({
  userName,
  totalPoints,
  verifiedSkillsCount,
  portfolioCount,
  leaderboardRank,
  submissions,
  topSkills,
}: DashboardContentProps) {
  const firstName = userName.split(" ")[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="relative rounded-[var(--rounded-xl)] overflow-hidden bg-gradient-to-r from-[var(--primary-container)] via-[var(--primary)] to-[var(--secondary)] p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60" />
        <div className="relative z-10 flex-1">
          <h1 className="text-headline-lg-mobile sm:text-headline-lg">
            Welcome back, {firstName}!
          </h1>
          <p className="text-white/70 text-body-md mt-1 max-w-lg">
            Portofoliomu terus berkembang. Terus tingkatkan skill dan raih lebih banyak poin!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="relative z-10 flex gap-3 shrink-0 self-start sm:self-center">
          <Link href="/mahasiswa/submissions">
            <Button variant="secondary" size="sm" className="!border-white/30 !text-white hover:!bg-white/15">
              <Plus className="h-3.5 w-3.5" />
              Ajukan Baru
            </Button>
          </Link>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatItem
          icon={Star}
          label="Total Poin"
          value={totalPoints.toLocaleString()}
          iconBg="bg-[var(--reward-gold)]/15"
          iconColor="text-[var(--reward-gold)]"
        />
        <StatItem
          icon={BadgeCheck}
          label="Skill Terverifikasi"
          value={String(verifiedSkillsCount)}
          iconBg="bg-[var(--success-green)]/15"
          iconColor="text-[var(--success-green)]"
        />
        <StatItem
          icon={Briefcase}
          label="Portfolio"
          value={String(portfolioCount)}
          iconBg="bg-[var(--secondary-container)]/15"
          iconColor="text-[var(--secondary)]"
        />
        <StatItem
          icon={Trophy}
          label="Peringkat"
          value={`#${leaderboardRank}`}
          iconBg="bg-[var(--primary-fixed)]"
          iconColor="text-[var(--primary-container)]"
          isRank
        />
      </div>

      {/* Middle Row: Rank Progression + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Rank Progression */}
        <div className="lg:col-span-3 elevation-1 rounded-[var(--rounded-xl)] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[var(--on-surface)]">
                Progres Peringkat
              </h3>
              <p className="text-xs text-[var(--on-surface-variant)]">
                Jalur menuju Platinum Innovator
              </p>
            </div>
            <div className="text-right">
              <span className="text-point-display text-[var(--primary-container)]">
                {totalPoints.toLocaleString()}
              </span>
              <p className="text-xs text-[var(--on-surface-variant)]">
                Poin saat ini
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative mt-4">
            <div className="flex justify-between text-xs text-[var(--on-surface-variant)] mb-2">
              <span>Pemula</span>
              <span>Terampil</span>
              <span>Platinum</span>
            </div>
            <div className="h-3 bg-[var(--surface-container)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--primary-container)] to-[var(--secondary-container)] rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min((totalPoints / 100) * 100, 100)}%`,
                }}
              />
            </div>
            {/* Markers */}
            <div className="flex justify-between mt-2">
              {[
                { label: "0", pos: "0%" },
                { label: "25", pos: "25%" },
                { label: "50", pos: "50%" },
                { label: "100", pos: "100%" },
              ].map((m) => (
                <span key={m.label} className="text-xs text-[var(--outline)] font-mono">
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          {/* Quick stat pills */}
          <div className="flex gap-3 mt-6">
            <div className="flex-1 bg-[var(--success-green)]/10 rounded-[var(--rounded-lg)] p-3 text-center">
              <p className="text-xs text-[var(--success-green)] font-semibold">
                Skill Terverifikasi
              </p>
              <p className="text-lg font-bold text-[var(--success-green)] mt-1">
                {verifiedSkillsCount}
              </p>
            </div>
            <div className="flex-1 bg-[var(--status-pending)]/10 rounded-[var(--rounded-lg)] p-3 text-center">
              <p className="text-xs text-[var(--status-pending)] font-semibold">
                Menunggu Review
              </p>
              <p className="text-lg font-bold text-[var(--status-pending)] mt-1">
                {submissions.filter((s) => s.status === "pending").length}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 elevation-1 rounded-[var(--rounded-xl)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[var(--on-surface)]">
              Aktivitas Terbaru
            </h3>
            <Link
              href="/mahasiswa/submissions"
              className="text-xs text-[var(--primary-container)] font-semibold hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          {submissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Zap className="h-8 w-8 text-[var(--outline-variant)] mb-2" />
              <p className="text-sm text-[var(--on-surface-variant)]">
                Belum ada aktivitas
              </p>
              <Link href="/mahasiswa/submissions">
                <Button size="sm" className="mt-3">
                  Mulai Ajukan
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {submissions.map((sub) => {
                const Icon = typeIcons[sub.type] ?? FileText;
                return (
                  <div key={sub.id} className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${activityColors[sub.status] ?? "bg-[var(--outline)]"}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--on-surface)] truncate">
                        {sub.type === "certificate" && sub.certificateName ? sub.certificateName : sub.title}
                      </p>
                      {sub.type === "certificate" && sub.certificateName && (
                        <p className="text-[10px] font-semibold text-[#4F46E5] mt-0.5">
                          Bidang Skill: {sub.title}
                        </p>
                      )}
                      <p className="text-xs text-[var(--on-surface-variant)]">
                        {statusLabels[sub.status] ?? sub.status} ·{" "}
                        {new Date(sub.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    {sub.status === "approved" && sub.pointsAwarded > 0 ? (
                      <PointChip points={sub.pointsAwarded} size="sm" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Top Skills */}

    </div>
  );
}

/* ─── Sub-component: StatItem ─────────────────────────── */
function StatItem({
  icon: Icon,
  label,
  value,
  iconBg,
  iconColor,
  isRank,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  iconBg: string;
  iconColor: string;
  isRank?: boolean;
}) {
  return (
    <div className="elevation-1 rounded-[var(--rounded-xl)] p-5 flex items-center gap-4 hover:shadow-[var(--shadow-hover)] transition-all duration-200">
      <div className={`rounded-[var(--rounded-lg)] p-3 ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-label-caps text-[var(--on-surface-variant)]">{label}</p>
        <p
          className={`mt-0.5 font-bold ${isRank ? "text-headline-md text-[var(--primary-container)]" : "text-headline-md text-[var(--on-surface)]"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
