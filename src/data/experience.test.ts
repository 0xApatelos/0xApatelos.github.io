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

  it('includes the three supplied Udemy credentials with source-matched metadata', () => {
    const expected = [
      { credentialId: 'UC-eeed9cd7-dfa4-4804-9b3f-3e6f5da3438d', name: 'Claude Code Power User: Architecting AI-Native Dev Workflows', date: '26 November 2026', instructor: 'School of AI' },
      { credentialId: 'UC-e60962c2-7624-4187-930d-9d30a7c4104c', name: 'DeepSeek R1 AI: 25 Real World Projects in AI for Beginners', date: '5 February 2025', instructor: 'School of AI' },
      { credentialId: 'UC-ca35c472-d25b-4978-bbd7-dde6fa08d9e5', name: 'Kali Linux for Ethical Hackers', date: '26 November 2026', instructor: 'Cyber Twinkle & Zeronyte Security' },
    ];
    for (const item of expected) {
      const cert = CERTIFICATES.find(entry => entry.credentialId === item.credentialId);
      expect(cert).toMatchObject({ ...item, issuer: 'Udemy', credentialType: 'course-completion', url: `https://www.udemy.com/certificate/${item.credentialId}/` });
      expect(cert?.courseUrl).toMatch(/^https:\/\/www\.udemy\.com\/course\//);
      expect(cert?.description.length).toBeGreaterThan(100);
    }
    const udemy = CERTIFICATES.filter(cert => cert.issuer === 'Udemy');
    expect(udemy).toHaveLength(3);
    expect(new Set(udemy.map(cert => cert.credentialId)).size).toBe(3);
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
