import profileImage from '@/assets/profile.webp';
import { ArrowUpRight, Code2, Layers, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { selectedProjects } from './projects';
import { ProjectVisual } from './ProjectVisual';
import { SectionHeading } from './Layout';
export function Work() {
  return (
    <section id="work" className="section work">
      <div className="work-heading"><h2>Selected work</h2><p>Software that solves real problems.</p></div>
      <div className="project-list">
        {selectedProjects.map(project => (
          <article className="project" key={project.slug}>
            <Link to={`/work/${project.slug}`} className="visual-link" aria-label={`Explore ${project.name}`}>
              <ProjectVisual kind={project.theme} />
            </Link>
            <div className="project-copy">
              <h3><Link to={`/work/${project.slug}`}>{project.name}<span className="project-arrow"><ArrowUpRight size={20} /></span></Link></h3>
              <p className="project-category">{project.category}</p>
              <p className="project-summary"><strong>Problem</strong> {project.problem}</p><p className="project-summary"><strong>My contribution</strong> {project.contribution}</p>
              <Link className="text-link case-link" to={`/work/${project.slug}`}>View case study <ArrowUpRight size={17} /></Link>
            </div>
          </article>
        ))}
      </div>
      <div className="work-all-link"><Link className="text-link" to="/projects">All Projects <ArrowUpRight size={17} /></Link></div>
    </section>
  );
}
const services = [
  [Layers, 'SaaS & Product Development', 'You need to turn an idea into a usable product, or move an existing platform forward.', 'A scoped SaaS MVP or product release, with web and React Native mobile development and backend APIs as needed.'],
  [Code2, 'Internal Tools', 'Your team works around disconnected systems, spreadsheets, or awkward manual processes.', 'Purpose-built dashboards and internal tools that bring the relevant data and operations into one usable interface.'],
  [Workflow, 'AI Automation', 'Repeated handoffs and data entry slow down the work your team needs to do.', 'Connected workflows and integrations, with AI for suitable language tasks and standard automation for predictable actions.'],
] as const;
export function Services() {
  return <section id="services" className="section"><SectionHeading number="02" label="SERVICES" title="Software built for the job." /><div className="services-grid">{services.map(([Icon,title,problem,deliverable])=><article key={title}><Icon size={27} /><h3>{title}</h3><p>{problem}</p><p><strong>What you get</strong> {deliverable}</p><a className="text-link" href="#contact">Discuss your project <ArrowUpRight size={17} /></a></article>)}</div></section>;
}
export function ProcessAbout() {
    return <><section className="section"><SectionHeading number="04" label="THE PROCESS" title="Clear steps. Close collaboration."/><div className="process-grid">{[['Understand', 'We map the problem, your users, and what a useful outcome looks like.'], ['Scope', 'We agree on priorities, deliverables, and the smallest valuable release.'], ['Build', 'I develop in reviewable steps, with room for feedback along the way.'], ['Launch & refine', 'We test the important flows, prepare the handover, and plan what comes next.']].map(([t, d], i) => <article key={t}><span className="eyebrow">0{i + 1}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section><section id="about" className="section about"><div className="about-portrait"><img src={profileImage} alt="Portrait of Rao Rabi" loading="lazy" /></div><div><p className="eyebrow">05 / THE PERSON BEHIND THE BUILD</p><h2>Engineer by craft.<br /><span className="serif">Problem solver by nature.</span></h2><p>I’m Rao Rabi, a senior software engineer and frontend team lead at AskUs Solution, specialising in web and mobile development, SaaS products, internal tools, and AI automation.</p><p>I’m interested in the practical side of software: understanding a business problem, choosing a sensible approach, and making the details work for the people using it.</p><a className="text-link" href="#contact">Tell me what you’re working on <ArrowUpRight size={17}/></a></div></section></>;
}
