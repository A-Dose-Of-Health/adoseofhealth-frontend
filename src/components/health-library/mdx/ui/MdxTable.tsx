import React from "react";

export type Props = {
  /**
   * Optional title rendered in the header bar above the table.
   * Omit to render the table without a header bar.
   */
  title?: string;

  /**
   * Eyebrow label shown above the title in the header bar.
   * @default "Overview"
   */
  eyebrow?: string;

  /**
   * Optional accent color token applied to the header row.
   * Accepts any Tailwind background class.
   * @default "bg-rose-50"
   */
  accentClass?: string;

  /**
   * Accepts a native Markdown table directly inside the component tags.
   */
  children: React.ReactNode;
};

/**
 * Type Guard to check if an unknown object matches a valid React Element
 */
function isReactElement(child: unknown): child is React.ReactElement<Record<string, unknown>> {
  return React.isValidElement(child);
}

/**
 * Type Guard to check if props contain a valid children structure
 */
function hasPropsWithChildren(props: unknown): props is { children: React.ReactNode } {
  return typeof props === "object" && props !== null && "children" in props;
}

export function MdxTable({
  title,
  children,
  eyebrow = "Overview",
  accentClass = "bg-rose-50",
}: Props) {
  let entryCount = 0;

  // Safely traverse children while accounting for unknown MDX prop models
  React.Children.forEach(children, (child) => {
    if (!isReactElement(child) || child.type !== "table") return;

    const tableProps = child.props;
    if (!hasPropsWithChildren(tableProps)) return;

    // Isolate the tbody element from unknown table node children safely
    const childNodes = React.Children.toArray(tableProps.children);
    const tbody = childNodes.find((c): c is React.ReactElement<Record<string, unknown>> => 
      isReactElement(c) && c.type === "tbody"
    );

    if (tbody && hasPropsWithChildren(tbody.props)) {
      entryCount = React.Children.count(tbody.props.children);
    }
  });

  return (
    <figure className="not-prose my-8 w-full overflow-hidden rounded-2xl border border-pink-200/10 shadow-sm custom-mdx-table">
      
      {/* ── Header bar ──────── */}
      {title && (
        <div className="border-b border-pink-100 bg-pink-200/10 px-5 pt-1">
          {/* <p className="text-[0.8rem] font-semibold uppercase tracking-widest text-rose-400">
            {eyebrow}
          </p> */}
          <h3 className="text-sm font-medium text-slate-700 !mt-[1rem]">
            {title}
          </h3>
        </div>
      )}

      {/* ── Table Layout Wrapper ──────── */}
      <div className="overflow-x-auto">
        <div className={`[&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
          [&_thead_tr]:${accentClass}
          [&_th]:px-5 [&_th]:py-3 [&_th]:text-left [&_th]:text-[0.7rem] [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-widest [&_th]:text-pink-500
          [&_tbody_tr]:border-b [&_tbody_tr]:border-slate-50 [&_tbody_tr:nth-child(even)]:bg-slate-50/60 [&_tbody_tr]:hover:bg-rose-50/40
          [&_td]:px-5 [&_td]:py-3.5 [&_td]:align-top [&_td]:leading-relaxed [&_td]:text-slate-600
          [&_td:first-child]:font-semibold [&_td:first-child]:text-slate-800`}>
          {children}
        </div>
      </div>

      {/* ── Footer ──────── */}
      {/* {entryCount > 0 && (
        <div className="border-t border-slate-100 bg-gradient-to-r from-rose-50/60 to-slate-50 px-5 py-2.5">
          <p className="text-[0.65rem] uppercase tracking-wider text-slate-400">
            {entryCount} {entryCount === 1 ? "entry" : "entries"}
          </p>
        </div>
      )} */}
    </figure>
  );
}
