"use client";

import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Trophy,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface LeaderboardEntry {
  id: string;
  name: string;
  nim?: string | null;
  image?: string | null;
  totalPoints: number;
  rank: number;
  verifiedSkillsCount: number;
}

interface LeaderboardTableProps {
  leaderboard: LeaderboardEntry[];
  currentUser?: LeaderboardEntry | null;
  sessionUser?: {
    id: string;
    name: string;
    email: string;
    nim: string | null;
    totalPoints: number;
  } | null;
  isAdmin?: boolean;
}

export function LeaderboardTable({
  leaderboard,
  currentUser = null,
  sessionUser = null,
  isAdmin = false,
}: LeaderboardTableProps) {
  // Extract top 3 for podium
  const top1 = leaderboard.find((u) => u.rank === 1);
  const top2 = leaderboard.find((u) => u.rank === 2);
  const top3 = leaderboard.find((u) => u.rank === 3);

  // Rest for the list view table (Ranks 4+)
  const restList = leaderboard.filter((u) => u.rank > 3);

  // Find current user's rank
  const userRankIndex = sessionUser
    ? leaderboard.findIndex((u) => u.id === sessionUser.id)
    : -1;
  const myRank =
    userRankIndex !== -1 ? userRankIndex + 1 : (currentUser?.rank ?? 42);

  // Ordinal suffix formatter
  function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  return (
    <div className={`relative w-full ${isAdmin ? "pb-12" : "pb-36"}`}>
      {/* 1. Content Wrapper (Fade In) */}
      <div className="flex flex-col gap-8 animate-fade-in">
        {/* Header & Filters Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-headline-lg font-black text-[var(--on-surface)]">
              Papan Peringkat Talenta
            </h1>
            <p className="text-body-md text-[var(--on-surface-variant)] mt-1 max-w-2xl leading-relaxed">
              Menampilkan mahasiswa dengan kinerja tertinggi di semua disiplin
              ilmu. Bersainglah, verifikasi keahlianmu, dan raih peringkat
              teratas.
            </p>
          </div>
        </div>

        {/* Top 3 Podium Row */}
        {leaderboard.length > 0 ? (
          <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 pt-4 max-w-4xl mx-auto w-full">
            {/* Rank 2 (Left) */}
            {top2 && (
              <div className="elevation-1 rounded-[var(--rounded-xl)] bg-[var(--surface-container-low)] border border-[var(--outline-variant)] p-6 flex flex-col items-center text-center relative w-full md:w-64 md:h-[280px] justify-between">
                {/* Rank badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-[#E5E7EB] border-2 border-white shadow flex items-center justify-center text-xs font-black text-slate-600">
                  2
                </div>

                {/* Avatar with Silver Ring */}
                <div className="mt-2 shrink-0">
                  <div className="h-16 w-16 rounded-full border-[3px] border-[#94A3B8] p-0.5 bg-gradient-to-tr from-[#94A3B8] to-[#CBD5E1] flex items-center justify-center text-white text-xl font-black">
                    {top2.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-[var(--on-surface)] truncate max-w-[180px]">
                    {top2.name}
                  </h3>
                  <p className="text-[11px] text-[var(--on-surface-variant)] mt-0.5 truncate max-w-[180px]">
                    {top2.nim ? `${top2.nim} · Mahasiswa` : "Mahasiswa"}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1 bg-[#4F46E5]/5 text-[#4F46E5] px-3 py-1 rounded-full text-[10px] font-bold">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {top2.verifiedSkillsCount} KEAHLIAN VERIFIED
                </div>

                <div className="border-t border-[var(--outline-variant)] pt-3 mt-4 w-full flex justify-between items-center text-xs">
                  <span className="text-[10px] text-[var(--on-surface-variant)] font-semibold uppercase">
                    Total Poin
                  </span>
                  <span className="font-extrabold text-[var(--on-surface)]">
                    {top2.totalPoints.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Rank 1 (Center - Gold Highlighted) */}
            {top1 && (
              <div className="elevation-2 rounded-[var(--rounded-xl)] bg-[var(--surface-container-low)] border-2 border-yellow-400 p-6 flex flex-col items-center text-center relative w-full md:w-68 md:h-[310px] justify-between shadow-lg scale-105">
                {/* Rank badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-yellow-400 border-2 border-white shadow-md flex items-center justify-center text-sm font-black text-yellow-950">
                  1
                </div>

                {/* Avatar with Gold Ring */}
                <div className="mt-2 shrink-0 relative">
                  <div className="h-20 w-20 rounded-full border-[3px] border-yellow-400 p-0.5 bg-gradient-to-tr from-yellow-400 to-yellow-200 flex items-center justify-center text-yellow-950 text-2xl font-black">
                    {top1.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -top-3 -right-1 bg-yellow-400 rounded-full p-1 shadow border border-white">
                    <Trophy className="h-3.5 w-3.5 text-yellow-950" />
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-md font-extrabold text-[var(--on-surface)] truncate max-w-[200px]">
                    {top1.name}
                  </h3>
                  <p className="text-xs text-[var(--on-surface-variant)] mt-0.5 truncate max-w-[200px]">
                    {top1.nim ? `${top1.nim} · Mahasiswa` : "Mahasiswa"}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[10px] font-bold border border-yellow-200">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {top1.verifiedSkillsCount} KEAHLIAN VERIFIED
                </div>

                <div className="border-t border-[var(--outline-variant)] pt-3 mt-4 w-full flex justify-between items-center text-xs">
                  <span className="text-[10px] text-[var(--on-surface-variant)] font-semibold uppercase">
                    Total Poin
                  </span>
                  <span className="font-extrabold text-[#4F46E5] text-sm">
                    {top1.totalPoints.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Rank 3 (Right) */}
            {top3 && (
              <div className="elevation-1 rounded-[var(--rounded-xl)] bg-[var(--surface-container-low)] border border-[var(--outline-variant)] p-6 flex flex-col items-center text-center relative w-full md:w-64 md:h-[280px] justify-between">
                {/* Rank badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-[#D97706]/20 border-2 border-white shadow flex items-center justify-center text-xs font-black text-amber-800">
                  3
                </div>

                {/* Avatar with Bronze Ring */}
                <div className="mt-2 shrink-0">
                  <div className="h-16 w-16 rounded-full border-[3px] border-amber-600/60 p-0.5 bg-gradient-to-tr from-amber-600/80 to-amber-400 flex items-center justify-center text-white text-xl font-black">
                    {top3.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-[var(--on-surface)] truncate max-w-[180px]">
                    {top3.name}
                  </h3>
                  <p className="text-[11px] text-[var(--on-surface-variant)] mt-0.5 truncate max-w-[180px]">
                    {top3.nim ? `${top3.nim} · Mahasiswa` : "Mahasiswa"}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold border border-amber-100">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {top3.verifiedSkillsCount} KEAHLIAN VERIFIED
                </div>

                <div className="border-t border-[var(--outline-variant)] pt-3 mt-4 w-full flex justify-between items-center text-xs">
                  <span className="text-[10px] text-[var(--on-surface-variant)] font-semibold uppercase">
                    Total Poin
                  </span>
                  <span className="font-extrabold text-[var(--on-surface)]">
                    {top3.totalPoints.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="elevation-1 rounded-[var(--rounded-xl)] bg-[var(--surface-container-low)] border border-[var(--outline-variant)] p-8 text-center">
            <p className="text-sm text-[var(--on-surface-variant)]">
              Belum ada data mahasiswa di papan peringkat.
            </p>
          </div>
        )}

        {/* Table Peringkat (Ranks 4+) */}
        {restList.length > 0 && (
          <div className="elevation-1 rounded-[var(--rounded-xl)] bg-[var(--surface-container-low)] border border-[var(--outline-variant)] overflow-hidden mt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--surface-container-high)] border-b border-[var(--outline-variant)] text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-wider">
                    <th className="px-6 py-4 w-20 text-center">RANK</th>
                    <th className="px-6 py-4">MAHASISWA</th>
                    <th className="px-6 py-4">NIM</th>
                    <th className="px-6 py-4 text-center">KEAHLIAN VERIFIED</th>
                    <th className="px-6 py-4 text-right">POIN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--outline-variant)] text-sm">
                  {restList.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-[var(--surface-container-highest)]/30 transition-colors"
                    >
                      {/* Rank */}
                      <td className="px-6 py-4 text-center font-bold text-[var(--on-surface-variant)]">
                        {entry.rank}
                      </td>

                      {/* Student Avatar + Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#4F46E5] to-[#818CF8] flex items-center justify-center text-white text-xs font-black shrink-0">
                            {entry.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-[var(--on-surface)]">
                              {entry.name}
                            </p>
                            <p className="text-[10px] text-[var(--on-surface-variant)]">
                              Aktif
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* NIM */}
                      <td className="px-6 py-4 text-[var(--on-surface-variant)]">
                        {entry.nim ?? "—"}
                      </td>

                      {/* Verified Skills Count Badge */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-green-100">
                          <CheckCircle className="h-3 w-3" />
                          {entry.verifiedSkillsCount}
                        </span>
                      </td>

                      {/* Points */}
                      <td className="px-6 py-4 text-right font-extrabold text-[var(--on-surface)]">
                        {entry.totalPoints.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View All Participants Button */}
            <div className="p-4 bg-[var(--surface-container-low)] text-center border-t border-[var(--outline-variant)]">
              <button className="text-xs font-bold text-[#4F46E5] hover:underline flex items-center justify-center gap-1 mx-auto">
                Lihat Semua Peserta
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Bottom Sticky Status Bar - Kept outside of animated wrapper */}
      {!isAdmin && sessionUser && (
        <div className="fixed bottom-0 left-0 right-0 md:left-[280px] bg-indigo-900 text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-indigo-800 shadow-2xl z-30">
          <div className="flex items-center gap-6 w-full md:w-auto">
            {/* Current Rank */}
            <div className="shrink-0 text-center border-r border-indigo-800 pr-6">
              <p className="text-[10px] opacity-60 uppercase tracking-widest">
                PERINGKAT KAMU
              </p>
              <p className="text-2xl font-black text-yellow-400 mt-0.5">
                {getOrdinal(myRank)}
              </p>
            </div>

            {/* User Profile Info */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-200 text-indigo-950 flex items-center justify-center text-md font-black shrink-0">
                {sessionUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold">{sessionUser.name} (Kamu)</p>
                <p className="text-[10px] opacity-75">
                  Terus berjuang! Kamu berada di top 5% jurusanmu.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar & Next Tier Target */}
          <div className="flex items-center gap-6 w-full md:w-auto flex-1 md:max-w-md justify-end">
            <Link href="/mahasiswa/submissions/baru">
              <button className="bg-white hover:bg-yellow-400 text-indigo-950 font-bold px-4 py-2 rounded-[var(--rounded-md)] text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 hover:scale-105 active:scale-95">
                <Zap className="h-3.5 w-3.5" />
                Naikkan Skor Saya
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
