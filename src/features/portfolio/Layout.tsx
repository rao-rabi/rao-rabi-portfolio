import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { profile } from '@/data/portfolio';
export function Header({ contactHref = '/#contact' }: { contactHref?: string }) {
    const [open, setOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null);
    return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><Link className="wordmark" to="/" aria-label="Rao Rabi home"><span className="brand-monogram" aria-hidden="true">RR</span>Rao Rabi</Link><button ref={toggleRef} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } }} id="primary-nav" aria-label="Primary" className={open ? 'navigation open' : 'navigation'}>{[['Work', 'work'], ['Services', 'services'], ['About', 'about']].map(([label, id]) => <a key={id} href={`/#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-contact" href={contactHref} onClick={() => setOpen(false)}>Discuss your project</a></nav></header></>;
}
export function Footer() {
    return <footer className="site-footer"><a href="/" className="wordmark"><span className="brand-monogram" aria-hidden="true">RR</span>Rao Rabi</a><Link to="/projects" className="text-link">All Projects</Link><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a><span>© {new Date().getFullYear()} Rao Rabi</span></footer>;
}
export function SectionHeading({ number, label, title, description }: {
    number: string;
    label: string;
    title: string;
    description?: string;
}) {
    return <div className="section-heading"><div><p className="eyebrow">{number} / {label}</p><h2>{title}</h2></div>{description && <p className="section-description">{description}</p>}</div>;
}
