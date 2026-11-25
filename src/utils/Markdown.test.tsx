import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Markdown from './Markdown';

describe('Markdown', () => {
  it('renders headings and paragraphs', () => {
    render(<Markdown content={'## Judul\n\nIsi paragraf.'} />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Judul' })
    ).toBeDefined();
    expect(screen.getByText('Isi paragraf.')).toBeDefined();
  });

  it('renders bold and inline code', () => {
    render(<Markdown content={'Pakai **penting** dan `code`.'} />);
    expect(screen.getByText('penting').tagName).toBe('STRONG');
    expect(screen.getByText('code').tagName).toBe('CODE');
  });

  it('renders unordered lists', () => {
    render(<Markdown content={'- satu\n- dua'} />);
    expect(screen.getByText('satu')).toBeDefined();
    expect(screen.getByText('dua')).toBeDefined();
  });

  it('renders fenced code blocks verbatim', () => {
    render(<Markdown content={'```js\nconst x = 1 < 2;\n```'} />);
    expect(screen.getByText('const x = 1 < 2;')).toBeDefined();
  });

  it('renders external links with safe targets', () => {
    render(<Markdown content={'[GitHub](https://github.com)'} />);
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link.getAttribute('href')).toBe('https://github.com');
    expect(link.getAttribute('rel')).toContain('noopener');
  });

  it('does not render javascript: links as anchors', () => {
    render(<Markdown content={'[klik](javascript:alert(1))'} />);
    expect(screen.queryByRole('link', { name: 'klik' })).toBeNull();
  });

  it('renders blockquotes', () => {
    render(<Markdown content={'> kutipan penting'} />);
    expect(screen.getByText('kutipan penting').tagName).toBe('BLOCKQUOTE');
  });

  it('renders ordered lists', () => {
    render(<Markdown content={'1. langkah satu\n2. langkah dua'} />);
    expect(screen.getByText('langkah satu')).toBeDefined();
    expect(screen.getByText('langkah dua')).toBeDefined();
  });
});
