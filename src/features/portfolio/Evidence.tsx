import { ArrowUpRight } from 'lucide-react';
import { testimonials } from '@/data/portfolio';
import { SectionHeading } from './Layout';
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
