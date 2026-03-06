import type { ReactNode } from "react";

export function MdxArticle({ children }: { children: ReactNode }) {
  return (
    <article className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="prose prose-gray max-w-none">
        {children}
      </div>
    </article>
  );
}