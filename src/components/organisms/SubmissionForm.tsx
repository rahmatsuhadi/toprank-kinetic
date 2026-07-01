"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { createSubmission } from "@/actions/submissions";
import { toast } from "sonner";
import {
  Send,
  Award,
  Briefcase,
  Zap,
  Globe,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { type CertificateLevel, type PortfolioLevel, SKILL_POINTS } from "@/config/point-rules";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <title>GitHub</title>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export function SubmissionForm() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"certificate" | "portfolio" | "skill">("certificate");
  const [certLevel, setCertLevel] = useState<CertificateLevel>("nasional");
  const [portLevel, setPortLevel] = useState<PortfolioLevel>("personal");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  async function handleSubmit(_prev: string | null, formData: FormData) {
    // Inject the selected type to the formData
    formData.set("type", selectedType);
    if (selectedType === "certificate") {
      formData.set("certificateLevel", certLevel);
    } else if (selectedType === "portfolio") {
      formData.set("portfolioLevel", portLevel);
    } else if (selectedType === "skill") {
      const finalTitle = selectedSkill === "Lainnya" ? customSkill : selectedSkill;
      if (!finalTitle || !finalTitle.trim()) {
        return "Silakan pilih atau masukkan skill Anda.";
      }
      formData.set("title", finalTitle);
    }

    const result = await createSubmission(formData);
    if (result.error) return result.error;
    toast.success("Pengajuan berhasil dikirim! Menunggu verifikasi admin.");
    // Reset form fields
    const formEl = document.getElementById("submission-form") as HTMLFormElement;
    if (formEl) formEl.reset();
    setSelectedSkill("");
    setCustomSkill("");
    router.push("/mahasiswa/submissions");
    return null;
  }

  const [error, formAction, isPending] = useActionState(handleSubmit, null);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-headline-lg text-[var(--on-surface)]">
          Ajukan Verifikasi
        </h1>
        <p className="text-body-md text-[var(--on-surface-variant)] mt-1">
          Tingkatkan profilmu dengan memamerkan pencapaian terbarumu. Pengajuan yang terverifikasi akan mendapatkan poin yang berkontribusi pada peringkatmu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: The Form */}
        <form
          id="submission-form"
          action={formAction}
          className="lg:col-span-2 elevation-1 rounded-[var(--rounded-xl)] p-[var(--space-lg)] bg-[var(--surface-container-low)] flex flex-col gap-6"
        >
          {/* Card Selectors - 3 Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Certificate Card */}
            <button
              type="button"
              onClick={() => setSelectedType("certificate")}
              className={`p-5 rounded-[var(--rounded-lg)] border text-left flex flex-col gap-3 transition-all ${
                selectedType === "certificate"
                  ? "border-[var(--primary)] bg-[var(--primary-container)]/10 ring-2 ring-[var(--primary)]/20"
                  : "border-[var(--outline-variant)] bg-[var(--surface)] hover:bg-[var(--surface-container-high)]"
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <div className="rounded-[var(--rounded-md)] bg-[var(--primary)]/10 p-2.5">
                  <Award className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div
                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    selectedType === "certificate"
                      ? "border-[var(--primary)] bg-[var(--primary)]"
                      : "border-[var(--outline)]"
                  }`}
                >
                  {selectedType === "certificate" && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--on-surface)]">
                  Sertifikat
                </h4>
                <p className="text-xs text-[var(--on-surface-variant)] mt-1">
                  Bukti resmi penyelesaian kursus atau sertifikasi kompetensi.
                </p>
              </div>
            </button>

            {/* 2. Skill Card */}
            <button
              type="button"
              onClick={() => setSelectedType("skill")}
              className={`p-5 rounded-[var(--rounded-lg)] border text-left flex flex-col gap-3 transition-all ${
                selectedType === "skill"
                  ? "border-[var(--primary)] bg-[var(--primary-container)]/10 ring-2 ring-[var(--primary)]/20"
                  : "border-[var(--outline-variant)] bg-[var(--surface)] hover:bg-[var(--surface-container-high)]"
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <div className="rounded-[var(--rounded-md)] bg-yellow-500/10 p-2.5">
                  <Zap className="h-5 w-5 text-yellow-600" />
                </div>
                <div
                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    selectedType === "skill"
                      ? "border-[var(--primary)] bg-[var(--primary)]"
                      : "border-[var(--outline)]"
                  }`}
                >
                  {selectedType === "skill" && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--on-surface)]">
                  Skill / Keahlian
                </h4>
                <p className="text-xs text-[var(--on-surface-variant)] mt-1">
                  Penguasaan skill teknis, bahasa pemrograman, atau soft skill.
                </p>
              </div>
            </button>

            {/* 3. Portfolio Card */}
            <button
              type="button"
              onClick={() => setSelectedType("portfolio")}
              className={`p-5 rounded-[var(--rounded-lg)] border text-left flex flex-col gap-3 transition-all ${
                selectedType === "portfolio"
                  ? "border-[var(--primary)] bg-[var(--primary-container)]/10 ring-2 ring-[var(--primary)]/20"
                  : "border-[var(--outline-variant)] bg-[var(--surface)] hover:bg-[var(--surface-container-high)]"
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <div className="rounded-[var(--rounded-md)] bg-[var(--secondary)]/10 p-2.5">
                  <Briefcase className="h-5 w-5 text-[var(--secondary)]" />
                </div>
                <div
                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    selectedType === "portfolio"
                      ? "border-[var(--primary)] bg-[var(--primary)]"
                      : "border-[var(--outline)]"
                  }`}
                >
                  {selectedType === "portfolio" && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--on-surface)]">
                  Proyek Portofolio
                </h4>
                <p className="text-xs text-[var(--on-surface-variant)] mt-1">
                  Studi kasus proyek, repositori aktif, atau aplikasi web.
                </p>
              </div>
            </button>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedType === "skill" ? (
              <>
                <FormField
                  label="PILIH SKILL / KEAHLIAN"
                  id="skillChoice"
                  required
                  type="select"
                  selectProps={{
                    value: selectedSkill,
                    onChange: (e) => setSelectedSkill((e.target as HTMLSelectElement).value),
                    children: (
                      <>
                        <option value="">-- Pilih Skill --</option>
                        {Object.keys(SKILL_POINTS).map((skillName) => (
                          <option key={skillName} value={skillName}>
                            {skillName} ({SKILL_POINTS[skillName as keyof typeof SKILL_POINTS]} Poin)
                          </option>
                        ))}
                        <option value="Lainnya">Lainnya (Poin Menyesuaikan)</option>
                      </>
                    ),
                  }}
                />

                {selectedSkill === "Lainnya" ? (
                  <FormField
                    label="TULIS SKILL LAINNYA"
                    id="customSkill"
                    required
                    inputProps={{
                      placeholder: "Contoh: Rust Programming / Next.js",
                      value: customSkill,
                      onChange: (e) => setCustomSkill(e.target.value),
                    }}
                  />
                ) : (
                  <div className="flex flex-col gap-1.5 justify-end pb-1 text-xs text-[var(--on-surface-variant)]">
                    <span className="font-semibold text-[var(--on-surface)]">ESTIMASI POIN</span>
                    <span>
                      {selectedSkill
                        ? `Poin yang akan diperoleh: ${SKILL_POINTS[selectedSkill as keyof typeof SKILL_POINTS]} Poin`
                        : "Pilih skill untuk melihat estimasi poin."}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <FormField
                label="JUDUL / NAMA"
                id="title"
                required
                inputProps={{
                  placeholder:
                    selectedType === "certificate"
                      ? "Contoh: AWS Certified Solutions Architect"
                      : "Contoh: E-Commerce Microservices Platform",
                }}
              />
            )}

            {selectedType === "certificate" && (
              <FormField
                label="TINGKAT SERTIFIKAT"
                id="certificateLevel"
                required
                type="select"
                selectProps={{
                  value: certLevel,
                  onChange: (e) =>
                    setCertLevel((e.target as HTMLSelectElement).value as CertificateLevel),
                  children: (
                    <>
                      <option value="lokal">Lokal</option>
                      <option value="regional">Regional</option>
                      <option value="nasional">Nasional</option>
                      <option value="internasional">Internasional</option>
                    </>
                  ),
                }}
              />
            )}

            {selectedType === "portfolio" && (
              <FormField
                label="TINGKAT PORTOFOLIO"
                id="portfolioLevel"
                required
                type="select"
                selectProps={{
                  value: portLevel,
                  onChange: (e) =>
                    setPortLevel((e.target as HTMLSelectElement).value as PortfolioLevel),
                  children: (
                    <>
                      <option value="personal">Proyek Personal</option>
                      <option value="freelance">Proyek Freelance / Klien</option>
                      <option value="industri">Proyek Industri / Perusahaan</option>
                    </>
                  ),
                }}
              />
            )}
          </div>

          <FormField
            label="DESKRIPSI / RINGKASAN"
            id="description"
            type="textarea"
            textareaProps={{
              placeholder:
                "Jelaskan secara singkat apa yang kamu capai dan bagaimana hal ini meningkatkan skill-mu...",
            }}
          />

          {/* Evidence and Links */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-[var(--on-surface)]">
              BUKTI & LINK
            </span>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {selectedType === "portfolio" ? (
                    <GithubIcon className="h-4 w-4 text-[var(--outline)]" />
                  ) : (
                    <Globe className="h-4 w-4 text-[var(--outline)]" />
                  )}
                </div>
                <input
                  type="url"
                  name="proofUrl"
                  id="proofUrl"
                  required
                  placeholder={
                    selectedType === "portfolio"
                      ? "Link Repositori (GitHub/GitLab/Bitbucket)"
                      : "Link Verifikasi / Link Sertifikat di Google Drive"
                  }
                  className="w-full rounded-[var(--rounded-md)] border border-[var(--outline-variant)] bg-[var(--surface)] pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>

              {selectedType === "portfolio" && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-4 w-4 text-[var(--outline)]" />
                  </div>
                  <input
                    type="url"
                    placeholder="Link Demo Live / Website (Opsional)"
                    className="w-full rounded-[var(--rounded-md)] border border-[var(--outline-variant)] bg-[var(--surface)] pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                  />
                </div>
              )}
            </div>
          </div>

          {error ? (
            <p className="text-sm text-[var(--error)] bg-[var(--error-container)] rounded-[var(--rounded)] px-3 py-2">
              {error}
            </p>
          ) : null}

          {/* Form Actions */}
          <div className="flex items-center justify-between border-t border-[var(--outline-variant)] pt-4 mt-2">
            <div className="flex items-center gap-2 text-xs text-[var(--on-surface-variant)]">
              <CheckCircle className="h-4 w-4 text-[var(--success-green)]" />
              Verifikasi Aman · Penyimpanan Terenkripsi
            </div>

            <Button type="submit" isLoading={isPending} className="!bg-[#4F46E5] hover:!bg-[#4338CA] text-white">
              Ajukan untuk Ditinjau
            </Button>
          </div>
        </form>

        {/* Right Side: Information Panels */}
        <div className="flex flex-col gap-6">
          {/* Submission Guidelines */}
          <div className="elevation-1 rounded-[var(--rounded-xl)] p-6 bg-[var(--surface-container-low)] flex flex-col gap-4">
            <h4 className="text-sm font-bold text-[var(--on-surface)] flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[var(--primary)]" />
              Panduan Pengajuan
            </h4>

            <div className="flex flex-col gap-4 text-xs leading-normal">
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                <p className="text-[var(--on-surface-variant)]">
                  <strong className="text-[var(--on-surface)]">Bukti Resmi:</strong> Sertifikat harus mencantumkan nama lengkapmu, organisasi penerbit, dan tanggal penyelesaian secara jelas.
                </p>
              </div>

              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                <p className="text-[var(--on-surface-variant)]">
                  <strong className="text-[var(--on-surface)]">Proyek Aktif:</strong> Proyek portofolio harus menyertakan link publik atau repositori kode yang terdokumentasi (GitHub/GitLab).
                </p>
              </div>

              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                <p className="text-[var(--on-surface-variant)]">
                  <strong className="text-[var(--on-surface)]">Siklus Peninjauan:</strong> Proses persetujuan admin biasanya memakan waktu 48-72 jam. Kamu akan menerima notifikasi setelah pengajuan diverifikasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
