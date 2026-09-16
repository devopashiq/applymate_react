// components/Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number; // 1-indexed
  pageCount: number;
  onPageChange: (page: number) => void;
};

function getPageRange(current: number, total: number): (number | "...")[] {
  const delta = 1; // how many pages to show around current
  const range: (number | "...")[] = [];

  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);

  range.push(1);

  if (start > 2) range.push("...");

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (end < total - 1) range.push("...");

  if (total > 1) range.push(total);

  return range;
}

const linkClass =
  "grid h-9 min-w-9 place-items-center rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-on-surface transition-colors hover:bg-surface-low";
const activeClass = "border-primary bg-primary text-on-primary hover:bg-primary";
const disabledClass = "pointer-events-none opacity-40";
const arrowClass =
  "grid h-9 min-w-9 place-items-center rounded-lg border border-gray-200 bg-white px-2 text-on-surface transition-colors hover:bg-surface-low";

const Pagination = ({ currentPage, pageCount, onPageChange }: PaginationProps) => {
  if (pageCount <= 0) return null;

  const pages = getPageRange(currentPage, pageCount);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= pageCount;

  return (
    <nav
      className="flex items-center gap-1"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        type="button"
        className={`${arrowClass} ${isFirst ? disabledClass : ""}`}
        onClick={() => !isFirst && onPageChange(currentPage - 1)}
        disabled={isFirst}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="grid h-9 min-w-9 place-items-center px-2 text-on-surface/60"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            className={`${linkClass} ${page === currentPage ? activeClass : ""}`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        className={`${arrowClass} ${isLast ? disabledClass : ""}`}
        onClick={() => !isLast && onPageChange(currentPage + 1)}
        disabled={isLast}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
};

export default Pagination;