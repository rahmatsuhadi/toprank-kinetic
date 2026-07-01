import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      nim: {
        type: "string",
        required: false,
        input: true,
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "mahasiswa",
        input: true,
      },
      bio: {
        type: "string",
        required: false,
        input: true,
      },
      socialLinks: {
        type: "string",
        required: false,
        input: true,
      },
      prodi: {
        type: "string",
        required: false,
        input: true,
      },
      angkatan: {
        type: "string",
        required: false,
        input: true,
      },
      totalPoints: {
        type: "number",
        required: false,
        defaultValue: 0,
        input: false,
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
