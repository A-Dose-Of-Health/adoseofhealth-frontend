import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/health-library/Breadcrumbs";
import { TableOfContents } from "@/components/health-library/TableOfContents";
import { MdxArticle } from "@/components/health-library/MdxArticle";
import {
  getArticleBySlugs,
  getHealthLibraryIndex,
  loadMdxArticle,
} from "@/content/health-library/loaders";

type Params = { topic: string; subtopic: string; article: string };

export function generateStaticParams() {
  const idx = getHealthLibraryIndex();
  return idx.articles.map((a) => ({
    topic: a.frontmatter.topic,
    subtopic: a.frontmatter.subtopic,
    article: a.frontmatter.slug,
  }));
}

export function generateMetadata({ params }: { params: Params }) {
  const item = getArticleBySlugs(params.topic, params.subtopic, params.article);
  if (!item) return {};
  return {
    title: `${item.frontmatter.title} | Health Library`,
    description: item.frontmatter.summary,
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const item = getArticleBySlugs(params.topic, params.subtopic, params.article);
  if (!item) notFound();

  const compiled = await loadMdxArticle(item.filePath);

  const idx = getHealthLibraryIndex();
  const topicTitle =
    idx.topics.find((t) => t.slug === params.topic)?.title ?? params.topic;

  const subtopicTitle =
    (idx.subtopicsByTopic[params.topic] ?? []).find((s) => s.slug === params.subtopic)
      ?.title ?? params.subtopic;

  return (
    <main className="p-6">
      <Breadcrumbs
        items={[
          { label: "Health Library", href: "/health-library" },
          { label: topicTitle, href: `/health-library/${params.topic}` },
          { label: subtopicTitle, href: `/health-library/${params.topic}/${params.subtopic}` },
          { label: item.frontmatter.title, href: item.route },
        ]}
      />

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-bold">{item.frontmatter.title}</h1>
        <p className="mt-2 text-gray-600">{item.frontmatter.summary}</p>
        <div className="mt-3 text-xs text-gray-500">
          Updated: {item.frontmatter.updatedAt} ·{" "}
          {item.frontmatter.formats.map((f) => f.toUpperCase()).join(" · ")}
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <TableOfContents items={item.toc} />
        <MdxArticle>{compiled.content}</MdxArticle>
      </div>
    </main>
  );
}