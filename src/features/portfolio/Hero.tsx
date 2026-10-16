import { ArrowRight, ArrowDown, CalendarDays, MessageCircle, Phone } from 'lucide-react';
import profileImage from '@/assets/profile.webp';
import productScreenshot from '@/assets/upthyme-product.webp';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="hero-identity">
          <img src={profileImage} alt="Rao Rabi" width={96} height={112} />
          <div>
            <p className="hero-greeting">YOUR ENGINEERING PARTNER</p>
            <p className="hero-name">I’m Rao Rabi.</p>
            <p className="hero-role">Senior Software Engineer <span>·</span> Frontend Team Lead</p>
          </div>
        </div>
        <h1 className="hero-headline">Build better products.<br />Automate the busywork.</h1>
        <p className="hero-description">SaaS products, internal tools, and AI automations for founders and growing teams.</p>
        <div className="hero-actions">
          <a className="button primary" href="#contact">Discuss your project <ArrowRight size={20} /></a>
          <a className="text-link" href="#work">View selected work <ArrowRight size={20} /></a>
        </div>
      </div>
      <HeroShowcase />
    </section>
  );
}

function HeroShowcase() {
  return (
    <div className="hero-showcase">
      <figure className="hero-product">
        <div className="browser-bar"><span aria-hidden="true"><i /><i /><i /></span><span>UpThyme / Workforce SaaS</span></div>
        <img src={productScreenshot} alt="UpThyme scheduling and payroll product visual supplied by Rao Rabi" />
        <figcaption>UpThyme · supplied product visual</figcaption>
      </figure>
      <aside className="hero-workflow" aria-label="Dental clinic workflow illustration">
        <h2>Connected booking</h2>
        <p>Dental clinic · n8n workflow</p>
        <ol>
          {[{icon:Phone,title:'AI call or chat',detail:'Attend calls and reply.'},{icon:CalendarDays,title:'Google Calendar',detail:'Book the appointment.'},{icon:MessageCircle,title:'WhatsApp',detail:'Inform doctor and patient.'}].map(({icon:Icon,title,detail},index)=>(
            <li key={title}>
              {index>0 && <ArrowDown size={16} className="hero-flow-arrow" aria-hidden="true" />}
              <div><span className="hero-flow-icon"><Icon size={19} /></span><div><strong>{title}</strong><p>{detail}</p></div></div>
            </li>
          ))}
        </ol>
        <small>Workflow illustration</small>
      </aside>
    </div>
  );
}
