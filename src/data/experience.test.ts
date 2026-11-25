import { describe, it, expect } from 'vitest';
import { EXPERIENCE, CERTIFICATES } from './experience';

describe('experience data', () => {
  it('has at least one experience entry', () => {
    expect(EXPERIENCE.length).toBeGreaterThan(0);
  });

  it('every experience entry is complete with a unique id', () => {
    const ids = EXPERIENCE.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const item of EXPERIENCE) {
      expect(item.period.length, `exp ${item.id} period`).toBeGreaterThan(0);
      expect(item.role.length, `exp ${item.id} role`).toBeGreaterThan(0);
      expect(item.org.length, `exp ${item.id} org`).toBeGreaterThan(0);
      expect(item.description.length, `exp ${item.id} description`).toBeGreaterThan(20);
      expect(
        ['work', 'intern', 'organization', 'freelance'],
        `exp ${item.id} type`
      ).toContain(item.type);
    }
  });

  it('every certificate is complete with a unique id', () => {
    const ids = CERTIFICATES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const cert of CERTIFICATES) {
      expect(cert.name.length, `cert ${cert.id} name`).toBeGreaterThan(0);
      expect(cert.issuer.length, `cert ${cert.id} issuer`).toBeGreaterThan(0);
      expect(cert.date.length, `cert ${cert.id} date`).toBeGreaterThan(0);
      expect(cert.description.length, `cert ${cert.id} description`).toBeGreaterThan(10);
    }
  });

  it('certificate urls are empty or valid http(s) links', () => {
    for (const cert of CERTIFICATES) {
      if (cert.url) {
        expect(
          cert.url.startsWith('https://') || cert.url.startsWith('http://'),
          `cert ${cert.id} url must be http(s)`
        ).toBe(true);
      }
    }
  });
});
