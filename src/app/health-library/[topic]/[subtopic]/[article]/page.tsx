import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/health-library/Breadcrumbs";
import { TableOfContents } from "@/components/health-library/TableOfContents";
import { MdxArticle } from "@/components/health-library/MdxArticle";
import { ArticleRightSidebar } from "@/components/health-library/ArticleRightSidebar";
import { PaginationNav } from "@/components/health-library/PaginationNav";
import {
  getArticleBySlugs,
  getHealthLibraryIndex,
  getRelatedArticles,
  loadMdxPage,
} from "@/content/health-library/loaders";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

type Params = {
  topic: string;
  subtopic: string;
  article: string;
};

type SearchParams = {
  page?: string;
};

type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

export function generateStaticParams() {
  const idx = getHealthLibraryIndex();
  return idx.articles.map((a) => ({
    topic: a.frontmatter.topic,
    subtopic: a.frontmatter.subtopic,
    article: a.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic, subtopic, article } = await params;

  const item = getArticleBySlugs(topic, subtopic, article);
  if (!item) return {};

  const idx = getHealthLibraryIndex();
  const topicTitle = idx.topics.find((t) => t.slug === topic)?.title ?? topic;
  const subtopicTitle =
    (idx.subtopicsByTopic[topic] ?? []).find((s) => s.slug === subtopic)?.title ??
    subtopic;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const articleUrl = `${baseUrl}${item.route}`;

  return {
    title: `${item.frontmatter.title} | Health Library`,
    description: item.frontmatter.summary,
    openGraph: {
      title: item.frontmatter.title,
      description: item.frontmatter.summary,
      url: articleUrl,
      siteName: "A Dose of Health",
      type: "article",
      locale: "en_GB",
      publishedTime: item.frontmatter.updatedAt,
      modifiedTime: item.frontmatter.updatedAt,
      section: topicTitle,
      tags: item.frontmatter.tags ?? [topicTitle, subtopicTitle],
    },
    twitter: {
      card: "summary_large_image",
      title: item.frontmatter.title,
      description: item.frontmatter.summary,
    },
    alternates: { canonical: articleUrl },
  };
}

export default async function ArticlePage({ params, searchParams }: PageProps) {
  const { topic, subtopic, article } = await params;
  const { page: pageParam } = await searchParams;

  const item = getArticleBySlugs(topic, subtopic, article);
  if (!item) notFound();

  const idx = getHealthLibraryIndex();
  const topicTitle = idx.topics.find((t) => t.slug === topic)?.title ?? topic;
  const subtopicTitle =
    (idx.subtopicsByTopic[topic] ?? []).find((s) => s.slug === subtopic)?.title ??
    subtopic;

  const related = getRelatedArticles(topic, subtopic, article);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articleUrl = `${baseUrl}${item.route}`;

  const requestedPage = pageParam ? parseInt(pageParam, 10) : 1;
  const safePage = isNaN(requestedPage) ? 1 : requestedPage;

  const paged = await loadMdxPage(item.filePath, safePage);
  const { source, toc, totalPages, pageTitles, currentPageTitle, page } = paged;
  const isPaginated = totalPages > 1;

  return (
    <main className="relative grow">
      <section className="relative overflow-hidden pt-12 lg:pt-20">
        <span className="absolute -right-[25rem] -bottom-[6.75rem] -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#6366f1,transparent)] blur-[100px] opacity-15" />
        <span className="absolute -top-[30rem] left-0 -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#ef4444,transparent)] blur-[100px] opacity-15" />

        <div className="container relative">
          <div className="text-gray mb-2 flex items-center justify-center gap-1 text-sm/4.5 font-medium md:gap-2">
            <Breadcrumbs
              items={[
                { label: "Health Library", href: "/health-library" },
                { label: topicTitle, href: `/health-library/${topic}` },
                {
                  label: subtopicTitle,
                  href: `/health-library/${topic}/${subtopic}`,
                },
                { label: item.frontmatter.title, href: item.route },
              ]}
            />
          </div>

          <div className="mx-auto w-full max-w-[964px] space-y-4 text-center md:space-y-6 lg:mb-12">
            <h1 className="font-bricolage font-extrabold tracking-tight text-slate-900 text-4xl md:text-5xl lg:text-6xl">
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
                <span className="relative inline-block pb-1 text-primary">
                  <Balancer>
                    {isPaginated && currentPageTitle
                      ? currentPageTitle
                      : item.frontmatter.title}
                  </Balancer>
                </span>
              </span>
            </h1>

            {isPaginated && currentPageTitle && (
              <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
                {item.frontmatter.title}
              </p>
            )}

            <p className="mt-4 text-xl text-slate-600 font-bricolage font-light leading-relaxed">
              {item.frontmatter.summary}
            </p>

            <div className="mt-6 gap-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
              <span>Updated: {item.frontmatter.updatedAt}</span>
              <span> • </span>
              <span>{item.frontmatter.formats.join(" / ")}</span>
              {isPaginated && (
                <>
                  <span> • </span>
                  <span>Part {page} of {totalPages}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Resources" className="container">
        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr_240px]">
          <TableOfContents
            items={toc}
            pageTitle={isPaginated ? currentPageTitle : undefined}
            pageTitles={isPaginated ? pageTitles : undefined}
            currentPage={isPaginated ? page : undefined}
            baseRoute={isPaginated ? item.route : undefined}
          />

          <div>
            {/* source is the raw MDX string — compiled inside MdxArticle via MDXRemote */}
            <MdxArticle source={source} />

            {isPaginated && (
              <PaginationNav
                baseRoute={item.route}
                currentPage={page}
                totalPages={totalPages}
                pageTitles={pageTitles}
              />
            )}
          </div>

          <ArticleRightSidebar
            articleTitle={item.frontmatter.title}
            articleUrl={articleUrl}
            relatedArticles={related}
          />
        </div>
      </section>
    </main>
  );
}