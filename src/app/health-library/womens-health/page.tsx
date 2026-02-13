export const runtime = "nodejs";
import { getWomensHealthHub } from "@/lib/api/nhs/womensHealth";
import Link from "next/link";
import { NHSSection, WomensHealthTopic } from "@/lib/api/nhs/types";

export default async function WomensHealthPage() {
  const data: WomensHealthTopic = await getWomensHealthHub();
  console.log("Womens Health Hub Data:", data);
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="mt-2 text-gray-600">{data.description}</p>

      <ul className="mt-6 space-y-3">
        {data.hasPart?.map((topic: NHSSection) => {
          const slug = topic.url?.split("/").pop() || topic.name;

          return (
            <li key={slug}>
              <Link
                href={`/health-library/womens-health/${slug}`}
                className="text-blue-600 hover:underline"
              >
                {topic.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
