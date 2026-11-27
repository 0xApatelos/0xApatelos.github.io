import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';
import { SELECTED_PROJECTS } from '../data/selectedProjects';
import type { Repository } from '../types';

afterEach(cleanup);
const repo: Repository = { id: 1, name: 'IT-Operation-Lab', html_url: 'https://github.com/0xApatelos/IT-Operation-Lab', description: 'Deskripsi dari GitHub', language: 'Python', stargazers_count: 0, forks_count: 0, fork: false };
describe('repository card language', () => {
  it('uses curated English summaries for known projects', () => {
    render(<ProjectCard repo={repo} />);
    expect(screen.getByText(SELECTED_PROJECTS[0].summary)).toBeTruthy();
    expect(screen.queryByText(repo.description!)).toBeNull();
  });
  it('keeps externally authored descriptions on unknown repositories and provides an English fallback', () => {
    const { rerender } = render(<ProjectCard repo={{ ...repo, html_url: 'https://github.com/other/project', description: 'An external project.' }} />);
    expect(screen.getByText('An external project.')).toBeTruthy();
    rerender(<ProjectCard repo={{ ...repo, html_url: 'https://github.com/other/project', description: null }} />);
    expect(screen.getByText(/No description provided/)).toBeTruthy();
  });
});
