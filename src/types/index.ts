export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  language: string | null;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export interface NavItem {
  path: string;
  label: string;
}

/** One entry on the Experience timeline (job, internship, organization, freelance). */
export interface ExperienceItem {
  /** Unique key, e.g. 1, 2, 3... */
  id: number;
  /** Date range shown on the left, e.g. 'Jan 2024 - Present' */
  period: string;
  /** Job/role title, e.g. 'Web Developer Intern' */
  role: string;
  /** Organization/company name */
  org: string;
  /** 'work' | 'intern' | 'organization' | 'freelance' — used for the badge color */
  type: 'work' | 'intern' | 'organization' | 'freelance';
  /** 2–4 sentence description of what you did and the impact */
  description: string;
}

/** One certificate card. */
export interface Certificate {
  /** Unique key */
  id: number;
  /** Certificate name, e.g. 'Belajar Dasar Pemrograman Web' */
  name: string;
  /** Issuing organization, e.g. 'Dicoding Indonesia' */
  issuer: string;
  /** Issue date shown on the card, e.g. 'May 2025' */
  date: string;
  /**
   * Link to verify/download the certificate.
   * Leave as '' to render the card WITHOUT a link button.
   */
  url: string;
  /** Short description of course content; avoid unsupported proficiency claims. */
  description: string;
  /** Optional metadata transcribed from the issuer's verification page. */
  instructor?: string;
  credentialId?: string;
  courseUrl?: string;
  credentialType?: 'course-completion';
}
