// src/components/health-library/mdx/index.tsx
//
// Central registry for every custom component available in MDX files.
// Import directly — no next/dynamic with ssr:false here, because this file
// is consumed by MdxArticle (a Server Component via MDXRemote RSC).
// The "use client" directive on each interactive component file is what
// establishes the client boundary. Next.js App Router handles the rest.
//
// HOW TO ADD A NEW COMPONENT:
//   1. Create it in the appropriate subfolder (interactive/, callout/, etc.)
//   2. Add "use client" at the top if it uses state/effects
//   3. Export a named function (not default) from the component file
//   4. Import and add it to mdxComponents below
//   5. Use it in any .mdx file as <ComponentName />

import InteractiveVulva from "./interactive/InteractiveVulva";
import { MdxImage } from "./ui/MdxImage";
import { Callout } from "./ui/Callout";
import { TlDr } from "./ui/TlDr";
import { MdxTable } from "./ui/MdxTable";          


// ---------------------------------------------------------------------------
// PageBreak — no-op sentinel used by the paginated article system.
// Always registered so it can never surface as an "undefined component" error
// if the splitMdxSource regex misses a variant.
// ---------------------------------------------------------------------------
function PageBreak() {
  return null;
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------
export const mdxComponents = {
  // ── System ──────────────────────────────────────────────────────────────
  PageBreak,
  // Override bare <img> with optimised Next.js Image
  img: MdxImage,

  // ── Interactive anatomy diagrams ─────────────────────────────────────────
  InteractiveVulva,

  // ── Future components (uncomment as you build them) ─────────────────────
  Callout,
  TlDr,
  MdxTable,
  // MythFact,
  // StatCard,
  // ExpandableSection,
  // QuickLinks,
  // InteractiveUterus,
} as const;

export type MdxComponentName = keyof typeof mdxComponents;