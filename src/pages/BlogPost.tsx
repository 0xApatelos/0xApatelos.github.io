import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { SORTED_POSTS, formatDate } from '../data/posts';
import Markdown from '../utils/Markdown';

export default function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const postIndex = SORTED_POSTS.findIndex((p) => p.id === Number(id));
  const post = postIndex >= 0 ? SORTED_POSTS[postIndex] : undefined;

  if (!post) {
    return (
      <div className="py-16 text-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">Post tidak ditemukan</p>
        <Link
          to="/blog"
          className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  // Newest first: "previous" = newer post, "next" = older post
  const newer = postIndex > 0 ? SORTED_POSTS[postIndex - 1] : undefined;
  const older =
    postIndex < SORTED_POSTS.length - 1 ? SORTED_POSTS[postIndex + 1] : undefined;

  return (
    <article className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to="/blog"
              className="px-2.5 py-0.5 text-xs rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 hover:border-blue-400 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {post.readTime}
          </div>
        </div>

        <Markdown content={post.content} />

        {/* Prev / next navigation */}
        <nav aria-label="Post navigation" className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
          {older ? (
            <Link
              to={`/blog/${older.id}`}
              className="group flex-1 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 transition-colors"
            >
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
                <ArrowLeft className="h-3 w-3" /> Post sebelumnya
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {older.title}
              </span>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {newer && (
            <Link
              to={`/blog/${newer.id}`}
              className="group flex-1 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 transition-colors text-right"
            >
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-end gap-1 mb-1">
                Post berikutnya <ArrowRight className="h-3 w-3" />
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {newer.title}
              </span>
            </Link>
          )}
        </nav>

        {/* Reading progress: jump back to list */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/blog')}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            ← Kembali ke daftar blog
          </button>
        </div>
      </div>
    </article>
  );
}
