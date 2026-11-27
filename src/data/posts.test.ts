import { describe, it, expect } from 'vitest';
import { POSTS, SORTED_POSTS, ALL_TAGS, formatDate } from './posts';

describe('blog data', () => {
  it('has posts with unique ids', () => {
    const ids = POSTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has at least 8 posts (blog is filled)', () => {
    expect(POSTS.length).toBeGreaterThanOrEqual(8);
  });

  it('every post has title, description, content, tags, date, and readTime', () => {
    for (const post of POSTS) {
      expect(post.title.length, `post ${post.id} title`).toBeGreaterThan(0);
      expect(post.description.length, `post ${post.id} description`).toBeGreaterThan(0);
      expect(post.content.length, `post ${post.id} content`).toBeGreaterThan(100);
      expect(post.tags.length, `post ${post.id} tags`).toBeGreaterThan(0);
      expect(post.readTime, `post ${post.id} readTime`).toMatch(/\d+ min read/);
      expect(post.date, `post ${post.id} date`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(post.date)), `post ${post.id} valid date`).toBe(false);
    }
  });

  it('SORTED_POSTS is ordered newest first', () => {
    for (let i = 1; i < SORTED_POSTS.length; i += 1) {
      const prev = new Date(SORTED_POSTS[i - 1].date).getTime();
      const curr = new Date(SORTED_POSTS[i].date).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it('ALL_TAGS contains every tag used by posts', () => {
    const used = new Set(POSTS.flatMap((p) => p.tags));
    for (const tag of used) {
      expect(ALL_TAGS).toContain(tag);
    }
  });

  it('formatDate produces a readable English date', () => {
    expect(formatDate('2026-11-18')).toBe('18 November 2026');
    expect(formatDate('2025-02-05')).toBe('5 February 2025');
  });
});
