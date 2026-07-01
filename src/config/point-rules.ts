/**
 * Point rules configuration.
 * Points are awarded ONLY after admin verification (approval).
 */

export const CERTIFICATE_POINTS = {
  lokal: 1,
  regional: 3,
  nasional: 5,
  internasional: 10,
} as const;

export const PORTFOLIO_POINTS = {
  personal: 2,
  freelance: 5,
  industri: 8,
} as const;

export const SKILL_POINTS = {
  "React.js / Next.js Development": 4,
  "Vue.js / Nuxt.js Development": 4,
  "TypeScript Programming": 3,
  "JavaScript Programming": 2,
  "Python Data Science / Machine Learning": 5,
  "Go (Golang) Backend Development": 5,
  "Node.js Backend Development": 4,
  "UI/UX Design & Prototyping": 3,
  "Flutter Mobile Development": 5,
  "Laravel Web Development": 3,
  "DevOps (Docker, Kubernetes, AWS)": 5,
  "SQL & Relational Databases": 3,
} as const;

/** Base points for a generic "skill" submission (no sub-level). */
export const SKILL_BASE_POINTS = 1;

export type CertificateLevel = keyof typeof CERTIFICATE_POINTS;
export type PortfolioLevel = keyof typeof PORTFOLIO_POINTS;

/**
 * Resolve the points to award based on submission type and level.
 */
export function resolvePoints(
  type: "skill" | "portfolio" | "certificate",
  certificateLevel?: CertificateLevel | null,
  portfolioLevel?: PortfolioLevel | null,
  title?: string | null,
): number {
  switch (type) {
    case "certificate":
      return certificateLevel ? CERTIFICATE_POINTS[certificateLevel] : 1;
    case "portfolio":
      return portfolioLevel ? PORTFOLIO_POINTS[portfolioLevel] : 2;
    case "skill":
      if (title && title in SKILL_POINTS) {
        return SKILL_POINTS[title as keyof typeof SKILL_POINTS];
      }
      return SKILL_BASE_POINTS;
    default:
      return 0;
  }
}
