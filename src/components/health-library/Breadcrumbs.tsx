import Link from "next/link";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-gray-600">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            <Link href={c.href} className="hover:text-gray-900 hover:underline">
              {c.label}
            </Link>
            {i < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}