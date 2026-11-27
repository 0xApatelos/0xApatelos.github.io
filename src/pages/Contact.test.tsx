import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Contact from './Contact';
import { SITE } from '../config/site';

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
function fillDraft() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Alex & Co' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'alex@example.com' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'A question about Linux.\nCan we discuss it?' } });
}

describe('static-site contact options', () => {
  it('uses a native HTTPS POST, keeps CAPTCHA enabled, and discloses third-party processing', () => {
    render(<Contact />);
    const form = screen.getByRole('form', { name: 'Send a message' });
    expect(form.getAttribute('action')).toBe(`https://formsubmit.co/${SITE.email}`);
    expect(form.getAttribute('method')).toBe('POST');
    expect(form.getAttribute('target')).toBe('_blank');
    expect(form.getAttribute('rel')).toBe('noopener');
    expect(form.querySelector('[name="_honey"]')).toBeTruthy();
    expect(form.querySelector('[name="_captcha"]')).toBeNull();
    expect(form.querySelector('[name="_next"]')).toBeNull();
    expect(screen.getByRole('checkbox').hasAttribute('required')).toBe(true);
    expect(screen.getByText(/one-time email activation/)).toBeTruthy();
    expect(screen.getByRole('link', { name: 'FormSubmit privacy policy' }).getAttribute('href')).toBe('https://formsubmit.co/privacy.pdf');
  });

  it('requires consent and rejects whitespace-only content without losing the draft', () => {
    render(<Contact />);
    fillDraft();
    expect(fireEvent.submit(screen.getByRole('form'))).toBe(false);
    expect(screen.getByRole('status').textContent).toContain('agree to the privacy notice');
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: '   ' } });
    expect(fireEvent.submit(screen.getByRole('form'))).toBe(false);
    expect((screen.getByLabelText('Name') as HTMLInputElement).value).toBe('Alex & Co');
  });

  it('hands off valid submissions without pretending to confirm delivery or resetting the draft', () => {
    render(<Contact />);
    fillDraft();
    fireEvent.click(screen.getByRole('checkbox'));
    // Dispatch only; never make a real request or send an activation email in tests.
    expect(fireEvent.submit(screen.getByRole('form'))).toBe(true);
    expect(screen.getByRole('status').textContent).toContain('does not confirm');
    expect((screen.getByLabelText('Message') as HTMLTextAreaElement).value).toContain('Linux');
    expect(screen.queryByText(/message (has been )?sent[.!]/i)).toBeNull();
  });

  it('builds Gmail and email-app drafts from the current fields', () => {
    render(<Contact />);
    fillDraft();
    const gmail = new URL(screen.getByRole('link', { name: 'Open in Gmail ↗' }).getAttribute('href')!);
    expect(gmail.origin).toBe('https://mail.google.com');
    expect(gmail.searchParams.get('to')).toBe(SITE.email);
    expect(gmail.searchParams.get('su')).toContain('Alex & Co');
    expect(gmail.searchParams.get('body')).toContain('alex@example.com');
    expect(decodeURIComponent(screen.getByRole('link', { name: 'Use email app ↗' }).getAttribute('href')!)).toContain('A question about Linux.');
  });

  it('reports copying only after clipboard success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    render(<Contact />);
    fillDraft();
    fireEvent.click(screen.getByRole('button', { name: 'Copy draft' }));
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('Draft copied.'));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining(`To: ${SITE.email}`));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Alex & Co'));
  });

  it('provides selectable text if the clipboard API fails', async () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) } });
    render(<Contact />);
    fillDraft();
    fireEvent.click(screen.getByRole('button', { name: 'Copy draft' }));
    const fallback = await screen.findByLabelText('Select and copy your draft');
    expect((fallback as HTMLTextAreaElement).value).toContain('A question about Linux.');
    expect((fallback as HTMLTextAreaElement).readOnly).toBe(true);
    expect(screen.getByRole('status').textContent).toContain('unavailable');
  });
});
