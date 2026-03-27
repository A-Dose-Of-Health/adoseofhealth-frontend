import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="">
      <ol className="flex flex-wrap items-center gap-2 text-gray-600">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            <Link
              href={c.href}
              className={`hover:text-primary ${
                i === items.length - 1
                  ? "text-primary font-semibold pointer-events-none" // Style for the last item
                  : "text-gray-500 hover:text-gray-900" // Style for others
              }`}
            >
              {c.label}
            </Link>
            {i < items.length - 1 && (
              <span aria-hidden="true">
                <ChevronRight size={18}/>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
