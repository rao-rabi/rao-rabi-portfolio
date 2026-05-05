import { projects } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export const Work = () => {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container-edge">
        <div className="flex items-end justify-between mb-16 gap-6 flex-wrap">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] ink-faint">
              03 — Selected Work
            </p>
            <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[0.95] tracking-tight">
              Things I've <em className="gold not-italic">built</em>.
            </h2>
          </div>
          <p className="ink-dim max-w-xs">
            A handful of products from the last few years — SaaS, marketplaces,
            mobile apps and AI tooling.
          </p>
        </div>

        {/* Featured projects */}
        <div className="space-y-px border-t border-border">
          {projects
            .filter((p) => p.featured)
            .map((p, i) => (
              <a
                key={p.name}
                href={p.url ?? "#"}
                target={p.url ? "_blank" : undefined}
                rel="noreferrer"
                className="group block border-b border-border py-10 md:py-14 transition-colors hover:bg-surface-elevated/40"
              >
                <div className="container-edge !px-0 grid md:grid-cols-12 gap-6 items-baseline">
                  <div className="md:col-span-1 font-mono text-xs ink-faint">
                    0{i + 1}
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-display text-4xl md:text-6xl tracking-tight leading-none flex items-center gap-3 flex-wrap">
                      {p.name}
                      {p.url && (
                        <ArrowUpRight className="size-7 ink-faint group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                      )}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-wider ink-faint mt-3">
                      {p.tag} · {p.year}
                    </p>
                  </div>
                  <p className="md:col-span-4 ink-dim leading-relaxed text-pretty">
                    {p.blurb}
                  </p>
                  <div className="md:col-span-2 flex flex-wrap gap-1.5 md:justify-end">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 border border-border rounded-sm ink-dim"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
        </div>

        {/* Other projects */}
        <div className="mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.25em] ink-faint mb-8">
            More projects
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {projects
              .filter((p) => !p.featured)
              .map((p) => (
                <a
                  key={p.name}
                  href={p.url ?? "#"}
                  target={p.url ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group bg-background p-6 hover:bg-surface-elevated transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-display text-2xl tracking-tight">
                      {p.name}
                    </h4>
                    {p.url && (
                      <ArrowUpRight className="size-4 ink-faint group-hover:text-gold transition-colors mt-2" />
                    )}
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-wider ink-faint mt-1">
                    {p.tag} · {p.year}
                  </p>
                  <p className="text-sm ink-dim mt-4 leading-relaxed">
                    {p.blurb}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.stack.map((s) => (
                      <span key={s} className="text-[10px] font-mono ink-faint">
                        {s}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
