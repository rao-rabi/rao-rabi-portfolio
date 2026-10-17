import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import { ProjectExternalLink } from '@/features/portfolio/ProjectExternalLink';
import { allProjects } from '@/features/portfolio/projects';

afterEach(cleanup);

it.each(allProjects.filter(project => project.url))('links $name to its configured public destination', project => {
  render(<ProjectExternalLink {...project} />);
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', project.url);
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  expect(link).toHaveTextContent(project.slug === 'rapidships' ? 'Agency case study' : project.slug === 'athlo' ? 'View on App Store' : 'Visit live project');
});

it('does not invent a destination for a project with no public URL', () => {
  render(<ProjectExternalLink name="Dental Clinic" slug="dental-clinic" url="" />);
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});
