import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import Experience from './Experience';
import { CERTIFICATES } from '../data/experience';

vi.mock('../hooks/useReveal', () => ({ useReveal: () => ({ current: null }) }));
afterEach(cleanup);

describe('course certificates', () => {
  it('renders the new certificates with explanations, dates and verification links', () => {
    render(<Experience />);
    for (const cert of CERTIFICATES.filter(item => item.issuer === 'Udemy')) {
      const card = within(screen.getByRole('article', { name: cert.name }));
      expect(card.getByText(cert.description)).toBeTruthy();
      expect(card.getByText(cert.date)).toBeTruthy();
      expect(card.getByText(`Instructor: ${cert.instructor}`)).toBeTruthy();
      expect(card.getByText(cert.credentialId!, { exact: false })).toBeTruthy();
      expect(card.getByText('Course completion')).toBeTruthy();
      const link = card.getByRole('link', { name: `Verify certificate ${cert.name}` });
      expect(link.getAttribute('href')).toBe(cert.url);
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(card.getByRole('link', { name: `Course syllabus ${cert.name}` }).getAttribute('href')).toBe(cert.courseUrl);
    }
    expect(screen.getByText(/not professional certifications/)).toBeTruthy();
  });

  it('preserves existing entries and does not invent verification links for missing URLs', () => {
    render(<Experience />);
    for (const cert of CERTIFICATES.filter(item => !item.url)) {
      const card = within(screen.getByRole('article', { name: cert.name }));
      expect(card.getByText(cert.description)).toBeTruthy();
      expect(card.queryByRole('link')).toBeNull();
      expect(card.queryByText('Course completion')).toBeNull();
    }
  });
});
