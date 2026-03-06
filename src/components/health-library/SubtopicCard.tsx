import Link from "next/link";

export function SubtopicCard({
  topic,
  slug,
  title,
  articleCount,
}: {
  topic: string;
  slug: string;
  title: string;
  articleCount: number;
}) {
  return (
    <li className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow transition">
      <Link href={`/health-library/${topic}/${slug}`} className="block">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-2 text-xs text-gray-500">{articleCount} resources</p>
      </Link>
    </li>
  );
}