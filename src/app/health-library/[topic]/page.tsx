import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/health-library/Breadcrumbs";
import { SubtopicCard } from "@/components/health-library/SubtopicCard";
import { getHealthLibraryIndex } from "@/content/health-library/loaders";

type Params = {
  topic: string;
};

type PageProps = {
  params: Promise<Params>;
};

export function generateStaticParams() {
  const idx = getHealthLibraryIndex();
  return idx.topics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { topic } = await params;

  const idx = getHealthLibraryIndex();
  const topicItem = idx.topics.find((t) => t.slug === topic);

  if (!topicItem) {
    return {};
  }

  return {
    title: `${topicItem.title} | Health Library`,
    description: topicItem.description,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { topic } = await params;

  const idx = getHealthLibraryIndex();
  const topicItem = idx.topics.find((t) => t.slug === topic);
  if (!topicItem) notFound();

  const subtopics = idx.subtopicsByTopic[topicItem.slug] ?? [];

  return (
    <main className="p-6">
      <Breadcrumbs
        items={[
          { label: "Health Library", href: "/health-library" },
          { label: topicItem.title, href: `/health-library/${topicItem.slug}` },
        ]}
      />

      <header className="mt-4 max-w-3xl">
        <h1 className="text-3xl font-bold">{topicItem.title}</h1>
        {topicItem.description ? (
          <p className="mt-2 text-gray-600">{topicItem.description}</p>
        ) : null}
      </header>

      <section aria-label="Subtopics" className="mt-8">
        <h2 className="text-lg font-semibold">Browse subtopics</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subtopics.map((s) => (
            <SubtopicCard
              key={s.slug}
              topic={topicItem.slug}
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