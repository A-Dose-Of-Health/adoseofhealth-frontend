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
   * - `"none"`     — no markers; plain indented text
   * - `"glossary"` — term + definition pairs; use <MdxTerm> children
   *
   * @default "bullet"
   */
  variant?: "bullet" | "numbered" | "check" | "none" | "glossary";
  /** Optional title rendered above the list. */
  title?: string;
  /** Optional footer note. */
  note?: string;
};

/**
 * MdxList — styled list wrapper for MDX files.
 *
 * Compose with <MdxItem> (bullet / numbered / check / none) or
 * <MdxTerm> (glossary) as direct children.
 *
 * Registration:
 * ```ts
 * import { MdxList, MdxItem, MdxTerm } from "@/components/mdx/MdxList";
 * export const mdxComponents = { MdxList, MdxItem, MdxTerm };
 * ```
 *
 * Usage in MDX:
 * ```mdx
 * <MdxList variant="check" title="Key Takeaways">
 *   <MdxItem variant="check">Body literacy is a health skill, not a luxury</MdxItem>
 *   <MdxItem variant="check">Every vulva is unique — variation is normal</MdxItem>
 * </MdxList>
 *
 * <MdxList variant="glossary" title="Glossary">
 *   <MdxTerm term="Vulva">The collective name for all **external** female genitalia</MdxTerm>
 *   <MdxTerm term="Cervix">The lower part of the uterus, opening into the vagina</MdxTerm>
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
          {/* Decorative rule */}
          <span className="h-px flex-1 bg-slate/10-200" />
          <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
            {title}
          </p>
          <span className="h-px flex-1 bg-slate/10-200" />
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
/*  MdxItem — one row inside bullet / numbered / check / none lists           */
/* ─────────────────────────────────────────────────────────────────────────── */

type ItemProps = {
  children: ReactNode;
  /** Should match the parent <MdxList> variant. @default "bullet" */
  variant?: "bullet" | "numbered" | "check" | "none";
  /** Required for "numbered" variant to display the correct number. @default 0 */
  index?: number;
};

/**
 * MdxItem — a single item inside an <MdxList>.
 *
 * ```mdx
 * <MdxList variant="numbered" title="Steps">
 *   <MdxItem variant="numbered" index={0}>Write down your symptoms</MdxItem>
 *   <MdxItem variant="numbered" index={1}>Note your medications</MdxItem>
 * </MdxList>
 * ```
 */
export function MdxItem({
  children,
  variant = "bullet",
  index = 0,
}: ItemProps) {
  return (
    <li className="flex items-start gap-3 rounded-xl bg-slate/10-50 px-4 py-3 text-sm leading-relaxed text-slate-700 transition-colors hover:bg-orange-50/60">
      <ItemMarker variant={variant} index={index} />
      <span>{children}</span>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MdxTerm — one term + definition row inside a glossary list                */
/* ─────────────────────────────────────────────────────────────────────────── */

type TermProps = {
  /** The term or concept shown as a pill badge on the left. */
  term: string;
  /** The definition — passed as children so it can contain inline MDX. */
  children: ReactNode;
};

/**
 * MdxTerm — a term + definition pair inside an <MdxList variant="glossary">.
 *
 * The definition is passed as children so it can include inline MDX
 * formatting (bold, links, etc.).
 *
 * ```mdx
 * <MdxList variant="glossary" title="Glossary">
 *   <MdxTerm term="Vulva">The collective name for all **external** female genitalia</MdxTerm>
 *   <MdxTerm term="Cervix">The lower part of the uterus, opening into the vagina</MdxTerm>
 * </MdxList>
 * ```
 */
export function MdxTerm({ term, children }: TermProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-slate/10-50/10 px-4 py-3 transition-colors hover:bg-orange-50/60 sm:flex-row sm:items-baseline sm:gap-4">
      {/* Term pill */}
      <dt className="shrink-0">
        <span className="inline-block rounded-full bg-orange-100 px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-orange-600">
          {term}
        </span>
      </dt>

      {/* Definition */}
      <dd className="text-sm leading-relaxed text-slate-600">{children}</dd>
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
  variant: "bullet" | "numbered" | "check" | "none";
  index: number;
}) {
  const base = "mt-0.5 shrink-0";

  if (variant === "numbered") {
    return (
      <span
        className={`${base} flex h-5 w-5 items-center justify-center rounded-full bg-orange-200 text-[0.65rem] font-bold text-orange-700`}
      >
        {index + 1}
      </span>
    );
  }

  if (variant === "check") {
    return (
      <svg
        className={`${base} h-4 w-4`}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="7.5" fill="#fce7f3" />
        <path
          d="M4.5 8.5l2.5 2.5 4.5-5"
          stroke="#e11d48"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "bullet") {
    return (
      <span
        className={`${base} mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-orange-400`}
        aria-hidden="true"
      />
    );
  }

  // variant === "none"
  return null;
}