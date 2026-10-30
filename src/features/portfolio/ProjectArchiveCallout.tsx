import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { visibleProjects } from './projects';
import { useEnteredViewport } from './useEnteredViewport';

export function ProjectArchiveCallout() {
  const { ref, entered } = useEnteredViewport();
  return (
    <Link ref={ref} className={`project-archive-callout${entered ? ' has-entered' : ''}`} to="/projects">
      <p><strong>More work, across web, mobile & AI.</strong><span>{visibleProjects.length} case studies to explore.</span></p>
      <span className="archive-callout-action">Explore all projects <ArrowUpRight size={24} aria-hidden="true" /></span>
    </Link>
  );
}
