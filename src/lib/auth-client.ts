import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
});

// ponytail: Better Auth client type inference doesn't include additionalFields.
// Use this helper type when you need to access custom user fields on the client.
export interface AppUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  nim?: string | null;
  role?: string;
  bio?: string | null;
  socialLinks?: string | null;
  totalPoints?: number;
}
