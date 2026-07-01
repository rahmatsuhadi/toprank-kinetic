import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

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
