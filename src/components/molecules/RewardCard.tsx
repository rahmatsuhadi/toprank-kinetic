import { clsx } from "clsx";
import { Gift, Package } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { PointChip } from "@/components/atoms/PointChip";

interface RewardCardProps {
  id: number;
  title: string;
  description: string;
  pointsCost: number;
  stock: number;
  userPoints?: number;
  onClaim?: (id: number) => void;
  isClaiming?: boolean;
  className?: string;
}

export function RewardCard({
  id,
  title,
  description,
  pointsCost,
  stock,
  userPoints,
  onClaim,
  isClaiming,
  className,
}: RewardCardProps) {
  const canClaim =
    userPoints !== undefined && userPoints >= pointsCost && stock > 0;

  return (
    <div
      className={clsx(
        "elevation-1 rounded-[var(--rounded-lg)] p-[var(--space-lg)] flex flex-col gap-4 transition-all duration-200 hover:shadow-[var(--shadow-hover)] animate-fade-in",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="rounded-[var(--rounded-md)] bg-[var(--tertiary-fixed)] p-2.5">
          <Gift className="h-5 w-5 text-[var(--tertiary-container)]" />
        </div>
        <PointChip points={pointsCost} />
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-bold text-[var(--on-surface)]">{title}</h3>
        <p className="text-xs text-[var(--on-surface-variant)] mt-1 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs text-[var(--on-surface-variant)]">
          <Package className="h-3 w-3" />
          Stok: {stock}
        </span>

        {onClaim ? (
          <Button
            variant={canClaim ? "reward" : "ghost"}
            size="sm"
            disabled={!canClaim}
            isLoading={isClaiming}
            onClick={() => onClaim(id)}
            className={clsx(!canClaim && "!animate-none")}
          >
            {stock === 0 ? "Habis" : !canClaim ? "Poin Kurang" : "Klaim"}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
