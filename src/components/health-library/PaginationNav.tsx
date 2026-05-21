"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  /** The base route without any ?page= param e.g. /health-library/womens-health/body-anatomy/internal-organs */
  baseRoute: string;
  currentPage: number;
  totalPages: number;
  /** Array of section titles from frontmatter.pageTitles */
  pageTitles: string[];
};

export function PaginationNav({
  baseRoute,
  currentPage,
  totalPages,
  pageTitles,
}: Props) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  // Page 1 uses the bare route (no ?page= param) so the canonical URL is clean
  function pageHref(p: number) {
    return p === 1 ? baseRoute : `${baseRoute}?page=${p}`;
  }

  function pageLabel(p: number) {
    return pageTitles[p - 1] ?? `Page ${p}`;
  }

  return (
    <nav
      aria-label="Article pages"
      className="mt-10 flex items-stretch justify-between gap-4 border-t border-slate-100 pt-6"
    >
      {/* Previous */}
      <div className="flex-1">
        {prevPage && (
          <Link
            href={pageHref(prevPage)}
            className="group flex h-full flex-col gap-1 rounded-xl border border-slate-200 p-4 transition hover:border-primary/30 hover:bg-slate-50"
          >
            <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-slate-400">
              <ChevronLeft className="size-3.5" />
              Previous
            </span>
            <span className="text-sm font-semibold text-slate-700 group-hover:text-primary leading-snug">
              {pageLabel(prevPage)}
            </span>
          </Link>
        )}
      </div>

      {/* Page counter */}
      <div className="flex shrink-0 items-center px-2 text-sm font-medium tabular-nums text-slate-400">
        {currentPage} / {totalPages}
      </div>

      {/* Next */}
      <div className="flex-1 text-right">
        {nextPage && (
          <Link
            href={pageHref(nextPage)}
            className="group flex h-full flex-col items-end gap-1 rounded-xl border border-slate-200 p-4 transition hover:border-primary/30 hover:bg-slate-50"
          >
            <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-slate-400">
              Next
              <ChevronRight className="size-3.5" />
            </span>
            <span className="text-sm font-semibold text-slate-700 group-hover:text-primary leading-snug">
              {pageLabel(nextPage)}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}