import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Contact } from '@/features/portfolio/Contact';
import { Header } from '@/features/portfolio/Layout';
import { Hero } from '@/features/portfolio/Hero';
import { Work, Services } from '@/features/portfolio/HomeSections';
import CaseStudy from '@/pages/CaseStudy';
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe('Contact flow', () => {
    it('provides a project enquiry email link', () => {
        render(<Contact />);
        expect(screen.getByRole('link', { name: 'rabirao1039@gmail.com' })).toHaveAttribute('href', 'mailto:rabirao1039@gmail.com');
    });
    it('confirms a successful email copy', async () => {
        Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: vi.fn().mockResolvedValue(undefined) } });
        render(<Contact />);
        fireEvent.click(screen.getByRole('button', { name: /copy email/i }));
        expect(await screen.findByText('Email address copied.')).toBeInTheDocument();
    });
    it('offers the address when clipboard access fails', async () => {
        Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: vi.fn().mockRejectedValue(new Error('Denied')) } });
        render(<Contact />);
        fireEvent.click(screen.getByRole('button', { name: /copy email/i }));
        expect(await screen.findByRole('status')).toHaveTextContent('Could not copy. Please use rabirao1039@gmail.com.');
    });
});
it('closes the mobile navigation after choosing a section', () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
    expect(screen.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('link', { name: 'Work' }));
    expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false');
});
it('keeps RapidShips agency scope distinct from personal contribution', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => { });
    render(<MemoryRouter initialEntries={['/work/rapidships']}><Routes><Route path="/work/:slug" element={<CaseStudy />}/></Routes></MemoryRouter>);
    expect(screen.getByText(/Wider agency scope and outcomes are not attributed/)).toBeInTheDocument();
    expect(screen.getByText(/I built the automation for RapidShips using n8n/)).toBeInTheDocument();
});

it('shows the confirmed UpThyme modules and delivered outcome', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(<MemoryRouter initialEntries={['/work/upthyme']}><Routes><Route path="/work/:slug" element={<CaseStudy />}/></Routes></MemoryRouter>);
    expect(screen.getByText(/I developed UpThyme from scratch/)).toBeInTheDocument();
    expect(screen.getByText(/Developed the payroll system and WhatsApp-style team chat/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'The delivered outcome' })).toBeInTheDocument();
});

it.each([
    ['digital-parchi', 'Digital Parchi'],
    ['propertyfy', 'PropertyFy'],
    ['grammar-guru', 'Grammar Guru'],
    ['decoded-skin', 'Decoded Skin'],
    ['talkative-buddy', 'Talkative Buddy'],
    ['maardhcum', 'Maardhcum'],
])('opens the %s case study with its own image and delivery content', (slug, name) => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(<MemoryRouter initialEntries={[`/work/${slug}`]}><Routes><Route path="/work/:slug" element={<CaseStudy />}/></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name })).toBeInTheDocument();
    expect(document.querySelector('.case-hero-preview figcaption')).toBeNull();
    expect(document.querySelector('.case-imagery .project-screenshot figcaption')).toBeNull();
    expect(screen.getAllByRole('img', { name: new RegExp(name) })).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'The delivered outcome' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Case study sections' })).toBeInTheDocument();
});

it('keeps the hero focused on UpThyme and identifies concept imagery', () => {
    render(<Hero />);
    expect(screen.getByLabelText('My UpThyme contribution')).toHaveTextContent('Built from scratch.');
    expect(screen.queryByText(/Dental clinic/i)).not.toBeInTheDocument();
    expect(screen.getByText(/concept cover, not a production screenshot/)).toBeInTheDocument();
});

it('keeps project cards free of cover badges and links services to delivery examples', () => {
    render(<MemoryRouter><Work /><Services /></MemoryRouter>);
    expect(screen.queryByText('Concept cover')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore an operations platform/ })).toHaveAttribute('href', '/work/propertyfy');
    expect(screen.queryByRole('link', { name: 'Discuss your project' })).not.toBeInTheDocument();
});
