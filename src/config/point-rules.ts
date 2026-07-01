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
): number {
  switch (type) {
    case "certificate":
      return certificateLevel ? CERTIFICATE_POINTS[certificateLevel] : 1;
    case "portfolio":
      return portfolioLevel ? PORTFOLIO_POINTS[portfolioLevel] : 2;
    case "skill":
      return SKILL_BASE_POINTS;
    default:
      return 0;
  }
}
