import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

import topicsJson from "../src/content/health-library/topics.json" with { type: "json" };
const HEALTH_TOPICS = topicsJson;

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
    // 1. Remove commas and dots entirely (remark-slug usually ignores these)
    .replace(/[,.]/g, "")
    // 2. Replace spaces with a hyphen
    .replace(/\s+/g, "-")
    // 3. Replace any remaining non-word characters (like & or —) with a hyphen
    .replace(/[^\w-]/g, "-")
    // 4. Collapse three or more hyphens down to two
    // This handles [space][&][space] becoming --- then --
    .replace(/-{3,}/g, "--")
    // 5. Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, "");
}


function extractTocFromMdx(mdx) {
  const lines = mdx.split("\n");
  const toc = [];
  
  for (const line of lines) {
    // Modified regex to catch h1, h2, or h3
    const match = line.match(/^(#{1,3})\s+(.*)$/);
    
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      
      toc.push({ 
        id: slugifyHeading(text), 
        text, 
        level 
      });
    }
  }
  return toc;
}

/**
 * Strip MDX/Markdown formatting and return clean plain text suitable for
 * full-text search. Keeps the actual words; removes syntax characters.
 */
function extractPlainText(mdxContent) {
  return mdxContent
    // Remove fenced code blocks entirely (code isn't useful to search)
    .replace(/```[\s\S]*?```/g, " ")
    // Remove inline code but keep the text inside
    .replace(/`([^`]+)`/g, "$1")
    // Remove markdown images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    // Remove markdown links but keep link text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove table separator rows (e.g. |---|---|)
    .replace(/^\|[-:| ]+\|$/gm, "")
    // Strip table pipe delimiters — keep cell content
    .replace(/\|/g, " ")
    // Remove heading hashes (keep heading text)
    .replace(/^#{1,6}\s+/gm, "")
    // Remove bold / italic markers (keep inner text)
    .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, "$1")
    .replace(/_{1,3}([^_\n]+)_{1,3}/g, "$1")
    // Remove blockquote markers
    .replace(/^>\s*/gm, "")
    // Remove horizontal rules
    .replace(/^---+$/gm, "")
    // Remove HTML/JSX tags
    .replace(/<[^>]+>/g, " ")
    // Collapse all whitespace (newlines, tabs, multiple spaces) to a single space
    .replace(/\s+/g, " ")
    .trim();
}

function ensureFrontmatterFields(fm, file) {
  const required = ["title", "summary", "topic", "subtopic", "slug", "updatedAt", "formats"];
  const missing = required.filter((k) => fm?.[k] == null || fm?.[k] === "");
  if (missing.length) {
    throw new Error(`Missing frontmatter fields in ${file}: ${missing.join(", ")}`);
  }
  return fm;
}

async function main() {
  const mdxFiles = await fg(["**/*.mdx"], { cwd: CONTENT_ROOT, absolute: true });

  const articles = [];
  // route → plain-text content, built in parallel with articles array
  const searchTextByRoute = {};

  for (const absFile of mdxFiles) {
    const raw = await fs.readFile(absFile, "utf-8");
    const parsed = matter(raw);
    const fm = ensureFrontmatterFields(parsed.data, absFile);

    const toc = extractTocFromMdx(parsed.content);
    const contentText = extractPlainText(parsed.content);

    const route = `/health-library/${fm.topic}/${fm.subtopic}/${fm.slug}`;
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

    searchTextByRoute[route] = contentText;
  }

  // ── Build topic / subtopic structure (unchanged) ────────────────────────
  const topicsFromContent = new Set(articles.map((a) => a.frontmatter.topic));

  const topicConfigs = HEALTH_TOPICS
    .filter((t) => topicsFromContent.has(t.slug))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  for (const t of topicsFromContent) {
    if (!topicConfigs.find((x) => x.slug === t)) {
      topicConfigs.push({ slug: t, title: titleFromSlug(t), description: "" });
    }
  }

  const subtopicsByTopic = {};
  for (const t of topicsFromContent) {
    const subtopicCounts = new Map();
    for (const a of articles.filter((x) => x.frontmatter.topic === t)) {
      subtopicCounts.set(
        a.frontmatter.subtopic,
        (subtopicCounts.get(a.frontmatter.subtopic) ?? 0) + 1,
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

  // ── Write output files ──────────────────────────────────────────────────
  const outDir = path.join(process.cwd(), "src", "content", "_generated");
  await fs.mkdir(outDir, { recursive: true });

  // 1. Structural index (unchanged shape — still uses `as const`)
  const indexObj = { topics, subtopicsByTopic, articles };
  await fs.writeFile(
    path.join(outDir, "health-library-index.ts"),
    `/* eslint-disable */\n// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n// Run: npm run content:index\n\nexport const HEALTH_LIBRARY_INDEX = ${JSON.stringify(indexObj, null, 2)} as const;\n`,
    "utf-8",
  );
  console.log("[content:index] Wrote src/content/_generated/health-library-index.ts");

  // 2. Search text map — NOT `as const` (avoids TS inferring thousands of
  //    literal string types, which would slow down the compiler significantly).
  //    Typed as a plain Record<string, string> instead.
  await fs.writeFile(
    path.join(outDir, "health-library-search.ts"),
    `/* eslint-disable */\n// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n// Run: npm run content:index\n\n/** Maps article route → stripped plain-text body for full-text search. */\nexport const HEALTH_LIBRARY_SEARCH: Record<string, string> = ${JSON.stringify(searchTextByRoute, null, 2)};\n`,
    "utf-8",
  );
  console.log("[content:index] Wrote src/content/_generated/health-library-search.ts");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
