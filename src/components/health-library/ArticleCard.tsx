import Link from "next/link";

export function ArticleCard({
  route,
  title,
  summary,
  updatedAt,
  formats,
}: {
  route: string;
  title: string;
  summary: string;
  updatedAt: string;
  formats: string[];
}) {
  return (
    <li className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow transition">
      <Link href={route} className="block">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <span className="text-[11px] text-gray-500">
            {formats.map((f) => f.toUpperCase()).join(" · ")}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{summary}</p>
        <p className="mt-4 text-xs text-gray-500">Updated: {updatedAt}</p>
      </Link>
    </li>
  );
}