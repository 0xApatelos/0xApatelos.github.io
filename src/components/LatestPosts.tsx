import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { BlogPost } from '../types';
import { formatDate } from '../data/posts';
import { useReveal } from '../hooks/useReveal';

interface LatestPostsProps {
  posts: BlogPost[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10 reveal">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Latest <span className="text-gradient">Posts</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Tulisan terbaru dari blog saya
            </p>
          </div>
          <Link
            to="/blog"
            className="group hidden sm:flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Lihat Semua
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3 reveal" style={{ transitionDelay: '200ms' }}>
          {posts.map((post) => (
            <article
              key={post.id}
              className="group p-6 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
            >
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {post.description}
              </p>
              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 group/link"
              >
                Baca Selengkapnya
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400"
          >
            Lihat Semua Post
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
