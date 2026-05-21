// src/components/health-library/layouts/index.ts
//
// Layout component registry.
// Maps each LayoutMode to a server component.
//
// HOW TO ADD A NEW LAYOUT:
//   1. Create the component file in this folder (e.g. GuidedPathLayout.tsx).
//   2. Import it below and add it to LAYOUT_MAP.
//   3. Add the mode to LayoutMode in subtopic-config.ts.
//   4. That's it — page.tsx picks it up automatically.

import type { HealthArticleIndexItem } from "@/content/health-library/schema";
import type { SubtopicConfig, LayoutMode } from "@/content/health-library/subtopic-config";

import { GridLayout } from "./GridLayout";
import { BodyMapLayout } from "./BodyMapLayout";

// ---------------------------------------------------------------------------
// Shared props passed to every layout component
// ---------------------------------------------------------------------------

export type LayoutProps = {
  articles: HealthArticleIndexItem[];
  topicSlug: string;
  subtopicSlug: string;
  subtopicTitle: string;
  /** Full config entry from subtopic-config.ts, or null if none registered */
  config: SubtopicConfig | null;
};

export type LayoutComponent = (props: LayoutProps) => React.ReactNode;

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

const LAYOUT_MAP: Record<LayoutMode, LayoutComponent> = {
  grid: GridLayout,
  "body-map": BodyMapLayout,

  // Placeholder until these layouts are built — fall back to grid
  "guided-path": GridLayout,
  "method-selector": GridLayout,
  "condition-browser": GridLayout,
  "life-stage-timeline": GridLayout,
};

export function getLayoutComponent(mode: LayoutMode): LayoutComponent {
  return LAYOUT_MAP[mode] ?? GridLayout;
}