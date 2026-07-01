import { Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--surface)] to-[var(--surface-dim)] p-[var(--space-md)]">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Zap className="h-8 w-8 text-[var(--primary-container)]" />
          <span className="text-headline-lg text-[var(--on-surface)]">
            Kinetic Academy
          </span>
        </div>
        <div className="elevation-1 rounded-lg sm:rounded-[var(--rounded-xl)] p-6 sm:p-8 animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
