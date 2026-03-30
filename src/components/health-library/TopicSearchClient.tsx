"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { FilterBar } from "@/components/health-library/FilterBar";
import { useContentSearch } from "@/hooks/useContentSearch";

/** Shape passed down from the server component */
export type SearchableSubtopic = {
  slug: string;
  title: string;
  articleCount: number;
  /** Flattened searchable text extracted server-side from article metadata + TOC */
  searchFields: string[];
};

type Props = {
  topicSlug: string;
  subtopics: SearchableSubtopic[];
};

export function TopicSearchClient({ topicSlug, subtopics }: Props) {
  const [query, setQuery] = useState("");

  const getSearchFields = useCallback(
    (s: SearchableSubtopic) => s.searchFields,
    [],
  );

  const results = useContentSearch(subtopics, getSearchFields, query);
  const hasQuery = query.trim().length > 0;

  return (
    <section aria-label="Subtopics" className="container py-12 lg:py-20">
      {/* Heading + FilterBar */}
      <div className="mb-10 space-y-6 lg:mb-12">
        <div className="space-y-2.5 text-center lg:space-y-6">
          <h2 className="relative inline text-3xl leading-10 font-medium lg:text-5xl lg:leading-14 xl:text-[64px] xl:leading-[22px]">
            Browse subtopics
          </h2>
        </div>

        <div className="mx-auto max-w-xl">
          <FilterBar
            query={query}
            onQueryChange={setQuery}
            placeholder="Search across all subtopics…"
            resultCount={results.length}
            totalCount={subtopics.length}
          />
        </div>
      </div>

      {/* Results grid */}
      {results.length > 0 ? (
        <div className="relative mx-auto grid w-full max-w-[86%] gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:gap-y-20">
          {results.map((s) => (
            <SubtopicSearchCard
              key={s.slug}
              topicSlug={topicSlug}
              subtopic={s}
              query={query}
            />
          ))}
        </div>
      ) : (
        <EmptyState query={query} onClear={() => setQuery("")} />
      )}
    </section>
  );
}

/* ─── Subtopic card (identical look to SubtopicCard, with match hint) ─── */

function SubtopicSearchCard({
  topicSlug,
  subtopic,
  query,
}: {
  topicSlug: string;
  subtopic: SearchableSubtopic;
  query: string;
}) {
  // Count how many searchable fields contain the query — used as a "relevance" hint
  const matchCount =
    query.trim().length > 0
      ? subtopic.searchFields.filter((f) =>
          f.toLowerCase().includes(query.trim().toLowerCase()),
        ).length
      : 0;

  return (
    <Link
      href={`/health-library/${topicSlug}/${subtopic.slug}`}
      className="group bg-gray-light relative w-full rounded-lg p-3 text-left duration-300 sm:p-4 lg:rounded-lg xl:rounded-lg xl:p-6"
    >
      <span className="absolute inset-0 rounded-2xl border border-black duration-300 group-hover:-bottom-2 group-hover:border-b-8 lg:rounded-3xl xl:rounded-4xl" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold lg:text-2xl">{subtopic.title}</h3>
        <div className="text-primary flex items-center gap-2 text-sm font-medium">
          <span>{subtopic.articleCount} Resources</span>
          {matchCount > 0 && (
            <>
              <span className="bg-primary size-1 rounded-full" />
              <span>
                {matchCount} matching {matchCount === 1 ? "section" : "sections"}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ─── Empty state ─── */

function EmptyState({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-4 py-16 text-center">
      <span className="text-4xl" aria-hidden="true">
        🔍
      </span>
      <p className="text-gray text-sm">
        No subtopics matched{" "}
        <span className="font-semibold text-black">"{query}"</span>. Try a
        different term.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
      >
        Clear search
      </button>
    </div>
  );
}
