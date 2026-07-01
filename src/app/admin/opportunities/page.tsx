import type { Metadata } from "next";
import { getOpportunities } from "@/actions/opportunities";
import { OpportunityForm } from "@/components/organisms/OpportunityForm";
import { SkillChip } from "@/components/atoms/SkillChip";

export const metadata: Metadata = {
  title: "Opportunities — Kinetic Academy",
};

export default async function OpportunitiesPage() {
  const items = await getOpportunities();

  return (
    <div className="flex flex-col gap-8">
      <OpportunityForm />

      <div>
        <h2 className="text-headline-md mb-4">Opportunities Terposting</h2>
        {items.length === 0 ? (
          <p className="text-sm text-[var(--on-surface-variant)]">
            Belum ada opportunity.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="elevation-1 rounded-[var(--rounded-lg)] p-[var(--space-lg)]">
                <h3 className="text-sm font-bold">{item.title}</h3>
                <p className="text-xs text-[var(--on-surface-variant)] mt-1">{item.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.requiredSkills.split(",").map((s) => (
                    <SkillChip key={s.trim()} label={s.trim()} verified />
                  ))}
                </div>
                {item.deadline ? (
                  <p className="text-xs text-[var(--status-pending)] mt-2">
                    Deadline: {new Date(item.deadline).toLocaleDateString("id-ID")}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
