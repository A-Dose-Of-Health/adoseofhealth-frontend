import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

import topicsJson from "../src/content/health-library/topics.json" with { type: "json" };
const HEALTH_TOPICS = topicsJson;

// NOTE: This script runs in Node. We validate frontmatter using a minimal approach here,
// because importing TS/Zod in a Node .mjs script would require extra tooling.
// If you want strict validation here too, we can convert this script to TS and run with tsx.
// For now, we keep it simple and safe: require key fields and normalize.

const CONTENT_ROOT = path.join(process.cwd(), "src", "content", "health-library");

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractTocFromMdx(mdx) {
  const lines = mdx.split("\n");
  const toc = [];
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.*)$/);
    const h3 = line.match(/^###\s+(.*)$/);
    if (h2) {
      const text = h2[1].trim();
      toc.push({ id: slugifyHeading(text), text, level: 2 });
    } else if (h3) {
      const text = h3[1].trim();
      toc.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }
  return toc;
}

function ensureFrontmatterFields(fm, file) {
  const required = ["title", "summary", "topic", "subtopic", "slug", "updatedAt", "formats"];
  const missing = required.filter((k) => fm?.[k] == null || fm?.[k] === "");
  if (missing.length) {
    throw new Error(
      `Missing frontmatter fields in ${file}: ${missing.join(", ")}`
    );
  }
  return fm;
}

async function main() {
  const mdxFiles = await fg(["**/*.mdx"], { cwd: CONTENT_ROOT, absolute: true });

  const articles = [];

  for (const absFile of mdxFiles) {
    const raw = await fs.readFile(absFile, "utf-8");
    const parsed = matter(raw);
    const fm = ensureFrontmatterFields(parsed.data, absFile);

    const toc = extractTocFromMdx(parsed.content);

    // route derived from fm
    const route = `/health-library/${fm.topic}/${fm.subtopic}/${fm.slug}`;

    // store project-relative path for portability
    const relFilePath = path.relative(process.cwd(), absFile);

    articles.push({
      filePath: relFilePath,
      route,
      frontmatter: {
        title: fm.title,
        summary: fm.summary,
        topic: fm.topic,
        subtopic: fm.subtopic,
        slug: fm.slug,
        updatedAt: fm.updatedAt,
        formats: fm.formats,
        lifeStages: fm.lifeStages ?? undefined,
        tags: fm.tags ?? undefined,
        featured: fm.featured ?? undefined,
        readingMinutes: fm.readingMinutes ?? undefined,
      },
      toc,
    });
  }

  // Build topic/subtopic lists from articles
  const topicsFromContent = new Set(articles.map((a) => a.frontmatter.topic));

  const topicConfigs = HEALTH_TOPICS
    .filter((t) => topicsFromContent.has(t.slug))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  // ensure any topic folders that exist but are not in registry still appear
  for (const t of topicsFromContent) {
    if (!topicConfigs.find((x) => x.slug === t)) {
      topicConfigs.push({
        slug: t,
        title: titleFromSlug(t),
        description: "",
      });
    }
  }

  const subtopicsByTopic = {};
  for (const t of topicsFromContent) {
    const subtopicCounts = new Map();
    for (const a of articles.filter((x) => x.frontmatter.topic === t)) {
      subtopicCounts.set(
        a.frontmatter.subtopic,
        (subtopicCounts.get(a.frontmatter.subtopic) ?? 0) + 1
      );
    }
    subtopicsByTopic[t] = Array.from(subtopicCounts.entries())
      .map(([slug, count]) => ({
        slug,
        title: titleFromSlug(slug),
        articleCount: count,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  const topics = topicConfigs.map((t) => {
    const subtopics = subtopicsByTopic[t.slug] ?? [];
    const articleCount = articles.filter((a) => a.frontmatter.topic === t.slug).length;

    return {
      slug: t.slug,
      title: t.title,
      description: t.description,
      icon: t.icon,
      order: t.order,
      sections: t.sections,
      counts: { subtopics: subtopics.length, articles: articleCount },
    };
  });

  const indexObj = {
    topics,
    subtopicsByTopic,
    articles,
  };

  const outDir = path.join(process.cwd(), "src", "content", "_generated");
  await fs.mkdir(outDir, { recursive: true });

  const outFile = path.join(outDir, "health-library-index.ts");

  const ts = `/* eslint-disable */
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
// Run: npm run content:index

export const HEALTH_LIBRARY_INDEX = ${JSON.stringify(indexObj, null, 2)} as const;
`;

  await fs.writeFile(outFile, ts, "utf-8");
  console.log(`[content:index] Wrote ${path.relative(process.cwd(), outFile)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});