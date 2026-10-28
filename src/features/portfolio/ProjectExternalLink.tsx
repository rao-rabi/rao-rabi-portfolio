import { ArrowUpRight } from 'lucide-react';

export function ProjectExternalLink({ name, slug, url }: { name: string; slug: string; url: string }) {
  if (!url) return null;
  const label = slug === '3d-trailer-builder' ? 'Explore live demo' : slug === 'rapidships' ? 'Agency case study' : url.startsWith('https://apps.apple.com/') ? 'View on App Store' : 'Visit live project';
  return (
    <a className="text-link project-live-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label}: ${name} (opens in a new tab)`}>
      {label}<ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
