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
    <Link
      href={route}
      className="group bg-gray-light relative w-full rounded-lg p-3 text-left duration-300 sm:p-4 lg:rounded-lg xl:rounded-lg xl:p-6"
    >
      <span className="absolute inset-0 rounded-2xl border border-black duration-300 group-hover:-bottom-2 group-hover:border-b-8 lg:rounded-3xl xl:rounded-4xl" />
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold lg:text-2xl">{title}</h3>

        <span className="text-[11px] text-gray-500">
          {formats.map((f) => f.toUpperCase()).join(" · ")}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{summary}</p>
      <div className="text-primary flex items-center gap-2 text-sm font-medium py-2">
        <span>Updated: {updatedAt}</span>
      </div>
    </Link>
  );
}
