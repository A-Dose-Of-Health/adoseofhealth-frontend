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