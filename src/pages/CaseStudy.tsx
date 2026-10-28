import { TrailerScreenshots } from '@/features/portfolio/TrailerScreenshots';
import { useParams } from 'react-router-dom';
import { allProjects } from '@/features/portfolio/projects';
import { Header, Footer } from '@/features/portfolio/Layout';
import { ProjectVisual } from '@/features/portfolio/ProjectVisual';
import { Contact } from '@/features/portfolio/Contact';
import { PageMeta } from '@/features/portfolio/PageMeta';
import { CaseStudyHero } from '@/features/portfolio/CaseStudyHero';
import { CaseStudyNavigation } from '@/features/portfolio/CaseStudyNavigation';
import { AutomationVisual } from '@/features/portfolio/AutomationVisual';
import NotFound from './NotFound';
import { DeliveryWalkthrough } from '@/features/portfolio/DeliveryWalkthrough';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = allProjects.find(item => item.slug === slug);
  if (!project) return <NotFound />;
  const demo = project.slug === '3d-trailer-builder';
  const automation = ['rapidships', 'dental-clinic'].includes(project.slug);
  return (
    <>
      <PageMeta title={`${project.name} — Case Study — Rao Rabi`} description={project.summary} path={`/work/${project.slug}`} />
      <Header contactHref="#contact" />
      <main id="main" tabIndex={-1}>
        <CaseStudyHero project={project} />
        <section className="section case-body">
          <CaseStudyNavigation key={project.slug} automation={automation} demo={demo} url={project.url} agency={slug === 'rapidships'} contribution={project.contribution} />
          <div className="case-content">
            <section id="problem"><h2>The problem</h2><p>{project.problem}</p><p>{project.context}</p></section>
            <section id="role"><h2>My role</h2><p>{project.role}</p></section>
            <section id="solution"><h2>What I delivered</h2><p>{project.solution}</p>
              <dl className="case-scope">{project.scope.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl>
              <DeliveryWalkthrough slug={project.slug} />
            </section>
            <section id="tools"><h2>Tools & technology</h2><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></section>
            <section id="screenshots" className="case-imagery"><h2>{demo ? 'Product screenshots' : automation ? 'Workflow in focus' : 'Project visual'}</h2>{demo ? <TrailerScreenshots /> : <ProjectVisual kind={project.theme} />}{automation && <><h3>How the workflow connects</h3><AutomationVisual clinic={slug === 'dental-clinic'} /></>}</section>
            {automation && <section id="ai-automation"><h2>AI and standard automation</h2><p>{slug === 'dental-clinic' ? 'AI attends calls and replies to customer messages. n8n orchestrates standard automation for Google Calendar booking and WhatsApp notifications to both parties. The specific AI provider and model are not claimed.' : 'Record updates, work-order handoffs, and invoice creation are standard automation steps. The project includes AI automation, but the specific AI task and model have not yet been confirmed.'}</p></section>}
            <section id="results" className="case-outcome"><h2>The delivered outcome</h2><p>{project.outcome}</p></section>
            {slug === 'rapidships' && <p className="source-note">Source: <a href={project.url} target="_blank" rel="noreferrer">Apex Arabia’s RapidShips case study</a>. Wider agency scope and outcomes are not attributed to Rao Rabi.</p>}
          </div>
        </section>
        <Contact key={project.slug} projectName={project.name} />
      </main>
      <Footer />
    </>
  );
}
