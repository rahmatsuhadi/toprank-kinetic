import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={clsx(
        "elevation-1 rounded-[var(--rounded-lg)] p-[var(--space-lg)] transition-all duration-200 hover:shadow-[var(--shadow-hover)] animate-fade-in",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-label-caps text-[var(--on-surface-variant)]">
            {title}
          </span>
          <span className="text-headline-lg text-[var(--on-surface)]">
            {value}
          </span>
          {trend ? (
            <span className="text-xs text-[var(--success-green)] font-medium">
              {trend}
            </span>
          ) : null}
        </div>
        <div className="rounded-[var(--rounded-md)] bg-[var(--primary-fixed)] p-2.5">
          <Icon className="h-5 w-5 text-[var(--primary-container)]" />
        </div>
      </div>
    </div>
  );
}
