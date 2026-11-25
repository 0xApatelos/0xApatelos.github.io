import { useEffect, useRef, type DependencyList } from 'react';

/**
 * Observes all `.reveal` elements inside the returned ref and adds the
 * `visible` class when they scroll into view (scroll-reveal animation).
 *
 * Pass extra deps when the observed content is rendered conditionally
 * (e.g. after a fetch resolves).
 */
export function useReveal<T extends HTMLElement>(deps: DependencyList = []) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    root.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
