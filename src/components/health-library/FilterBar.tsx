"use client";

import * as React from "react";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  placeholder?: string;
  resultCount?: number;
  totalCount?: number;
};

export function FilterBar({
  query,
  onQueryChange,
  placeholder = "Search topics and resources…",
  resultCount,
  totalCount,
}: Props) {
  const showCount =
    query.trim().length > 0 &&
    resultCount !== undefined &&
    totalCount !== undefined;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      {/* Search input */}
      <div className="relative flex-1 max-w-xl">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray">
          {/* Magnifier icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>

        <label className="sr-only" htmlFor="topic-search">
          Search health topics
        </label>

        <input
          id="topic-search"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full rounded-xl border border-black/10
            bg-gray-light py-3 pl-11 pr-10
            text-sm text-black placeholder:text-gray
            outline-none
            transition-shadow
            focus:border-primary/40 focus:ring-2 focus:ring-primary/10
          "
        />

        {/* Clear button */}
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Clear search"
            className="
              absolute inset-y-0 right-3 flex items-center
              text-gray hover:text-black transition-colors
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Result count badge */}
      {showCount && (
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-gray shrink-0"
        >
          {resultCount === 0 ? (
            "No results"
          ) : (
            <>
              <span className="font-semibold text-primary">{resultCount}</span>
              {" of "}
              {totalCount}
              {totalCount === 1 ? " topic" : " topics"}
            </>
          )}
        </p>
      )}
    </div>
  );
}
