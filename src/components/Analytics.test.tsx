import { StrictMode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Link } from 'react-router-dom';
import Analytics from './Analytics';

const config = vi.hoisted(() => ({ analyticsId: 'G-TEST123', siteUrl: 'https://example.com', name: 'Test' }));
vi.mock('../config/site', () => ({ SITE: config }));

function renderAnalytics() {
  return render(<StrictMode><MemoryRouter><Link to="/cv">Open CV</Link><Analytics /></MemoryRouter></StrictMode>);
}
function commands() {
  return (window.dataLayer ?? []).map(args => Array.from(args));
}

describe('optional consent-gated GA4', () => {
  beforeEach(() => {
    config.analyticsId = 'G-TEST123';
    localStorage.clear();
    document.getElementById('portfolio-ga4')?.remove();
    delete window.gtag;
    delete window.dataLayer;
  });
  afterEach(cleanup);

  it('loads nothing with no Measurement ID', () => {
    config.analyticsId = '';
    renderAnalytics();
    expect(screen.queryByLabelText('Persetujuan analytics')).toBeNull();
    expect(document.getElementById('portfolio-ga4')).toBeNull();
  });

  it('loads nothing before consent or after rejection', () => {
    renderAnalytics();
    expect(document.getElementById('portfolio-ga4')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Tolak' }));
    expect(localStorage.getItem('portfolio-analytics-consent')).toBe('declined');
    expect(document.getElementById('portfolio-ga4')).toBeNull();
    expect(window.dataLayer).toBeUndefined();
  });

  it('initializes once after consent and tracks hash-router pages with correct titles', () => {
    renderAnalytics();
    fireEvent.click(screen.getByRole('button', { name: 'Izinkan' }));
    expect(document.querySelectorAll('#portfolio-ga4')).toHaveLength(1);
    expect(commands().filter(args => args[0] === 'config')).toHaveLength(1);
    expect(commands().filter(args => args[1] === 'page_view')).toHaveLength(1);
    fireEvent.click(screen.getByText('Open CV'));
    const pages = commands().filter(args => args[1] === 'page_view');
    expect(pages).toHaveLength(2);
    expect(pages[1][2]).toMatchObject({
      page_path: '/cv', page_title: 'Curriculum Vitae — Test', page_location: 'https://example.com/#/cv',
    });
    expect(commands().find(args => args[0] === 'config')?.[2]).toMatchObject({ send_page_view: false });
  });

  it('does not double-count initial page views under StrictMode with stored consent', () => {
    localStorage.setItem('portfolio-analytics-consent', 'accepted');
    renderAnalytics();
    expect(commands().filter(args => args[1] === 'page_view')).toHaveLength(1);
  });

  it('tolerates blocked localStorage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    try {
      renderAnalytics();
      fireEvent.click(screen.getByRole('button', { name: 'Tolak' }));
      expect(document.getElementById('portfolio-ga4')).toBeNull();
    } finally { vi.restoreAllMocks(); }
  });
});
