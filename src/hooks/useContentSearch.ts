"use client";

import { useMemo } from "react";

/**
 * useContentSearch — generic client-side search hook.
 *
 * Takes an array of items, a function that extracts searchable text fields
 * from each item, and the current query string. Returns the subset of items
 * that match (case-insensitive, multi-token AND logic).
 *
 * Reusable: works for topics, subtopics, articles, or any list of content.
 *
 * @example
 * const results = useContentSearch(
 *   subtopics,
 *   (s) => [s.title, ...s.articles.flatMap(a => [a.title, ...a.tocHeadings])],
 *   query,
 * );
 */
export function useContentSearch<T>(
  items: T[],
  getSearchFields: (item: T) => string[],
  query: string,
): T[] {
  return useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return items;

    // Split on whitespace → every token must match at least one field
    const tokens = trimmed.toLowerCase().split(/\s+/).filter(Boolean);

    return items.filter((item) => {
      const fields = getSearchFields(item)
        .filter(Boolean)
        .map((f) => f.toLowerCase());

      return tokens.every((token) =>
        fields.some((field) => field.includes(token)),
      );
    });
  }, [items, getSearchFields, query]);
}
