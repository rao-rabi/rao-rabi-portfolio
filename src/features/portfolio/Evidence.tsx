import { Link } from 'react-router-dom';
import { ProjectExternalLink } from './ProjectExternalLink';
import { ProjectVisual } from './ProjectVisual';
import { ArrowUpRight } from 'lucide-react';
import { testimonials } from '@/data/portfolio';
import { selectedProjects, allProjects } from './projects';
import { SectionHeading } from './Layout';
export function MoreWork() {
    return (<section className="section more-work">
      <SectionHeading number="MORE" label="PRODUCT EXPERIENCE" title="Across web, mobile & AI."/>
      <div className="project-list additional-case-studies">
        {allProjects.filter(project => !selectedProjects.some(featured => featured.slug === project.slug)).map(project => (
          <article className="project" key={project.slug}>
            <Link className="visual-link" to={`/work/${project.slug}`} aria-label={`Explore ${project.name}`}><ProjectVisual kind={project.theme} thumbnail /></Link>
            <div className="project-copy"><p className="eyebrow">{project.category}</p><h3><Link to={`/work/${project.slug}`}>{project.name}<span className="project-arrow"><ArrowUpRight size={20} /></span></Link></h3><p className="project-summary">{project.summary}</p><div className="project-actions"><Link className="text-link" to={`/work/${project.slug}`}>View case study <ArrowUpRight size={17} /></Link><ProjectExternalLink {...project} /></div></div>
          </article>
        ))}
      </div>
    </section>);
}
export function CareerEvidence() {
    return (<section className="section career-evidence">
      <SectionHeading number="BACKGROUND" label="EXPERIENCE" title="Teams I’ve built with."/>
      <div className="career-summary"><p><strong>Senior Software Engineer & Frontend Team Lead</strong><br />AskUs Solution · Mar 2025 — Present</p><p>Previously Software Engineer at AskUs Solution (Jun 2024–Feb 2025), with earlier roles at Dzine Media, MAAQ Services, and Technokloud.</p><a className="text-link" href="https://www.linkedin.com/in/rao-rabi/" target="_blank" rel="noreferrer">Full experience on LinkedIn <ArrowUpRight size={16} /></a></div>
      <div className="recommendations-heading">
        <h2>In good company.</h2>
        <a className="text-link" href="https://www.linkedin.com/in/rao-rabi/" target="_blank" rel="noreferrer">LinkedIn profile <ArrowUpRight size={16}/></a>
      </div>
      <div className="recommendations">
        {testimonials.filter(person => ['Haris Shafiq', 'Muhammad Qasim'].includes(person.name)).map(person => (<figure key={person.name}>
            <blockquote>“{person.quote}”</blockquote>
            <figcaption><strong>{person.name}</strong><span>{person.role}</span><small>{person.via}</small></figcaption>
          </figure>))}
      </div>
    </section>);
}
