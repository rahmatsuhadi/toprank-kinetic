import { clsx } from "clsx";
import { Star } from "lucide-react";

interface PointChipProps {
  points: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PointChip({ points, className, size = "md" }: PointChipProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full font-mono font-bold",
        "bg-[var(--reward-gold)]/15 text-[var(--tertiary)]",
        {
          "px-2 py-0.5 text-xs": size === "sm",
          "px-3 py-1 text-sm": size === "md",
          "px-4 py-1.5 text-point-display": size === "lg",
        },
        className,
      )}
    >
      <Star className={clsx(
        "fill-[var(--reward-gold)] text-[var(--reward-gold)]",
        {
          "h-3 w-3": size === "sm",
          "h-3.5 w-3.5": size === "md",
          "h-4 w-4": size === "lg",
        },
      )} />
      {points}
    </span>
  );
}
