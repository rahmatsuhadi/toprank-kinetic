"use client";

import { useState } from "react";
import Link from "next/link";
import { PointChip } from "@/components/atoms/PointChip";
import { Button } from "@/components/atoms/Button";
import {
  Search,
  Award,
  Briefcase,
  Zap,
  Clock,
  CheckCircle,
  HelpCircle,
  FileText,
  AlertCircle,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface Submission {
  id: number;
  title: string;
  type: string;
  status: string;
  pointsAwarded: number;
  createdAt: string;
  description: string | null;
  proofUrl: string | null;
  rejectionReason: string | null;
  certificateName?: string | null;
}

interface SubmissionsListContentProps {
  initialSubmissions: Submission[];
  totalPoints: number;
}

const statusColors: Record<string, string> = {
  pending: "bg-[var(--status-pending)]/10 text-[var(--status-pending)] border-[var(--status-pending)]/20",
  approved: "bg-[var(--success-green)]/10 text-[var(--success-green)] border-[var(--success-green)]/20",
  rejected: "bg-[var(--status-rejected)]/10 text-[var(--status-rejected)] border-[var(--status-rejected)]/20",
};

const statusLabels: Record<string, string> = {
  pending: "PENDING",
  approved: "VERIFIED",
  rejected: "REJECTED",
};

const typeLabels: Record<string, string> = {
  certificate: "Sertifikat",
  skill: "Skill / Keahlian",
  portfolio: "Portofolio",
};

const typeIcons: Record<string, React.ElementType> = {
  certificate: Award,
  skill: Zap,
  portfolio: Briefcase,
};

export function SubmissionsListContent({
  initialSubmissions,
  totalPoints,
}: SubmissionsListContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Filter submissions
  const filteredSubmissions = initialSubmissions.filter((sub) => {
    const matchesSearch = sub.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || sub.status === activeTab;
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "skill" && (sub.type === "skill" || sub.type === "certificate")) ||
      (selectedCategory === "portfolio" && sub.type === "portfolio");
    return matchesSearch && matchesTab && matchesCategory;
  });

  // Calculate stats
  const verifiedCount = initialSubmissions.filter((s) => s.status === "approved").length;
  const activeCount = initialSubmissions.filter((s) => s.status === "pending").length;

  // Tier calculation
  let currentTier = "Bronze Tier";
  let nextTier = "Silver Tier";
  let pointsNeeded = 250 - totalPoints;
  let progressPct = (totalPoints / 250) * 100;

  if (totalPoints >= 1500) {
    currentTier = "Diamond Tier";
    nextTier = "Max Tier reached";
    pointsNeeded = 0;
    progressPct = 100;
  } else if (totalPoints >= 750) {
    currentTier = "Gold Tier";
    nextTier = "Diamond Tier";
    pointsNeeded = 1500 - totalPoints;
    progressPct = ((totalPoints - 750) / 750) * 100;
  } else if (totalPoints >= 250) {
    currentTier = "Silver Tier";
    nextTier = "Gold Tier";
    pointsNeeded = 750 - totalPoints;
    progressPct = ((totalPoints - 250) / 500) * 100;
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-headline-lg text-[var(--on-surface)]">
            Pengajuanku (My Submissions)
          </h1>
          <p className="text-body-md text-[var(--on-surface-variant)]">
            Pantau status verifikasi dan perolehan poin keahlianmu di sini.
          </p>
        </div>
        <Link href="/mahasiswa/submissions/baru">
          <Button className="!bg-[#4F46E5] hover:!bg-[#4338CA] text-white">
            <Zap className="h-4 w-4" />
            + Submit Skill
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Search, Tabs, and List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Search and Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--outline)]" />
              <input
                type="text"
                placeholder="Cari pengajuan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-[var(--rounded-md)] border border-[var(--outline-variant)] bg-[var(--surface)] text-sm focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-[var(--rounded-md)] border border-[var(--outline-variant)] bg-[var(--surface)] text-sm focus:outline-none focus:border-[var(--primary)]"
            >
              <option value="all">Semua Kategori</option>
              <option value="skill">Skill / Keahlian</option>
              <option value="portfolio">Portofolio</option>
            </select>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-[var(--outline-variant)] pb-px">
            {(["all", "pending", "approved", "rejected"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-xs font-bold capitalize transition-all border-b-2 -mb-px ${activeTab === tab
                  ? "border-[#4F46E5] text-[#4F46E5]"
                  : "border-transparent text-[var(--on-surface-variant)] hover:text-[var(--on-surface)]"
                  }`}
              >
                {tab === "all" ? "Semua Pengajuan" : tab === "approved" ? "Disetujui" : tab === "pending" ? "Menunggu" : "Ditolak"}
              </button>
            ))}
          </div>

          {/* Submissions List */}
          <div className="flex flex-col gap-4">
            {filteredSubmissions.length === 0 ? (
              <div className="elevation-1 rounded-[var(--rounded-xl)] p-12 text-center bg-[var(--surface-container-low)]">
                <HelpCircle className="h-10 w-10 text-[var(--outline)] mx-auto mb-3" />
                <p className="text-sm font-medium text-[var(--on-surface)]">
                  Tidak ada pengajuan ditemukan
                </p>
                <p className="text-xs text-[var(--on-surface-variant)] mt-1">
                  Coba cari dengan kata kunci lain atau kirim pengajuan baru.
                </p>
              </div>
            ) : (
              filteredSubmissions.map((sub) => {
                const Icon = typeIcons[sub.type] || FileText;
                const isExpanded = expandedId === sub.id;
                return (
                  <div
                    key={sub.id}
                    className={`elevation-1 rounded-[var(--rounded-xl)] bg-[var(--surface-container-low)] border transition-all overflow-hidden ${sub.status === "rejected"
                      ? "border-red-200"
                      : sub.status === "pending"
                        ? "border-amber-200"
                        : "border-[var(--outline-variant)]"
                      }`}
                  >
                    <div className="p-5 flex items-center justify-between gap-4">
                      {/* Left: Info */}
                      <div className="flex items-start gap-3.5">
                        <div className="rounded-[var(--rounded-lg)] bg-[var(--surface-container-high)] p-3 text-[var(--primary)] shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[var(--on-surface)]">
                            {sub.type === "certificate" && sub.certificateName ? sub.certificateName : sub.title}
                          </h4>
                          {sub.type === "certificate" && sub.certificateName && (
                            <p className="text-xs font-semibold text-[#4F46E5] mt-0.5">
                              Bidang Skill: {sub.title}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--on-surface-variant)]">
                            <span className="flex items-center gap-1">
                              <Icon className="h-3 w-3" />
                              {typeLabels[sub.type] || sub.type}
                            </span>
                            <span>•</span>
                            <span>
                              {new Date(sub.createdAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Status and Points */}
                      <div className="flex items-center gap-4 shrink-0">
                        {/* Status Badge */}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border tracking-wider ${statusColors[sub.status] || "bg-gray-150"
                            }`}
                        >
                          {statusLabels[sub.status] || sub.status}
                        </span>

                        {/* Points Display */}
                        {sub.status === "approved" ? (
                          <div className="bg-black border border-yellow-500 rounded-[var(--rounded)] px-2.5 py-1 text-xs font-bold text-yellow-500 font-mono">
                            +{sub.pointsAwarded}
                          </div>
                        ) : (
                          <div className="bg-[var(--surface-container-high)] rounded-[var(--rounded)] px-2.5 py-1 text-xs font-bold text-[var(--outline)] font-mono">
                            ---
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                            className="text-xs text-[#4F46E5] font-bold hover:underline flex items-center gap-0.5"
                          >
                            Lihat Detail
                            <ChevronRight className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Panel */}
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-[var(--outline-variant)] pt-4 bg-[var(--surface-container-lowest)]/50 flex flex-col gap-4 text-sm">
                        {sub.description && (
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)]">
                              Deskripsi / Ringkasan:
                            </span>
                            <p className="mt-1 text-[var(--on-surface)] leading-relaxed">
                              {sub.description}
                            </p>
                          </div>
                        )}

                        {sub.proofUrl && (
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)]">
                              Link Bukti:
                            </span>
                            <a
                              href={sub.proofUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 flex items-center gap-1.5 text-xs text-[#4F46E5] hover:underline font-medium"
                            >
                              {sub.proofUrl}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        )}

                        {/* Rejection / Feedback box */}
                        {sub.status === "rejected" && (
                          <div className="bg-red-50/70 border border-red-200 rounded-[var(--rounded-lg)] p-4 flex flex-col gap-2 mt-2">
                            <div className="flex items-center justify-between text-xs text-red-700 font-bold">
                              <span className="flex items-center gap-1.5">
                                <AlertCircle className="h-4 w-4" />
                                FEEDBACK ADMIN
                              </span>
                              <span className="text-red-500 font-normal">Baru saja</span>
                            </div>
                            <p className="text-xs text-red-800 leading-normal italic">
                              "{sub.rejectionReason || "Bukti tautan tidak valid atau dokumen kurang jelas. Silakan ajukan ulang dengan bukti yang sesuai."}"
                            </p>
                            <Link href={`/mahasiswa/submissions/baru`} className="self-end">
                              <Button size="sm" className="!bg-red-600 hover:!bg-red-700 text-white text-[11px] py-1 px-3 mt-1">
                                Ajukan Ulang Sekarang
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Stats Overview & Pro Tip */}
        <div className="flex flex-col gap-6">
          {/* Stats Overview */}
          <div className="elevation-1 rounded-[var(--rounded-xl)] p-6 bg-[var(--surface-container-low)] flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[var(--on-surface)]">
              Stats Overview
            </h3>

            {/* Stat Item 1 */}
            <div className="flex items-center justify-between bg-[var(--surface)] p-3 rounded-[var(--rounded-md)] border border-[var(--outline-variant)]">
              <div className="flex items-center gap-2.5">
                <div className="rounded-[var(--rounded-md)] bg-[var(--success-green)]/15 p-2 text-[var(--success-green)]">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-xs text-[var(--on-surface-variant)]">Terverifikasi</span>
              </div>
              <span className="text-sm font-bold text-[var(--on-surface)] font-mono">{verifiedCount}</span>
            </div>

            {/* Stat Item 2 */}
            <div className="flex items-center justify-between bg-[var(--surface)] p-3 rounded-[var(--rounded-md)] border border-[var(--outline-variant)]">
              <div className="flex items-center gap-2.5">
                <div className="rounded-[var(--rounded-md)] bg-amber-500/15 p-2 text-amber-600">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="text-xs text-[var(--on-surface-variant)]">Sedang Diproses</span>
              </div>
              <span className="text-sm font-bold text-[var(--on-surface)] font-mono">{activeCount}</span>
            </div>

            {/* Total Earned Card */}
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[var(--rounded-lg)] p-4 text-white flex flex-col gap-1 mt-1">
              <span className="text-[9px] font-bold tracking-wider opacity-60 uppercase">TOTAL EARNED</span>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 shrink-0" />
                  <span className="text-2xl font-extrabold font-mono text-yellow-500">{totalPoints.toLocaleString()}</span>
                </div>
                <span className="text-[10px] font-semibold opacity-85 uppercase">POINTS</span>
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  );
}
