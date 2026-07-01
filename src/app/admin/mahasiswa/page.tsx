import type { Metadata } from "next";
import { StudentSearch } from "@/components/organisms/StudentSearch";

export const metadata: Metadata = {
  title: "Data Mahasiswa — Kinetic Academy",
};

export default function MahasiswaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-headline-lg">Data Mahasiswa</h1>
        <p className="text-body-md text-[var(--on-surface-variant)] mt-1">
          Cari dan temukan talenta mahasiswa berdasarkan kompetensi.
        </p>
      </div>
      <StudentSearch />
    </div>
  );
}
