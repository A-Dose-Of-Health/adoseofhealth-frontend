import type { TocItem } from "@/content/health-library/schema";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items?.length) return null;

  return (
    <aside aria-label="Table of contents" className="sticky top-24">
      <div className="rounded-2xl border bg-white p-4">
        <p className="text-sm font-semibold">On this page</p>
        <ol className="mt-3 space-y-2 text-sm">
          {items.map((it) => (
            <li key={it.id} className={it.level === 3 ? "ml-4" : ""}>
              <a href={`#${it.id}`} className="text-gray-700 hover:underline">
                {it.text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}