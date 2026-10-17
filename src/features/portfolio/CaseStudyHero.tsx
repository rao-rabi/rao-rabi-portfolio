import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectVisual } from './ProjectVisual';
import { allProjects, selectedProjects } from './projects';
import { ProjectExternalLink } from './ProjectExternalLink';

type Project = (typeof allProjects)[number];

export function CaseStudyHero({ project }: { project: Project }) {
  const featured = selectedProjects.some(item => item.slug === project.slug);
  return (
    <section className="section case-hero">
      <Link className="text-link" to={featured ? "/#work" : "/projects"}><ArrowLeft size={17} /> {featured ? "Selected work" : "All Projects"}</Link>
      <div className="case-hero-layout">
        <div className="case-hero-copy">
          <p className="eyebrow">{project.category}</p>
          <h1>{project.name}</h1>
          <p className="case-summary">{project.summary}</p>
          <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className="case-live-action"><ProjectExternalLink {...project} /></div>
          <div className="case-delivery-summary"><span className="eyebrow">AT A GLANCE</span><p>{project.contribution}</p></div>
        </div>
        <div className="case-hero-preview"><ProjectVisual kind={project.theme} /></div>
      </div>
    </section>
  );
}
