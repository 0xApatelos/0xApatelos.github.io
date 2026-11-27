import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { SITE } from '../config/site';
import { SELECTED_PROJECTS } from '../data/selectedProjects';

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
const renderHome = () => render(<MemoryRouter><Home /></MemoryRouter>);

describe('editorial portfolio home', () => {
  it('shows a static identity, real photo, CV, and LinkedIn', () => {
    renderHome();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('img', { name: SITE.name }).getAttribute('src')).toContain('profile');
    expect(screen.getByText(SITE.tagline)).toBeTruthy();
    expect(screen.getByRole('link', { name: /View CV$/ }).getAttribute('href')).toBe('/cv');
    expect(screen.getByRole('link', { name: /LinkedIn/ }).getAttribute('href')).toBe(SITE.social.linkedin);
  });

  it('keeps selected work available without fetching GitHub or using scroll observers', () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    renderHome();
    const projects = screen.getByRole('region', { name: 'Projects & implementation.' });
    expect(within(projects).getAllByRole('article')).toHaveLength(3);
    for (const project of SELECTED_PROJECTS) {
      expect(within(projects).getByRole('link', { name: project.title }).getAttribute('href')).toBe(project.url);
    }
    expect(fetch).not.toHaveBeenCalled();
    expect(projects.querySelector('.reveal')).toBeNull();
  });

  it('scrolls to selected work and respects reduced motion', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    renderHome();
    const scroll = vi.fn();
    document.getElementById('projects')!.scrollIntoView = scroll;
    fireEvent.click(screen.getByRole('link', { name: 'Explore projects' }));
    expect(scroll).toHaveBeenCalledWith({ behavior: 'auto' });
  });

  it('keeps project limitations and academic leave visible', () => {
    renderHome();
    expect(screen.getByText(/The assistant is search-only/)).toBeTruthy();
    expect(screen.getByText(/not a general-purpose solver/)).toBeTruthy();
    expect(screen.getByText(/Currently on academic leave/)).toBeTruthy();
    for (const link of screen.getAllByRole('link').filter(a => a.getAttribute('target') === '_blank')) {
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });
});
