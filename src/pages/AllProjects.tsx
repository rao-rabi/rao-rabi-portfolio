import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '@/features/portfolio/Layout';
import { ProjectArchive } from '@/features/portfolio/ProjectArchive';
import { PageMeta } from '@/features/portfolio/PageMeta';

export default function AllProjects() {
  return <><PageMeta title="All Projects — Rao Rabi" description="Explore Rao Rabi’s web, mobile app, AI automation, and 3D projects." path="/projects" /><Header /><main id="main" tabIndex={-1}><section className="section all-projects-intro"><Link className="text-link archive-back" to="/#work"><ArrowLeft size={18} /> Back to selected work</Link><p className="eyebrow">PROJECT ARCHIVE</p><h1>All Projects</h1><p>Explore web products, mobile apps, AI automation, and interactive 3D experiences.</p></section><ProjectArchive /></main><Footer /></>;
}
