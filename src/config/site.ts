/**
 * Central site configuration.
 * Update these values to personalize the whole site (GitHub username,
 * display name, contact info, social links).
 *
 * Leave `linkedin` as an empty string to hide the LinkedIn button.
 */
export const SITE = {
  /** GitHub username used for the live repository fetch. */
  githubUsername: '0xApatelos',
  /** Display name shown in the hero, footer, and page titles. */
  name: 'Raka Rendra Fayanto',
  /** Short monogram shown in the navbar. */
  shortName: 'RRF',
  /** One-line tagline used in the footer / meta description. */
  tagline: 'IT Specialist & AI Enthusiast',
  /** Contact email used by the contact form (mailto) and contact page. */
  email: 'rakaarendraa@gmail.com',
  /** Location shown on the contact page. */
  location: 'Surakarta, Central Java, Indonesia',
  /** Canonical site URL (no trailing slash). */
  siteUrl: 'https://0xapatelos.github.io',
  social: {
    github: 'https://github.com/0xApatelos',
    linkedin: 'https://www.linkedin.com/in/raka-rendra-724929279/',
  },
  /**
   * Repository names hidden from the Projects page. Forks are always excluded.
   */
  hiddenRepos: [
    'Tugas-Akhir-Pancasila',
    'PraktikumOOP',
    'framework-backup',
    '0xrendra',
    '0xrendra.github.io',
    'learn-next',
    '0xApatelos',
  ],
  /** Google Analytics 4 Measurement ID (e.g. 'G-XXXXXXXXXX'). Leave empty until configured. */
  analyticsId: '',
} as const;
