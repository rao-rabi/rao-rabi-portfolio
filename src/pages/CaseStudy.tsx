import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { selectedProjects } from '@/features/portfolio/projects';
import { Header, Footer } from '@/features/portfolio/Layout';
import { ProjectVisual } from '@/features/portfolio/ProjectVisual';
import { Contact } from '@/features/portfolio/Contact';
import { PageMeta } from '@/features/portfolio/PageMeta';
import NotFound from './NotFound';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = selectedProjects.find(item => item.slug === slug);
  if (!project) return <NotFound />;
  const automation = ['rapidships', 'dental-clinic'].includes(project.slug);
  return (
    <>
      <PageMeta title={`${project.name} — Case Study — Rao Rabi`} description={project.summary} path={`/work/${project.slug}`} />
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="section case-hero">
          <Link className="text-link" to="/#work"><ArrowLeft size={17} /> Selected work</Link>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.name}</h1>
          <p className="case-summary">{project.summary}</p>
          <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </section>
        <section className="section case-body">
          <aside>
            <p className="eyebrow">IN THIS CASE STUDY</p>
            <nav aria-label="Case study sections"><a href="#problem">Problem</a><a href="#role">My role</a><a href="#solution">Solution</a><a href="#tools">Tools</a><a href="#screenshots">{automation ? 'Workflow' : 'Product imagery'}</a><a href="#results">Verified results</a></nav>
            {project.url && <a className="text-link" href={project.url} target="_blank" rel="noreferrer">{slug === 'rapidships' ? 'Agency case study' : 'Visit product'}<ArrowUpRight size={17} /></a>}
          </aside>
          <div>
            <section id="problem"><h2>The problem</h2><p>{project.problem}</p><p>{project.context}</p></section>
            <section id="role"><h2>My role</h2><p>{project.role}</p></section>
            <section id="solution"><h2>What I delivered</h2><p>{project.solution}</p>
              <dl className="case-scope">{project.scope.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl>
            </section>
            <section id="tools"><h2>Tools & technology</h2><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></section>
            <section id="screenshots" className="case-imagery"><h2>{automation ? 'The connected workflow' : 'Product imagery'}</h2><ProjectVisual kind={project.theme} />{automation && <p className="image-note">Illustration of the confirmed workflow, not a screenshot of the n8n editor.</p>}</section>
            {automation && <section><h2>AI and standard automation</h2><p>{slug === 'dental-clinic' ? 'AI attends calls and replies to customer messages. n8n orchestrates standard automation for Google Calendar booking and WhatsApp notifications to both parties. The specific AI provider and model are not claimed.' : 'Record updates, work-order handoffs, and invoice creation are standard automation steps. The project includes AI automation, but the specific AI task and model have not yet been confirmed.'}</p></section>}
            <section id="results"><h2>Verified results</h2><p>{project.outcome || `Delivered the ${project.name === 'UpThyme' ? 'workforce platform and modules' : 'React Native application and Django backend'} described above.`}</p><p>No quantified performance or business results are claimed.</p></section>
            <div className="evidence-note"><h3>Evidence notes</h3><p>{project.pending}</p></div>
            {slug === 'rapidships' && <p className="source-note">Source: <a href={project.url} target="_blank" rel="noreferrer">Apex Arabia’s RapidShips case study</a>. Wider agency scope and outcomes are not attributed to Rao Rabi.</p>}
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
