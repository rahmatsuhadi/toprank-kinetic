import type { Metadata } from "next";
import { getPendingSubmissions } from "@/actions/submissions";
import { SubmissionTable } from "@/components/organisms/SubmissionTable";

export const metadata: Metadata = {
  title: "Verifikasi — Kinetic Academy",
};

export default async function VerifikasiPage() {
  const pending = await getPendingSubmissions();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-headline-lg">Verifikasi Pengajuan</h1>
        <p className="text-body-md text-[var(--on-surface-variant)] mt-1">
          Review dan verifikasi pengajuan skill, portfolio, dan sertifikat mahasiswa.
        </p>
      </div>
      <SubmissionTable submissions={pending} />
    </div>
  );
}
