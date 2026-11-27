import {
  Briefcase,
  Award,
  Calendar,
  ExternalLink,
  Building2,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { EXPERIENCE, CERTIFICATES } from '../data/experience';
import type { ExperienceItem } from '../types';

const TYPE_BADGES: Record<ExperienceItem['type'], { label: string; classes: string }> = {
  work: { label: 'Full-time', classes: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  intern: { label: 'Intern', classes: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  organization: {
    label: 'Organization',
    classes: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
  freelance: {
    label: 'Freelance',
    classes: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  },
};

/** Work experience and certificates, sourced from src/data/experience.ts. */
export default function Experience() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 reveal">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Experience & <span className="text-gradient">Certificates</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl">
            Work and community experience, alongside continued learning through courses.
          </p>
        </div>

        {/* ── Section 1: Experience timeline ─────────────────────── */}
        <div className="mb-16">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white mb-8 reveal">
            <Briefcase className="h-5 w-5 text-blue-500" />
            Experience
          </h2>

          <div className="relative reveal">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent hidden sm:block" />

            <div className="space-y-8">
              {EXPERIENCE.map((item, idx) => {
                const badge = TYPE_BADGES[item.type];
                return (
                  <div
                    key={item.id}
                    className="reveal relative flex gap-6"
                    style={{ transitionDelay: `${idx * 150}ms` }}
                  >
                    {/* Timeline dot */}
                    <div className="hidden sm:flex flex-shrink-0 w-16 justify-center">
                      <div className="relative z-10 w-4 h-4 rounded-full mt-6 bg-blue-500 shadow-lg shadow-blue-500/50" />
                    </div>

                    {/* Card */}
                    <div className="flex-1 p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-blue-500 dark:text-blue-400 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span className="font-mono">{item.period}</span>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full border ${badge.classes}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <div className="flex items-start gap-3 mb-2">
                        <Building2 className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {item.role}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">
                            {item.org}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 leading-relaxed sm:ml-8">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Section 2: Certificates grid ───────────────────────── */}
        <div id="certificates" className="scroll-mt-20">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-gray-900 dark:text-white mb-3 reveal">
            <Award className="h-5 w-5 text-gray-500" aria-hidden="true" />
            Certificates
          </h2>
          <p className="text-sm leading-7 text-gray-600 dark:text-gray-400 mb-8 reveal">
            The Udemy credentials below are course-completion certificates, not professional certifications.
            Descriptions summarize the syllabus; dates follow the issuer’s verification pages.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 reveal">
            {CERTIFICATES.map(cert => (
              <article
                key={cert.id}
                aria-labelledby={`certificate-${cert.id}`}
                className="flex flex-col p-6 rounded-md bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 flex-shrink-0">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 id={`certificate-${cert.id}`} className="font-semibold text-gray-900 dark:text-white leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cert.issuer}</p>
                    {cert.instructor && <p className="text-xs leading-5 text-gray-500 dark:text-gray-400 mt-1">Instructor: {cert.instructor}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{cert.date}</span>
                </div>
                {cert.credentialType === 'course-completion' && <p className="section-label mb-3">Course completion</p>}

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-7 flex-grow">
                  {cert.description}
                </p>

                {cert.credentialId && <p className="mt-4 text-xs leading-5 text-gray-500 dark:text-gray-400 break-all"><span className="font-medium">ID: </span>{cert.credentialId}</p>}
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify certificate ${cert.name}`}
                      className="text-link"
                    >
                      View certificate
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {cert.courseUrl && <a href={cert.courseUrl} target="_blank" rel="noopener noreferrer" aria-label={`Course syllabus ${cert.name}`} className="quiet-link text-sm text-gray-500 dark:text-gray-400">Course syllabus ↗</a>}
                </div>
              </article>
            ))}
          </div>

          {CERTIFICATES.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10 reveal">
              No certificates have been added yet.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
