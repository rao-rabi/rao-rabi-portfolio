import { services } from "@/data/portfolio";

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 container-edge">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-14">
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.25em] ink-faint">
            01 — Services
          </p>
          <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[0.95] tracking-tight">
            What I build for <em className="gold not-italic">businesses</em>.
          </h2>
        </div>
        <p className="md:col-span-6 md:col-start-7 text-lg leading-relaxed ink-dim text-pretty self-end">
          Whether you run a salon, a restaurant, a clinic or an online brand —
          I help you turn ideas into beautiful, fast, revenue-generating
          digital products. Plain English, no jargon.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
        {services.map((s, i) => (
          <article
            key={s.title}
            className="bg-background p-8 md:p-10 group hover:bg-surface-elevated transition-colors"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs ink-faint">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                {s.title}
              </h3>
            </div>
            <p className="ink-dim mt-4 leading-relaxed text-pretty">
              {s.desc}
            </p>
            {s.startingAt && (
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] ink-faint">
                Starting from <span className="gold">{s.startingAt}</span>
              </p>
            )}
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm ink-faint text-center md:text-left">
        Final pricing depends on scope and timeline — get a free quote in 24 hours.
      </p>
    </section>
  );
};
