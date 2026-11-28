import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CV from './CV';
import { SITE } from '../config/site';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe('recruiter CV', () => {
  it('shows the roles, contact details and honest education status', () => {
    render(<MemoryRouter><CV /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(SITE.name);
    expect(screen.getByText('IT Specialist & AI Enthusiast')).toBeTruthy();
    expect(screen.getByRole('link', { name: SITE.email }).getAttribute('href')).toBe(`mailto:${SITE.email}`);
    expect(screen.getByRole('link', { name: SITE.social.linkedin }).getAttribute('href')).toBe(SITE.social.linkedin);
    expect(screen.getByText(/Currently on academic leave/)).toBeTruthy();
    expect(screen.queryByText(/Instagram/i)).toBeNull();
  });

  it('includes the two PDF-sourced laboratory roles without inventing impact metrics', () => {
    render(<MemoryRouter><CV /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'Laboratory Teaching Assistant — Computer Networks Practicum' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'IT Support — Laboratory Maintenance Team' })).toBeTruthy();
    expect(screen.getAllByText(/January–July 2025/)).toHaveLength(2);
    expect(screen.getByText(/Guided students through TCP\/IP/)).toBeTruthy();
    expect(screen.getByText(/Diagnosed and resolved hardware/)).toBeTruthy();
    expect(screen.getByText(/Relevant coursework: Computer Networks/)).toBeTruthy();
    expect(screen.queryByText(/Freelance Web Developer|Division Member|reduced downtime by|expert in/i)).toBeNull();
  });

  it('includes the supplied phone and relevant projects with visible source URLs and limitations', () => {
    render(<MemoryRouter><CV /></MemoryRouter>);
    expect(screen.getByRole('link', { name: '+62 85156303414' }).getAttribute('href')).toBe('tel:+6285156303414');
    expect(screen.getByRole('heading', { name: 'IT Asset & Maintenance Tracker' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'IT Operation Lab' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Portfolio & Blog' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'github.com/0xApatelos/IT-Inventaris' }).getAttribute('href')).toBe('https://github.com/0xApatelos/IT-Inventaris');
    expect(screen.getByText(/not presented as a production deployment/)).toBeTruthy();
    expect(screen.getByText(/search-only, not a generative chatbot/)).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Newton–Raphson Calculator' })).toBeNull();
  });

  it('renders the CV without a GitHub network dependency', () => {
    const fetch = vi.spyOn(globalThis, 'fetch');
    render(<MemoryRouter><CV /></MemoryRouter>);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('opens the browser print dialog for Save as PDF', () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<MemoryRouter><CV /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Print / Save PDF' }));
    expect(print).toHaveBeenCalledTimes(1);
  });
});
