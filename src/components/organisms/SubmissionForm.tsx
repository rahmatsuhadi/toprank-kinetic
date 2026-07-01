"use client";

import {
  Award,
  Briefcase,
  CheckCircle,
  Globe,
  HelpCircle,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { createSubmission } from "@/actions/submissions";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import {
  CERTIFICATE_POINTS,
  type CertificateLevel,
  PORTFOLIO_POINTS,
  type PortfolioLevel,
  SKILL_BASE_POINTS,
  SKILL_POINTS,
} from "@/config/point-rules";

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
  const [selectedType, setSelectedType] = useState<"skill_cert" | "portfolio">(
    "skill_cert",
  );
  const [hasCertificate, setHasCertificate] = useState(false);
  const [certLevel, setCertLevel] = useState<CertificateLevel>("nasional");
  const [portLevel, setPortLevel] = useState<PortfolioLevel>("personal");
  const [selectedSkill, setSelectedSkill] = useState("");

  async function handleSubmit(_prev: string | null, formData: FormData) {
    if (selectedType === "portfolio") {
      formData.set("type", "portfolio");
      formData.set("portfolioLevel", portLevel);
    } else {
      if (!selectedSkill || !selectedSkill.trim()) {
        return "Silakan masukkan keahlian Anda.";
      }

      // Kolom title di database diisi dengan nama keahlian
      formData.set("title", selectedSkill);

      if (hasCertificate) {
        formData.set("type", "certificate");
        formData.set("certificateLevel", certLevel);

        // Ambil nama sertifikat dari input certificateName
        const certName = formData.get("certificateName") as string;
        if (!certName || !certName.trim()) {
          formData.set("certificateName", `Sertifikat ${selectedSkill}`);
        }
      } else {
        formData.set("type", "skill");
        formData.set("certificateName", "");
      }
    }

    const result = await createSubmission(formData);
    if (result.error) return result.error;
    toast.success("Pengajuan berhasil dikirim! Menunggu verifikasi admin.");
    // Reset form fields
    const formEl = document.getElementById(
      "submission-form",
    ) as HTMLFormElement;
    if (formEl) formEl.reset();
    setSelectedSkill("");
    setHasCertificate(false);
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
          Tingkatkan profilmu dengan memamerkan pencapaian terbarumu. Pengajuan
          yang terverifikasi akan mendapatkan poin yang berkontribusi pada
          peringkatmu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: The Form */}
        <form
          id="submission-form"
          action={formAction}
          className="lg:col-span-2 elevation-1 rounded-[var(--rounded-xl)] p-[var(--space-lg)] bg-[var(--surface-container-low)] flex flex-col gap-6"
        >
          {/* Card Selectors - 2 Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Skill & Certificate Card */}
            <button
              type="button"
              onClick={() => setSelectedType("skill_cert")}
              className={`p-5 rounded-[var(--rounded-lg)] border text-left flex flex-col gap-3 transition-all sm:col-span-2 ${
                selectedType === "skill_cert"
                  ? "border-[var(--primary)] bg-[var(--primary-container)]/10 ring-2 ring-[var(--primary)]/20"
                  : "border-[var(--outline-variant)] bg-[var(--surface)] hover:bg-[var(--surface-container-high)]"
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex gap-2">
                  <div className="rounded-[var(--rounded-md)] bg-[var(--primary)]/10 p-2.5">
                    <Award className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <div className="rounded-[var(--rounded-md)] bg-yellow-500/10 p-2.5">
                    <Zap className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div
                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    selectedType === "skill_cert"
                      ? "border-[var(--primary)] bg-[var(--primary)]"
                      : "border-[var(--outline)]"
                  }`}
                >
                  {selectedType === "skill_cert" && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--on-surface)]">
                  Keahlian & Sertifikat
                </h4>
                <p className="text-xs text-[var(--on-surface-variant)] mt-1">
                  Deklarasi keahlian teknis atau unggah sertifikat resmi untuk
                  poin yang lebih tinggi.
                </p>
              </div>
            </button>

            {/* 2. Portfolio Card */}
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
            {selectedType === "skill_cert" ? (
              <>
                <FormField
                  label="NAMA KEAHLIAN / SKILL"
                  id="title"
                  required
                  inputProps={{
                    placeholder:
                      "Contoh: TypeScript Programming, UI/UX Design, Python...",
                    value: selectedSkill,
                    onChange: (e) => setSelectedSkill(e.target.value),
                    list: "skills-list",
                  }}
                />
                <datalist id="skills-list">
                  {Object.keys(SKILL_POINTS).map((skillName) => (
                    <option key={skillName} value={skillName} />
                  ))}
                </datalist>

                <div className="sm:col-span-2 flex flex-col gap-4 p-4 rounded-[var(--rounded-lg)] bg-[var(--surface-container)] border border-[var(--outline-variant)]">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasCertificate}
                      onChange={(e) => setHasCertificate(e.target.checked)}
                      className="h-4 w-4 rounded border-[var(--outline)] text-[var(--primary)] focus:ring-[var(--primary)]"
                    />
                    <div>
                      <span className="text-sm font-semibold text-[var(--on-surface)]">
                        Saya memiliki sertifikat pendukung untuk keahlian ini
                      </span>
                      <p className="text-xs text-[var(--on-surface-variant)]">
                        Sertifikat resmi akan meningkatkan perolehan poin Anda
                        berdasarkan tingkatannya.
                      </p>
                    </div>
                  </label>

                  {hasCertificate && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 pt-4 border-t border-[var(--outline-variant)]/60 animate-fade-in">
                      <FormField
                        label="JUDUL / NAMA SERTIFIKAT"
                        id="certificateName"
                        required
                        inputProps={{
                          placeholder:
                            "Contoh: AWS Certified Solutions Architect",
                        }}
                      />
                      <FormField
                        label="TINGKAT SERTIFIKAT"
                        id="certificateLevel"
                        required
                        type="select"
                        selectProps={{
                          value: certLevel,
                          onChange: (e) =>
                            setCertLevel(
                              (e.target as HTMLSelectElement)
                                .value as CertificateLevel,
                            ),
                          children: (
                            <>
                              <option value="lokal">
                                Lokal ({CERTIFICATE_POINTS.lokal} Poin)
                              </option>
                              <option value="regional">
                                Regional ({CERTIFICATE_POINTS.regional} Poin)
                              </option>
                              <option value="nasional">
                                Nasional ({CERTIFICATE_POINTS.nasional} Poin)
                              </option>
                              <option value="internasional">
                                Internasional (
                                {CERTIFICATE_POINTS.internasional} Poin)
                              </option>
                            </>
                          ),
                        }}
                      />
                    </div>
                  )}

                  {/* Estimasi Poin Display */}
                  <div className="text-xs text-[var(--on-surface-variant)] flex justify-between items-center border-t border-[var(--outline-variant)]/60 pt-3">
                    <span className="font-semibold text-[var(--on-surface)] uppercase tracking-wider">
                      Estimasi Perolehan Poin
                    </span>
                    <span className="font-black text-[var(--primary)] text-sm">
                      {hasCertificate
                        ? `${CERTIFICATE_POINTS[certLevel]} Poin`
                        : selectedSkill
                          ? `${(() => {
                              const normalized = selectedSkill
                                .trim()
                                .toLowerCase();
                              const match = Object.keys(SKILL_POINTS).find(
                                (k) => k.toLowerCase() === normalized,
                              );
                              return match
                                ? SKILL_POINTS[
                                    match as keyof typeof SKILL_POINTS
                                  ]
                                : SKILL_BASE_POINTS;
                            })()} Poin`
                          : "0 Poin"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <FormField
                  label="JUDUL / NAMA PROYEK"
                  id="title"
                  required
                  inputProps={{
                    placeholder: "Contoh: E-Commerce Microservices Platform",
                  }}
                />

                <FormField
                  label="TINGKAT PORTOFOLIO"
                  id="portfolioLevel"
                  required
                  type="select"
                  selectProps={{
                    value: portLevel,
                    onChange: (e) =>
                      setPortLevel(
                        (e.target as HTMLSelectElement).value as PortfolioLevel,
                      ),
                    children: (
                      <>
                        <option value="personal">
                          Proyek Personal ({PORTFOLIO_POINTS.personal} Poin)
                        </option>
                        <option value="freelance">
                          Proyek Freelance / Klien ({PORTFOLIO_POINTS.freelance}{" "}
                          Poin)
                        </option>
                        <option value="industri">
                          Proyek Industri / Perusahaan (
                          {PORTFOLIO_POINTS.industri} Poin)
                        </option>
                      </>
                    ),
                  }}
                />

                {/* Estimasi Poin Display for Portfolio */}
                <div className="sm:col-span-2 text-xs text-[var(--on-surface-variant)] flex justify-between items-center border-t border-[var(--outline-variant)]/60 pt-3 mt-1">
                  <span className="font-semibold text-[var(--on-surface)] uppercase tracking-wider">
                    Estimasi Perolehan Poin
                  </span>
                  <span className="font-black text-[var(--secondary)] text-sm">
                    {PORTFOLIO_POINTS[portLevel]} Poin
                  </span>
                </div>
              </>
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
                      : hasCertificate
                        ? "Link Verifikasi / Link Sertifikat di Google Drive atau Credential URL"
                        : "Link Bukti Pendukung (GitHub, Post LinkedIn, Google Drive, dll.)"
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

            <Button
              type="submit"
              isLoading={isPending}
              className="!bg-[#4F46E5] hover:!bg-[#4338CA] text-white"
            >
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
                  <strong className="text-[var(--on-surface)]">
                    Bukti Resmi:
                  </strong>{" "}
                  Sertifikat harus mencantumkan nama lengkapmu, organisasi
                  penerbit, dan tanggal penyelesaian secara jelas.
                </p>
              </div>

              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                <p className="text-[var(--on-surface-variant)]">
                  <strong className="text-[var(--on-surface)]">
                    Proyek Aktif:
                  </strong>{" "}
                  Proyek portofolio harus menyertakan link publik atau
                  repositori kode yang terdokumentasi (GitHub/GitLab).
                </p>
              </div>

              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                <p className="text-[var(--on-surface-variant)]">
                  <strong className="text-[var(--on-surface)]">
                    Siklus Peninjauan:
                  </strong>{" "}
                  Proses persetujuan admin biasanya memakan waktu 48-72 jam.
                  Kamu akan menerima notifikasi setelah pengajuan diverifikasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
