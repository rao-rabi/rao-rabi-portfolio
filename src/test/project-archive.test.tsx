import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProjectArchive } from '@/features/portfolio/ProjectArchive';
import { visibleProjects } from '@/features/portfolio/projects';

afterEach(cleanup);

function renderArchive() {
  render(<MemoryRouter><ProjectArchive /></MemoryRouter>);
}

function chooseTab(name: RegExp) {
  fireEvent.mouseDown(screen.getByRole('tab', { name }), { button: 0, ctrlKey: false });
}

describe('Project archive categories', () => {
  it('shows every project once and gives every project a supported category', () => {
    renderArchive();
    expect(screen.getAllByRole('article')).toHaveLength(visibleProjects.length);
    const projectNames = screen.getAllByRole('heading', { level: 2 }).map(heading => heading.textContent);
    expect(projectNames).toEqual(visibleProjects.map(project => project.name));
    for (const project of visibleProjects) {
      expect(project.projectTypes.length).toBeGreaterThan(0);
      expect(project.projectTypes.every(type => ['web', 'app', 'ai', '3d'].includes(type))).toBe(true);
    }
  });

  it.each([
    [/^Web/, ['UpThyme', 'Maardhcum', 'Decoded Skin', 'PropertyFy']],
    [/^Mobile Apps/, ['Athlo', 'Maardhcum', 'Digital Parchi']],
    [/^AI Automation/, ['RapidShips', 'Dental Clinic', 'Talkative Buddy', 'Grammar Guru']],
  ] as const)('shows only matching projects for %s', (tab, names) => {
    renderArchive();
    chooseTab(tab);
    expect(screen.getByRole('tab', { name: tab })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(names.length);
    for (const name of names) expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveTextContent(`${names.length} ${names.length === 1 ? 'project' : 'projects'}`);
  });

  it('restores all projects after filtering and retains case-study links', () => {
    renderArchive();
    chooseTab(/^Mobile Apps/);
    expect(screen.getByRole('link', { name: 'Explore Digital Parchi' })).toHaveAttribute('href', '/work/digital-parchi');
    chooseTab(/^All/);
    expect(screen.getAllByRole('article')).toHaveLength(visibleProjects.length);
  });

  it('supports arrow keys and wraps keyboard focus between tabs', async () => {
    renderArchive();
    const allTab = screen.getByRole('tab', { name: /^All/ });
    act(() => allTab.focus());
    fireEvent.keyDown(allTab, { key: 'ArrowRight' });
    await waitFor(() => expect(screen.getByRole('tab', { name: /^Web/ })).toHaveFocus());
    expect(screen.getByRole('tab', { name: /^Web/ })).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(document.activeElement!, { key: 'Home' });
    await waitFor(() => expect(allTab).toHaveFocus());
    fireEvent.keyDown(allTab, { key: 'ArrowLeft' });
    await waitFor(() => expect(screen.getByRole('tab', { name: /^3D/ })).toHaveFocus());
  });
});
