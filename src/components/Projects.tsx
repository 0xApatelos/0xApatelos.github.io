import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { SITE } from '../config/site';
import type { Repository } from '../types';

interface ProjectsProps {
  repos: Repository[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

/** Latest eligible GitHub repositories. Keep the section anchor available in every state. */
export default function Projects({ repos, loading, error, onRetry }: ProjectsProps) {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="site-container section-space scroll-mt-20 border-t border-gray-200 dark:border-gray-800">
      <div className="section-heading">
        <div>
          <p className="section-label mb-3">01 / From GitHub</p>
          <h2 id="projects-heading" className="section-title">Recent projects.</h2>
          <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">A few public repositories, ordered by their latest update.</p>
        </div>
        <Link to="/projects" className="text-link shrink-0">All repositories <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>

      {loading ? (
        <div role="status" className="py-12 text-sm text-gray-500 dark:text-gray-400">Loading GitHub projects…</div>
      ) : error ? (
        <div className="py-8">
          <p role="alert" className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
          <div className="mt-5 flex flex-wrap gap-4">
            <button type="button" onClick={onRetry} className="button-secondary">Try again</button>
            <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" className="text-link">View projects on GitHub <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
      ) : repos.length === 0 ? (
        <p className="py-10 text-sm text-gray-500 dark:text-gray-400">No public repositories to display.</p>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map(repo => <ProjectCard key={repo.id} repo={repo} showForks />)}
        </div>
      )}
    </section>
  );
}
