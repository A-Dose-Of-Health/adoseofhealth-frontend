import fs from "node:fs/promises";
import path from "node:path";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import type { TocItem, HealthArticleIndexItem } from "./schema";
import type { HealthTopicConfig } from "./topics";
import topicsJson from "./topics.json";

// IMPORTANT: generated file
import { HEALTH_LIBRARY_INDEX } from "../_generated/health-library-index";

const HEALTH_TOPICS: HealthTopicConfig[] = topicsJson as HealthTopicConfig[];

export type HealthLibraryIndex = {
  topics: ReadonlyArray<{
    slug: string;
    title: string;
    description: string;
    icon?: string;
    order?: number;
    sections?: ReadonlyArray<{
      title: string;
      subtopics: ReadonlyArray<string>;
    }>;
    counts: {
      subtopics: number;
      articles: number;
    };
  }>;
  subtopicsByTopic: Record<
    string,
    ReadonlyArray<{
      slug: string;
      title: string;
      articleCount: number;
    }>
  >;
  articles: ReadonlyArray<HealthArticleIndexItem>;
};

export function getHealthLibraryIndex(): HealthLibraryIndex {
  return HEALTH_LIBRARY_INDEX as unknown as HealthLibraryIndex;
}

export function getTopicConfig(topicSlug: string): HealthTopicConfig | null {
  return (
    HEALTH_TOPICS.find((topic: HealthTopicConfig) => topic.slug === topicSlug) ??
    null
  );
}

export function getArticlesByTopic(topicSlug: string): HealthArticleIndexItem[] {
  const idx = getHealthLibraryIndex();
  return idx.articles.filter(
    (article: HealthArticleIndexItem) => article.frontmatter.topic === topicSlug,
  ) as HealthArticleIndexItem[];
}

export function getArticlesBySubtopic(
  topicSlug: string,
  subtopicSlug: string,
): HealthArticleIndexItem[] {
  return getArticlesByTopic(topicSlug).filter(
    (article: HealthArticleIndexItem) =>
      article.frontmatter.subtopic === subtopicSlug,
  );
}

export function getArticleBySlugs(
  topic: string,
  subtopic: string,
  article: string,
): HealthArticleIndexItem | null {
  const idx = getHealthLibraryIndex();

  return (
    idx.articles.find(
      (item: HealthArticleIndexItem) =>
        item.frontmatter.topic === topic &&
        item.frontmatter.subtopic === subtopic &&
        item.frontmatter.slug === article,
    ) ?? null
  );
}

export async function loadMdxArticle(filePathFromIndex: string) {
  const absPath = path.isAbsolute(filePathFromIndex)
    ? filePathFromIndex
    : path.join(process.cwd(), filePathFromIndex);

  const source = await fs.readFile(absPath, "utf-8");

  const compiled = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm as unknown as any,
          remarkSlug as unknown as any,
        ],
        rehypePlugins: [
          [
            rehypeAutolinkHeadings as unknown as any,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor-link"],
              },
            },
          ] as any,
        ],
      },
    },
    components: {},
  });

  return compiled;
}

export function flattenToc(toc: TocItem[]): TocItem[] {
  return toc ?? [];
}

// ---------------------------------------------------------------------------
// Related articles
// ---------------------------------------------------------------------------

const RELATED_LIMIT = 5;

export type RelatedArticle = {
  route: string;
  title: string;
  summary: string;
  updatedAt: string;
  /** true when this article was explicitly pinned via relatedSlugs */
  pinned: boolean;
};

/**
 * Parse a fully-qualified related slug: "topic/subtopic/article-slug"
 * Returns null if the format is invalid.
 */
function parseRelatedSlug(
  raw: string,
): { topic: string; subtopic: string; slug: string } | null {
  const parts = raw.trim().split("/");
  if (parts.length !== 3 || parts.some((p) => !p)) return null;
  return { topic: parts[0], subtopic: parts[1], slug: parts[2] };
}

/**
 * Score a candidate article against the current article for auto-ranking.
 *
 * Scoring:
 *   +1  per shared tag  (main relevance signal)
 *   +0.5 if featured    (tiebreaker bonus only)
 *
 * Structural priority (same-subtopic > same-topic) is enforced by the order
 * candidates are passed in, not by the score, so a highly-tagged but
 * structurally distant article never crowds out an adjacent one.
 */
function scoreCandidate(
  candidate: HealthArticleIndexItem,
  currentTags: string[],
): number {
  const candidateTags = candidate.frontmatter.tags ?? [];
  const sharedTags = candidateTags.filter((t) => currentTags.includes(t)).length;
  const featuredBonus = candidate.frontmatter.featured ? 0.5 : 0;
  return sharedTags + featuredBonus;
}

export function getRelatedArticles(
  topic: string,
  subtopic: string,
  currentSlug: string,
): RelatedArticle[] {
  const idx = getHealthLibraryIndex();

  // Resolve the current article so we can use its tags for scoring
  const current = idx.articles.find(
    (a) =>
      a.frontmatter.topic === topic &&
      a.frontmatter.subtopic === subtopic &&
      a.frontmatter.slug === currentSlug,
  );
  const currentTags = current?.frontmatter.tags ?? [];
  const pinnedSlugs = current?.frontmatter.relatedSlugs ?? [];

  // ------------------------------------------------------------------
  // 1. Resolve pinned articles (in declared order, skip bad/missing slugs)
  // ------------------------------------------------------------------
  const pinnedRoutesSeen = new Set<string>();
  const pinned: RelatedArticle[] = [];

  for (const raw of pinnedSlugs) {
    if (pinned.length >= RELATED_LIMIT) break;

    const parsed = parseRelatedSlug(raw);
    if (!parsed) {
      // Malformed slug — silently skip
      continue;
    }

    const match = idx.articles.find(
      (a) =>
        a.frontmatter.topic === parsed.topic &&
        a.frontmatter.subtopic === parsed.subtopic &&
        a.frontmatter.slug === parsed.slug,
    );

    if (!match) {
      // Article not found (deleted, renamed, typo) — silently skip
      continue;
    }

    pinnedRoutesSeen.add(match.route);
    pinned.push({
      route: match.route,
      title: match.frontmatter.title,
      summary: match.frontmatter.summary,
      updatedAt: match.frontmatter.updatedAt,
      pinned: true,
    });
  }

  // How many slots remain after pinned articles
  const remaining = RELATED_LIMIT - pinned.length;
  if (remaining === 0) return pinned;

  // ------------------------------------------------------------------
  // 2. Auto-fill: same subtopic first, then rest of same topic
  //    Cross-topic articles are only surfaced via relatedSlugs (pinned).
  //    Candidates already covered by pinned are excluded.
  // ------------------------------------------------------------------
  const isExcluded = (a: HealthArticleIndexItem) =>
    (a.frontmatter.topic === topic &&
      a.frontmatter.subtopic === subtopic &&
      a.frontmatter.slug === currentSlug) ||
    pinnedRoutesSeen.has(a.route);

  const sameSubtopic = idx.articles
    .filter(
      (a) =>
        a.frontmatter.topic === topic &&
        a.frontmatter.subtopic === subtopic &&
        !isExcluded(a),
    )
    .slice() // don't mutate the readonly array
    .sort((a, b) => scoreCandidate(b, currentTags) - scoreCandidate(a, currentTags));

  const sameTopic = idx.articles
    .filter(
      (a) =>
        a.frontmatter.topic === topic &&
        a.frontmatter.subtopic !== subtopic &&
        !isExcluded(a),
    )
    .slice()
    .sort((a, b) => scoreCandidate(b, currentTags) - scoreCandidate(a, currentTags));

  const autoCandidates = [...sameSubtopic, ...sameTopic].slice(0, remaining);

  const autoFilled: RelatedArticle[] = autoCandidates.map((a) => ({
    route: a.route,
    title: a.frontmatter.title,
    summary: a.frontmatter.summary,
    updatedAt: a.frontmatter.updatedAt,
    pinned: false,
  }));

  return [...pinned, ...autoFilled];
}
