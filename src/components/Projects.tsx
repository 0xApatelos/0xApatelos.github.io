import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SELECTED_PROJECTS } from '../data/selectedProjects';

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="site-container section-space scroll-mt-20 border-t border-gray-200 dark:border-gray-800">
      <div className="section-heading">
        <div><p className="section-label mb-3">01 / Selected work</p><h2 id="projects-heading" className="section-title">Projects & implementation.</h2></div>
        <Link to="/projects" className="text-link shrink-0">All repositories <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {SELECTED_PROJECTS.map(project => (
          <article key={project.id} className="grid gap-5 py-9 sm:py-10 md:grid-cols-[60px_1fr_1fr] md:gap-8">
            <span className="font-mono text-sm text-gray-400 dark:text-gray-500" aria-hidden="true">/{project.number}</span>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{project.category}</p>
              <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100"><a className="quiet-link" href={project.url} target="_blank" rel="noopener noreferrer">{project.title}</a></h3>
              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">{project.summary}</p>
              <ul aria-label={`Technologies used in ${project.title}`} className="mt-4 flex flex-wrap gap-2">
                {project.stack.map(tech => <li key={tech} className="text-xs rounded border border-gray-200 dark:border-gray-700 px-2 py-1 text-gray-600 dark:text-gray-400">{tech}</li>)}
              </ul>
            </div>
            <div className="md:pt-7">
              <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">{project.contribution}</p>
              <p className="mt-3 text-xs leading-6 text-gray-500 dark:text-gray-400">{project.scope}</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                <a className="text-link" href={project.evidenceUrl} target="_blank" rel="noopener noreferrer">{project.evidenceLabel} <ArrowUpRight size={14} aria-hidden="true" /></a>
                <a className="quiet-link text-sm text-gray-500 dark:text-gray-400" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Source code ${project.title}`}>Source ↗</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
