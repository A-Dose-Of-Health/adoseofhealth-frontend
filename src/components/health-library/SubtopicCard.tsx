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
      <Link href={`/health-library/${topic}/${slug}`} className="group bg-gray-light relative w-full rounded-lg p-3 text-left duration-300 sm:p-4 lg:rounded-lg xl:rounded-lg xl:p-6">
        <span className="absolute inset-0 rounded-2xl border border-black duration-300 group-hover:-bottom-2 group-hover:border-b-8 lg:rounded-3xl xl:rounded-4xl" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold lg:text-2xl">{title}</h3>
          <div className="text-primary flex items-center gap-2 text-sm font-medium">
          <span>{articleCount} Resources</span>
        </div>
        </div>
      </Link>
  );
}