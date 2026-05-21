import type { ReactNode } from "react";
import { BookOpen } from "lucide-react";

type Props = {
  /**
   * Optional custom label replacing "TL;DR".
   * @example "In a nutshell" | "What you need to know"
   */
  label?: string;
  children: ReactNode;
};

/**
 * TlDr — "Too Long; Didn't Read" summary card.
 *
 * Place at the very top of the article body, before any headings.
 * Children are typically a markdown bullet list — the MDX compiler
 * renders them as <ul>/<li> nodes which this component styles.
 *
 * Server component — no client JS required.
 *
 * Usage in MDX:
 * ```mdx
 * <TlDr>
 * - Hormonal methods use synthetic hormones to prevent pregnancy.
 * - None of them protect against STIs.
 * - Effectiveness depends heavily on consistent and correct use.
 * </TlDr>
 * ```
 */
export function TlDr({ label = "TL;DR", children }: Props) {
  return (
    <div className="not-prose mb-8 overflow-hidden rounded-2xl border border-secondary/20 bg-secondary/5">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-secondary/10 px-5 py-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          <BookOpen className="size-3.5" strokeWidth={2.5} />
        </span>
        <p className="text-sm font-bold uppercase tracking-wider text-secondary">
          {label}
        </p>
      </div>

      {/* Bullet list — target the rendered <ul> and <li> from MDX */}
      <div
        className={[
          "px-5 py-4 text-sm leading-relaxed text-slate-700",
          // ul
          "[&>ul]:m-0 [&>ul]:list-none [&>ul]:p-0 [&>ul]:space-y-2",
          // li rows
          "[&>ul>li]:flex [&>ul>li]:items-start [&>ul>li]:gap-2.5",
          // dot before each li
          "[&>ul>li]:before:mt-[6px] [&>ul>li]:before:size-1.5 [&>ul>li]:before:shrink-0",
          "[&>ul>li]:before:rounded-full [&>ul>li]:before:bg-secondary/40",
          "[&>ul>li]:before:content-['']",
          // paragraph inside li (MDX wraps text in <p>)
          "[&>ul>li>p]:m-0",
          // bold inside list items
          "[&>ul>li_strong]:font-semibold [&>ul>li_strong]:text-slate-800",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}