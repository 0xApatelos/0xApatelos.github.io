import { useState, useEffect, useCallback } from 'react';
import { Repository } from '../types';
import { SITE } from '../config/site';

const CACHE_TTL_MS = 5 * 60 * 1000; // revalidate at most every 5 minutes
const MAX_PAGES = 5; // safety cap (up to 500 repos)

interface CacheEntry {
  data: Repository[];
  etag?: string;
  ts: number;
}

function cacheKey(username: string) {
  return `gh_repos_${username}`;
}

function readCache(username: string): CacheEntry | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(username));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (!parsed || !Array.isArray(parsed.data)) return null;
    return parsed;
  } catch {
    // Corrupted or inaccessible cache — ignore and refetch.
    return null;
  }
}

function writeCache(username: string, entry: CacheEntry) {
  try {
    sessionStorage.setItem(cacheKey(username), JSON.stringify(entry));
  } catch {
    // Storage full/private mode — caching is best-effort only.
  }
}

function clearCache(username: string) {
  try {
    sessionStorage.removeItem(cacheKey(username));
  } catch {
    // Ignore — refetch still happens via state bump.
  }
}

async function fetchReposPage(
  username: string,
  page: number,
  signal: AbortSignal,
  etag?: string
): Promise<{ repos: Repository[]; etag?: string; notModified: boolean }> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  };
  if (etag) headers['If-None-Match'] = etag;

  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=updated&direction=desc`,
    { headers, signal }
  );

  if (response.status === 304) {
    return { repos: [], etag, notModified: true };
  }
  if (response.status === 403 || response.status === 429) {
    throw new Error(
      'GitHub API rate limit exceeded. Please try again in a few minutes.'
    );
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch repositories (${response.status})`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Unexpected response from GitHub API');
  }
  return {
    repos: data as Repository[],
    etag: response.headers.get('ETag') ?? undefined,
    notModified: false,
  };
}

async function fetchAllRepos(
  username: string,
  signal: AbortSignal,
  cached?: CacheEntry | null
): Promise<{ repos: Repository[]; etag?: string }> {
  // Conditional request: a 304 does not count against the unauthenticated
  // rate limit, so revalidation stays cheap.
  const first = await fetchReposPage(username, 1, signal, cached?.etag);
  if (first.notModified && cached) {
    return { repos: cached.data, etag: first.etag };
  }

  let all = first.repos;
  let page = 1;
  while (all.length === page * 100 && page < MAX_PAGES) {
    page += 1;
    const next = await fetchReposPage(username, page, signal);
    if (next.repos.length === 0) break;
    all = all.concat(next.repos);
  }
  return { repos: all, etag: first.etag };
}

/**
 * Fetches all public repositories for a GitHub user (cached in sessionStorage
 * with ETag revalidation) and returns them sorted by last update.
 */
export function useGitHubRepos(username: string = SITE.githubUsername) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    clearCache(username);
    setReloadKey((k) => k + 1);
  }, [username]);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const cached = readCache(username);
        if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
          setRepos(cached.data);
          setLoading(false);
          return;
        }

        const { repos: data, etag } = await fetchAllRepos(
          username,
          controller.signal,
          cached
        );
        if (cancelled) return;

        setRepos(data);
        writeCache(username, { data, etag, ts: Date.now() });
      } catch (err) {
        if (cancelled || controller.signal.aborted) return;
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to fetch repositories'
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [username, reloadKey]);

  // Apply on read as well as network results, so older caches cannot bypass curation.
  const hidden = new Set<string>(SITE.hiddenRepos.map(name => name.toLowerCase()));
  const visibleRepos = repos.filter(repo => !repo.fork && !hidden.has(repo.name.toLowerCase()));
  return { repos: visibleRepos, loading, error, refetch };
}
