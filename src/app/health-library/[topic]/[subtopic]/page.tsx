import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/health-library/Breadcrumbs";
import { ArticleCard } from "@/components/health-library/ArticleCard";
import { getArticlesBySubtopic, getHealthLibraryIndex } from "@/content/health-library/loaders";

type Params = { topic: string; subtopic: string };

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

export function generateMetadata({ params }: { params: Params }) {
  const idx = getHealthLibraryIndex();
  const topic = idx.topics.find((t) => t.slug === params.topic);
  if (!topic) return {};
  return {
    title: `${params.subtopic.replace(/-/g, " ")} | ${topic.title} | Health Library`,
    description: `Browse resources under ${topic.title} → ${params.subtopic.replace(/-/g, " ")}.`,
  };
}

export default function SubtopicPage({ params }: { params: Params }) {
  const idx = getHealthLibraryIndex();
  const topic = idx.topics.find((t) => t.slug === params.topic);
  if (!topic) notFound();

  const subtopic = (idx.subtopicsByTopic[topic.slug] ?? []).find(
    (s) => s.slug === params.subtopic,
  );
  if (!subtopic) notFound();

  const articles = getArticlesBySubtopic(params.topic, params.subtopic);

  return (
    <main className="p-6">
      <Breadcrumbs
        items={[
          { label: "Health Library", href: "/health-library" },
          { label: topic.title, href: `/health-library/${topic.slug}` },
          { label: subtopic.title, href: `/health-library/${topic.slug}/${subtopic.slug}` },
        ]}
      />

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-bold">{subtopic.title}</h1>
        <p className="mt-2 text-gray-600">
          {subtopic.articleCount} resource{subtopic.articleCount === 1 ? "" : "s"}
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