import { useState } from 'react';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

const ITEMS_PER_PAGE = 9;

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const { repos, loading, error, refetch } = useGitHubRepos();

  const totalPages = Math.max(1, Math.ceil(repos.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageRepos = repos.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Home
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl">
            Semua repository publik dari GitHub saya.
            {!loading && !error && repos.length > 0 && (
              <> Total {repos.length} repositories.</>
            )}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20" role="status">
            <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">Memuat repositories...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Project Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {pageRepos.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} showForks />
              ))}
            </div>

            {repos.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                Belum ada repository publik.
              </p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10 sm:mt-12">
                <button
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                    .map((p, idx, arr) => (
                      <div key={p} className="flex items-center">
                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                          <span aria-hidden="true" className="px-1 text-gray-400 text-sm">...</span>
                        )}
                        <button
                          onClick={() => goToPage(p)}
                          aria-label={`Page ${p}`}
                          aria-current={safePage === p ? 'page' : undefined}
                          className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
                            safePage === p
                              ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-80'
                          }`}
                        >
                          {p}
                        </button>
                      </div>
                    ))}
                </div>

                <button
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
