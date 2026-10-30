import { ArrowRight, Check } from 'lucide-react';
import profileImage from '@/assets/profile.webp';
import productScreenshot from '@/assets/propertyfy.webp';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="hero-identity">
          <img src={profileImage} alt="Rao Rabi" width={96} height={112} />
          <div>
            <p className="hero-greeting">YOUR ENGINEERING PARTNER</p>
            <p className="hero-name">I’m Rao Rabi.</p>
            <p className="hero-role">Senior Software Engineer</p>
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
        <div className="browser-bar"><span aria-hidden="true"><i /><i /><i /></span><span>PropertyFy / Property management</span></div>
        <img src={productScreenshot} alt="Concept cover illustrating PropertyFy property management" />
        <figcaption>PropertyFy · concept cover, not a production screenshot</figcaption>
      </figure>
      <aside className="hero-workflow hero-delivery" aria-label="My PropertyFy contribution">
        <p className="eyebrow">PROPERTY OPERATIONS</p>
        <h2>A connected workspace.</h2>
        <p>Dashboards, records & finances</p>
        <ul>{['Rental & sales dashboards', 'Tenant & buyer records', 'Invoices & payments'].map(item => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
        <a className="text-link" href="/work/propertyfy">Explore PropertyFy <ArrowRight size={16} /></a>
      </aside>
    </div>
  );
}
