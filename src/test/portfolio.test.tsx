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
it('routes visible case-study contact links to its prefilled form', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(<MemoryRouter initialEntries={['/work/propertyfy']}><Routes><Route path="/work/:slug" element={<CaseStudy />}/></Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'My role' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tools & technology' })).toBeInTheDocument();
    const details = screen.getByLabelText('Project details');
    expect(details).toHaveValue('I’m interested in something like PropertyFy.\n\n');
    fireEvent.change(details, { target: { value: 'I need a configurator for custom furniture.' } });
    for (const link of screen.getAllByRole('link', { name: 'Discuss your project' })) {
        expect(link).toHaveAttribute('href', '#contact');
        fireEvent.click(link);
    }
    expect(details).toHaveValue('I need a configurator for custom furniture.');
});

it.each([
    ['digital-parchi', 'Digital Parchi'],
    ['propertyfy', 'PropertyFy'],
    ['grammar-guru', 'Grammar Guru'],
    ['decoded-skin', 'Decoded Skin'],
    ['talkative-buddy', 'Talkative Buddy'],
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

it('keeps the hero focused on PropertyFy and identifies concept imagery', () => {
    render(<Hero />);
    expect(screen.getByLabelText('My PropertyFy contribution')).toHaveTextContent('A connected workspace.');
    expect(screen.queryByText(/Dental clinic/i)).not.toBeInTheDocument();
    expect(screen.getByText(/concept cover, not a production screenshot/)).toBeInTheDocument();
});

it('keeps project cards free of cover badges and links services to delivery examples', () => {
    render(<MemoryRouter><Work /><Services /></MemoryRouter>);
    expect(screen.queryByText('Concept cover')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore an operations platform/ })).toHaveAttribute('href', '/work/propertyfy');
    expect(screen.queryByRole('link', { name: 'Discuss your project' })).not.toBeInTheDocument();
});
