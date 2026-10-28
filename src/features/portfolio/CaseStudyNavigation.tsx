import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useActiveSection } from './useActiveSection';

type Section = { id: string; label: string };
export const productSections: Section[] = [
  { id: 'problem', label: 'Problem' },
  { id: 'role', label: 'My role' },
  { id: 'solution', label: 'Solution' },
  { id: 'tools', label: 'Tools' },
  { id: 'screenshots', label: 'Project visual' },
  { id: 'results', label: 'Delivered outcome' },
];
export const automationSections: Section[] = [
  ...productSections.slice(0, 4),
  { id: 'screenshots', label: 'Workflow' },
  { id: 'ai-automation', label: 'AI & automation' },
  productSections[5],
];
const demoSections = productSections.map(section => ({ ...section, label: ({ screenshots: 'Screenshots' } as Record<string, string>)[section.id] ?? section.label }));
const demoIds = demoSections.map(section => section.id);
const productIds = productSections.map(section => section.id);
const automationIds = automationSections.map(section => section.id);

export function CaseStudyNavigation({ automation, demo = false, url, agency, contribution }: {
  automation: boolean; demo?: boolean; url: string; agency: boolean; contribution: string;
}) {
  const navRef = useRef<HTMLElement>(null);
  const sections = demo ? demoSections : automation ? automationSections : productSections;
  const activeId = useActiveSection(demo ? demoIds : automation ? automationIds : productIds);
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (nav && link && nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: link.offsetLeft - nav.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2 });
    }
  }, [activeId]);
  return (
    <aside className="case-sidebar">
      <p className="eyebrow">IN THIS CASE STUDY</p>
      <nav ref={navRef} aria-label="Case study sections">
        {sections.map((section, index) => (
          <a key={section.id} href={`#${section.id}`} aria-current={activeId === section.id ? 'location' : undefined}>
            <span className="case-nav-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            {section.label}
          </a>
        ))}
      </nav>
      <div className="case-sidebar-summary"><span className="eyebrow">MY DELIVERY</span><p>{contribution}</p></div>
      {url && <a className="text-link case-product-link" href={url} target="_blank" rel="noreferrer">{demo ? 'Explore live demo' : agency ? 'Agency case study' : url.startsWith('https://apps.apple.com/') ? 'View on App Store' : 'Visit product'}<ArrowUpRight size={17} /></a>}
      <a className="button primary case-enquiry" href="#contact">Discuss your project<ArrowUpRight size={17} /></a>
    </aside>
  );
}
