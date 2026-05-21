import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

import type { TocItem, HealthArticleIndexItem } from "./schema";
import type { HealthTopicConfig } from "./topics";
import topicsJson from "./topics.json";

import { HEALTH_LIBRARY_INDEX } from "../_generated/health-library-index";

const HEALTH_TOPICS: HealthTopicConfig[] = topicsJson as HealthTopicConfig[];

// ---------------------------------------------------------------------------
// Index types
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Index helpers
// ---------------------------------------------------------------------------

export function getHealthLibraryIndex(): HealthLibraryIndex {
  return HEALTH_LIBRARY_INDEX as unknown as HealthLibraryIndex;
}

export function getTopicConfig(topicSlug: string): HealthTopicConfig | null {
  return (
    HEALTH_TOPICS.find((t: HealthTopicConfig) => t.slug === topicSlug) ?? null
  );
}

export function getArticlesByTopic(topicSlug: string): HealthArticleIndexItem[] {
  const idx = getHealthLibraryIndex();
  return idx.articles.filter(
    (a: HealthArticleIndexItem) => a.frontmatter.topic === topicSlug,
  ) as HealthArticleIndexItem[];
}

export function getArticlesBySubtopic(
  topicSlug: string,
  subtopicSlug: string,
): HealthArticleIndexItem[] {
  return getArticlesByTopic(topicSlug).filter(
    (a: HealthArticleIndexItem) => a.frontmatter.subtopic === subtopicSlug,
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

// ---------------------------------------------------------------------------
// Path helper
// ---------------------------------------------------------------------------

function resolveAbsPath(filePathFromIndex: string): string {
  return path.isAbsolute(filePathFromIndex)
    ? filePathFromIndex
    : path.join(process.cwd(), filePathFromIndex);
}

// ---------------------------------------------------------------------------
// MDX splitting — pagination
// ---------------------------------------------------------------------------

/**
 * Split raw MDX source on <PageBreak /> markers.
 * Frontmatter is re-attached to every chunk so MDXRemote in MdxArticle
 * parses it correctly on each page.
 */
function splitMdxSource(source: string): string[] {
  const fmMatch = source.match(/^---[\s\S]*?---\n/);
  const frontmatter = fmMatch ? fmMatch[0] : "";
  const body = frontmatter ? source.slice(frontmatter.length) : source;

  const chunks = body.split(/\n*<PageBreak\s*\/>\n*/);

  return chunks.map((chunk) => frontmatter + chunk.trim());
}

/**
 * Extract h2/h3 headings from a raw MDX chunk to build per-page TOC.
 * Uses the same slug algorithm as remark-slug.
 */
function extractTocFromChunk(rawChunk: string): TocItem[] {
  const fmEnd = rawChunk.indexOf("\n---\n", 3);
  const body = fmEnd !== -1 ? rawChunk.slice(fmEnd + 5) : rawChunk;

  const items: TocItem[] = [];

  for (const line of body.split("\n")) {
    const h3 = line.match(/^###\s+(.+)$/);
    const h2 = !h3 && line.match(/^##\s+(.+)$/);
    const match = h3 ?? h2;
    if (!match) continue;

    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    items.push({ id, text, level: h3 ? 3 : 2 });
  }

  return items;
}

// ---------------------------------------------------------------------------
// Page loader — used by the article page for ALL articles.
//
// compileMDX is NOT called here. The raw MDX source string is returned and
// compiled at render time by <MdxArticle source={...} /> via MDXRemote.
// This keeps the custom component registry (mdxComponents) in one place:
// MdxArticle.tsx — not scattered across loaders.
// ---------------------------------------------------------------------------

export type PagedArticle = {
  /** 1-based current page */
  page: number;
  totalPages: number;
  pageTitles: string[];
  currentPageTitle: string | undefined;
  /** Raw MDX source string for the current page — passed to <MdxArticle /> */
  source: string;
  toc: TocItem[];
};

/**
 * Load one page of an MDX article.
 *
 * - Reads the file directly via fs — no dependency on the generated index
 *   for pagination data (pageTitles, totalPages).
 * - gray-matter extracts pageTitles from raw frontmatter.
 * - For non-paginated articles (no <PageBreak />): totalPages === 1.
 *
 * @param filePathFromIndex  filePath from the index entry
 * @param requestedPage      1-based page from ?page= param (default 1)
 */
export async function loadMdxPage(
  filePathFromIndex: string,
  requestedPage: number = 1,
): Promise<PagedArticle> {
  const raw = await fs.readFile(resolveAbsPath(filePathFromIndex), "utf-8");

  const { data: frontmatter } = matter(raw);
  const pageTitles: string[] = Array.isArray(frontmatter.pageTitles)
    ? frontmatter.pageTitles
    : [];

  const chunks = splitMdxSource(raw);
  const totalPages = chunks.length;

  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const source = chunks[page - 1];

  return {
    page,
    totalPages,
    pageTitles,
    currentPageTitle: pageTitles[page - 1],
    source,
    toc: extractTocFromChunk(source),
  };
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
  pinned: boolean;
};

function parseRelatedSlug(
  raw: string,
): { topic: string; subtopic: string; slug: string } | null {
  const parts = raw.trim().split("/");
  if (parts.length !== 3 || parts.some((p) => !p)) return null;
  return { topic: parts[0], subtopic: parts[1], slug: parts[2] };
}

function scoreCandidate(
  candidate: HealthArticleIndexItem,
  currentTags: string[],
): number {
  const candidateTags = candidate.frontmatter.tags ?? [];
  const sharedTags = candidateTags.filter((t) => currentTags.includes(t)).length;
  return sharedTags + (candidate.frontmatter.featured ? 0.5 : 0);
}

export function getRelatedArticles(
  topic: string,
  subtopic: string,
  currentSlug: string,
): RelatedArticle[] {
  const idx = getHealthLibraryIndex();

  const current = idx.articles.find(
    (a) =>
      a.frontmatter.topic === topic &&
      a.frontmatter.subtopic === subtopic &&
      a.frontmatter.slug === currentSlug,
  );
  const currentTags = current?.frontmatter.tags ?? [];
  const pinnedSlugs = current?.frontmatter.relatedSlugs ?? [];

  const pinnedRoutesSeen = new Set<string>();
  const pinned: RelatedArticle[] = [];

  for (const raw of pinnedSlugs) {
    if (pinned.length >= RELATED_LIMIT) break;
    const parsed = parseRelatedSlug(raw);
    if (!parsed) continue;
    const match = idx.articles.find(
      (a) =>
        a.frontmatter.topic === parsed.topic &&
        a.frontmatter.subtopic === parsed.subtopic &&
        a.frontmatter.slug === parsed.slug,
    );
    if (!match) continue;
    pinnedRoutesSeen.add(match.route);
    pinned.push({
      route: match.route,
      title: match.frontmatter.title,
      summary: match.frontmatter.summary,
      updatedAt: match.frontmatter.updatedAt,
      pinned: true,
    });
  }

  const remaining = RELATED_LIMIT - pinned.length;
  if (remaining === 0) return pinned;

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
    .slice()
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

  const autoFilled: RelatedArticle[] = [...sameSubtopic, ...sameTopic]
    .slice(0, remaining)
    .map((a) => ({
      route: a.route,
      title: a.frontmatter.title,
      summary: a.frontmatter.summary,
      updatedAt: a.frontmatter.updatedAt,
      pinned: false,
    }));

  return [...pinned, ...autoFilled];
}