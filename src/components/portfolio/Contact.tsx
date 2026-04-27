import { profile } from "@/data/portfolio";
import { ArrowUpRight, Mail, Phone, Github, Copy, Check } from "lucide-react";
import { useState } from "react";

export const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <section id="contact" className="py-24 md:py-40 container-edge">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] ink-faint">
          05 — Contact
        </p>
        <h2 className="font-display font-light text-[16vw] md:text-[9rem] leading-[0.9] tracking-[-0.03em] mt-8">
          Let's build <br />
          <em className="ink-dim">something</em>
          <span className="gold not-italic">.</span>
        </h2>

        <p className="ink-dim max-w-xl mx-auto mt-8 text-pretty">
          Got a product, an MVP, or an AI integration in mind? I'm currently
          taking on select freelance and full-time work.
        </p>

        <div className="inline-flex items-center gap-2 mt-12 group">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-3 font-display text-2xl md:text-3xl link-underline"
          >
            {profile.email}
            <ArrowUpRight className="size-6 gold" />
          </a>
          <button
            onClick={copyEmail}
            aria-label="Copy email address"
            className="ml-2 p-2 border border-border rounded-sm hover:border-gold hover:text-gold transition-colors"
          >
            {copied ? <Check className="size-4 gold" /> : <Copy className="size-4" />}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mt-12 ink-dim">
          <a href={`tel:${profile.phone}`} className="inline-flex items-center gap-2 hover:text-ink transition-colors">
            <Phone className="size-4" /> {profile.phone}
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ink transition-colors">
            <Github className="size-4" /> github.com/Rao-Rabi
          </a>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-ink transition-colors">
            <Mail className="size-4" /> Email
          </a>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-edge flex flex-wrap items-center justify-between gap-4 text-xs font-mono ink-faint uppercase tracking-wider">
        <p>© {new Date().getFullYear()} Rao Muhammad Rabi Khan</p>
        <p>Designed & built in Faisalabad <span className="gold">✦</span> Pakistan</p>
      </div>
    </footer>
  );
};
