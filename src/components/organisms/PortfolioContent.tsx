"use client";

import {
  Award,
  Briefcase,
  Edit2,
  ExternalLink,
  Grid,
  List,
  Mail,
  MapPin,
  Share2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/atoms/Button";

interface Submission {
  id: number;
  title: string;
  type: string;
  status: string;
  pointsAwarded: number;
  createdAt: string;
  description: string | null;
  proofUrl: string | null;
  certificateName?: string | null;
  certificateLevel?: string | null;
}

interface PortfolioContentProps {
  user: {
    id: string;
    name: string;
    email: string;
    nim: string | null;
    bio: string | null;
    prodi: string | null;
    angkatan: string | null;
    socialLinks: Record<string, string>;
    totalPoints: number;
    rank?: number;
  };
  submissions: Submission[];
  isAdminView?: boolean;
}

const _levelMappings: Record<string, { label: string; pct: number }> = {
  lokal: { label: "Lokal", pct: 30 },
  regional: { label: "Regional", pct: 60 },
  nasional: { label: "Nasional", pct: 85 },
  internasional: { label: "Internasional", pct: 95 },
  personal: { label: "Personal", pct: 40 },
  freelance: { label: "Freelance", pct: 75 },
  industri: { label: "Industri", pct: 95 },
};

export function PortfolioContent({
  user,
  submissions,
  isAdminView,
}: PortfolioContentProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extract skills (verified only)
  const verifiedSkills = submissions.filter(
    (s) =>
      s.status === "approved" &&
      (s.type === "skill" || s.type === "certificate"),
  );

  // Extract certificates (verified only)
  const verifiedCertificates = submissions.filter(
    (s) => s.status === "approved" && s.type === "certificate",
  );

  // Extract portfolios (verified only)
  const portfolioProjects = submissions.filter(
    (s) => s.status === "approved" && s.type === "portfolio",
  );

  // Resolve user location from socialLinks JSON
  const userLocation = user.socialLinks.location ?? "Jakarta, Indonesia";

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-12">
      {/* 1. Header Card (Portofolio Talenta) */}
      <div className="relative elevation-1 rounded-[var(--rounded-xl)] bg-[var(--surface-container-low)] p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="h-28 w-28 rounded-full border-4 border-white shadow-md bg-gradient-to-tr from-[#4F46E5] to-[#818CF8] flex items-center justify-center text-white text-4xl font-extrabold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className="absolute bottom-1 right-1 bg-green-500 border-2 border-white rounded-full p-1.5 shadow" />
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-headline-lg font-bold text-[var(--on-surface)] flex items-center justify-center md:justify-start gap-2">
                {user.name}
              </h1>
              <p className="text-sm font-semibold text-[#4F46E5] mt-0.5">
                {[
                  user.nim,
                  user.prodi || "Mahasiswa",
                  user.angkatan ? `Angkatan ${user.angkatan}` : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 justify-center">
              {/* <button
                type="button"
                className="p-2 border border-[var(--outline-variant)] rounded-[var(--rounded-md)] hover:bg-[var(--surface-container-high)] text-[var(--on-surface-variant)]"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Tautan profil berhasil disalin ke clipboard!");
                }}
              >
                <Share2 className="h-4 w-4" />
              </button> */}
              {!isAdminView && (
                <Link href="/mahasiswa/profil/edit">
                  <Button className="!bg-[#4F46E5] hover:!bg-[#4338CA] text-white flex items-center gap-1.5">
                    <Edit2 className="h-3.5 w-3.5" />
                    Edit Profil
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <p className="text-sm text-[var(--on-surface-variant)] mt-4 max-w-2xl leading-relaxed">
            {user.bio ||
              "Belum ada bio. Ceritakan keahlian dan minat belajarmu di sini!"}
          </p>

          {/* Social and Location Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4 text-xs text-[var(--on-surface-variant)]">
            <span className="flex items-center gap-1 bg-[var(--surface-container-high)] px-3 py-1.5 rounded-full border border-[var(--outline-variant)]">
              <MapPin className="h-3.5 w-3.5 text-[#4F46E5]" />
              {userLocation}
            </span>
            <span className="flex items-center gap-1 bg-[var(--surface-container-high)] px-3 py-1.5 rounded-full border border-[var(--outline-variant)]">
              <Mail className="h-3.5 w-3.5 text-[#4F46E5]" />
              {user.email}
            </span>
            {user.socialLinks.github && (
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-[var(--surface-container-high)] hover:bg-[var(--surface-container-highest)] px-3 py-1.5 rounded-full border border-[var(--outline-variant)]"
              >
                <ExternalLink className="h-3.5 w-3.5 text-[#4F46E5]" />
                GitHub
              </a>
            )}
            {user.socialLinks.linkedin && (
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-[var(--surface-container-high)] hover:bg-[var(--surface-container-highest)] px-3 py-1.5 rounded-full border border-[var(--outline-variant)]"
              >
                <ExternalLink className="h-3.5 w-3.5 text-[#4F46E5]" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Verified Sections + Talent Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Verified Skills & Certificates */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Keahlian Terverifikasi (Verified Skills) */}
          <div className="elevation-1 rounded-[var(--rounded-xl)] p-6 bg-[var(--surface-container-low)] flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[var(--outline-variant)] pb-3">
              <h3 className="text-sm font-bold text-[var(--on-surface)] uppercase tracking-wider flex items-center gap-2">
                <Zap className="h-4.5 w-4.5 text-[#4F46E5]" />
                Keahlian Terverifikasi
              </h3>
              {!isAdminView && (
                <Link
                  href="/mahasiswa/submissions"
                  className="text-xs font-semibold text-[#4F46E5] hover:underline"
                >
                  Kelola Keahlian →
                </Link>
              )}
            </div>

            {verifiedSkills.length === 0 ? (
              <p className="text-xs text-[var(--on-surface-variant)] py-4 text-center">
                Belum ada keahlian terverifikasi. Silakan ajukan keahlianmu di
                tab Pengajuan!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {verifiedSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-[var(--rounded-lg)] bg-[var(--surface)] border border-[var(--outline-variant)] flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="rounded-[var(--rounded-md)] bg-[#4F46E5]/10 p-2 text-[#4F46E5]">
                          <Zap className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-[var(--on-surface)] truncate max-w-[150px]">
                          {skill.title}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded border border-green-200">
                        Aktif
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sertifikat Terverifikasi (Verified Certificates) */}
          <div className="elevation-1 rounded-[var(--rounded-xl)] p-6 bg-[var(--surface-container-low)] flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-[var(--outline-variant)] pb-3">
              <h3 className="text-sm font-bold text-[var(--on-surface)] uppercase tracking-wider flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-[#4F46E5]" />
                Sertifikasi Terverifikasi
              </h3>
              {!isAdminView && (
                <Link
                  href="/mahasiswa/submissions"
                  className="text-xs font-semibold text-[#4F46E5] hover:underline"
                >
                  Kelola Sertifikat →
                </Link>
              )}
            </div>

            {verifiedCertificates.length === 0 ? (
              <p className="text-xs text-[var(--on-surface-variant)] py-4 text-center">
                Belum ada sertifikasi terverifikasi. Silakan ajukan sertifikatmu
                di tab Pengajuan!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {verifiedCertificates.map((cert) => {
                  return (
                    <div
                      key={cert.id}
                      className="p-4 rounded-[var(--rounded-lg)] bg-[var(--surface)] border border-[var(--outline-variant)] flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-[var(--rounded-md)] bg-[#4F46E5]/10 p-2 text-[#4F46E5]">
                            <Award className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-[var(--on-surface)] truncate max-w-[150px]">
                              {cert.certificateName || cert.title}
                            </span>
                            {cert.certificateName && (
                              <span className="text-[10px] font-semibold text-[#4F46E5] truncate max-w-[150px]">
                                Bidang Skill: {cert.title}
                              </span>
                            )}
                          </div>
                        </div>
                        {cert.certificateLevel && (
                          <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200 uppercase">
                            {cert.certificateLevel}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[var(--on-surface-variant)] font-semibold mt-1">
                        <span>Poin: +{cert.pointsAwarded} Poin</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Talent Status */}
        <div className="rounded-[var(--rounded-xl)] bg-gradient-to-br from-[#312E81] to-[#1E1B4B] p-6 text-white flex flex-col justify-between gap-6 relative overflow-hidden shadow-lg h-full">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Zap className="h-40 w-40" />
          </div>

          <div className="flex flex-col gap-3 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              PERINGKAT AKTIF
            </span>
            <h2 className="text-4xl font-black tracking-tight text-yellow-400">
              #{user.rank ?? "—"}
            </h2>
            <p className="text-xs opacity-80 leading-normal">
              {isAdminView
                ? user.rank === 1
                  ? "Mahasiswa ini memimpin di peringkat teratas (Juara 1) di leaderboard saat ini."
                  : `Mahasiswa ini berada di peringkat #${user.rank ?? "—"} di leaderboard saat ini.`
                : user.rank === 1
                  ? "Selamat! Kamu memimpin di peringkat teratas (Juara 1) di leaderboard saat ini."
                  : `Kamu berada di peringkat #${user.rank ?? "—"} di leaderboard. Terus tingkatkan poinmu!`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 relative z-10 text-xs font-bold font-mono">
            <div>
              <p className="opacity-60 text-[9px] uppercase tracking-wider font-sans">
                Proyek
              </p>
              <p className="text-xl text-yellow-400 mt-1">
                {portfolioProjects.length}
              </p>
            </div>
            <div>
              <p className="opacity-60 text-[9px] uppercase tracking-wider font-sans">
                Total Poin
              </p>
              <p className="text-xl text-yellow-400 mt-1">{user.totalPoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Portfolio Projects */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[var(--outline-variant)] pb-3">
          <h3 className="text-sm font-bold text-[var(--on-surface)] uppercase tracking-wider">
            Proyek Portofolio
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${viewMode === "grid" ? "bg-[var(--surface-container-high)] text-[#4F46E5]" : "text-[var(--outline)]"}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded ${viewMode === "list" ? "bg-[var(--surface-container-high)] text-[#4F46E5]" : "text-[var(--outline)]"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioProjects.map((proj) => (
              <div
                key={proj.id}
                className="elevation-1 rounded-[var(--rounded-xl)] bg-[var(--surface-container-low)] overflow-hidden border border-[var(--outline-variant)] flex flex-col"
              >
                {/* Visual Cover Gradient */}
                <div className="h-28 bg-gradient-to-r from-[#4F46E5] to-[#818CF8] p-4 flex flex-col justify-between text-white relative">
                  <div className="absolute inset-0 bg-black/15" />
                  <div className="flex justify-between items-center relative z-10 w-full">
                    {proj.status === "approved" && (
                      <span className="text-xs font-bold bg-white/20 backdrop-blur-md rounded px-2 py-0.5">
                        +{proj.pointsAwarded} poin
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-[var(--on-surface)]">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-[var(--on-surface-variant)] mt-1.5 line-clamp-3 leading-normal">
                      {proj.description ||
                        "Studi kasus detail dari proyek portofolio mahasiswa Kinetic Academy."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-[var(--outline-variant)] pt-3 text-xs">
                    {proj.proofUrl && (
                      <a
                        href={proj.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1"
                      >
                        Lihat Detail
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {portfolioProjects.map((proj) => (
              <div
                key={proj.id}
                className="elevation-1 rounded-[var(--rounded-xl)] bg-[var(--surface-container-low)] p-5 border border-[var(--outline-variant)] flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-[var(--rounded-lg)] bg-[#4F46E5]/10 p-3 text-[#4F46E5]">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--on-surface)]">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-[var(--on-surface-variant)] mt-1 line-clamp-1 leading-normal max-w-lg">
                      {proj.description ||
                        "Studi kasus detail dari proyek portofolio."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {proj.proofUrl && (
                    <a
                      href={proj.proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center gap-1"
                    >
                      Lihat Detail
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
