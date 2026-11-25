import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { Repository } from '../types';
import { useReveal } from '../hooks/useReveal';

interface ProjectsProps {
  repos: Repository[];
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function Projects({ repos, loading, error, onRetry }: ProjectsProps) {
  const sectionRef = useReveal<HTMLElement>([loading, repos]);

  if (loading) {
    return (
      <div className="py-20 text-center" role="status">
        <div className="inline-block w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm"
            >
              Coba Lagi
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10 reveal">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Project terbaru dari GitHub
            </p>
          </div>
          <Link
            to="/projects"
            className="group hidden sm:flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Lihat Semua
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {repos.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 reveal">
            Belum ada repository publik yang ditampilkan.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal" style={{ transitionDelay: '200ms' }}>
            {repos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            Lihat Semua Project
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
