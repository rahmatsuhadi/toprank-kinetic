import { clsx } from "clsx";
import { PointChip } from "@/components/atoms/PointChip";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  nim?: string | null;
  image?: string | null;
  totalPoints: number;
  rank: number;
}

interface LeaderboardTableProps {
  leaderboard: LeaderboardEntry[];
  currentUser: LeaderboardEntry | null;
}

const rankStyles: Record<number, string> = {
  1: "border-l-4 border-l-[var(--reward-gold)] bg-[var(--reward-gold)]/5",
  2: "border-l-4 border-l-[#C0C0C0] bg-[#C0C0C0]/5",
  3: "border-l-4 border-l-[#CD7F32] bg-[#CD7F32]/5",
};

const rankIcons: Record<number, React.ReactNode> = {
  1: <Trophy className="h-5 w-5 text-[var(--reward-gold)]" />,
  2: <Medal className="h-5 w-5 text-[#C0C0C0]" />,
  3: <Award className="h-5 w-5 text-[#CD7F32]" />,
};

export function LeaderboardTable({
  leaderboard,
  currentUser,
}: LeaderboardTableProps) {
  return (
    <div className="flex flex-col gap-2">
      {leaderboard.map((entry) => (
        <div
          key={entry.id}
          className={clsx(
            "elevation-1 rounded-[var(--rounded-lg)] p-[var(--space-md)] flex items-center gap-4 transition-all duration-200 hover:shadow-[var(--shadow-hover)]",
            rankStyles[entry.rank],
          )}
        >
          {/* Rank */}
          <div className="w-10 text-center shrink-0">
            {rankIcons[entry.rank] ?? (
              <span className="text-point-display text-[var(--on-surface-variant)]">
                {entry.rank}
              </span>
            )}
          </div>

          {/* Avatar placeholder */}
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--primary-container)] to-[var(--secondary-container)] flex items-center justify-center text-white text-sm font-bold shrink-0">
            {entry.name.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--on-surface)] truncate">
              {entry.name}
            </p>
            <p className="text-xs text-[var(--on-surface-variant)]">
              {entry.nim ?? "—"}
            </p>
          </div>

          {/* Points */}
          <PointChip points={entry.totalPoints} />
        </div>
      ))}

      {/* Current user position (if outside top 50) */}
      {currentUser ? (
        <>
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="flex-1 border-t border-dashed border-[var(--outline-variant)]" />
            <span className="text-xs text-[var(--on-surface-variant)]">
              Posisi Kamu
            </span>
            <div className="flex-1 border-t border-dashed border-[var(--outline-variant)]" />
          </div>
          <div className="elevation-1 rounded-[var(--rounded-lg)] p-[var(--space-md)] flex items-center gap-4 border-2 border-[var(--primary-container)]">
            <div className="w-10 text-center shrink-0">
              <span className="text-point-display text-[var(--primary-container)]">
                {currentUser.rank}
              </span>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--primary-container)] to-[var(--secondary-container)] flex items-center justify-center text-white text-sm font-bold shrink-0">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--on-surface)] truncate">
                {currentUser.name} (Kamu)
              </p>
              <p className="text-xs text-[var(--on-surface-variant)]">
                {currentUser.nim ?? "—"}
              </p>
            </div>
            <PointChip points={currentUser.totalPoints} />
          </div>
        </>
      ) : null}
    </div>
  );
}
