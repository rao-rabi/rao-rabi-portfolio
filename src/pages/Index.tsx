import { Header, Footer } from '@/features/portfolio/Layout';
import { Work, Services, ProcessAbout } from '@/features/portfolio/HomeSections';
import { Hero } from '@/features/portfolio/Hero';
import { Contact } from '@/features/portfolio/Contact';
import { CareerEvidence } from '@/features/portfolio/Evidence';
import { Automation } from '@/features/portfolio/Automation';
import { PageMeta } from '@/features/portfolio/PageMeta';
export default function Index() {
    return <><PageMeta title="Rao Rabi — SaaS, Mobile & AI Automation" description="Senior software engineer building SaaS products, mobile apps, internal tools, and n8n automation for founders and businesses." path="/" /><Header /><main id="main" tabIndex={-1}><Hero /><Work /><Services /><Automation /><ProcessAbout /><CareerEvidence /><Contact /></main><Footer /></>;
}
