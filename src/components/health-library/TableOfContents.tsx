"use client";

import Link from "next/link";
import type { TocItem } from "@/content/health-library/schema";
import { ListFilter } from "lucide-react";

type Props = {
  items: TocItem[];
  pageTitle?: string;
  pageTitles?: string[];
  currentPage?: number;
  baseRoute?: string;
};

function pageHref(baseRoute: string, page: number) {
  return page === 1 ? baseRoute : `${baseRoute}?page=${page}`;
}

export function TableOfContents({
  items,
  pageTitle,
  pageTitles,
  currentPage,
  baseRoute,
}: Props) {
  if (!items?.length && !pageTitles?.length) return null;

  const isPaginated =
    !!pageTitles &&
    pageTitles.length > 1 &&
    currentPage !== undefined &&
    !!baseRoute;

  return (
    <aside
      aria-label="Table of contents"
      className="hidden lg:block sticky self-start"
      style={{
        top: "var(--header-height, 80px)",
        height: "calc(100vh - var(--header-height, 80px))",
      }}
    >
      <nav className="h-full overflow-y-auto py-8 pr-4 pb-20 custom-scrollbar">
        {isPaginated ? (
          <>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              Section Navigation
            </p>
            <div className="flex flex-col">
              {pageTitles!.map((title, i) => {
                const isActive = i + 1 === currentPage;
                const isLast = i === pageTitles!.length - 1;
                const num = i + 1;
                const href = pageHref(baseRoute!, num);

                return (
                  <div key={i} className="flex gap-3">
                    {/* ── Left col: circle + auto-expanding connector ── */}
                    <div className="flex flex-col items-center shrink-0">
                      {/* Circle — Link if inactive, span if active */}
                      {isActive ? (
                        <span className="flex size-6 items-center justify-center rounded-full bg-pink-600 text-[14px] font-bold text-white shadow-sm z-10">
                          {num}
                        </span>
                      ) : (
                        <Link
                          href={href}
                          className="group flex size-6 items-center justify-center rounded-full bg-pink-50 border border-pink-200 text-[14px] font-bold text-pink-400 transition-all z-10 hover:bg-pink-100 hover:border-pink-400 hover:text-pink-600"
                        >
                          {num}
                        </Link>
                      )}

                      {/* Connector — flex-1 stretches to match right col height */}
                      {!isLast && (
                        <div
                          aria-hidden="true"
                          className="flex-1 w-[1px] my-1.5"
                          style={{
                            minHeight: 18,
                            // If active, show the gradient; otherwise, use the solid light pink
                            backgroundImage: isActive
                              ? "linear-gradient(to bottom, #DB2777 0%, #fbcfe8 25%)"
                              : "none",
                            backgroundColor: isActive
                              ? "transparent"
                              : "#fbcfe8",
                          }}
                        />
                      )}
                    </div>

                    {/* ── Right col: title + optional TOC ── */}
                    <div
                      className={`flex flex-col min-w-0 ${!isLast ? "pb-5" : ""}`}
                    >
                      {/* Title — Link if inactive, plain text if active */}
                      {isActive ? (
                        <span className="text-sm font-semibold text-pink-600 leading-snug pt-0.5">
                          {title}
                        </span>
                      ) : (
                        <Link
                          href={href}
                          className="text-sm text-slate-600 leading-snug line-clamp-2 transition-colors hover:text-pink-600 pt-0.5"
                        >
                          {title}
                        </Link>
                      )}

                      {/* TOC headings — only under the active page */}
                      {isActive && items.length > 0 && (
                        <ol className="mt-3 flex flex-col gap-2 border-l border-slate-100 pl-3">
                          {items.map((it) => (
                            <li key={it.id}>
                              <a
                                href={`#${it.id}`}
                                className={`block text-sm leading-snug transition-colors hover:text-primary ${
                                  it.level === 3
                                    ? "pl-3 text-slate-400"
                                    : "text-slate-500"
                                }`}
                              >
                                {it.text}
                              </a>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          // ----------------------------------------------------------------
          // Standard single-page layout — unchanged
          // ----------------------------------------------------------------
          <>
            {pageTitle && (
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-primary/70 truncate">
                {pageTitle}
              </p>
            )}
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              On this page
            </p>
            <ol className="relative space-y-4 border-l border-black/5">
              {items.map((it) => (
                <li
                  key={it.id}
                  className={`text-sm transition-all ${
                    it.level === 3 ? "pl-6" : "pl-4"
                  }`}
                >
                  <a
                    href={`#${it.id}`}
                    className="text-slate-600 hover:text-secondary block py-0.5"
                  >
                    {it.text}
                  </a>
                </li>
              ))}
            </ol>
          </>
        )}
      </nav>
    </aside>
  );
}
