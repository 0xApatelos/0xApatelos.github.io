import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { SITE } from '../config/site';
import type { Repository } from '../types';

const repo = (id: number, name = `live-project-${id}`): Repository => ({
  id, name, html_url: `https://github.com/0xApatelos/${name}`, description: `Repository ${id} fetched from GitHub.`,
  language: 'Python', stargazers_count: id, forks_count: 0, fork: false,
});
const response = (data: Repository[]) => ({ ok: true, status: 200, headers: new Headers(), json: async () => data } as Response);
const renderHome = () => render(<MemoryRouter><Home /></MemoryRouter>);
const projectSection = () => screen.getByRole('region', { name: 'Recent projects.' });

beforeEach(() => {
  sessionStorage.clear();
  // Keep synchronous UI tests in the loading state without making a real request.
  vi.stubGlobal('fetch', vi.fn(() => new Promise<Response>(() => {})));
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('portfolio home with live GitHub previews', () => {
  it('shows the identity, photo, CV, and LinkedIn', () => {
    renderHome();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('img', { name: SITE.name }).getAttribute('src')).toContain('profile');
    expect(screen.getByText(SITE.tagline)).toBeTruthy();
    expect(screen.getByRole('link', { name: /View CV$/ }).getAttribute('href')).toBe('/cv');
    expect(screen.getByRole('link', { name: /LinkedIn/ }).getAttribute('href')).toBe(SITE.social.linkedin);
  });

  it('renders the first three eligible API results, including a newly created repository', async () => {
    const items = [repo(1, 'IT-Inventaris'), repo(2, '0xApatelos'), { ...repo(3), fork: true }, repo(4), repo(5), repo(6)];
    const fetch = vi.fn().mockResolvedValue(response(items));
    vi.stubGlobal('fetch', fetch);
    renderHome();
    await within(projectSection()).findByRole('link', { name: 'Open IT-Inventaris on GitHub' });
    const cards = within(projectSection()).getAllByRole('link', { name: /^Open .* on GitHub$/ });
    expect(cards.map(card => card.getAttribute('href'))).toEqual([items[0].html_url, items[3].html_url, items[4].html_url]);
    expect(fetch.mock.calls[0][0]).toContain('sort=updated');
    expect(within(projectSection()).getAllByText('Python')).toHaveLength(3);
    expect(within(projectSection()).getByLabelText('1 stars')).toBeTruthy();
    expect(within(projectSection()).getAllByLabelText('0 forks')).toHaveLength(3);
    expect(within(projectSection()).getByText('Repository 1 fetched from GitHub.')).toBeTruthy();
    expect(within(projectSection()).getByRole('link', { name: 'All repositories' }).getAttribute('href')).toBe('/projects');
  });

  it('keeps the section anchor and navigation available while loading', () => {
    renderHome();
    expect(document.getElementById('projects')).toBe(projectSection());
    expect(within(projectSection()).getByRole('status').textContent).toContain('Loading GitHub projects');
    expect(within(projectSection()).getByRole('link', { name: 'All repositories' })).toBeTruthy();
  });

  it('shows an empty state without falling back to a hardcoded selection', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response([])));
    renderHome();
    expect(await within(projectSection()).findByText('No public repositories to display.')).toBeTruthy();
    expect(within(projectSection()).queryByRole('link', { name: /^Open .* on GitHub$/ })).toBeNull();
  });

  it('offers retry and a direct GitHub fallback after rate limiting, then recovers', async () => {
    const fetch = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 403 } as Response)
      .mockResolvedValueOnce(response([repo(7)]));
    vi.stubGlobal('fetch', fetch);
    renderHome();
    expect((await within(projectSection()).findByRole('alert')).textContent).toMatch(/rate limit/i);
    expect(within(projectSection()).getByRole('link', { name: /View projects on GitHub/ }).getAttribute('href')).toBe(SITE.social.github);
    fireEvent.click(within(projectSection()).getByRole('button', { name: 'Try again' }));
    await within(projectSection()).findByRole('link', { name: 'Open live-project-7 on GitHub' });
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(within(projectSection()).queryByRole('alert')).toBeNull();
  });

  it('uses existing fresh cache without an API request', async () => {
    sessionStorage.setItem(`gh_repos_${SITE.githubUsername}`, JSON.stringify({ data: [repo(1)], ts: Date.now() }));
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    renderHome();
    await within(projectSection()).findByRole('link', { name: 'Open live-project-1 on GitHub' });
    expect(fetch).not.toHaveBeenCalled();
    await waitFor(() => expect(within(projectSection()).queryByRole('status')).toBeNull());
  });

  it('scrolls to projects and respects reduced motion even while loading', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    renderHome();
    const scroll = vi.fn();
    document.getElementById('projects')!.scrollIntoView = scroll;
    fireEvent.click(screen.getByRole('link', { name: 'Explore projects' }));
    expect(scroll).toHaveBeenCalledWith({ behavior: 'auto' });
  });

  it('keeps academic leave visible and secures external links', () => {
    renderHome();
    expect(screen.getByText(/Currently on academic leave/)).toBeTruthy();
    for (const link of screen.getAllByRole('link').filter(a => a.getAttribute('target') === '_blank')) {
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });
});
