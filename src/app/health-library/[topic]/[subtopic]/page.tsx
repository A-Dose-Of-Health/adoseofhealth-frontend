import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/health-library/Breadcrumbs";
import {
  getArticlesBySubtopic,
  getHealthLibraryIndex,
} from "@/content/health-library/loaders";
import { getSubtopicConfig } from "@/content/health-library/subtopic-config";
import { getLayoutComponent } from "@/components/health-library/layouts/index";

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
  if (!topicItem) return {};

  const subtopicItem = (idx.subtopicsByTopic[topicItem.slug] ?? []).find(
    (s) => s.slug === subtopic,
  );

  return {
    title: `${subtopicItem?.title ?? subtopic} | ${topicItem.title} | Health Library`,
    description: `Browse resources under ${topicItem.title} — ${subtopicItem?.title ?? subtopic}.`,
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

  // Look up per-subtopic layout config. Returns null if no entry registered
  // — the layout falls back to "grid" in that case.
  const config = getSubtopicConfig(topic, subtopic);
  const layoutMode = config?.layout ?? "grid";
  const Layout = getLayoutComponent(layoutMode);

  return (
    <main className="relative grow overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-12 lg:py-20">
        {/* <span className="absolute -right-[25rem] -bottom-[6.75rem] -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#6366f1,transparent)] blur-[100px] opacity-15" /> */}
        <span className="absolute -top-[30rem] left-0 -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#ef4444,transparent)] blur-[100px] opacity-15" />

        <div className="container relative">
          <div className="mb-2 flex items-center justify-center gap-1 text-sm/4.5 font-medium text-gray md:gap-2">
            <Breadcrumbs
              items={[
                { label: "Health Library", href: "/health-library" },
                {
                  label: topicItem.title,
                  href: `/health-library/${topicItem.slug}`,
                },
                {
                  label: subtopicItem.title,
                  href: `/health-library/${topicItem.slug}/${subtopicItem.slug}`,
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
              </span>{" "}
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
                  {subtopicItem.title}
                </span>
              </span>
            </h1>

            <h3 className="mx-auto max-w-[792px] lg:text-lg">
              {subtopicItem.articleCount} resource
              {subtopicItem.articleCount === 1 ? "" : "s"}
            </h3>
          </div>
        </div>
      </section>

      {/* ── Content — delegated to layout component ── */}
      <section aria-label="Resources" className="container pb-12 lg:pb-20">
        <Layout
          articles={articles}
          topicSlug={topic}
          subtopicSlug={subtopic}
          subtopicTitle={subtopicItem.title}
          config={config}
        />
      </section>
    </main>
  );
}