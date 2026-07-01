import { clsx } from "clsx";
import { Badge } from "@/components/atoms/Badge";
import { PointChip } from "@/components/atoms/PointChip";
import { FileText, Award, Briefcase } from "lucide-react";

const typeIcons = {
  skill: Briefcase,
  portfolio: FileText,
  certificate: Award,
};

const typeLabels = {
  skill: "Skill",
  portfolio: "Portfolio",
  certificate: "Sertifikat",
};

const statusMap = {
  pending: "pending",
  approved: "verified",
  rejected: "rejected",
} as const;

interface SubmissionCardProps {
  title: string;
  type: "skill" | "portfolio" | "certificate";
  status: "pending" | "approved" | "rejected";
  points: number;
  date: string;
  className?: string;
}

export function SubmissionCard({
  title,
  type,
  status,
  points,
  date,
  className,
}: SubmissionCardProps) {
  const Icon = typeIcons[type];

  return (
    <div
      className={clsx(
        "elevation-1 rounded-[var(--rounded-lg)] p-[var(--space-md)] flex items-center gap-4 transition-all duration-200 hover:shadow-[var(--shadow-hover)]",
        className,
      )}
    >
      <div className="rounded-[var(--rounded-md)] bg-[var(--primary-fixed)] p-2.5 shrink-0">
        <Icon className="h-5 w-5 text-[var(--primary-container)]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--on-surface)] truncate">
          {title}
        </p>
        <p className="text-xs text-[var(--on-surface-variant)] mt-0.5">
          {typeLabels[type]} · {date}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {status === "approved" && points > 0 ? (
          <PointChip points={points} size="sm" />
        ) : null}
        <Badge status={statusMap[status]}>
          {status === "pending"
            ? "Menunggu"
            : status === "approved"
              ? "Disetujui"
              : "Ditolak"}
        </Badge>
      </div>
    </div>
  );
}
