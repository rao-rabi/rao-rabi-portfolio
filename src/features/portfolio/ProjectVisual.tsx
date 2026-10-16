import upthymeImage from '@/assets/upthyme-product.webp';
import athloImage from '@/assets/athlo.webp';
import { AutomationVisual } from './AutomationVisual';

export function ProjectVisual({ kind }: { kind: string }) {
  if (kind === 'dark' || kind === 'cream') {
    return <AutomationVisual clinic={kind === 'cream'} />;
  }
  const isWorkforce = kind === 'blue';
  const name = isWorkforce ? 'UpThyme' : 'Athlo';
  return (
    <figure className={`project-screenshot screenshot-${name.toLowerCase()}`}>
      <img
        src={isWorkforce ? upthymeImage : athloImage}
        alt={isWorkforce
          ? 'UpThyme product visual showing scheduling and payroll'
          : 'Athlo mobile app overview showing sports, matches, news, and chat screens'}
        loading="lazy"
      />
      <figcaption>{name} · product overview supplied by Rao Rabi</figcaption>
    </figure>
  );
}
