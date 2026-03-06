import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/health-library/Breadcrumbs";
import { ArticleCard } from "@/components/health-library/ArticleCard";
import {
  getArticlesBySubtopic,
  getHealthLibraryIndex,
} from "@/content/health-library/loaders";

type Params = {
  topic: string;
  subtopic: string;
};

type PageProps = {
  params: Promise<Params>;
};

export function generateStaticParams() {
  const idx = getHealthLibraryIndex();
  const params: Params[] = [];

  for (const t of idx.topics) {
    for (const s of idx.subtopicsByTopic[t.slug] ?? []) {
      params.push({ topic: t.slug, subtopic: s.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { topic, subtopic } = await params;

  const idx = getHealthLibraryIndex();
  const topicItem = idx.topics.find((t) => t.slug === topic);

  if (!topicItem) {
    return {};
  }

  return {
    title: `${subtopic.replace(/-/g, " ")} | ${topicItem.title} | Health Library`,
    description: `Browse resources under ${topicItem.title} → ${subtopic.replace(/-/g, " ")}.`,
  };
}

export default async function SubtopicPage({ params }: PageProps) {
  const { topic, subtopic } = await params;

  const idx = getHealthLibraryIndex();
  const topicItem = idx.topics.find((t) => t.slug === topic);
  if (!topicItem) notFound();

  const subtopicItem = (idx.subtopicsByTopic[topicItem.slug] ?? []).find(
    (s) => s.slug === subtopic,
  );
  if (!subtopicItem) notFound();

  const articles = getArticlesBySubtopic(topic, subtopic);

  return (
    <main className="p-6">
      <Breadcrumbs
        items={[
          { label: "Health Library", href: "/health-library" },
          { label: topicItem.title, href: `/health-library/${topicItem.slug}` },
          {
            label: subtopicItem.title,
            href: `/health-library/${topicItem.slug}/${subtopicItem.slug}`,
          },
        ]}
      />

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-bold">{subtopicItem.title}</h1>
        <p className="mt-2 text-gray-600">
          {subtopicItem.articleCount} resource
          {subtopicItem.articleCount === 1 ? "" : "s"}
        </p>
      </header>

      <section aria-label="Resources" className="mt-8">
        <ul className="grid gap-4 md:grid-cols-2">
          {articles.map((a) => (
            <ArticleCard
              key={a.route}
              route={a.route}
              title={a.frontmatter.title}
              summary={a.frontmatter.summary}
              updatedAt={a.frontmatter.updatedAt}
              formats={a.frontmatter.formats}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}