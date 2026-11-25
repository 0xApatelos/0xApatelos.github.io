import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../config/site';
import { POSTS } from '../data/posts';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/blog': 'Blog',
  '/experience': 'Experience & Certificates',
  '/cv': 'Curriculum Vitae',
  '/contact': 'Contact',
};

/** Shared by the document title and analytics to avoid effect-order races. */
export function getPageTitle(pathname: string): string {
  if (pathname.startsWith('/blog/')) {
    const id = Number(pathname.split('/')[2]);
    const post = POSTS.find(p => p.id === id);
    return `${post ? post.title : 'Post not found'} — ${SITE.name}`;
  }
  return `${ROUTE_TITLES[pathname] ?? '404 Not Found'} — ${SITE.name}`;
}

/** Keeps document.title in sync with the current route. */
export function usePageTitle() {
  const { pathname } = useLocation();
  useEffect(() => { document.title = getPageTitle(pathname); }, [pathname]);
}
