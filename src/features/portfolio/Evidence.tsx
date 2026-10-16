import { ArrowUpRight } from 'lucide-react';
import { projects, testimonials } from '@/data/portfolio';
import { selectedProjects } from './projects';
import { SectionHeading } from './Layout';
export function MoreWork() {
    return (<section className="section more-work">
      <SectionHeading number="MORE" label="PRODUCT EXPERIENCE" title="Across web, mobile & AI."/>
      <div className="more-work-grid">
        {projects.filter(project => !selectedProjects.some(featured => featured.name === project.name)).map(project => (<article key={project.name}>
            <p className="eyebrow">{project.tag}</p>
            <h3>{project.name}</h3>
            <p>{project.blurb}</p>
            <div className="tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
            {project.url && <a className="text-link" href={project.url} target="_blank" rel="noreferrer">Visit product <ArrowUpRight size={16}/></a>}
          </article>))}
      </div>
    </section>);
}
export function CareerEvidence() {
    return (<section className="section career-evidence">
      <SectionHeading number="BACKGROUND" label="EXPERIENCE" title="Teams I’ve built with."/>
      <div className="career-summary"><p><strong>Senior Software Engineer & Frontend Team Lead</strong><br />AskUs Solution · Jun 2024 — Present</p><p>Previously: Dzine Media, MAAQ Services, and Technokloud.</p><a className="text-link" href="https://www.linkedin.com/in/rao-rabi/" target="_blank" rel="noreferrer">Full experience on LinkedIn <ArrowUpRight size={16} /></a></div>
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
