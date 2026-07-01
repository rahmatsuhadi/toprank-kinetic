import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { Check, Clock, X } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold font-mono tracking-wide",
  {
    variants: {
      status: {
        verified:
          "bg-[var(--success-green)]/10 text-[var(--success-green)]",
        pending:
          "bg-[var(--status-pending)]/10 text-[var(--status-pending)]",
        rejected:
          "bg-[var(--status-rejected)]/10 text-[var(--status-rejected)]",
        neutral:
          "bg-[var(--surface-container)] text-[var(--on-surface-variant)]",
      },
    },
    defaultVariants: {
      status: "neutral",
    },
  },
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string;
  children: React.ReactNode;
  showIcon?: boolean;
}

const statusIcons = {
  verified: Check,
  pending: Clock,
  rejected: X,
  neutral: null,
};

export function Badge({
  className,
  status,
  children,
  showIcon = true,
}: BadgeProps) {
  const IconComponent = status ? statusIcons[status] : null;

  return (
    <span className={clsx(badgeVariants({ status }), className)}>
      {showIcon && IconComponent ? (
        <IconComponent className="h-3 w-3" />
      ) : null}
      {children}
    </span>
  );
}
