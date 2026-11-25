import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Windowed pagination: always shows first/last page and pages around the
 * current one, with ellipsis for the rest. Fully labeled for screen readers.
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const push = (p: number) => {
    if (!pages.includes(p)) pages.push(p);
  };

  push(1);
  for (let p = currentPage - 1; p <= currentPage + 1; p += 1) {
    if (p > 1 && p < totalPages) push(p);
  }
  push(totalPages);

  // Insert gaps where pages are non-contiguous
  const items: (number | 'gap')[] = [];
  pages.sort((a, b) => a - b).forEach((p, idx) => {
    if (idx > 0 && p - pages[idx - 1] > 1) items.push('gap');
    items.push(p);
  });

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="p-2 rounded-lg enabled:hover:bg-gray-100 enabled:dark:hover:bg-gray-800 disabled:opacity-50 text-gray-600 dark:text-gray-400"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {items.map((item, idx) =>
        item === 'gap' ? (
          <span key={`gap-${idx}`} aria-hidden="true" className="px-1 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            aria-label={`Page ${item}`}
            aria-current={currentPage === item ? 'page' : undefined}
            className={`min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === item
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="p-2 rounded-lg enabled:hover:bg-gray-100 enabled:dark:hover:bg-gray-800 disabled:opacity-50 text-gray-600 dark:text-gray-400"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}
