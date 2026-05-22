// src/components/health-library/layouts/GridLayout.tsx
//
// Default layout — the existing article card grid extracted from subtopic page.tsx.
// Used as the fallback for any subtopic without a custom layout registered.

import { ArticleCard } from "@/components/health-library/ArticleCard";
import type { LayoutProps } from "./index";

export function GridLayout({ articles }: LayoutProps) {
  return (
    <div className="relative mx-auto grid w-full gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:gap-y-20">
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
    </div>
  );
}