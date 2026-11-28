import { Printer, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE } from '../config/site';
import { CV_EXPERIENCE, CV_PROFILE, CV_PROJECTS, CV_SKILLS } from '../data/cv';

export default function CV() {
  return (
    <section className="cv-page bg-gray-50 dark:bg-gray-950 py-12 px-4 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="print:hidden flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400"><ArrowLeft size={16} /> Home</Link>
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 font-medium">
            <Printer size={18} /> Print / Save PDF
          </button>
        </div>
        <p className="print:hidden text-sm text-gray-600 dark:text-gray-400 mb-6">A concise CV preview. Select Print / Save PDF, then choose “Save as PDF” in your browser’s print dialog to download a copy.</p>
        <article className="cv-document bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-7">
          <header className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h1 className="text-3xl font-bold mb-2">{SITE.name}</h1>
            <p className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-4">{SITE.tagline}</p>
            <address className="not-italic text-sm flex flex-col gap-1.5 break-words">
              <span>{SITE.location}</span>
              <a href={CV_PROFILE.phoneHref} className="underline">{CV_PROFILE.phone}</a>
              <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>
              <a href={SITE.social.linkedin} className="underline">{SITE.social.linkedin}</a>
              <a href={SITE.social.github} className="underline">{SITE.social.github}</a>
              <a href={SITE.siteUrl} className="underline">{SITE.siteUrl}</a>
            </address>
          </header>
          <section>
            <h2 className="text-lg font-semibold mb-2">Profile</h2>
            <p className="leading-relaxed text-sm">{CV_PROFILE.summary}</p>
          </section>
          <section aria-labelledby="cv-experience-heading">
            <h2 id="cv-experience-heading" className="text-lg font-semibold mb-3">Relevant experience</h2>
            <div className="space-y-5 text-sm leading-relaxed">
              {CV_EXPERIENCE.map(experience => (
                <div key={experience.id} className="cv-entry">
                  <h3 className="font-semibold">{experience.title}</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">{experience.context} · {experience.period}</p>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    {experience.responsibilities.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          <section className="cv-entry">
            <h2 className="text-lg font-semibold mb-2">Technical skills & working approach</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
              {CV_SKILLS.map(skill => <li key={skill.label}><span className="font-semibold">{skill.label}:</span> {skill.detail}</li>)}
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Selected technical projects</h2>
            <div className="space-y-4 text-sm leading-relaxed">
              {CV_PROJECTS.map(project => <div key={project.id} className="cv-entry">
                <h3 className="font-semibold">{project.title}</h3>
                <p>{project.summary}</p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Technologies: {project.stack.join(', ')}</p>
                <p className="mt-1 text-xs">{project.scope}</p>
                <a className="underline inline-flex items-center gap-1 break-all" href={project.url}>{project.url.replace('https://', '')} <ExternalLink size={12} className="print:hidden shrink-0" aria-hidden="true" /></a>
              </div>)}
            </div>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Education</h2>
            <p className="font-medium text-sm">Undergraduate studies in Informatics — Universitas Muhammadiyah Surakarta</p>
            <p className="text-sm mt-1">Started in 2022 · Currently on academic leave. Degree not yet completed.</p>
            <p className="text-sm mt-2 leading-relaxed">Relevant coursework: {CV_PROFILE.coursework.join(', ')}.</p>
          </section>
        </article>
      </div>
    </section>
  );
}
