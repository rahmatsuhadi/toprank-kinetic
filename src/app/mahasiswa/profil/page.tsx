import type { Metadata } from "next";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import { ProfileEditor } from "./ProfileEditor";

export const metadata: Metadata = {
  title: "Profil — Kinetic Academy",
};

export default async function ProfilPage() {
  const session = await getCurrentUser();
  if (!session) redirect("/login");

  const u = session.user;
  const socialLinks = u.socialLinks
    ? (() => {
        try {
          return JSON.parse(u.socialLinks as string);
        } catch {
          return {};
        }
      })()
    : {};

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-headline-lg">Talent Profile</h1>
        <p className="text-body-md text-[var(--on-surface-variant)] mt-1">
          Lengkapi profilmu agar terlihat profesional bagi pencari talenta.
        </p>
      </div>
      <ProfileEditor
        name={u.name}
        email={u.email}
        nim={(u.nim as string) ?? ""}
        bio={(u.bio as string) ?? ""}
        socialLinks={socialLinks}
        totalPoints={u.totalPoints ?? 0}
      />
    </div>
  );
}
