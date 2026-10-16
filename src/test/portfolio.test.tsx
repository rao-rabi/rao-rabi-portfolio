import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Contact } from '@/features/portfolio/Contact';
import { Header } from '@/features/portfolio/Layout';
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

it('shows the confirmed UpThyme modules without claiming outcomes', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(<MemoryRouter initialEntries={['/work/upthyme']}><Routes><Route path="/work/:slug" element={<CaseStudy />}/></Routes></MemoryRouter>);
    expect(screen.getByText(/I developed UpThyme from scratch/)).toBeInTheDocument();
    expect(screen.getByText(/Payroll and a WhatsApp-style team chat system/)).toBeInTheDocument();
    expect(screen.getByText('No quantified performance or business results are claimed.')).toBeInTheDocument();
});
