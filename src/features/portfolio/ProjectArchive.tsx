import * as Tabs from '@radix-ui/react-tabs';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { visibleProjects } from './projects';
import { ProjectExternalLink } from './ProjectExternalLink';
import { ProjectVisual } from './ProjectVisual';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'app', label: 'Mobile Apps' },
  { id: 'ai', label: 'AI Automation' },
  { id: '3d', label: '3D' },
];

function projectsFor(category: string) {
  return visibleProjects.filter(project => category === 'all' || project.projectTypes.includes(category));
}

function ArchiveCard({ project }: { project: (typeof visibleProjects)[number] }) {
  const path = `/work/${project.slug}`;
  return (
    <article className="project">
      <Link className="visual-link" to={path} aria-label={`Explore ${project.name}`}>
        <ProjectVisual kind={project.theme} thumbnail />
      </Link>
      <div className="project-copy">
        <p className="eyebrow">{project.category}</p>
        <h2><Link to={path}>{project.name}<span className="project-arrow"><ArrowUpRight size={20} /></span></Link></h2>
        <p className="project-summary">{project.summary}</p>
        <div className="project-actions">
          <Link className="text-link" to={path}>View case study <ArrowUpRight size={17} /></Link>
          <ProjectExternalLink {...project} />
        </div>
      </div>
    </article>
  );
}

export function ProjectArchive() {
  return (
    <Tabs.Root defaultValue="all" className="section project-archive">
      <Tabs.List className="project-filters" aria-label="Filter projects by category" loop>
        {categories.map(({ id, label }) => (
          <Tabs.Trigger key={id} value={id} className="project-filter">
            {label}<span className="project-filter-count">{projectsFor(id).length}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {categories.map(({ id, label }) => {
        const projects = projectsFor(id);
        return (
          <Tabs.Content key={id} value={id} className="project-results">
            <p className="project-results-summary">{id === 'all' ? 'All projects' : label} <span> / {projects.length} {projects.length === 1 ? 'project' : 'projects'}</span></p>
            {projects.length === 0 && <p className="project-empty">No projects are currently published in this category. Explore the other tabs to see more work.</p>}
            <div className="project-list">
              {projects.map(project => <ArchiveCard key={project.slug} project={project} />)}
            </div>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
