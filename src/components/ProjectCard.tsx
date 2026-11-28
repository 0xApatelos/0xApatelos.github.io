import { ExternalLink, Star, GitFork } from 'lucide-react';
import { Repository } from '../types';
import { LANGUAGE_COLORS } from '../constants/languages';
import { SELECTED_PROJECTS } from '../data/selectedProjects';

interface ProjectCardProps {
  repo: Repository;
  showForks?: boolean;
}

/**
 * GitHub repository preview shared by Home and the full Projects page.
 * Known projects use the curated English copy rather than remote About text.
 */
export default function ProjectCard({ repo, showForks = false }: ProjectCardProps) {
  const curated = SELECTED_PROJECTS.find(project => project.url.toLowerCase() === repo.html_url.toLowerCase());
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${repo.name} on GitHub`}
      className="group relative block p-6 rounded-md bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/30 transition-colors duration-200"
    >
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-all pr-2">
            {repo.name}
          </h3>
          <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors mt-1" />
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
          {curated?.summary || repo.description || 'No description provided. Open the repository to explore its source and documentation.'}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          {repo.language && (
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <span
                className={`w-2.5 h-2.5 rounded-full ${LANGUAGE_COLORS[repo.language] || 'bg-gray-400'}`}
              />
              <span>{repo.language}</span>
            </div>
          )}
          <div aria-label={`${repo.stargazers_count} stars`} className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{repo.stargazers_count}</span>
          </div>
          {showForks && (
            <div aria-label={`${repo.forks_count} forks`} className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{repo.forks_count}</span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
