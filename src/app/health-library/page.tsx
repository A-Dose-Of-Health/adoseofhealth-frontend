import Link from "next/link";
export default function HealthLibraryPage() {
  const sections = [
    { slug: "womens-health", title: "Women's Health" },
    { slug: "mental-health", title: "Mental Health" },
    { slug: "chronic-conditions", title: "Chronic Conditions" },
  ];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Health Library</h1>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {sections.map(s => (
          <Link
            key={s.slug}
            href={`/health-library/${s.slug}`}
            className="p-4 border rounded-xl hover:shadow"
          >
            {s.title}
          </Link>
        ))}
      </div>
    </main>
  );
}