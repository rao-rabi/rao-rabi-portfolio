const items = [
  "React",
  "Next.js",
  "React Native",
  "TypeScript",
  "Python",
  "Django",
  "Node.js",
  "PostgreSQL",
  "RAG",
  "LLMs",
  "WebSockets",
  "Tailwind",
  "REST APIs",
  "SSR",
];

export const Marquee = () => {
  const row = [...items, ...items];
  return (
    <section className="hairline border-b border-border py-6 overflow-hidden bg-surface-elevated/40">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {row.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-12 font-display text-3xl md:text-4xl ink-dim"
          >
            <span>{it}</span>
            <span className="gold">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};
