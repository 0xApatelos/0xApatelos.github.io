import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BlogPost } from '../types';
import { formatDate } from '../data/posts';

export default function LatestPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <section aria-labelledby="writing-heading" className="site-container section-space">
      <div className="section-heading">
        <div><p className="section-label mb-3">03 / Field notes</p><h2 id="writing-heading" className="section-title">Technical notes.</h2></div>
        <Link to="/blog" className="text-link shrink-0">All articles <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
        {posts.map(post => <article key={post.id} className="py-6 grid gap-3 md:grid-cols-[160px_1fr] md:gap-8">
          <div className="text-xs leading-6 text-gray-500 dark:text-gray-400"><time dateTime={post.date}>{formatDate(post.date)}</time><p>{post.readTime}</p></div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100"><Link to={`/blog/${post.id}`} className="quiet-link">{post.title} <span aria-hidden="true" className="text-gray-400">↗</span></Link></h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400 line-clamp-2">{post.description}</p>
          </div>
        </article>)}
      </div>
    </section>
  );
}
