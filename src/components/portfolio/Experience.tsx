import { experience } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 container-edge">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] ink-faint">
            03 — Experience
          </p>
          <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[0.95] tracking-tight sticky top-32">
            Where I've <em className="gold not-italic">worked</em>.
          </h2>
        </div>

        <ol className="md:col-span-7 md:col-start-6 space-y-px border-t border-border">
          {experience.map((e) => (
            <li
              key={e.company}
              className="border-b border-border py-8 group"
            >
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <a
                  href={e.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-3xl md:text-4xl tracking-tight inline-flex items-center gap-2 hover:text-gold transition-colors"
                >
                  {e.company}
                  <ArrowUpRight className="size-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
                <span className="font-mono text-xs ink-faint">{e.period}</span>
              </div>
              <p className="ink-dim mt-2 text-sm">
                {e.role} · {e.location}
              </p>
              <ul className="mt-5 space-y-2">
                {e.points.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-pretty leading-relaxed">
                    <span className="gold mt-2 flex-none">—</span>
                    <span className="ink-dim">{pt}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
