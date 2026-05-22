import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/health-library/Breadcrumbs";
import {
  getHealthLibraryIndex,
  getArticlesByTopic,
} from "@/content/health-library/loaders";
import {
  TopicSearchClient,
  type SearchableSubtopic,
} from "@/components/health-library/TopicSearchClient";
// Auto-generated: run `npm run content:index` to rebuild
import { HEALTH_LIBRARY_SEARCH } from "@/content/_generated/health-library-search";
import Image from "next/image";

type Params = { topic: string };
type PageProps = { params: Promise<Params> };

export function generateStaticParams() {
  const idx = getHealthLibraryIndex();
  return idx.topics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { topic } = await params;
  const idx = getHealthLibraryIndex();
  const topicItem = idx.topics.find((t) => t.slug === topic);
  if (!topicItem) return {};
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
  const articles = getArticlesByTopic(topicItem.slug);

  // ── Build searchable subtopics ──────────────────────────────────────────
  // searchFields combines metadata (title, summary, tags, TOC headings) with
  // the full article body text extracted at build time. All of this is static —
  // no runtime file reads.
  const searchableSubtopics: SearchableSubtopic[] = subtopics.map((s) => {
    const subtopicArticles = articles.filter(
      (a) => a.frontmatter.subtopic === s.slug,
    );

    const searchFields: string[] = [
      // Subtopic title
      s.title,

      // Per-article metadata + headings
      ...subtopicArticles.flatMap((a) => [
        a.frontmatter.title,
        a.frontmatter.summary ?? "",
        ...(a.frontmatter.tags ?? []),
        ...a.toc.map((h) => h.text),
        // Full stripped body text from the generated search map
        HEALTH_LIBRARY_SEARCH[a.route] ?? "",
      ]),
    ].filter(Boolean);

    return {
      slug: s.slug,
      title: s.title,
      articleCount: s.articleCount,
      searchFields,
    };
  });
  // ────────────────────────────────────────────────────────────────────────

  return (
    <main className="relative grow overflow-hidden">
      {/* ── Hero section (unchanged) ── */}
      <section className="relative overflow-hidden py-12 lg:py-20">
        <span className="absolute -right-[25rem] -bottom-[6.75rem] -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#6366f1,transparent)] blur-[100px] opacity-15" />
        <span className="absolute -top-[30rem] left-0 -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#ef4444,transparent)] blur-[100px] opacity-15" />

        <div className="container relative">
          <div className="text-gray mb-2 flex items-center justify-center gap-1 text-sm/4.5 font-medium md:gap-2">
            <Breadcrumbs
              items={[
                { label: "Health Library", href: "/health-library" },
                {
                  label: topicItem.title,
                  href: `/health-library/${topicItem.slug}`,
                },
              ]}
            />
          </div>

          <div className="mx-auto mb-8 w-full max-w-[964px] space-y-4 text-center md:space-y-6 lg:mb-12">
            <h1 className="relative leading-10 sm:text-5xl sm:leading-[64px] xl:text-6xl xl:leading-[80px] 2xl:text-7xl 2xl:leading-[96px] font-bricolage font-extrabold tracking-tight text-slate-900 text-4xl md:text-5xl lg:text-6xl">
              <span className="absolute left-0 top-3 hidden w-5 sm:block sm:w-auto">
                <Image
                  alt="star"
                  width={29}
                  height={32}
                  className="-rotate-45 dark:hidden"
                  src="/images/shape1.svg"
                />
                <Image
                  alt="star"
                  width={29}
                  height={32}
                  className="hidden w-full dark:block"
                  src="/images/shape-dark1.svg"
                />
              </span>
              <span className="lg:block">
                <span className="relative inline-block pb-1 text-primary dark:text-tertiary">
                  <span className="absolute bottom-0 left-10 right-0 h-2 sm:left-16 md:h-4 xl:left-[104px]">
                    <Image
                      alt="underline"
                      width={272}
                      height={16}
                      className="h-full w-full object-contain dark:hidden"
                      src="/images/text-underline3.svg"
                    />
                    <Image
                      alt="underline"
                      width={272}
                      height={16}
                      className="hidden h-full w-full object-contain dark:block"
                      src="/images/text-underline-dark3.svg"
                    />
                  </span>
                  {topicItem.title}
                </span>
              </span>
            </h1>

            {topicItem.description && (
              <h3 className="mx-auto max-w-[792px] lg:text-lg">
                {topicItem.description}
              </h3>
            )}
          </div>
        </div>
      </section>

      {/* ── Searchable subtopics grid (client) ── */}
      <TopicSearchClient
        topicSlug={topicItem.slug}
        subtopics={searchableSubtopics}
      />
    </main>
  );
}
