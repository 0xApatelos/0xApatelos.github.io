import { describe, it, expect } from 'vitest';
import { buildMailto } from './mailto';

describe('buildMailto', () => {
  it('builds a mailto URL with encoded subject and body', () => {
    const url = buildMailto({
      to: 'me@example.com',
      name: 'Budi',
      email: 'budi@example.com',
      message: 'Halo, saya ingin berkolaborasi.',
    });

    expect(url).toBe(
      'mailto:me@example.com?subject=Portfolio%20Contact%20from%20Budi&body=From%3A%20Budi%20(budi%40example.com)%0A%0AHalo%2C%20saya%20ingin%20berkolaborasi.'
    );
  });

  it('neutralizes reserved characters in the name (subject injection)', () => {
    const url = buildMailto({
      to: 'me@example.com',
      name: 'Eve & Subject=phish#',
      email: 'eve@example.com',
      message: 'hi',
    });

    // The injected name must not add extra query params (`&`) or
    // fragments (`#`) — only the single `&` that separates subject/body.
    const query = url.slice(url.indexOf('?') + 1);
    expect(query.split('&')).toHaveLength(2);
    expect(query).not.toContain('#');
    expect(query).toContain('subject=Portfolio%20Contact%20from%20Eve%20%26%20Subject%3Dphish%23');
    expect(decodeURIComponent(query)).toContain('Eve & Subject=phish#');
  });

  it('encodes newlines in the message body', () => {
    const url = buildMailto({
      to: 'me@example.com',
      name: 'Ana',
      email: 'ana@example.com',
      message: 'line1\nline2',
    });

    expect(url).toContain('line1%0Aline2');
  });

  it('supports a custom subject prefix', () => {
    const url = buildMailto({
      to: 'me@example.com',
      name: 'Ana',
      email: 'ana@example.com',
      message: 'hi',
      subjectPrefix: 'Halo dari',
    });

    expect(decodeURIComponent(url)).toContain('subject=Halo dari Ana');
  });
});
