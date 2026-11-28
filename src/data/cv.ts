import { SELECTED_PROJECTS } from './selectedProjects';

/**
 * CV experience, skills, and education transcribed from the owner-supplied
 * “CV Raka 2026.pdf”. These are self-reported, not independently verified.
 * No inferred performance metrics, employment types, or proficiency ratings.
 * Keep separate from /experience until its older entries are owner-confirmed.
 */
export const CV_PROFILE = {
  phone: '+62 85156303414',
  phoneHref: 'tel:+6285156303414',
  summary: 'IT support and networking experience through computer laboratory maintenance and teaching assistance. Undergraduate Informatics studies at Universitas Muhammadiyah Surakarta, currently on academic leave. Continuing independent learning through projects in IT operations, workflow automation, and applied AI.',
  coursework: ['Computer Networks', 'Algorithms and Data Structures', 'Operating Systems', 'Digital Systems'],
} as const;

export const CV_EXPERIENCE = [
  {
    id: 'network-lab-assistant',
    title: 'Laboratory Teaching Assistant — Computer Networks Practicum',
    period: 'January–July 2025',
    context: 'Academic laboratory',
    responsibilities: [
      'Guided students through TCP/IP, routing, switching, and subnetting concepts during practical sessions.',
      'Demonstrated router and switch configuration and network topology simulation using Cisco Packet Tracer.',
      'Evaluated practical assignments against laboratory curriculum requirements.',
    ],
  },
  {
    id: 'lab-maintenance',
    title: 'IT Support — Laboratory Maintenance Team',
    period: 'January–July 2025',
    context: 'Informatics Engineering Laboratory',
    responsibilities: [
      'Inspected and maintained laboratory computers and local area network infrastructure for academic activities.',
      'Diagnosed and resolved hardware, software, and network issues.',
      'Installed, updated, and configured operating systems and applications required for laboratory sessions.',
    ],
  },
] as const;

export const CV_SKILLS = [
  { label: 'Networking', detail: 'TCP/IP, routing and switching, subnetting, network troubleshooting, Cisco Packet Tracer.' },
  { label: 'IT support', detail: 'Hardware and software troubleshooting, computer maintenance, operating system installation and configuration.' },
  { label: 'Tools & AI exploration', detail: 'Microsoft Office, GitHub CI/CD workflows, AI prompt engineering.' },
  { label: 'Working approach', detail: 'Communication, problem solving, and analytical thinking, applied in practical instruction and troubleshooting.' },
] as const;

/** Inventory summary checked against its public README; no remote test claims are repeated. */
export const CV_PROJECTS = [
  {
    id: 'it-inventaris',
    title: 'IT Asset & Maintenance Tracker',
    summary: 'A local, single-operator application for asset inventory, assignments, maintenance records, and audit history.',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'SQLite', 'React', 'TypeScript'],
    scope: 'Portfolio project using synthetic data; not presented as a production deployment.',
    url: 'https://github.com/0xApatelos/IT-Inventaris',
  },
  ...SELECTED_PROJECTS.slice(0, 2),
];
