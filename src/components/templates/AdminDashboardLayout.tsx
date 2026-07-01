"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  Trophy,
  Gift,
  Megaphone,
  LogOut,
  Zap,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/verifikasi", label: "Verifikasi", icon: ShieldCheck },
  { href: "/admin/mahasiswa", label: "Mahasiswa", icon: Users },
  { href: "/admin/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/admin/rewards", label: "Rewards", icon: Gift },
  { href: "/admin/opportunities", label: "Opportunities", icon: Megaphone },
];

export function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-[var(--sidebar-width)] bg-[var(--inverse-surface)] text-[var(--inverse-on-surface)] flex flex-col shrink-0 fixed inset-y-0 left-0 z-30">
        {/* Brand */}
        <div className="p-[var(--space-lg)] border-b border-white/10">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-[var(--reward-gold)]" />
            <span className="text-lg font-bold">Kinetic Academy</span>
          </div>
          <p className="text-xs text-white/50 mt-1">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-[var(--space-md)] flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-[var(--rounded-md)] text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-[var(--space-md)] border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--rounded-md)] text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-[var(--sidebar-width)] p-[var(--space-xl)]">
        <div className="max-w-[var(--container-max)] mx-auto">{children}</div>
      </main>
    </div>
  );
}
