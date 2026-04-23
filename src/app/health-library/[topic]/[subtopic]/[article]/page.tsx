import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Breadcrumbs } from "@/components/health-library/Breadcrumbs";
import { TableOfContents } from "@/components/health-library/TableOfContents";
import { MdxArticle } from "@/components/health-library/MdxArticle";
import { ArticleRightSidebar } from "@/components/health-library/ArticleRightSidebar";
import {
  getArticleBySlugs,
  getHealthLibraryIndex,
  loadMdxArticle,
} from "@/content/health-library/loaders";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

type Params = {
  topic: string;
  subtopic: string;
  article: string;
};

type PageProps = {
  params: Promise<Params>;
};

export function generateStaticParams() {
  const idx = getHealthLibraryIndex();

  return idx.articles.map((a) => ({
    topic: a.frontmatter.topic,
    subtopic: a.frontmatter.subtopic,
    article: a.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { topic, subtopic, article } = await params;

  const item = getArticleBySlugs(topic, subtopic, article);

  if (!item) {
    return {};
  }

  return {
    title: `${item.frontmatter.title} | Health Library`,
    description: item.frontmatter.summary,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { topic, subtopic, article } = await params;

  const item = getArticleBySlugs(topic, subtopic, article);
  if (!item) notFound();

  const compiled = await loadMdxArticle(item.filePath);

  const idx = getHealthLibraryIndex();
  const topicTitle = idx.topics.find((t) => t.slug === topic)?.title ?? topic;
  const subtopicTitle =
    (idx.subtopicsByTopic[topic] ?? []).find((s) => s.slug === subtopic)
      ?.title ?? subtopic;

  // Build related articles: same subtopic first, fill from same topic if needed
  const sameSubtopic = idx.articles.filter(
    (a) =>
      a.frontmatter.topic === topic &&
      a.frontmatter.subtopic === subtopic &&
      a.frontmatter.slug !== article
  );
  const sameTopic = idx.articles.filter(
    (a) =>
      a.frontmatter.topic === topic &&
      a.frontmatter.subtopic !== subtopic &&
      a.frontmatter.slug !== article
  );
  const related = [...sameSubtopic, ...sameTopic].slice(0, 4).map((a) => ({
    route: a.route,
    title: a.frontmatter.title,
    summary: a.frontmatter.summary,
    updatedAt: a.frontmatter.updatedAt,
  }));

  // Resolve the canonical article URL from request headers
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const articleUrl = `${protocol}://${host}${item.route}`;

  return (
    <main className="relative grow">
      <section className="relative overflow-hidden pt-12 lg:pt-20">
        {/* Radial BG shape */}
        <span className="absolute -right-[25rem] -bottom-[6.75rem] -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#6366f1,transparent)] blur-[100px] opacity-15"></span>

        {/* Pink radial background */}
        <span className="absolute -top-[30rem] left-0 -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#ef4444,transparent)] blur-[100px] opacity-15"></span>
        <div className="container relative">
          <div className="text-gray mb-2 flex items-center justify-center gap-1 text-sm/4.5 font-medium md:gap-2 ">
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
          </div>{" "}
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
                {" "}
                <span className="relative inline-block pb-1 text-primary">
                  <Balancer>{item.frontmatter.title}</Balancer>
                </span>
              </span>
            </h1>

            <p className="mt-4 text-xl text-slate-600 font-bricolage font-light leading-relaxed">
              {item.frontmatter.summary}
            </p>
            <div className="mt-6  gap-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
              <span>Updated: {item.frontmatter.updatedAt}</span>
              <span>•</span>
              <span>{item.frontmatter.formats.join(" / ")}</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Resources" className="container py-2 lg:py-6">
        {/* 
          Three-column layout on large screens:
            col 1 (260px) — Table of Contents (sticky)
            col 2 (1fr)   — Article body
            col 3 (240px) — Share + Related articles
          Stacks to single column on mobile.
        */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr_240px]">
          {/* Left: TOC */}
          <TableOfContents items={[...item.toc]} />

          {/* Centre: Article body */}
          <MdxArticle>{compiled?.content}</MdxArticle>

          {/* Right: Share + Related */}
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
