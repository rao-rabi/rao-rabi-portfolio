import { useState } from 'react';
import { ArrowUpRight, Copy } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { EnquiryForm } from './EnquiryForm';

export function Contact() {
  const [status, setStatus] = useState('');
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setStatus('Email address copied.'); }
    catch { setStatus(`Could not copy. Please use ${profile.email}.`); }
  }
  return (
    <section id="contact" className="contact section">
      <p className="eyebrow">LET’S BUILD SOMETHING USEFUL</p>
      <div className="contact-grid">
        <div>
          <h2>Discuss your project</h2>
          <p>A product idea, an internal tool, or a workflow that needs less manual work. Tell me what you have in mind.</p>
          <p className="engagement-note">Available for fixed-scope freelance projects and ongoing development engagements.</p>
          <a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={20} /></a>
          <button className="text-link copy-button" onClick={copyEmail}>Copy email address<Copy size={15} /></button>
          <p className="copy-status" role="status">{status}</p>
          <div className="contact-socials"><a href="https://www.linkedin.com/in/rao-rabi/" target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={14} /></a><a href={`tel:${profile.phone.replace(/[^+0-9]/g, '')}`}>{profile.phone}</a></div>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}
