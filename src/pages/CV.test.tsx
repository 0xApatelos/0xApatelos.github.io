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

  it('opens the browser print dialog for Save as PDF', () => {
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<MemoryRouter><CV /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Print / Save PDF' }));
    expect(print).toHaveBeenCalledTimes(1);
  });
});
