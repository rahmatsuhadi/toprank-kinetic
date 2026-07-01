import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/auth";
import { EditProfileContent } from "./EditProfileContent";

export const metadata: Metadata = {
  title: "Edit Profil — Kinetic Academy",
};

export default async function EditProfilPage() {
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
    <EditProfileContent
      user={{
        name: u.name,
        email: u.email,
        nim: (u.nim as string) ?? null,
        bio: (u.bio as string) ?? null,
        prodi: (u.prodi as string) ?? null,
        angkatan: (u.angkatan as string) ?? null,
        socialLinks: socialLinks,
      }}
    />
  );
}
