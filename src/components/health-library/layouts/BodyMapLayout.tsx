// src/components/health-library/layouts/BodyMapLayout.tsx
//
// Layered Depth Bento layout for the body-anatomy subtopic.
//
// Grid structure (lg+):
//
//   Col 1 (narrower)         Col 2 (wider)
//   ┌─────────────────────┬─────────────────────────────┐
//   │ INTRO  (row 1)      │ EXTERNAL  (rows 1–2)        │
//   │ Getting to know...  │ Rose/pink · surface badge   │
//   │                     │ Mini SVG preview            │
//   ├─────────────────────┤                             │
//   │ STAT A (row 2)      │                             │
//   │ 8,000 nerve endings │                             │
//   ├─────────────────────┼─────────────────────────────┤
//   │ INTERNAL (rows 3–4) │ STAT B  (row 3)             │
//   │ Teal · 4 sections   │ Self-cleaning fact          │
//   │ as jump links       ├─────────────────────────────┤
//   │                     │ READING ORDER (row 4)       │
//   │                     │ Dark primary tile           │
//   └─────────────────────┴─────────────────────────────┘
//
// Mobile: single column stack in DOM order.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LayoutProps } from "./index";
import type { BodyMapData } from "@/content/health-library/subtopic-config";
import type { HealthArticleIndexItem } from "@/content/health-library/schema";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findArticle(
  articles: HealthArticleIndexItem[],
  slug: string,
): HealthArticleIndexItem | null {
  return articles.find((a) => a.frontmatter.slug === slug) ?? null;
}

function pageHref(route: string, page: number): string {
  return page === 1 ? route : `${route}?page=${page}`;
}

// ---------------------------------------------------------------------------
// Decorative mini SVG preview of the vulva (static, non-interactive)
// ---------------------------------------------------------------------------

function VulvaMiniPreview() {
  return (
    <svg
      viewBox="0 0 80 120"
      className="w-14"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="40" cy="60" rx="26" ry="52" fill="#F4C0D1" opacity="0.6" />
      <ellipse cx="40" cy="62" rx="18" ry="38" fill="#ED93B1" opacity="0.5" />
      <ellipse cx="40" cy="62" rx="10" ry="28" fill="#D4537E" opacity="0.35" />
      <circle cx="40" cy="22" r="5" fill="#D4537E" opacity="0.7" />
      <circle cx="40" cy="50" r="3" fill="#0F6E56" opacity="0.55" />
      <ellipse cx="40" cy="66" rx="5" ry="7" fill="#185FA5" opacity="0.4" />
      <circle cx="40" cy="84" r="4" fill="#7F77DD" opacity="0.45" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Tile sub-components
// ---------------------------------------------------------------------------

function IntroTile({ article }: { article: HealthArticleIndexItem }) {
  return (
    <Link
      href={article.route}
      className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-[#fefbf4] p-5 transition duration-200 hover:border-black/20 hover:shadow-sm lg:col-start-1 lg:row-start-1"
    >
      <div>
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#737373]">
          Start here
        </p>
        <h3 className="text-base font-semibold leading-snug text-[#1e1e1e] transition-colors group-hover:text-[#1E444C]">
          {article.frontmatter.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#737373]">
          {article.frontmatter.summary}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#1E444C]">
        Begin reading
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function ExternalTile({ article }: { article: HealthArticleIndexItem }) {
  return (
    <div className="flex flex-col rounded-2xl border border-[#f5b8bd] bg-[#FDE2E4] p-5 lg:col-start-2 lg:row-start-1 lg:row-span-2">
      {/* Header row */}
      <div className="mb-1 flex items-start justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#993556]">
          External anatomy
        </p>
        <span className="shrink-0 rounded-full border border-[#D4537E]/30 bg-[#ED93B1]/20 px-2 py-0.5 text-[10px] font-medium text-[#72243E]">
          surface
        </span>
      </div>

      <h3 className="text-lg font-semibold leading-snug text-[#4A1528]">
        The vulva
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-[#72243E]">
        What you can see. Every structure, correctly named.
      </p>

      {/* Decorative SVG */}
      <div className="my-5 flex justify-center">
        <VulvaMiniPreview />
      </div>

      <p className="mb-5 text-[11px] text-[#993556]/70">
        Includes an interactive anatomy diagram
      </p>

      <Link
        href={article.route}
        className="group mt-auto inline-flex items-center gap-1.5 self-start rounded-full border border-[#D4537E] bg-[#D4537E]/10 px-3.5 py-1.5 text-xs font-semibold text-[#72243E] transition hover:bg-[#D4537E]/20"
      >
        Explore external organs
        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

function StatATile({ stat }: { stat: BodyMapData["stats"][0] }) {
  return (
    <div className="flex flex-col justify-center rounded-2xl border border-slate-100 bg-white p-5 lg:col-start-1 lg:row-start-2">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#737373]">
        Did you know
      </p>
      {"value" in stat && stat.value ? (
        <>
          <p className="text-3xl font-semibold leading-none text-[#D85A30]">
            {stat.value}
          </p>
          <p className="mt-1.5 text-xs leading-snug text-slate-500">
            {stat.label}
          </p>
        </>
      ) : (
        <p className="text-sm font-medium leading-snug text-slate-700">
          {"fact" in stat ? stat.fact : stat.label}
        </p>
      )}
    </div>
  );
}

function InternalTile({
  article,
  sections,
}: {
  article: HealthArticleIndexItem;
  sections: string[];
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-[#9FE1CB] bg-[#E1F5EE] p-5 lg:col-start-1 lg:row-start-3 lg:row-span-2">
      {/* Header row */}
      <div className="mb-1 flex items-start justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#0F6E56]">
          Internal organs
        </p>
        <span className="shrink-0 rounded-full border border-[#1D9E75]/30 bg-[#1D9E75]/10 px-2 py-0.5 text-[10px] font-medium text-[#085041]">
          internal
        </span>
      </div>

      <h3 className="text-lg font-semibold leading-snug text-[#085041]">
        The vagina, cervix, uterus & more
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-[#0F6E56]">
        A 4-part guide through the internal reproductive system.
      </p>

      {/* Section jump links */}
      {sections.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {sections.map((title, i) => (
            <Link
              key={i}
              href={pageHref(article.route, i + 1)}
              className="group flex items-center gap-2.5 rounded-xl border border-[#1D9E75]/20 bg-white/60 px-3 py-2 transition hover:border-[#1D9E75]/40 hover:bg-white/90"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#1D9E75] text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <span className="text-xs leading-snug text-[#085041]">
                {title}
              </span>
              <ArrowRight className="ml-auto size-3 shrink-0 text-[#1D9E75] opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      )}

      <Link
        href={article.route}
        className="group mt-5 inline-flex items-center gap-1.5 self-start rounded-full border border-[#1D9E75] bg-[#1D9E75]/10 px-3.5 py-1.5 text-xs font-semibold text-[#085041] transition hover:bg-[#1D9E75]/20"
      >
        Start from the beginning
        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

function StatBTile({ stat }: { stat: BodyMapData["stats"][1] }) {
  return (
    <div className="flex flex-col justify-center rounded-2xl border border-slate-100 bg-white p-5 lg:col-start-2 lg:row-start-3">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#737373]">
        Did you know
      </p>
      {"value" in stat && stat.value ? (
        <>
          <p className="text-3xl font-semibold leading-none text-[#1E444C]">
            {stat.value}
          </p>
          <p className="mt-1.5 text-xs leading-snug text-slate-500">
            {stat.label}
          </p>
        </>
      ) : (
        <p className="text-sm font-medium leading-snug text-slate-700">
          {"fact" in stat ? stat.fact : stat.label}
        </p>
      )}
    </div>
  );
}

function ReadingOrderTile({
  articles,
  readingOrder,
}: {
  articles: HealthArticleIndexItem[];
  readingOrder: string[];
}) {
  const items = readingOrder
    .map((slug) => {
      const article = findArticle(articles, slug);
      if (!article) return null;
      // Use the first part of the title before " — " for brevity
      const label = article.frontmatter.title.split("—")[0].trim();
      return { label, route: article.route };
    })
    .filter(Boolean) as { label: string; route: string }[];

  return (
    <div className="flex flex-col rounded-2xl bg-[#1E444C] p-5 lg:col-start-2 lg:row-start-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
        Suggested order
      </p>
      <p className="mt-1 text-sm font-semibold leading-snug text-white">
        New here? Start outside, then go deeper.
      </p>
      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <Link
              href={item.route}
              className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] text-white/85 transition hover:bg-white/20"
            >
              {item.label}
            </Link>
            {i < items.length - 1 && (
              <span className="text-xs text-white/35">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main layout export
// ---------------------------------------------------------------------------

export function BodyMapLayout({ articles, config }: LayoutProps) {
  const data = config?.data as BodyMapData | undefined;

  const intro = findArticle(articles, "getting-to-know-your-body");
  const external = findArticle(articles, "external-organs");
  const internal = findArticle(articles, "internal-organs");

  const sections = data?.internalOrgansSections ?? [];
  const readingOrder = data?.readingOrder ?? [];
  const stats = data?.stats;

  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      {/*
       * Mobile:  single-column stack (grid-cols-1, no explicit placement)
       * lg+:     2-column bento with explicit row/col placement via lg: prefixes
       *
       * The lg:row-start-* and lg:row-span-* classes on each tile drive
       * the layered layout. Without the lg: prefix the tiles just stack.
       */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:grid-rows-4">

        {/* ── INTRO ── col 1, row 1 */}
        {intro && <IntroTile article={intro} />}

        {/* ── EXTERNAL ── col 2, rows 1–2 */}
        {external && <ExternalTile article={external} />}

        {/* ── STAT A ── col 1, row 2 */}
        {stats?.[0] && <StatATile stat={stats[0]} />}

        {/* ── INTERNAL ── col 1, rows 3–4 */}
        {internal && (
          <InternalTile article={internal} sections={sections} />
        )}

        {/* ── STAT B ── col 2, row 3 */}
        {stats?.[1] && <StatBTile stat={stats[1]} />}

        {/* ── READING ORDER ── col 2, row 4 */}
        <ReadingOrderTile articles={articles} readingOrder={readingOrder} />

      </div>
    </div>
  );
}