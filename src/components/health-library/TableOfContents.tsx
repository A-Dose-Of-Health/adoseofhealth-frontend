import type { TocItem } from "@/content/health-library/schema";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items?.length) return null;

  return (
    <aside
      aria-label="Table of contents"
      // hidden by default (mobile), block from lg upwards
      className="hidden lg:block sticky self-start"
      style={{ 
        top: "var(--header-height, 80px)",
        // Desktop height: full viewport minus the header
        height: "calc(100vh - var(--header-height, 80px))" 
      }}
    >
      <nav 
        className="h-full overflow-y-auto py-8 pr-4 pb-20 custom-scrollbar"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
          On this page
        </p>
        <ol className="relative space-y-4 border-l border-black/5">
          {items.map((it) => (
            <li 
              key={it.id} 
              className={`text-sm transition-all ${
                it.level === 3 ? "pl-6" : "pl-4"
              }`}
            >
              <a 
                href={`#${it.id}`} 
                className="text-slate-600 hover:text-secondary block py-0.5"
              >
                {it.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
