import { profile } from "@/data/portfolio";
import { ArrowUpRight, Mail, Phone, Github, Copy, Check, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((iss) => {
        if (iss.path[0]) fieldErrors[iss.path[0] as string] = iss.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`New project inquiry from ${result.data.name}`);
    const body = encodeURIComponent(
      `${result.data.message}\n\n— ${result.data.name}\n${result.data.email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    toast({
      title: "Opening your email app…",
      description: "If nothing happens, copy my email above and write me directly.",
    });
  };

  return (
    <section id="contact" className="py-24 md:py-40 container-edge">
      <div className="text-center max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.25em] ink-faint">
          07 — Contact
        </p>
        <h2 className="font-display font-light text-[16vw] md:text-[9rem] leading-[0.9] tracking-[-0.03em] mt-8">
          Let's build <br />
          <em className="ink-dim">something</em>
          <span className="gold not-italic">.</span>
        </h2>

        <p className="ink-dim max-w-xl mx-auto mt-8 text-pretty">
          Got a website, mobile app, MVP or AI integration in mind? I'm
          currently taking on select freelance and full-time work.
        </p>

        <div className="inline-flex items-center gap-2 mt-12">
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

        <div className="mt-20 max-w-2xl mx-auto text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] ink-faint mb-3">
            Start a project
          </p>
          <p className="text-lg md:text-xl leading-snug text-pretty">
            Whether you need a website, an app, or a custom system —
            fill in the form and I'll get back to you{" "}
            <span className="gold">within 24 hours</span>.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 text-left grid gap-5 max-w-2xl mx-auto"
          noValidate
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-[0.2em] ink-faint mb-2">
                Your name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="w-full bg-transparent border border-border rounded-sm px-4 py-3 text-base focus:outline-none focus:border-gold transition-colors"
                placeholder="Jane Doe"
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-[0.2em] ink-faint mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="w-full bg-transparent border border-border rounded-sm px-4 py-3 text-base focus:outline-none focus:border-gold transition-colors"
                placeholder="you@company.com"
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.2em] ink-faint mb-2">
              Tell me about your project
            </label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={2000}
              className="w-full bg-transparent border border-border rounded-sm px-4 py-3 text-base focus:outline-none focus:border-gold transition-colors resize-y"
              placeholder="A few sentences about what you're building, timeline, and budget if known."
            />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 px-6 py-4 bg-ink text-background rounded-sm font-medium text-sm hover:bg-gold transition-colors w-full sm:w-auto sm:justify-self-start"
          >
            Send message
            <Send className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-edge flex flex-wrap items-center justify-between gap-4 text-xs font-mono ink-faint uppercase tracking-wider">
        <p>© {new Date().getFullYear()} Rao M. Rabi Khan</p>
        <p>Designed & built in Faisalabad <span className="gold">✦</span> Pakistan</p>
      </div>
    </footer>
  );
};
