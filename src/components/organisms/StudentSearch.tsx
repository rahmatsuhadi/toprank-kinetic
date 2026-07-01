"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { PointChip } from "@/components/atoms/PointChip";
import { searchStudents } from "@/actions/students";
import { Search } from "lucide-react";

interface Student {
  id: string;
  name: string;
  nim: string | null;
  email: string;
  image: string | null;
  bio: string | null;
  totalPoints: number;
}

export function StudentSearch() {
  const [query, setQuery] = useState("");
  const [minPoints, setMinPoints] = useState("");
  const [results, setResults] = useState<Student[]>([]);
  const [isPending, startTransition] = useTransition();
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    startTransition(async () => {
      const data = await searchStudents(
        query || undefined,
        minPoints ? Number(minPoints) : undefined,
      );
      setResults(data);
      setSearched(true);
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3 items-end flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium mb-1 block">Cari Mahasiswa</label>
          <Input
            placeholder="Nama, NIM, atau email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="w-32">
          <label className="text-sm font-medium mb-1 block">Min Poin</label>
          <Input
            type="number"
            placeholder="0"
            value={minPoints}
            onChange={(e) => setMinPoints(e.target.value)}
          />
        </div>
        <Button onClick={handleSearch} isLoading={isPending}>
          <Search className="h-4 w-4" />
          Cari
        </Button>
      </div>

      {searched && results.length === 0 ? (
        <p className="text-sm text-[var(--on-surface-variant)] text-center py-8">
          Tidak ditemukan mahasiswa yang sesuai.
        </p>
      ) : null}

      <div className="flex flex-col gap-3">
        {results.map((s) => (
          <div key={s.id} className="elevation-1 rounded-[var(--rounded-lg)] p-[var(--space-md)] flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--primary-container)] to-[var(--secondary-container)] flex items-center justify-center text-white text-sm font-bold shrink-0">
              {s.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{s.name}</p>
              <p className="text-xs text-[var(--on-surface-variant)]">{s.nim ?? "—"} · {s.email}</p>
            </div>
            <PointChip points={s.totalPoints} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
