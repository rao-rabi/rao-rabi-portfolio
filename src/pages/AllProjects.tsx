import { Header, Footer } from '@/features/portfolio/Layout';
import { Work } from '@/features/portfolio/HomeSections';
import { MoreWork } from '@/features/portfolio/Evidence';
import { PageMeta } from '@/features/portfolio/PageMeta';

export default function AllProjects() {
  return <><PageMeta title="All Projects — Rao Rabi" description="Explore Rao Rabi’s SaaS, mobile, internal tools, and automation projects." path="/projects" /><Header /><main id="main" tabIndex={-1}><section className="section all-projects-intro"><p className="eyebrow">PROJECT ARCHIVE</p><h1>All Projects</h1><p>Featured case studies and additional web, mobile, and AI builds.</p></section><Work /><MoreWork /></main><Footer /></>;
}
