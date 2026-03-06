import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/health-library/Breadcrumbs";
import { SubtopicCard } from "@/components/health-library/SubtopicCard";
import { getHealthLibraryIndex } from "@/content/health-library/loaders";

type Params = { topic: string };

export function generateStaticParams() {
  const idx = getHealthLibraryIndex();
  return idx.topics.map((t) => ({ topic: t.slug }));
}

export function generateMetadata({ params }: { params: Params }) {
  const idx = getHealthLibraryIndex();
  const topic = idx.topics.find((t) => t.slug === params.topic);
  if (!topic) return {};
  return {
    title: `${topic.title} | Health Library`,
    description: topic.description,
  };
}

export default function TopicPage({ params }: { params: Params }) {
  const idx = getHealthLibraryIndex();
  const topic = idx.topics.find((t) => t.slug === params.topic);
  if (!topic) notFound();

  const subtopics = idx.subtopicsByTopic[topic.slug] ?? [];

  return (
    <main className="p-6">
      <Breadcrumbs
        items={[
          { label: "Health Library", href: "/health-library" },
          { label: topic.title, href: `/health-library/${topic.slug}` },
        ]}
      />

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-bold">{topic.title}</h1>
        {topic.description ? (
          <p className="mt-2 text-gray-600">{topic.description}</p>
        ) : null}
      </header>

      <section aria-label="Subtopics" className="mt-8">
        <h2 className="text-lg font-semibold">Browse subtopics</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subtopics.map((s) => (
            <SubtopicCard
              key={s.slug}
              topic={topic.slug}
              slug={s.slug}
              title={s.title}
              articleCount={s.articleCount}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}