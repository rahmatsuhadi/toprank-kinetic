import type { Metadata } from "next";
import { SubmissionForm } from "@/components/organisms/SubmissionForm";

export const metadata: Metadata = {
  title: "Pengajuan — Kinetic Academy",
};

export default function SubmissionsPage() {
  return (
    <div className="flex flex-col gap-8">
      <SubmissionForm />
    </div>
  );
}
