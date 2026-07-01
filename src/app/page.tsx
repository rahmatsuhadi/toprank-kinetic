import { ArrowRight, FileText, Gift, Shield, Trophy, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[var(--primary-container)] via-[var(--primary)] to-[var(--secondary)] text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-[var(--container-max)] mx-auto px-[var(--space-lg)] py-24 md:py-32">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="h-8 w-8 text-[var(--reward-gold)]" />
            <span className="text-xl font-bold">Kinetic Academy</span>
          </div>
          <h1 className="text-display-lg max-w-2xl">
            Universitas Amikom Yogyakarta
          </h1>
          <p className="text-body-lg text-white/80 max-w-lg mt-4">
            Platform gamifikasi untuk memetakan, mengembangkan, dan
            mempertemukan talenta mahasiswa dengan berbagai peluang.
          </p>
          <div className="flex gap-4 mt-8 flex-wrap">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-[var(--primary)] px-6 py-3 rounded-[var(--rounded-md)] font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Mulai Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-[var(--rounded-md)] font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Masuk
            </Link>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-20 px-[var(--space-lg)]">
        <div className="max-w-[var(--container-max)] mx-auto">
          <h2 className="text-headline-lg text-center mb-2">Fitur Unggulan</h2>
          <p className="text-body-md text-[var(--on-surface-variant)] text-center mb-12 max-w-md mx-auto">
            Bangun portofolio, raih poin, dan tunjukkan kemampuanmu.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--space-lg)]">
            {[
              {
                icon: FileText,
                title: "Portfolio & Sertifikat",
                desc: "Dokumentasikan pencapaianmu dan dapatkan verifikasi resmi.",
              },
              {
                icon: Shield,
                title: "Verifikasi Admin",
                desc: "Setiap pengajuan diverifikasi oleh admin universitas.",
              },
              {
                icon: Trophy,
                title: "Leaderboard",
                desc: "Bersaing secara sehat dan naik peringkat.",
              },
              {
                icon: Gift,
                title: "Reward System",
                desc: "Tukarkan poin dengan voucher dan reward menarik.",
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="elevation-1 rounded-[var(--rounded-lg)] p-[var(--space-lg)] hover:shadow-[var(--shadow-hover)] transition-all duration-200"
              >
                <div className="rounded-[var(--rounded-md)] bg-[var(--primary-fixed)] p-3 w-fit mb-4">
                  <feat.icon className="h-6 w-6 text-[var(--primary-container)]" />
                </div>
                <h3 className="text-sm font-bold text-[var(--on-surface)] mb-1">
                  {feat.title}
                </h3>
                <p className="text-xs text-[var(--on-surface-variant)] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[var(--outline-variant)] py-8 px-[var(--space-lg)]">
        <div className="max-w-[var(--container-max)] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[var(--on-surface-variant)]">
            <Zap className="h-4 w-4 text-[var(--primary-container)]" />
            Kinetic Academy
          </div>
          <p className="text-xs text-[var(--outline)]">
            © {new Date().getFullYear()} Universitas Amikom Yogyakarta
          </p>
        </div>
      </footer>
    </div>
  );
}
