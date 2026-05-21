// src/content/health-library/subtopic-config.ts
//
// Per-subtopic layout configuration.
// Keyed by "topic/subtopic" — e.g. "womens-health/body-anatomy".
//
// HOW TO ADD A NEW SUBTOPIC:
//   1. Add an entry to SUBTOPIC_CONFIG with the correct key.
//   2. Pick a layout from the LayoutMode union.
//      - "grid"            → default article card grid (works for any subtopic)
//      - "body-map"        → layered depth bento (body-anatomy)
//      - "guided-path"     → numbered series (menopause, puberty)
//      - "method-selector" → filter-driven (contraception)
//      - "condition-browser" → symptom tag filter (gynaecological conditions)
//      - "life-stage-timeline" → horizontal age timeline (hormones)
//   3. Provide any layout-specific data in the `data` field.
//   4. If your subtopic needs a brand-new layout, create the component in
//      src/components/health-library/layouts/, add its mode to LayoutMode,
//      register it in layouts/index.ts, and wire the data type here.

// ---------------------------------------------------------------------------
// Layout mode registry
// ---------------------------------------------------------------------------

export type LayoutMode =
  | "grid"
  | "body-map"
  | "guided-path"
  | "method-selector"
  | "condition-browser"
  | "life-stage-timeline";

// ---------------------------------------------------------------------------
// Layout-specific data shapes
// ---------------------------------------------------------------------------

export type StatTile =
  | { value: string; label: string; fact?: never }
  | { fact: string; value?: never; label?: never };

export type BodyMapData = {
  /**
   * Curiosity/fact tiles shown below the main article tiles.
   * First stat should have a large `value` (e.g. "8,000").
   * Second stat can be a plain `fact` sentence.
   */
  stats: [StatTile, StatTile];
  /**
   * Article slugs in the recommended reading order.
   * Used to render the "Suggested order" tile.
   */
  readingOrder: string[];
  /**
   * Page section titles for the paginated internal-organs article.
   * These are used to render direct-jump section links inside the Internal tile.
   * Must match the `pageTitles` array in internal-organs.mdx frontmatter.
   */
  internalOrgansSections: [string, string, string, string];
};

// Extend this union as new layouts are built:
export type LayoutData = BodyMapData | Record<string, never>;

export type SubtopicConfig = {
  layout: LayoutMode;
  data: LayoutData;
};

// ---------------------------------------------------------------------------
// Config registry
// ---------------------------------------------------------------------------

export const SUBTOPIC_CONFIG: Record<string, SubtopicConfig> = {
  "womens-health/body-anatomy": {
    layout: "body-map",
    data: {
      stats: [
        {
          value: "8,000",
          label:
            "nerve endings in the clitoris — more than any other human structure.",
        },
        {
          fact: "The vagina is self-cleaning. It requires no internal washing whatsoever.",
        },
      ],
      readingOrder: [
        "getting-to-know-your-body",
        "external-organs",
        "internal-organs",
      ],
      internalOrgansSections: [
        "The Vagina — Internal Canal",
        "The Cervix — The Gatekeeper",
        "Uterus, Fallopian Tubes & Ovaries",
        "The Urethra & Urinary Health",
      ],
    } satisfies BodyMapData,
  },

  // ── Future entries ─────────────────────────────────────────────────────
  // "womens-health/contraception": { layout: "method-selector", data: {} },
  // "womens-health/gynaecological-conditions": { layout: "condition-browser", data: {} },
  // "womens-health/menopause-perimenopause": { layout: "guided-path", data: {} },
  // "womens-health/hormones-life-stages": { layout: "life-stage-timeline", data: {} },
};

// ---------------------------------------------------------------------------
// Lookup helper
// ---------------------------------------------------------------------------

export function getSubtopicConfig(
  topic: string,
  subtopic: string,
): SubtopicConfig | null {
  return SUBTOPIC_CONFIG[`${topic}/${subtopic}`] ?? null;
}