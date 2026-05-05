import { skills } from "@/data/portfolio";

export const Skills = () => {
  return (
    <section className="py-24 md:py-32 bg-surface-elevated/30 border-y border-border">
      <div className="container-edge">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] ink-faint">
              05 — Toolkit
            </p>
            <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[0.95] tracking-tight">
              The <em className="gold not-italic">stack</em>.
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border border border-border">
          {skills.map((s) => (
            <div
              key={s.name}
              className="bg-background p-6 group hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl tracking-tight">{s.name}</h3>
                <span className="font-mono text-xs gold">{s.years}y</span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider ink-faint mt-2">
                {s.level}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
