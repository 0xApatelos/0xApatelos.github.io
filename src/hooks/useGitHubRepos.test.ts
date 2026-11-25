import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useGitHubRepos } from './useGitHubRepos';
import type { Repository } from '../types';

const makeRepo = (id: number): Repository => ({
  id,
  name: `repo-${id}`,
  description: `description ${id}`,
  html_url: `https://github.com/user/repo-${id}`,
  stargazers_count: id,
  forks_count: 0,
  fork: false,
  language: 'TypeScript',
});

function okResponse(data: unknown, etag?: string): Response {
  return {
    ok: true,
    status: 200,
    headers: new Headers(etag ? { ETag: etag } : {}),
    json: async () => data,
  } as Response;
}

describe('useGitHubRepos', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches and returns repositories', async () => {
    const fetchMock = vi.fn().mockResolvedValue(okResponse([makeRepo(1), makeRepo(2)]));
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useGitHubRepos('someuser'));

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.repos).toHaveLength(2);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain('api.github.com/users/someuser/repos');
  });

  it('excludes forks and hidden names from network results', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(okResponse([
      makeRepo(1),
      { ...makeRepo(2), fork: true },
      { ...makeRepo(3), name: 'PRAKTIKUMOOP' },
    ])));
    const { result } = renderHook(() => useGitHubRepos('curateduser'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.repos.map(repo => repo.id)).toEqual([1]);
  });

  it('also filters older fresh caches', async () => {
    sessionStorage.setItem('gh_repos_oldcache', JSON.stringify({
      data: [makeRepo(1), { ...makeRepo(2), fork: true }, { ...makeRepo(3), name: 'framework-backup' }],
      ts: Date.now(),
    }));
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useGitHubRepos('oldcache'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.repos.map(repo => repo.id)).toEqual([1]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('serves fresh cache without hitting the network', async () => {
    const fetchMock = vi.fn().mockResolvedValue(okResponse([makeRepo(1)]));
    vi.stubGlobal('fetch', fetchMock);

    const first = renderHook(() => useGitHubRepos('cacheduser'));
    await waitFor(() => expect(first.result.current.loading).toBe(false));
    first.unmount();

    const second = renderHook(() => useGitHubRepos('cacheduser'));
    await waitFor(() => expect(second.result.current.loading).toBe(false));

    expect(second.result.current.repos).toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledTimes(1); // second render used sessionStorage
  });

  it('ignores corrupted cache and refetches', async () => {
    sessionStorage.setItem('gh_repos_baduser', '{not json');
    const fetchMock = vi.fn().mockResolvedValue(okResponse([makeRepo(7)]));
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useGitHubRepos('baduser'));
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.repos).toHaveLength(1);
  });

  it('surfaces rate-limit errors and recovers via refetch', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 403, json: async () => ({}) } as Response)
      .mockResolvedValueOnce(okResponse([makeRepo(3)]));
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useGitHubRepos('limiteduser'));
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/rate limit/i);
    expect(result.current.repos).toHaveLength(0);

    // Regression test: refetch must clear the error and load data.
    await act(async () => {
      result.current.refetch();
    });
    await waitFor(() => expect(result.current.error).toBeNull());
    expect(result.current.repos).toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('handles non-array API responses gracefully', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(okResponse({ message: 'Not Found' }));
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useGitHubRepos('weirduser'));
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/Unexpected response/i);
    expect(result.current.repos).toHaveLength(0);
  });

  it('revalidates with If-None-Match when cache is stale', async () => {
    // Seed an expired cache entry with an ETag.
    sessionStorage.setItem(
      'gh_repos_staleuser',
      JSON.stringify({ data: [makeRepo(99)], etag: '"abc"', ts: Date.now() - 60 * 60 * 1000 })
    );

    const fetchMock = vi.fn().mockResolvedValue(okResponse([makeRepo(1), makeRepo(2)], '"def"'));
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useGitHubRepos('staleuser'));
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const headers = fetchMock.mock.calls[0][1].headers as Record<string, string>;
    expect(headers['If-None-Match']).toBe('"abc"');
    expect(result.current.repos).toHaveLength(2);
  });
});
