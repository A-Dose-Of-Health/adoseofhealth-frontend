import type { ReactNode } from "react";
import { MdxBrandLogo } from "./MdxBrandLogo";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Types                                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

type ReferenceType = "journal" | "book" | "website" | "report" | "guideline";

type ReferenceProps = {
  /**
   * The formatted citation — authors, title, journal, year, etc.
   * Passed as children so it can include inline MDX (bold, italics, links).
   */
  children: ReactNode;
  /**
   * Source type — controls the icon shown beside the reference.
   * @default "journal"
   */
  type?: ReferenceType;
  /**
   * Optional URL. When provided, the reference becomes a tappable link.
   */
  href?: string;
  /**
   * Optional DOI or accession number shown as a small mono badge.
   * @example "10.1016/j.cell.2021.01.001"
   */
  doi?: string;
  /**
   * Publication year — displayed as a subtle label.
   */
  year?: string | number;
};

type ReferencesProps = {
  children: ReactNode;
  /**
   * Section title.
   * @default "References"
   */
  title?: string;
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Source type config                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */

const TYPE_CONFIG: Record<ReferenceType, { label: string; icon: ReactNode }> = {
  journal: {
    label: "Journal",
    icon: (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
        <path d="M6 6h4M6 9h4M6 12h2" />
        <path d="M8 2v3" />
      </svg>
    ),
  },
  book: {
    label: "Book",
    icon: (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 2h7l3 3v9H3z" />
        <path d="M10 2v3h3" />
        <path d="M6 7h4M6 10h4M6 13h2" />
      </svg>
    ),
  },
  website: {
    label: "Website",
    icon: (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" />
        <path d="M8 2.5c-2 2-2 9 0 11M8 2.5c2 2 2 9 0 11M2.5 8h11" />
      </svg>
    ),
  },
  report: {
    label: "Report",
    icon: (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 1h8v14H4z" />
        <path d="M4 4h4v3H4zM4 9h8M4 12h5" />
      </svg>
    ),
  },
  guideline: {
    label: "Guideline",
    icon: (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 1.5l1.5 3 3.5.5-2.5 2.5.6 3.5L8 9.5l-3.1 1.5.6-3.5L3 5l3.5-.5z" />
        <path d="M8 13v2M5 14h6" />
      </svg>
    ),
  },
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MdxReference — single citation row                                        */
/* ─────────────────────────────────────────────────────────────────────────── */

/**
 * MdxReference — a single citation inside an <MdxReferences> block.
 *
 * ```mdx
 * <MdxReference type="journal" year="2005" doi="10.1097/01.ju.0000173993.11989.dd" href="https://doi.org/10.1097/01.ju.0000173993.11989.dd">
 *   O'Connell HE, et al. *Anatomy of the clitoris.* J Urol. 2005;174(4):1189–95.
 * </MdxReference>
 * ```
 */
export function MdxReference({
  children,
  type = "journal",
  href,
  doi,
  year,
}: ReferenceProps) {
  const config = TYPE_CONFIG[type];

  const inner = (
    <div className="group flex items-start gap-3 rounded-xl bg-slate-50/10 px-4 py-3.5 transition-colors hover:bg-slate-50/60">

      {/* Type icon */}
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover:bg-slate-100 group-hover:text-slate-500">
        {config.icon}
      </span>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Citation text */}
        <div className="text-[0.8rem] leading-relaxed text-slate-600">
          {children}
        </div>

        {/* Meta row */}
        {(doi || year) && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {/* Type badge */}
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-slate-400">
              {config.label}
            </span>

            {/* DOI */}
            {doi && (
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[0.6rem] text-slate-400">
                {doi}
              </span>
            )}

            {/* Year */}
            {year && (
              <span className="text-[0.65rem] font-semibold text-slate-300">
                {year}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Link arrow */}
      {href && (
        <svg
          viewBox="0 0 16 16"
          className="mt-1 h-3 w-3 shrink-0 fill-none stroke-slate-300 stroke-[1.5] transition-colors group-hover:stroke-slate-400"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      )}
    </div>
  );

  return (
    <li>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full">
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MdxReferences — section wrapper                                           */
/* ─────────────────────────────────────────────────────────────────────────── */

/**
 * MdxReferences — styled references section for MDX articles.
 *
 * Wraps <MdxReference> children into a card with a gradient header,
 * consistent with MdxTable and MdxSymptomChecker.
 *
 * Registration:
 * ```ts
 * import { MdxReferences, MdxReference } from "@/components/mdx/MdxReferences";
 * export const mdxComponents = { MdxReferences, MdxReference };
 * ```
 *
 * Usage in MDX:
 * ```mdx
 * <MdxReferences>
 *   <MdxReference
 *     type="journal"
 *     year="2005"
 *     doi="10.1097/01.ju.0000173993.11989.dd"
 *     href="https://doi.org/10.1097/01.ju.0000173993.11989.dd"
 *   >
 *     O'Connell HE, et al. *Anatomy of the clitoris.* J Urol. 2005;174(4):1189–95.
 *   </MdxReference>
 *
 *   <MdxReference type="guideline" year="2023">
 *     World Health Organization. *Sexually transmitted infections: key facts.* WHO, 2023.
 *   </MdxReference>
 *
 *   <MdxReference type="report" year="2022" href="https://kemri.go.ke">
 *     KEMRI. *Kenya Women's Health Survey Report.* Nairobi, 2022.
 *   </MdxReference>
 * </MdxReferences>
 * ```
 */
export function MdxReferences({
  children,
  title = "References",
}: ReferencesProps) {
  return (
    <section
      className="not-prose my-10 w-full overflow-hidden rounded-2xl border border-slate-400/20 shadow-sm"
      aria-label={title}
    >

      {/* ── Header bar ─────────────────────────────────────────────────── */}
      <div className="border-b border-slate-100 bg-slate-200/50 px-5 py-4">
        <div className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
          Further Reading
        </div>
        <div className="mt-0.5 text-sm font-semibold text-slate-700">
          {title}
        </div>
      </div>

      {/* ── Reference list ─────────────────────────────────────────────── */}
      <ol className="space-y-0.5 bg-slate-50/10 px-2 py-2 group-hover:bg-slate-100" role="list">
        {children}
      </ol>

      {/* ── Footer bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-gradient-to-r from-slate-50 to-sky-50/40 px-5 py-2.5">
        <div className="text-[0.65rem] leading-relaxed text-slate-400">
          For educational purposes only. Always consult a qualified healthcare provider.
        </div>
      </div>

    </section>
  );
}