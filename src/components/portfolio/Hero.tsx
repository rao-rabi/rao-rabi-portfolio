import { profile } from "@/data/portfolio";
import { ArrowDownRight, MapPin } from "lucide-react";

export const Hero = () => {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden">
      {/* faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--ink)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ink)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="container-edge relative">
        {/* meta row */}
        <div className="flex items-center gap-4 text-xs font-mono ink-faint uppercase tracking-[0.2em] mb-10 reveal">
          <span className="size-1.5 rounded-full bg-gold" />
          <span>Software Engineer</span>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <MapPin className="size-3" /> {profile.location}
          </span>
        </div>

        {/* big display */}
        <h1 className="font-display font-light text-[14vw] md:text-[9vw] lg:text-[8rem] leading-[0.92] tracking-[-0.03em] text-balance reveal" style={{ animationDelay: "0.1s" }}>
          Rao Rabi <br />
          <span className="italic ink-dim">Khan<span className="gold not-italic">.</span></span>
        </h1>

        <div className="mt-14 grid md:grid-cols-12 gap-10 items-end">
          <p className="md:col-span-7 lg:col-span-6 text-xl md:text-2xl leading-snug text-pretty ink-dim reveal" style={{ animationDelay: "0.25s" }}>
            I architect <span className="text-ink">scalable web & mobile products</span> with React, Next.js and React Native — and lately, AI agents powered by RAG and LLMs serving thousands of live users.
          </p>

          <div className="md:col-span-5 lg:col-span-6 flex flex-col md:items-end gap-6 reveal" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-background rounded-sm font-medium text-sm hover:bg-gold transition-colors"
              >
                See selected work
                <ArrowDownRight className="size-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-border rounded-sm font-medium text-sm hover:border-ink transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
