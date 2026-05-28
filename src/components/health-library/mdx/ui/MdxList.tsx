import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MdxList — wrapper                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */

type ListProps = {
  children: ReactNode;
  /**
   * - `"bullet"`   — orange dot markers (default)
   * - `"numbered"` — orange number badges
   * - `"check"`    — circled checkmarks; good for takeaways
   * - `"cross"`    — circled cross; good for myths / don'ts
   * - `"none"`     — no markers; plain indented text
   * - `"glossary"` — term + definition pairs; use any MdxTerm* child
   *
   * @default "bullet"
   */
  variant?: "bullet" | "numbered" | "check" | "cross" | "none" | "glossary";
  /** Optional title rendered above the list. */
  title?: string;
  /** Optional footer note. */
  note?: string;
};

/**
 * MdxList — styled list wrapper for MDX files.
 *
 * Compose with <MdxItem> for standard lists, or any of the four
 * <MdxTerm*> components for glossary-style content.
 *
 * Registration — add all exports to your mdxComponents map once:
 * ```ts
 * import {
 *   MdxList,
 *   MdxItem,
 *   MdxTermDefinition,
 *   MdxTermFunction,
 *   MdxTermFact,
 *   MdxTermCompare,
 * } from "@/components/mdx/MdxList";
 *
 * export const mdxComponents = {
 *   MdxList,
 *   MdxItem,
 *   MdxTermDefinition,
 *   MdxTermFunction,
 *   MdxTermFact,
 *   MdxTermCompare,
 * };
 * ```
 *
 * ── Standard list usage ───────────────────────────────────────────────────
 *
 * ```mdx
 * <MdxList variant="check" title="Key Takeaways">
 *   <MdxItem variant="check">Body literacy is a health skill, not a luxury</MdxItem>
 *   <MdxItem variant="check">Every vulva is unique — variation is normal</MdxItem>
 * </MdxList>
 * ```
 *
 * ── Glossary usage — pick one MdxTerm* style ─────────────────────────────
 *
 * MdxTermDefinition — dictionary / anatomy glossary:
 * ```mdx
 * <MdxList variant="glossary" title="Glossary">
 *   <MdxTermDefinition term="Vulva">All external female genitalia collectively.</MdxTermDefinition>
 *   <MdxTermDefinition term="Cervix">The lower part of the uterus, opening into the vagina.</MdxTermDefinition>
 * </MdxList>
 * ```
 *
 * MdxTermFunction — organ roles / biological processes:
 * ```mdx
 * <MdxList variant="glossary" title="Functions">
 *   <MdxTermFunction term="Ovaries">Produce oestrogen and progesterone and release eggs each cycle.</MdxTermFunction>
 * </MdxList>
 * ```
 *
 * MdxTermFact — key facts / did-you-know:
 * ```mdx
 * <MdxList variant="glossary" title="Key Facts">
 *   <MdxTermFact term="Did you know?">The clitoris was absent from anatomy textbooks until 1998.</MdxTermFact>
 * </MdxList>
 * ```
 *
 * MdxTermCompare — myth vs reality / before vs after:
 * ```mdx
 * <MdxList variant="glossary" title="Myth vs Reality">
 *   <MdxTermCompare term="Myth">The hymen breaks at first sex.</MdxTermCompare>
 *   <MdxTermCompare term="Reality">The hymen is a flexible partial ring — it does not break.</MdxTermCompare>
 * </MdxList>
 * ```
 */
export function MdxList({
  children,
  variant = "bullet",
  title,
  note,
}: ListProps) {
  const isGlossary = variant === "glossary";

  return (
    <div className="not-prose my-8 w-full">

      {/* ── Title ────────────────────────────────────────────────────── */}
      {title && (
        <div className="mb-3 flex items-center gap-3">
          <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
            {title}
          </p>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
      )}

      {/* ── Body ─────────────────────────────────────────────────────── */}
      {isGlossary ? (
        <dl className="space-y-2">{children}</dl>
      ) : (
        <ul className="space-y-1.5">{children}</ul>
      )}

      {/* ── Note ─────────────────────────────────────────────────────── */}
      {note && (
        <p className="mt-3 text-[0.7rem] leading-relaxed text-slate-400">
          {note}
        </p>
      )}

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MdxItem — one row inside bullet / numbered / check / cross / none lists   */
/* ─────────────────────────────────────────────────────────────────────────── */

type ItemProps = {
  children: ReactNode;
  /** Should match the parent <MdxList> variant. @default "bullet" */
  variant?: "bullet" | "numbered" | "check" | "cross" | "none";
  /** Required for "numbered" variant to show the correct number. @default 0 */
  index?: number;
};

export function MdxItem({
  children,
  variant = "bullet",
  index = 0,
}: ItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-slate-50/10 px-4 py-2 text-sm leading-relaxed text-slate-700 transition-colors hover:bg-orange-50/60">
      <ItemMarker variant={variant} index={index} />
      <span>{children}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MdxTermDefinition                                                          */
/*  Classic dictionary style. Left border + term label above definition.      */
/*  Best for: anatomy glossaries, medical terms, word meanings.               */
/* ─────────────────────────────────────────────────────────────────────────── */

type TermProps = { term: string; children: ReactNode };

export function MdxTermDefinition({ term, children }: TermProps) {
  return (
    <div className="relative border-l-2 border-orange-200 bg-slate-50/10 py-3 pl-4 pr-3 transition-colors hover:border-orange-400 hover:bg-orange-50/60">
      <dt className="mb-0.5 text-[0.7rem] font-bold uppercase tracking-widest text-orange-500">
        {term}
      </dt>
      <dd className="text-sm leading-relaxed text-slate-600">{children}</dd>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MdxTermFunction                                                            */
/*  Action-oriented. Solid badge + arrow + description on a slate card.       */
/*  Best for: organ functions, system roles, biological processes.            */
/* ─────────────────────────────────────────────────────────────────────────── */

export function MdxTermFunction({ term, children }: TermProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50/10 px-4 py-3.5 transition-colors hover:bg-orange-50/60">
      <dt className="shrink-0 pt-0.5">
        <span className="inline-block rounded-full bg-orange-100 px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-orange-600 shadow-sm">
          {term}
        </span>
      </dt>

      {/* Arrow */}
      <span className="mt-2 shrink-0 text-orange-300" aria-hidden="true">
        <svg viewBox="0 0 16 10" className="h-2.5 w-4 fill-none stroke-current stroke-2">
          <path d="M0 5h14M10 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      <dd className="text-sm leading-relaxed text-slate-600">{children}</dd>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MdxTermFact                                                                */
/*  Standout card. Full-bleed gradient header, definition below.              */
/*  Best for: key facts, stats, did-you-know, important distinctions.         */
/* ─────────────────────────────────────────────────────────────────────────── */

export function MdxTermFact({ term, children }: TermProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-orange-100 bg-slate-50/10 shadow-sm transition-shadow hover:shadow-md">
      <dt className="flex items-center gap-2 bg-orange-100 px-4 py-2">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-600 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
        </span>
        <span className="text-[0.7rem] font-bold uppercase tracking-widest text-orange-500">
          {term}
        </span>
      </dt>
      <dd className="px-4 py-3.5 text-sm leading-relaxed text-slate-600">{children}</dd>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MdxCompareGroup + MdxCompareMyth + MdxCompareReality                      */
/*                                                                             */
/*  Pairs a myth and a reality into one connected card. Each side has its     */
/*  own component with fixed colour and iconography — no fragile regex.       */
/*                                                                             */
/*  Best for: myth vs reality, before/after, incorrect vs correct.            */
/*                                                                             */
/*  Usage in MDX:                                                             */
/*  ```mdx                                                                    */
/*  <MdxList variant="glossary" title="Myth vs Reality">                     */
/*    <MdxCompareGroup>                                                       */
/*      <MdxCompareMyth>The hymen breaks at first sex.</MdxCompareMyth>      */
/*      <MdxCompareReality>                                                   */
/*        The hymen is a flexible partial ring — it does not break.          */
/*      </MdxCompareReality>                                                  */
/*    </MdxCompareGroup>                                                      */
/*    <MdxCompareGroup>                                                       */
/*      <MdxCompareMyth>Douching is necessary for hygiene.</MdxCompareMyth>  */
/*      <MdxCompareReality>                                                   */
/*        The vagina is self-cleaning. Douching disrupts its natural balance. */
/*      </MdxCompareReality>                                                  */
/*    </MdxCompareGroup>                                                      */
/*  </MdxList>                                                                */
/*  ```                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

/** Wrapper that visually connects a myth + reality pair into one card. */
export function MdxCompareGroup({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/10 shadow-sm transition-shadow hover:shadow-md ">
      {children}
    </div>
  );
}

/** The myth / incorrect / before side — always rose. */
export function MdxCompareMyth({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4 px-5 py-5">
      {/* Icon */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100">
        <svg
          className="h-5 w-5"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="7.5" fill="#dc2626" />
          <path
            d="M5 5l6 6M11 5l-6 6"
            stroke="#fff"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 border-l border-slate-200 pl-4">
        <div className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-rose-600">
          Myth
        </div>

        <div className="text-sm font-semibold leading-relaxed text-slate-900">
          {children}
        </div>
      </div>
    </div>
  );
}

/** The reality / correct / after side — always teal. */
export function MdxCompareReality({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-slate-200/80">
      <div className="flex gap-4 px-5 py-5">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100">
          <svg
            className="h-5 w-5"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="7.5" fill="#0f766e" />
            <path
              d="M4.5 8.5l2.5 2.5 4.5-5"
              stroke="#fff"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 border-l border-slate-200 pl-4">
          <div className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-teal-600">
            Reality
          </div>

          <div className="text-sm leading-relaxed text-slate-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Internal marker — not exported                                             */
/* ─────────────────────────────────────────────────────────────────────────── */

function ItemMarker({
  variant,
  index,
}: {
  variant: "bullet" | "numbered" | "check" | "cross" | "none";
  index: number;
}) {
  const base = "mt-0.5 shrink-0";

  if (variant === "numbered") {
    return (
      <span className={`${base} flex h-5 w-5 items-center justify-center rounded-full bg-orange-200 text-[0.65rem] font-bold text-orange-700`}>
        {index + 1}
      </span>
    );
  }

  if (variant === "check") {
    return (
      <svg className={`${base} h-4 w-4`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7.5" fill="#D2F1E3" />
        <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#2ea88a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (variant === "cross") {
    return (
      <svg className={`${base} h-4 w-4`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7.5" fill="#fce7f3" />
        <path d="M5 5l6 6M11 5l-6 6" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (variant === "bullet") {
    return (
      <span className={`${base} mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-orange-400`} aria-hidden="true" />
    );
  }

  return null;
}