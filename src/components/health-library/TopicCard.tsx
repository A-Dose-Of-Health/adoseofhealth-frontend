import Link from "next/link";

export function TopicCard({
  slug,
  title,
  description,
  counts,
}: {
  slug: string;
  title: string;
  description: string;
  counts: { subtopics: number; articles: number };
}) {
  return (
    <li className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow transition">
      <Link href={`/health-library/${slug}`} className="block">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description ? (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
        ) : null}
        <p className="mt-4 text-xs text-gray-500">
          {counts.articles} resources · {counts.subtopics} subtopics
        </p>
      </Link>
    </li>
  );
}