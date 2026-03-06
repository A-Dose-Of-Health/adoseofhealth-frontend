import { getHealthLibraryIndex } from "@/content/health-library/loaders";
import { TopicCard } from "@/components/health-library/TopicCard";

export default function HealthLibraryPage() {
  const idx = getHealthLibraryIndex();

  return (
    <main className="p-6">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold">Health Library</h1>
        <p className="mt-2 text-gray-600">
          Explore trusted health information by topic. Use the topic pages to browse subtopics and resources.
        </p>
      </header>

      <section aria-label="Browse topics" className="mt-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {idx.topics.map((t) => (
            <TopicCard
              key={t.slug}
              slug={t.slug}
              title={t.title}
              description={t.description}
              counts={t.counts}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}