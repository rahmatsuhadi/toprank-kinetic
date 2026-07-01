import { clsx } from "clsx";
import { BadgeCheck } from "lucide-react";

interface SkillChipProps {
  label: string;
  verified?: boolean;
  className?: string;
}

export function SkillChip({ label, verified = false, className }: SkillChipProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors",
        verified
          ? "bg-[var(--secondary-container)]/15 text-[var(--secondary)] border border-[var(--secondary-container)]/30"
          : "bg-[var(--surface-container)] text-[var(--on-surface-variant)] border border-[var(--outline-variant)]",
        className,
      )}
    >
      {verified ? <BadgeCheck className="h-3 w-3" /> : null}
      {label}
    </span>
  );
}
