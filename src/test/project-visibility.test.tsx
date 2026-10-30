import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { allProjects, visibleProjects, selectedProjects, hiddenProjectSlugs } from '@/features/portfolio/projects';
import { ProjectArchive } from '@/features/portfolio/ProjectArchive';
import Index from '@/pages/Index';
import CaseStudy from '@/pages/CaseStudy';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

it('retains all project content while excluding hidden projects from public collections', () => {
  expect(allProjects).toHaveLength(11);
  expect(visibleProjects).toHaveLength(6);
  expect(selectedProjects).toHaveLength(4);
  for (const slug of hiddenProjectSlugs) {
    expect(allProjects.find(project => project.slug === slug)?.role).toBeTruthy();
    expect(visibleProjects.some(project => project.slug === slug)).toBe(false);
    expect(selectedProjects.some(project => project.slug === slug)).toBe(false);
  }
});

it.each(['home', 'archive'])('has no hidden project names or links on the %s page', page => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  const { container } = render(<MemoryRouter>{page === 'home' ? <Index /> : <ProjectArchive />}</MemoryRouter>);
  for (const slug of hiddenProjectSlugs) {
    const project = allProjects.find(item => item.slug === slug)!;
    expect(container.textContent).not.toContain(project.name);
    expect(container.querySelector(`a[href*="/work/${slug}"]`)).toBeNull();
    expect(screen.queryByRole('img', { name: new RegExp(project.name, 'i') })).not.toBeInTheDocument();
  }
});

it.each(hiddenProjectSlugs)('does not expose the hidden %s case study by direct URL', slug => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  render(<MemoryRouter initialEntries={[`/work/${slug}`]}><Routes><Route path="/work/:slug" element={<CaseStudy />} /></Routes></MemoryRouter>);
  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  expect(screen.queryByRole('form')).not.toBeInTheDocument();
});
