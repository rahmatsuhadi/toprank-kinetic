import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// ─── Enums ───────────────────────────────────────────────

export const roleEnum = pgEnum("role", ["admin", "mahasiswa"]);

export const submissionStatusEnum = pgEnum("submission_status", [
  "pending",
  "approved",
  "rejected",
]);

export const submissionTypeEnum = pgEnum("submission_type", [
  "skill",
  "portfolio",
  "certificate",
]);

export const certificateLevelEnum = pgEnum("certificate_level", [
  "lokal",
  "regional",
  "nasional",
  "internasional",
]);

export const portfolioLevelEnum = pgEnum("portfolio_level", [
  "personal",
  "freelance",
  "industri",
]);

export const claimStatusEnum = pgEnum("claim_status", ["pending", "claimed"]);

// ─── Better Auth Core Tables ─────────────────────────────

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  // Custom fields for University Talent Hub
  nim: text("nim").unique(),
  role: roleEnum("role").default("mahasiswa").notNull(),
  bio: text("bio"),
  prodi: text("prodi"),
  angkatan: text("angkatan"),
  socialLinks: text("social_links"), // JSON string: { github, linkedin, instagram, etc }
  totalPoints: integer("total_points").default(0).notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// ─── Application / Business Tables ──────────────────────

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  type: submissionTypeEnum("type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  proofUrl: text("proof_url").notNull(),
  certificateLevel: certificateLevelEnum("certificate_level"),
  portfolioLevel: portfolioLevelEnum("portfolio_level"),
  status: submissionStatusEnum("status").default("pending").notNull(),
  rejectionReason: text("rejection_reason"),
  pointsAwarded: integer("points_awarded").default(0).notNull(),
  verifiedBy: text("verified_by").references(() => user.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  pointsCost: integer("points_cost").notNull(),
  stock: integer("stock").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const claims = pgTable("claims", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  rewardId: integer("reward_id")
    .references(() => rewards.id)
    .notNull(),
  pointsSpent: integer("points_spent").notNull(),
  status: claimStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const opportunities = pgTable("opportunities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requiredSkills: text("required_skills").notNull(),
  deadline: timestamp("deadline"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
