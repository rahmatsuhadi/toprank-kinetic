import type { Metadata } from "next";
import { SubmissionForm } from "@/components/organisms/SubmissionForm";

export const metadata: Metadata = {
  title: "Ajukan Verifikasi — Kinetic Academy",
};

export default function BaruSubmissionPage() {
  return (
    <div className="flex flex-col gap-8">
      <SubmissionForm />
    </div>
  );
}
