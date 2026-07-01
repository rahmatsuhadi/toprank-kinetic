"use client";

import { clsx } from "clsx";
import {
  Gift,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/verifikasi", label: "Verifikasi", icon: ShieldCheck },
  { href: "/admin/mahasiswa", label: "Mahasiswa", icon: Users },
  { href: "/admin/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/admin/rewards", label: "Rewards", icon: Gift },
  // { href: "/admin/opportunities", label: "Opportunities", icon: Megaphone },
];

export function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  async function handleLogout() {
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--inverse-surface)] text-[var(--inverse-on-surface)] flex items-center justify-between px-4 z-40 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-[var(--reward-gold)]" />
          <span className="text-lg font-bold">Kinetic Academy</span>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-md transition-colors"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Backdrop */}
      {isSidebarOpen ? (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-xs transition-opacity"
        />
      ) : null}

      {/* Sidebar */}
      <aside
        className={clsx(
          "w-[var(--sidebar-width)] bg-[var(--inverse-surface)] text-[var(--inverse-on-surface)] flex flex-col shrink-0 fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Brand */}
        <div className="p-[var(--space-lg)] border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-[var(--reward-gold)]" />
              <span className="text-lg font-bold">Kinetic Academy</span>
            </div>
            <p className="text-xs text-white/50 mt-1">Admin Panel</p>
          </div>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-md transition-colors"
            aria-label="Close Menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-[var(--space-md)] flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
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
            onClick={() => {
              setIsSidebarOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--rounded-md)] text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-0 lg:ml-[var(--sidebar-width)] p-4 sm:p-6 lg:p-[var(--space-xl)] pt-20 lg:pt-[var(--space-xl)]">
        <div className="max-w-[var(--container-max)] mx-auto">{children}</div>
      </main>
    </div>
  );
}
