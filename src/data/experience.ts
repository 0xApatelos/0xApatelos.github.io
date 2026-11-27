import { ExperienceItem, Certificate } from '../types';

/**
 * Experience and course certificates shown on /experience.
 * Keep dates and credential metadata faithful to the issuer's verification page.
 * Optional instructor, credentialId, courseUrl, and credentialType fields enrich
 * course entries. An empty url omits the verification link.
 * Describe the syllabus without inventing grades or professional qualifications.
 */

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 1,
    period: '2024 - Present',
    role: 'Freelance Web Developer',
    org: 'Independent',
    type: 'freelance',
    description:
      'Build and maintain websites for small clients, including landing pages, contact-form integration, and performance improvements. Responsible for the process from requirements discussions to deployment.',
  },
  {
    id: 2,
    period: '2023 - 2024',
    role: 'Information Technology Division Member',
    org: 'Informatics Student Association',
    type: 'organization',
    description:
      'Managed the organization’s digital infrastructure, including its profile website and membership information system. Organized introductory web workshops for new students.',
  },

];

export const CERTIFICATES: Certificate[] = [
  // Dates and recipient verified against the supplied Udemy certificate pages.
  // Descriptions summarize the published syllabus, not independent professional assessment.
  {
    id: 3,
    name: 'Claude Code Power User: Architecting AI-Native Dev Workflows',
    issuer: 'Udemy',
    instructor: 'School of AI',
    date: '26 November 2026',
    credentialId: 'UC-eeed9cd7-dfa4-4804-9b3f-3e6f5da3438d',
    credentialType: 'course-completion',
    url: 'https://www.udemy.com/certificate/UC-eeed9cd7-dfa4-4804-9b3f-3e6f5da3438d/',
    courseUrl: 'https://www.udemy.com/course/claude-code-power-user-architecting-ai-native-dev-workflows/',
    description:
      'Covers structuring CLAUDE.md, planning features with Plan Mode, and using Skills and custom commands in development workflows. Also addresses testing, human review of changes, and guardrails for AI-assisted work in a codebase. Relevant to keeping AI-assisted development structured and reviewable.',
  },
  {
    id: 5,
    name: 'Kali Linux for Ethical Hackers',
    issuer: 'Udemy',
    instructor: 'Cyber Twinkle & Zeronyte Security',
    date: '26 November 2026',
    credentialId: 'UC-ca35c472-d25b-4978-bbd7-dde6fa08d9e5',
    credentialType: 'course-completion',
    url: 'https://www.udemy.com/certificate/UC-ca35c472-d25b-4978-bbd7-dde6fa08d9e5/',
    courseUrl: 'https://www.udemy.com/course/mastering-kali-linux-for-ethical-hackers/',
    description:
      'Covers Linux terminal and permission fundamentals, virtual lab setup, and an introduction to network scanning and security testing with Nmap, Burp Suite, and Metasploit. Supports systems and security fundamentals for IT practice; testing is limited to labs or systems with explicit authorization.',
  },
  {
    id: 4,
    name: 'DeepSeek R1 AI: 25 Real World Projects in AI for Beginners',
    issuer: 'Udemy',
    instructor: 'School of AI',
    date: '5 February 2025',
    credentialId: 'UC-e60962c2-7624-4187-930d-9d30a7c4104c',
    credentialType: 'course-completion',
    url: 'https://www.udemy.com/certificate/UC-e60962c2-7624-4187-930d-9d30a7c4104c/',
    courseUrl: 'https://www.udemy.com/course/deepseek-r1-real-world-projects/',
    description:
      'Introduces DeepSeek through text-processing and automation examples, including summarization, chatbots, sentiment analysis, and coding and debugging assistance. Covers local model setup and NLP applications as a foundation for learning applied AI.',
  },
  {
    id: 1,
    name: 'Web Programming Fundamentals',
    issuer: 'Dicoding Indonesia',
    date: 'May 2025',

    url: '',

    description:
      'Introduces HTML, CSS, JavaScript, and modern web fundamentals.',
  },
  {
    id: 2,
    name: 'Introduction to Data Science',
    issuer: 'IBM / Coursera',
    date: '2025',

    url: '',

    description:
      'An introduction to data science workflows, Python, data analysis, and machine learning fundamentals.',
  },



];
