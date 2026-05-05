import { testimonials } from "@/data/portfolio";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 container-edge">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-14">
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.25em] ink-faint">
            05 — Testimonials
          </p>
          <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[0.95] tracking-tight">
            What people <em className="gold not-italic">say</em>.
          </h2>
        </div>
        <p className="md:col-span-6 md:col-start-7 text-lg leading-relaxed ink-dim text-pretty self-end">
          Recommendations from teammates, managers and collaborators I've
          shipped real products with — pulled from LinkedIn.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="bg-background p-8 md:p-10 flex flex-col"
          >
            <Quote className="size-6 gold mb-5" aria-hidden />
            <blockquote className="text-base md:text-lg leading-relaxed text-pretty">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6 pt-6 border-t border-border">
              <div className="font-display text-lg">{t.name}</div>
              <div className="text-xs ink-dim mt-1">{t.role}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] ink-faint mt-2">
                {t.via}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
