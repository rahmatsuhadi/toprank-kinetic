"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { PointChip } from "@/components/atoms/PointChip";
import { searchStudents } from "@/actions/students";
import {
  Search,
  Mail,
  Copy,
  User,
  MessageSquare,
  Calendar,
  BookOpen,
  Award,
  Briefcase,
  Zap,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { PortfolioContent } from "@/components/organisms/PortfolioContent";

interface Submission {
  id: number;
  title: string;
  type: "skill" | "portfolio" | "certificate";
  certificateLevel?: "lokal" | "regional" | "nasional" | "internasional" | null;
  portfolioLevel?: "personal" | "freelance" | "industri" | null;
  pointsAwarded?: number | null;
  createdAt?: string | null;
  description?: string | null;
  proofUrl?: string | null;
  certificateName?: string | null;
}

interface Student {
  id: string;
  name: string;
  nim: string | null;
  email: string;
  image: string | null;
  bio: string | null;
  prodi: string | null;
  angkatan: string | null;
  totalPoints: number;
  rank: number;
  socialLinks: Record<string, string>;
  submissions: Submission[];
}

interface GroupedSkill {
  title: string;
  tags: string[];
}

function getGroupedSkills(submissions: Submission[]): GroupedSkill[] {
  const groups: Record<string, string[]> = {};

  submissions.forEach((sub) => {
    const key = sub.title;
    if (!groups[key]) {
      groups[key] = [];
    }

    let tag = "";
    if (sub.type === "certificate") {
      tag = sub.certificateName
        ? `${sub.certificateName} (${sub.certificateLevel ? sub.certificateLevel.toUpperCase() : "LOKAL"})`
        : `Sertifikat ${sub.certificateLevel ? sub.certificateLevel.toUpperCase() : ""}`;
    } else if (sub.type === "portfolio") {
      tag = `Portofolio ${sub.portfolioLevel ? sub.portfolioLevel.toUpperCase() : ""}`;
    } else {
      tag = "Keahlian";
    }

    if (!groups[key].includes(tag)) {
      groups[key].push(tag);
    }
  });

  return Object.keys(groups).map((title) => ({
    title,
    tags: groups[title],
  }));
}

export function StudentSearch() {
  const [query, setQuery] = useState("");
  const [minPoints, setMinPoints] = useState("");
  const [results, setResults] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isPending, startTransition] = useTransition();
  const [searched, setSearched] = useState(false);

  // Fetch initial list of students on mount
  useEffect(() => {
    startTransition(async () => {
      const data = await searchStudents();
      setResults(data as unknown as Student[]);
      setSearched(true);
    });
  }, []);

  function handleSearch() {
    startTransition(async () => {
      const data = await searchStudents(
        query || undefined,
        minPoints ? Number(minPoints) : undefined
      );
      setResults(data as unknown as Student[]);
      setSearched(true);
    });
  }

  function getWhatsAppLink(student: Student) {
    const phone = student.socialLinks.phone || student.socialLinks.whatsapp || "";
    // Clean phone number from non-digit characters
    const cleanPhone = phone.replace(/\D/g, "");
    // If starts with 0, replace with 62
    const formattedPhone = cleanPhone.startsWith("0") ? "62" + cleanPhone.slice(1) : cleanPhone;
    const message = `Halo ${student.name}, kami dari Administrator Kinetic Academy ingin mendiskusikan peluang industri/proyek dengan Anda...`;
    return `https://wa.me/${formattedPhone || "6281234567890"}?text=${encodeURIComponent(message)}`;
  }

  if (selectedStudent) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in pb-12">
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => setSelectedStudent(null)}
            className="inline-flex items-center gap-2 rounded-[var(--rounded-md)] border border-[var(--outline-variant)] bg-[var(--surface-container-low)] hover:bg-[var(--surface-container-high)] text-[var(--on-surface)] text-xs font-bold py-2 px-4 transition-all duration-200 cursor-pointer shadow-sm"
          >
            ← Kembali ke Pencarian Kompetensi
          </button>
        </div>

        <PortfolioContent
          user={{
            id: selectedStudent.id,
            name: selectedStudent.name,
            email: selectedStudent.email,
            nim: selectedStudent.nim,
            bio: selectedStudent.bio,
            prodi: selectedStudent.prodi,
            angkatan: selectedStudent.angkatan,
            socialLinks: selectedStudent.socialLinks,
            totalPoints: selectedStudent.totalPoints,
            rank: selectedStudent.rank,
          }}
          submissions={selectedStudent.submissions.map((s) => ({
            id: s.id,
            title: s.title,
            type: s.type,
            status: "approved",
            pointsAwarded: s.pointsAwarded ?? 0,
            createdAt: s.createdAt ?? new Date().toISOString(),
            description: s.description ?? null,
            proofUrl: s.proofUrl ?? null,
            certificateName: s.certificateName ?? null,
            certificateLevel: s.certificateLevel ?? null,
          }))}
          isAdminView={true}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Search Filter Controls */}
      <div className="elevation-1 rounded-[var(--rounded-xl)] p-5 bg-[var(--surface-container-low)] flex gap-4 items-end flex-wrap border border-[var(--outline-variant)]">
        <div className="flex-1 min-w-[240px]">
          <label className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-1.5 block">
            🔍 Cari Kompetensi
          </label>
          <Input
            placeholder="Cari keahlian (misal: React.js, Python, Videografer...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
        </div>
        <div className="w-32">
          <label className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-wider mb-1.5 block">
            ⭐ Minimal Poin
          </label>
          <Input
            type="number"
            placeholder="0"
            value={minPoints}
            onChange={(e) => setMinPoints(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
        </div>
        <Button onClick={handleSearch} isLoading={isPending} className="!bg-[#4F46E5] hover:!bg-[#4338CA] text-white">
          <Search className="h-4 w-4" />
          Cari Talenta
        </Button>
      </div>

      {/* Cards Grid */}
      {searched && results.length === 0 ? (
        <div className="elevation-1 rounded-[var(--rounded-xl)] bg-[var(--surface-container-low)] py-12 text-center border border-[var(--outline-variant)]">
          <p className="text-sm text-[var(--on-surface-variant)]">
            Tidak ditemukan mahasiswa yang sesuai dengan kriteria pencarian.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((student) => (
            <div
              key={student.id}
              className="elevation-1 rounded-[var(--rounded-xl)] bg-[var(--surface-container-low)] border border-[var(--outline-variant)] p-6 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Profile Header */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#4F46E5] to-[#818CF8] flex items-center justify-center text-white text-md font-black shrink-0 shadow-inner">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-md font-black text-[var(--on-surface)] flex items-center gap-1.5 flex-wrap">
                      {student.name}
                      <span className="text-xs font-normal text-[var(--on-surface-variant)]">
                        ({student.prodi || "Mahasiswa"} - Angkatan {student.angkatan || "—"})
                      </span>
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded-full border border-indigo-100/50">
                        🏅 Total Poin: {student.totalPoints} Poin (Peringkat #{student.rank} di Leaderboard)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {student.bio && (
                  <p className="text-xs text-[var(--on-surface-variant)] mt-4 line-clamp-2">
                    {student.bio}
                  </p>
                )}

                {/* Verified Skills */}
                <div className="mt-4 pt-4 border-t border-[var(--outline-variant)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--on-surface)] mb-2">
                    Keahlian Terverifikasi:
                  </h4>
                  {student.submissions.length === 0 ? (
                    <p className="text-xs italic text-[var(--on-surface-variant)]">
                      Belum ada keahlian yang diverifikasi.
                    </p>
                  ) : (
                    <ul className="flex flex-col gap-2">
                      {getGroupedSkills(student.submissions).map((skill, index) => (
                        <li key={index} className="text-xs text-[var(--on-surface)] font-medium flex items-center gap-2 flex-wrap">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5] shrink-0" />
                          <span>{skill.title}</span>
                          {skill.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="text-[9px] font-bold uppercase bg-indigo-50 text-[#4F46E5] px-1.5 py-0.5 rounded border border-indigo-100">
                              {tag}
                            </span>
                          ))}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-[var(--outline-variant)]">
                <a
                  href={getWhatsAppLink(student)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-[var(--rounded-md)] bg-[#10B981] hover:bg-[#0D9488] text-white text-xs font-bold py-2.5 shadow-sm transition-all duration-200"
                >
                  <MessageSquare className="h-4 w-4" />
                  Hubungi via WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedStudent(student)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-[var(--rounded-md)] border border-[#4F46E5] bg-transparent text-[#4F46E5] hover:bg-[#4F46E5]/10 text-xs font-bold py-2.5 transition-all duration-200 cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  Lihat Detail Profil Lengkap
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
