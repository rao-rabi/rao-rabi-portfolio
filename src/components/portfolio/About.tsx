import { profile, stats } from "@/data/portfolio";

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 container-edge">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] ink-faint">
            02 — About
          </p>
          <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[0.95] tracking-tight">
            A senior engineer who <em className="gold not-italic">ships</em>.
          </h2>
        </div>

        <div className="md:col-span-7 md:col-start-6 space-y-6">
          <p className="text-xl leading-relaxed text-pretty">
            {profile.summary}
          </p>
          <p className="text-lg leading-relaxed ink-dim text-pretty">
            I care about performance, clean architecture and the small details
            that make products feel alive. Whether it's a real-time auction
            platform, a SaaS planner used across continents, or an AI agent
            embedded into a website — I focus on shipping things that hold up at
            scale.
          </p>

          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-8 border-t border-border">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-4xl md:text-5xl gold">
                  {s.value}
                </dt>
                <dd className="text-xs font-mono uppercase tracking-wider ink-faint mt-2">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
