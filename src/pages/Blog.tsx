import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import Pagination from '../components/Pagination';
import { SORTED_POSTS, ALL_TAGS, formatDate } from '../data/posts';

const POSTS_PER_PAGE = 5;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = useMemo(
    () =>
      activeTag
        ? SORTED_POSTS.filter((post) => post.tags.includes(activeTag))
        : SORTED_POSTS,
    [activeTag]
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));

  const currentPosts = filteredPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  const selectTag = (tag: string | null) => {
    setActiveTag(tag);
    setCurrentPage(1);
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          <span className="text-gradient">Blog</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Notes on technology, projects, and what I learn along the way.
        </p>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter posts by tag">
          <button
            onClick={() => selectTag(null)}
            aria-pressed={activeTag === null}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTag === null
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-blue-400'
            }`}
          >
            All
          </button>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => selectTag(tag)}
              aria-pressed={activeTag === tag}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-blue-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {currentPosts.map((post) => (
            <article
              key={post.id}
              className="group p-6 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => selectTag(tag)}
                    className="px-2 py-0.5 text-xs rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 hover:border-blue-400 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {post.description}
              </p>
              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 group/link"
              >
                Read article
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </article>
          ))}

          {filteredPosts.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10">
              No articles tagged “{activeTag}”.
            </p>
          )}
        </div>

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={changePage}
        />
      </div>
    </section>
  );
}
